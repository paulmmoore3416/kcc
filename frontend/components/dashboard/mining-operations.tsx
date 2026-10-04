'use client'

import React, { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Activity, AlertTriangle, Cpu, ExternalLink, Flame, Gauge, Info, Hammer, PlugZap, Wallet } from 'lucide-react'
import { MetricCard, type MetricSeverity } from '@/components/dashboard/metric-card'
import { SectionCard } from '@/components/dashboard/section-card'
import { Progress } from '@/components/ui/progress'
import { KCC_API } from '@/lib/utils'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

// Optional link to the rig's own dashboard (local only).
const RIG_DASHBOARD = process.env.NEXT_PUBLIC_RIG_DASHBOARD || 'http://127.0.0.1:8420'

type Miner = {
  id: string; device: string; algo: string; coin: string; unit: string; enabled: boolean; active: boolean
  hashrate: number | null; expected_hashrate: number; accepted: number | null; rejected: number | null
  pool: string; temp_c: number | null; watts: number | null; coins_per_night: number
}
type Summary = {
  connected: boolean; error?: string; source: string; fetched_at: number
  feed?: {
    mining: boolean; tari_only: boolean; nodes_paused: boolean; cpu_mode?: string
    window?: { start_hour: number; stop_hour: number }
    miners: Miner[]
    power: { watts_live: number; watts_mining_estimate: number; usd_per_kwh: number }
    economics: { hours_per_night: number; xtm_per_night: number; revenue_usd_night: number; power_cost_usd_night: number
      net_usd_night: number; nights_to_payout: number | null; payout_threshold_xtm: number }
    balances: { id: string; label: string; coin: string; confirmed: number | null; pending: number | null; paid: number | null; threshold: number | null }[]
    prices: Record<string, { usd: number | null; ch_24h: number | null }>
    health: { name: string; status: string; detail: string }[]
  }
  totals: { active_miners: number; enabled_miners: number; hashrate_by_unit: Record<string, number>; balance_by_coin: Record<string, number>
    balance_usd: number; cost_per_hour_usd: number; reject_rate_pct: number; payout_progress_pct: number }
  advice: { severity: 'info' | 'warn' | 'crit'; title: string; detail: string }[]
}
type Point = { ts: number; watts: number; hashrates: Record<string, number>; temps: Record<string, number> }

const fmtRate = (v: number | null | undefined, unit: string) => {
  if (v == null) return '-'
  if (unit === 'H/s' && v >= 1000) return `${(v / 1000).toFixed(2)} kH/s`
  return `${v.toFixed(2)} ${unit}`
}
const usd = (v: number | null | undefined) => (v == null ? '-' : `${v < 0 ? '-' : ''}$${Math.abs(v).toFixed(2)}`)

