'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function NodesTable() {
  const nodes = [
    { name: 'node-1', status: 'Ready', version: 'v1.28.4', cpu: '16', memory: '64Gi', pods: 48 },
    { name: 'node-2', status: 'Ready', version: 'v1.28.4', cpu: '16', memory: '64Gi', pods: 52 },
    { name: 'node-3', status: 'Ready', version: 'v1.28.4', cpu: '16', memory: '64Gi', pods: 45 },
    { name: 'node-4', status: 'Ready', version: 'v1.28.4', cpu: '32', memory: '128Gi', pods: 87 },
  ]

  return (
    <Card className="border-warm-200">
      <CardHeader>
        <CardTitle>Nodes Overview</CardTitle>
        <CardDescription>Cluster node status and capacity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Kubernetes Version</th>
                <th className="pb-3 font-semibold">CPU Cores</th>
                <th className="pb-3 font-semibold">Memory</th>
                <th className="pb-3 font-semibold">Pods</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((node) => (
                <tr key={node.name} className="border-b last:border-0">
                  <td className="py-3 font-medium">{node.name}</td>
                  <td className="py-3">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {node.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">{node.version}</td>
                  <td className="py-3 text-muted-foreground">{node.cpu}</td>
                  <td className="py-3 text-muted-foreground">{node.memory}</td>
                  <td className="py-3 text-muted-foreground">{node.pods}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
