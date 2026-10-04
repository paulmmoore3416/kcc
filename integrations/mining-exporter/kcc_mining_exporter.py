#!/usr/bin/env python3
"""Reference kcc.mining/v1 exporter for KCC's Mining Ops module.

Reads the local HTTP APIs of xmrig (CPU, RandomX) and lolMiner (GPU) and serves a
kcc.mining/v1 document at http://127.0.0.1:8421/api/kcc/v1. Standard library only.

It never reads or publishes wallet addresses, worker passwords or API tokens.
Configure with environment variables (all optional):

  KCC_EXPORTER_BIND   127.0.0.1:8421
  XMRIG_API           http://127.0.0.1:18092/2/summary   ("" to disable)
  XMRIG_TOKEN         bearer token if xmrig's http.access-token is set
  LOLMINER_API        http://127.0.0.1:8020/             ("" to disable)
  COIN_CPU / COIN_GPU coin symbols shown in KCC (default XTM)
  WATTS_CPU / WATTS_GPU  estimated miner watts (no root needed)
  SYSTEM_BASE_WATTS   idle draw of the rest of the box (default 70)
  ELECTRICITY_USD_KWH electricity price (default 0.15)
"""
import json
import os
import time
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

ENV = os.environ.get


def fetch(url, token=None):
    req = urllib.request.Request(url, headers={"User-Agent": "kcc-mining-exporter"})
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req, timeout=3) as r:
        return json.loads(r.read().decode())


def xmrig():
    url = ENV("XMRIG_API", "http://127.0.0.1:18092/2/summary")
    if not url:
        return None
    m = {"id": "xmrig", "device": "CPU", "algo": "RandomX", "coin": ENV("COIN_CPU", "XTM"), "unit": "H/s",
         "enabled": True, "active": False, "hashrate": None, "expected_hashrate": 0, "accepted": None,
         "rejected": None, "pool": "", "temp_c": None, "watts": float(ENV("WATTS_CPU", "120")), "coins_per_night": 0}
    try:
        d = fetch(url, ENV("XMRIG_TOKEN"))
    except Exception:
        return m
    hr = (d.get("hashrate") or {}).get("total") or []
    res = d.get("results") or {}
    m.update(active=True, hashrate=next((h for h in hr if h), None), accepted=res.get("shares_good"),
             rejected=(res.get("shares_total") or 0) - (res.get("shares_good") or 0),
             pool=((d.get("connection") or {}).get("pool") or "").split("@")[-1], algo=d.get("algo") or "RandomX")
    m["expected_hashrate"] = (hr[1] if len(hr) > 1 and hr[1] else m["hashrate"]) or 0
    return m


def lolminer():
    url = ENV("LOLMINER_API", "http://127.0.0.1:8020/")
    if not url:
        return []
    try:
        d = fetch(url)
    except Exception:
        return []
    out = []
    algo = (d.get("Algorithms") or [{}])[0]
    per_gpu = algo.get("Worker_Performance") or []
    for i, w in enumerate(d.get("Workers") or []):
        out.append({"id": f"gpu{i}", "device": w.get("Name", f"GPU {i}"), "algo": algo.get("Algorithm", "?"),
                    "coin": ENV("COIN_GPU", "XTM"), "unit": algo.get("Performance_Unit", "g/s"), "enabled": True,
                    "active": True, "hashrate": per_gpu[i] if i < len(per_gpu) else None,
                    "expected_hashrate": per_gpu[i] if i < len(per_gpu) else 0,
                    "accepted": (algo.get("Worker_Accepted") or [None] * (i + 1))[i],
                    "rejected": (algo.get("Worker_Rejected") or [None] * (i + 1))[i],
                    "pool": algo.get("Pool", ""), "temp_c": w.get("Core_Temp"), "watts": w.get("Power") or
                    float(ENV("WATTS_GPU", "100")), "coins_per_night": 0})
    return out


def feed():
    miners = [m for m in [xmrig(), *lolminer()] if m]
    kwh = float(ENV("ELECTRICITY_USD_KWH", "0.15"))
    watts = sum(m["watts"] or 0 for m in miners if m["active"]) + float(ENV("SYSTEM_BASE_WATTS", "70"))
    hours = 24.0
    cost = watts * hours / 1000 * kwh
    return {"schema": "kcc.mining/v1", "ts": time.time(), "source": "kcc-mining-exporter",
            "mining": any(m["active"] for m in miners), "tari_only": all(m["coin"] == "XTM" for m in miners),
            "nodes_paused": False, "miners": miners,
            "power": {"watts_live": watts, "watts_mining_estimate": watts, "usd_per_kwh": kwh},
            "economics": {"hours_per_night": hours, "xtm_per_night": 0, "revenue_usd_night": 0,
                          "power_cost_usd_night": cost, "net_usd_night": -cost, "nights_to_payout": None,
                          "payout_threshold_xtm": 0},
            "balances": [], "prices": {}, "health": [], "nodes": {}}


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path.split("?")[0] != "/api/kcc/v1":
            self.send_error(404)
            return
        body = json.dumps(feed()).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    host, port = ENV("KCC_EXPORTER_BIND", "127.0.0.1:8421").rsplit(":", 1)
    print(f"kcc.mining/v1 exporter on http://{host}:{port}/api/kcc/v1")
    ThreadingHTTPServer((host, int(port)), Handler).serve_forever()
