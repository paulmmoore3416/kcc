'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
    <Card className="border-border bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg">Pods Overview</CardTitle>
        <CardDescription className="text-muted-foreground">Real-time pod status and resource usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="pb-3 px-2 font-semibold text-foreground">Name</th>
                <th className="pb-3 px-2 font-semibold text-foreground">Namespace</th>
                <th className="pb-3 px-2 font-semibold text-foreground">Status</th>
                <th className="pb-3 px-2 font-semibold text-foreground">CPU</th>
                <th className="pb-3 px-2 font-semibold text-foreground">Memory</th>
                <th className="pb-3 px-2 font-semibold text-foreground">Restarts</th>
              </tr>
            </thead>
            <tbody>
              {pods.map((pod, idx) => (
                <tr key={pod.name} className={`border-b border-border/50 hover:bg-background/50 transition-colors ${idx % 2 === 0 ? 'bg-background/20' : ''}`}>
                  <td className="py-3 px-2 font-medium text-foreground truncate">{pod.name}</td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30">
                      {pod.namespace}
                    </Badge>
                  </td>
                  <td className="py-3 px-2">
                    <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30">
                      {pod.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground font-mono text-xs">{pod.cpu}</td>
                  <td className="py-3 px-2 text-muted-foreground font-mono text-xs">{pod.memory}</td>
                  <td className="py-3 px-2 text-muted-foreground">
                    {pod.restarts > 0 ? (
                      <Badge variant="outline" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                        {pod.restarts}
                      </Badge>
                    ) : (
                      <span className="text-emerald-400">0</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
