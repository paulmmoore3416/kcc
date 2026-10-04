# KCC User Guide

This guide covers running Kraken Cloud Control (KCC) on a single machine and using the **Mining Ops** module, which connects KCC to a local crypto-mining rig. For cluster deployment, see [QUICKSTART.md](QUICKSTART.md) and [DEPLOYMENT.md](DEPLOYMENT.md).

## Contents

1. [Two ways to run KCC](#two-ways-to-run-kcc)
2. [Run KCC without Kubernetes (standalone)](#run-kcc-without-kubernetes-standalone)
3. [Connect a mining rig](#connect-a-mining-rig)
4. [Using the Mining Ops tab](#using-the-mining-ops-tab)
5. [Mining in the DePIN Hub](#mining-in-the-depin-hub)
6. [FinOps: mining energy as a cost line](#finops-mining-energy-as-a-cost-line)
7. [Mining-rig tips](#mining-rig-tips)
8. [Troubleshooting](#troubleshooting)

## Two ways to run KCC

| Mode | When to use it | What works |
|---|---|---|
| **Cluster** | You have a Kubernetes cluster (minikube, k3s, EKS, ...) and a kubeconfig | Everything, including pods, nodes, scaling and the operator |
| **Standalone** | A single workstation or mining rig, no cluster | Dashboard, DePIN Hub, Mining Ops, FinOps and AI. Cluster views report "no cluster". |

The backend picks the mode automatically. If it can't load a kubeconfig, it logs `starting in standalone mode` and continues. Set `KCC_REQUIRE_CLUSTER=1` to make it exit instead.

`GET /api/mode` returns the active mode.

## Run KCC without Kubernetes (standalone)

Requirements: Go 1.25+, Node.js 18+ and npm, Linux with systemd (for the services).

```bash
git clone https://github.com/paulmmoore3416/kcc.git ~/kcc
~/kcc/deploy/standalone/install.sh
```

The installer:

1. Copies `deploy/standalone/kcc.env.example` to `~/.config/kcc/kcc.env` (mode `600`) if that file doesn't exist yet.
2. Builds the backend to `~/.local/share/kcc/kcc-backend`.
3. Builds the dashboard (`next build`).
4. Installs and starts two systemd **user** services, `kcc-backend` and `kcc-frontend`.

Open **http://127.0.0.1:4200/dashboard**.

Day-to-day commands:

```bash
systemctl --user status kcc-backend kcc-frontend
systemctl --user restart kcc-backend        # after editing ~/.config/kcc/kcc.env
journalctl --user -u kcc-backend -f         # logs
```

To run KCC at boot without logging in, enable lingering once: `sudo loginctl enable-linger $USER`.

**Secrets:** API keys such as `GEMINI_API_KEY` go in `~/.config/kcc/kcc.env`, never in the repository.

## Connect a mining rig

KCC reads a small JSON document, **`kcc.mining/v1`**, over HTTP. KCC only observes the rig: it never starts, stops or reconfigures miners, and the feed never contains wallet addresses.

Choose a feed source:

| Your rig | Feed source |
|---|---|
| Plain **xmrig** and/or **lolMiner** | The bundled reference exporter, [`integrations/mining-exporter`](../integrations/mining-exporter/kcc_mining_exporter.py) |
| Your own monitoring stack | Implement the schema described in [TECHNICAL_GUIDE.md](TECHNICAL_GUIDE.md#kccminingv1-schema) |
| A rig dashboard that already serves `kcc.mining/v1` | Point KCC at it directly |

### Using the reference exporter

1. Enable the miners' HTTP APIs (read-only, on loopback):
   - xmrig: `--http-host=127.0.0.1 --http-port=18092`
   - lolMiner: `--apiport 8020`
2. Start the exporter:

   ```bash
   ELECTRICITY_USD_KWH=0.17 WATTS_CPU=120 \
     python3 ~/kcc/integrations/mining-exporter/kcc_mining_exporter.py
   ```

3. In `~/.config/kcc/kcc.env`, set `KCC_MINING_URL=http://127.0.0.1:8421/api/kcc/v1`, then restart `kcc-backend`.

All exporter settings are listed at the top of the script.

## Using the Mining Ops tab

Open **Mining Ops** in the sidebar.

- **Header:** whether the rig is mining or idle, the mining schedule, Tari-only mode, paused nodes, and whether the feed is live. It also links to the rig's own dashboard. Set that link with `NEXT_PUBLIC_RIG_DASHBOARD` at build time.
- **KPI cards:** active miners and total hashrate, live power draw and cost per hour, projected net per night (revenue minus electricity), and the hottest device with the share reject rate.
- **Miners table:** each enabled miner, with its live rate, its rate as a percentage of the expected (baseline) rate, shares, temperature and watts. Below the table, a 3-hour chart shows hashrate and power.
- **Advisor:** rule-based recommendations, such as a miner that is down while the rig mines, hashrate under 75% of baseline, a device at 80 °C or more, rejects above 5%, mining below power cost, nights to the next payout, an idle rig inside its mining window, or hashpower split across several coins.
- **Rewards & Payouts:** balance per pool or wallet, progress toward the pool payout threshold, and holdings at current prices.

## Mining in the DePIN Hub

The mining rig is also registered as a DePIN provider called **Mining Rig**. Open **DePIN Management** and select **Mining Rig** to see:

- Wallet balance and total rewards for the rig's main coin
- Uptime efficiency (active miners divided by enabled miners)
- Infrastructure cost (electricity per night) and net profit

Each enabled miner appears as a node. The provider is read-only, so create, delete and resize return `provider is read-only`.

## FinOps: mining energy as a cost line

`GET /api/mining/focus` returns one cost row per enabled miner in the [FinOps FOCUS](https://focus.finops.org/) format (`ServiceName = "Crypto Mining"`, `ConsumedUnit = "kWh"`, `BilledCost` in USD). Mining electricity can then be reported next to cloud spend.

## Mining-rig tips

These come from running KCC next to a real Tari rig (i7-7820X, GTX 1060 and RX 580):

- **Concentrate on one coin.** RandomX uses about 2 MB of L3 cache per thread. Running two RandomX-family miners at once (for example Tari and a second coin) makes them evict each other's cache. Combined throughput drops sharply, by close to half on an 11 MB-L3 CPU. Benchmark your thread count with nothing else running.
- **Pause blockchain nodes while mining.** Syncing nodes compete for CPU, cache and disk. Stop them during the mining window and resume them afterward.
- **Power-cap GPUs.** A 10–20% lower power limit usually costs a few percent of hashrate and saves a lot of heat.
- **Keep large AI models off a mining GPU.** Cuckaroo29 needs nearly 6 GB of VRAM. If Ollama loads a model onto the same card, the miner stops. Run the AI provider on CPU or another GPU, or use it outside mining hours.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Mining Ops says "KCC backend unreachable" | `systemctl --user status kcc-backend`. Check `KCC_HTTP_ADDR` and that the dashboard was built with the matching `NEXT_PUBLIC_KCC_API`. |
| "No mining feed yet: connection refused" | The feed source isn't running. `curl $KCC_MINING_URL` should return JSON. |
| "unsupported feed schema" | The feed's `schema` field must start with `kcc.mining/v1`. |
| Feed shows "stale" | No successful poll in 3 intervals. Check that the rig dashboard or exporter isn't hung. |
| Browser console shows CORS errors | Add the dashboard's origin to `KCC_CORS_ORIGINS`. |