export function MiningOperations() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [history, setHistory] = useState<Point[]>([])
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const [s, h] = await Promise.all([
          fetch(`${KCC_API}/api/mining/summary`).then(r => r.json()),
          fetch(`${KCC_API}/api/mining/history?since=${Math.floor(Date.now() / 1000) - 3 * 3600}`).then(r => r.json()),
        ])
        if (!alive) return
        setSummary(s); setHistory(Array.isArray(h) ? h : []); setFetchError(null)
      } catch (e) {
        if (alive) setFetchError('KCC backend unreachable at ' + KCC_API)
      }
    }
    load()
    const t = setInterval(load, 10000)
    return () => { alive = false; clearInterval(t) }
  }, [])

  const feed = summary?.feed
  const miners = useMemo(() => (feed?.miners || []).filter(m => m.enabled), [feed])

  const chart = useMemo(() => {
    const ids = miners.map(m => m.id)
    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      legend: { textStyle: { color: '#94a3b8' }, top: 0 },
      grid: { left: 50, right: 50, top: 36, bottom: 30 },
      xAxis: { type: 'time', axisLabel: { color: '#64748b' } },
      yAxis: [
        { type: 'value', name: 'H/s', axisLabel: { color: '#64748b' }, splitLine: { lineStyle: { color: '#1e293b' } } },
        { type: 'value', name: 'g/s · W', axisLabel: { color: '#64748b' }, splitLine: { show: false } },
      ],
      series: [
        ...ids.map(id => {
          const unit = miners.find(m => m.id === id)?.unit
          return { name: id, type: 'line', showSymbol: false, smooth: true, yAxisIndex: unit === 'H/s' ? 0 : 1,
            data: history.filter(p => p.hashrates[id] != null).map(p => [p.ts * 1000, p.hashrates[id]]) }
        }),
        { name: 'watts', type: 'line', showSymbol: false, yAxisIndex: 1, lineStyle: { type: 'dashed' },
          data: history.map(p => [p.ts * 1000, p.watts]) },
      ],
    }
  }, [history, miners])

  if (fetchError || !summary) {
    return (
      <SectionCard title="Mining Operations" icon={<Hammer className="h-5 w-5" />} status="warning" subtitle="Rig telemetry">
        <p className="text-sm text-muted-foreground">{fetchError || 'Connecting to the KCC backend...'}</p>
      </SectionCard>
    )
  }
  if (!feed) {
    return (
      <SectionCard title="Mining Operations" icon={<Hammer className="h-5 w-5" />} status="warning" subtitle={summary.source}>
        <p className="text-sm text-muted-foreground">
          No mining feed yet: {summary.error}. Point <code>KCC_MINING_URL</code> at a <code>kcc.mining/v1</code> feed
          (see docs/USER_GUIDE.md).
        </p>
      </SectionCard>
    )
  }

  const t = summary.totals
  const e = feed.economics
  const hot = Math.max(...miners.map(m => m.temp_c ?? 0))
  const sev = (bad: boolean, warn: boolean): MetricSeverity => (bad ? 'critical' : warn ? 'warning' : 'healthy')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mining Operations</h2>
          <p className="text-sm text-muted-foreground">
            {feed.mining ? 'Mining now' : 'Idle'}
            {feed.window && ` · schedule ${String(feed.window.start_hour).padStart(2, '0')}:00–${String(feed.window.stop_hour).padStart(2, '0')}:00`}
            {feed.tari_only && ' · Tari-only mode'}
            {feed.nodes_paused && ' · nodes paused for mining'}
            {' · '}
            <span className={summary.connected ? 'text-emerald-400' : 'text-amber-400'}>
              {summary.connected ? 'feed live' : 'feed stale'}
            </span>
          </p>
        </div>
        <a href={RIG_DASHBOARD} target="_blank" rel="noreferrer"
           className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          Open rig dashboard <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard label="Miners active" value={`${t.active_miners}/${t.enabled_miners}`} icon={<Activity className="h-4 w-4" />}
          severity={sev(feed.mining && t.active_miners === 0, feed.mining && t.active_miners < t.enabled_miners)}
          description={Object.entries(t.hashrate_by_unit).map(([u, v]) => fmtRate(v, u)).join(' · ') || 'no live hashrate'} />
        <MetricCard label="Power draw" value={feed.power.watts_live.toFixed(0)} unit="W" icon={<PlugZap className="h-4 w-4" />}
          description={`${usd(t.cost_per_hour_usd)}/h at $${feed.power.usd_per_kwh}/kWh`} />
        <MetricCard label="Net per night" value={usd(e.net_usd_night)} icon={<Gauge className="h-4 w-4" />}
          severity={e.net_usd_night < 0 ? 'warning' : 'healthy'}
          description={`${usd(e.revenue_usd_night)} revenue − ${usd(e.power_cost_usd_night)} power · ${e.xtm_per_night.toFixed(1)} XTM`} />
        <MetricCard label="Hottest device" value={hot ? hot.toFixed(0) : '-'} unit="°C" icon={<Flame className="h-4 w-4" />}
          severity={sev(hot >= 85, hot >= 78)} description={`reject rate ${t.reject_rate_pct.toFixed(1)}%`} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SectionCard title="Miners" icon={<Cpu className="h-5 w-5" />} status={feed.mining ? 'healthy' : 'neutral'} subtitle="Live rate vs expected">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-muted-foreground">
                  <tr className="text-left">
                    <th className="py-2 pr-3">Device</th><th className="pr-3">Coin · algo</th><th className="pr-3">Rate</th>
                    <th className="pr-3">vs expected</th><th className="pr-3">Shares</th><th className="pr-3">Temp</th><th>Watts</th>
                  </tr>
                </thead>
                <tbody>
                  {miners.map(m => {
                    const pct = m.hashrate != null && m.expected_hashrate ? (m.hashrate / m.expected_hashrate) * 100 : null
                    return (
                      <tr key={m.id} className="border-t border-border/40">
                        <td className="py-2 pr-3">
                          <span className={`inline-block h-2 w-2 rounded-full mr-2 ${m.active ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                          {m.device}
                        </td>
                        <td className="pr-3">{m.coin} · {m.algo}</td>
                        <td className="pr-3 font-mono">{fmtRate(m.hashrate, m.unit)}</td>
                        <td className="pr-3">{pct == null ? '-' : `${pct.toFixed(0)}%`}</td>
                        <td className="pr-3">{m.accepted ?? '-'}{m.rejected ? ` / ${m.rejected} rej` : ''}</td>
                        <td className="pr-3">{m.temp_c == null ? '-' : `${m.temp_c.toFixed(0)}°C`}</td>
                        <td>{m.watts == null ? '-' : m.watts.toFixed(0)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {history.length > 1 && (
              <div className="mt-4 h-64">
                <ReactECharts option={chart} style={{ height: '100%' }} notMerge />
              </div>
            )}
          </SectionCard>
        </div>

        <SectionCard title="Advisor" icon={<Info className="h-5 w-5" />} status={summary.advice.some(a => a.severity === 'crit') ? 'critical' : summary.advice.some(a => a.severity === 'warn') ? 'warning' : 'info'} subtitle="Rule-based recommendations">
          <ul className="space-y-3">
            {summary.advice.length === 0 && <li className="text-sm text-muted-foreground">Nothing to flag.</li>}
            {summary.advice.map((a, i) => (
              <li key={i} className="flex gap-2 text-sm">
                {a.severity === 'info' ? <Info className="h-4 w-4 mt-0.5 text-blue-400 shrink-0" />
                  : <AlertTriangle className={`h-4 w-4 mt-0.5 shrink-0 ${a.severity === 'crit' ? 'text-red-400' : 'text-amber-400'}`} />}
                <div><div className="font-medium">{a.title}</div><div className="text-muted-foreground">{a.detail}</div></div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Rewards & Payouts" icon={<Wallet className="h-5 w-5" />} status="info"
        subtitle={`Holdings ≈ ${usd(t.balance_usd)} at current prices`}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {feed.balances.map(b => {
            const bal = (b.confirmed ?? 0) + (b.pending ?? 0)
            const price = feed.prices[b.coin]?.usd
            return (
              <div key={b.id} className="rounded-lg border border-border/50 p-3">
                <div className="text-xs text-muted-foreground">{b.label}</div>
                <div className="text-lg font-semibold">{bal.toFixed(2)} {b.coin}
                  {price != null && <span className="text-xs text-muted-foreground ml-2">{usd(bal * price)}</span>}</div>
                {b.threshold ? (
                  <>
                    <Progress value={Math.min(((b.confirmed ?? 0) / b.threshold) * 100, 100)} className="h-1.5 mt-2" />
                    <div className="text-[11px] text-muted-foreground mt-1">{(b.confirmed ?? 0).toFixed(2)} / {b.threshold} {b.coin} payout threshold</div>
                  </>
                ) : b.paid ? <div className="text-[11px] text-muted-foreground mt-1">{b.paid.toFixed(2)} {b.coin} paid</div> : null}
              </div>
            )
          })}
        </div>
        {e.nights_to_payout != null && (
          <p className="text-xs text-muted-foreground mt-3">
            About {e.nights_to_payout.toFixed(0)} nights to the next {e.payout_threshold_xtm} XTM pool payout at the current rate.
          </p>
        )}
      </SectionCard>
    </div>
  )
}
