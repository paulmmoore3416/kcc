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
    <Card className="border-warm-200">
      <CardHeader>
        <CardTitle>Pods Overview</CardTitle>
        <CardDescription>Real-time pod status and resource usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Namespace</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">CPU</th>
                <th className="pb-3 font-semibold">Memory</th>
                <th className="pb-3 font-semibold">Restarts</th>
              </tr>
            </thead>
            <tbody>
              {pods.map((pod) => (
                <tr key={pod.name} className="border-b last:border-0">
                  <td className="py-3 font-medium">{pod.name}</td>
                  <td className="py-3">
                    <Badge variant="outline" className="bg-warm-100">
                      {pod.namespace}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {pod.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">{pod.cpu}</td>
                  <td className="py-3 text-muted-foreground">{pod.memory}</td>
                  <td className="py-3 text-muted-foreground">{pod.restarts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
