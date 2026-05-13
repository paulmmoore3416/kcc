'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Server } from 'lucide-react'

export function NodesTable() {
  const nodes = [
    { name: 'node-1', status: 'Ready', version: 'v1.28.4', cpu: '16', memory: '64Gi', pods: 48 },
    { name: 'node-2', status: 'Ready', version: 'v1.28.4', cpu: '16', memory: '64Gi', pods: 52 },
    { name: 'node-3', status: 'Ready', version: 'v1.28.4', cpu: '16', memory: '64Gi', pods: 45 },
    { name: 'node-4', status: 'Ready', version: 'v1.28.4', cpu: '32', memory: '128Gi', pods: 87 },
  ]

  return (
    <Card className="border-border bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg">Nodes Overview</CardTitle>
        <CardDescription className="text-muted-foreground">Cluster node status and capacity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="pb-3 px-2 font-semibold text-foreground">Name</th>
                <th className="pb-3 px-2 font-semibold text-foreground">Status</th>
                <th className="pb-3 px-2 font-semibold text-foreground">Kubernetes Version</th>
                <th className="pb-3 px-2 font-semibold text-foreground">CPU Cores</th>
                <th className="pb-3 px-2 font-semibold text-foreground">Memory</th>
                <th className="pb-3 px-2 font-semibold text-foreground">Pods</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((node, idx) => (
                <tr key={node.name} className={`border-b border-border/50 hover:bg-background/50 transition-colors ${idx % 2 === 0 ? 'bg-background/20' : ''}`}>
                  <td className="py-3 px-2 font-medium text-foreground flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary flex-shrink-0" />
                    {node.name}
                  </td>
                  <td className="py-3 px-2">
                    <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30">
                      {node.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground font-mono text-xs">{node.version}</td>
                  <td className="py-3 px-2 text-muted-foreground font-mono text-xs">{node.cpu}</td>
                  <td className="py-3 px-2 text-muted-foreground font-mono text-xs">{node.memory}</td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                      {node.pods}
                    </Badge>
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
