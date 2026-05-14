'use client'

import { Badge } from '@/components/ui/badge'

export function PodsTable() {
  const pods = [
    { name: 'nginx-deployment-7d4c5f', namespace: 'production', status: 'Running', cpu: '45m', memory: '128Mi', restarts: 0 },
    { name: 'api-server-8a3b2c', namespace: 'production', status: 'Running', cpu: '120m', memory: '512Mi', restarts: 0 },
    { name: 'redis-cache-9f2e1d', namespace: 'production', status: 'Running', cpu: '30m', memory: '256Mi', restarts: 0 },
    { name: 'worker-queue-4k5j6l', namespace: 'production', status: 'Running', cpu: '85m', memory: '384Mi', restarts: 1 },
    { name: 'frontend-app-3h7g2f', namespace: 'production', status: 'Running', cpu: '65m', memory: '256Mi', restarts: 0 },
    { name: 'database-primary-2d8f3e', namespace: 'production', status: 'Running', cpu: '200m', memory: '2Gi', restarts: 0 },
    { name: 'prometheus-server-5k9j2m', namespace: 'monitoring', status: 'Running', cpu: '150m', memory: '1Gi', restarts: 0 },
    { name: 'grafana-dashboard-7l3n4p', namespace: 'monitoring', status: 'Running', cpu: '40m', memory: '192Mi', restarts: 0 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-lg font-bold">Pods Overview</h2>
          <p className="text-slate-500 text-xs">Real-time pod status and resource usage</p>
        </div>
        <button className="text-primary text-xs font-bold hover:underline">View all workloads</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-800">
              <th className="pb-3 px-2 font-medium">NAME</th>
              <th className="pb-3 px-2 font-medium">NAMESPACE</th>
              <th className="pb-3 px-2 font-medium">STATUS</th>
              <th className="pb-3 px-2 font-medium text-right">CPU</th>
              <th className="pb-3 px-2 font-medium text-right">MEMORY</th>
              <th className="pb-3 px-2 font-medium text-right">RESTARTS</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {pods.map((pod) => (
              <tr key={pod.name} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                <td className="py-4 px-2 font-medium text-white max-w-[200px] truncate">{pod.name}</td>
                <td className="py-4 px-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
                    {pod.namespace}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full" />
                    <span className="text-white font-medium">{pod.status}</span>
                  </div>
                </td>
                <td className="py-4 px-2 text-right text-slate-400 font-mono">{pod.cpu}</td>
                <td className="py-4 px-2 text-right text-slate-400 font-mono">{pod.memory}</td>
                <td className="py-4 px-2 text-right">
                  {pod.restarts > 0 ? (
                    <span className="text-destructive font-bold">{pod.restarts}</span>
                  ) : (
                    <span className="text-slate-600">0</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
