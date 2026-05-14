'use client'

import React, { useMemo, memo } from 'react'
import { Server, MoreVertical, Shield, Settings, Info } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

const NodeRow = memo(({ node, onAction }: { node: any, onAction: (name: string, action: string) => void }) => (
  <tr 
    className="border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group"
    onClick={() => onAction(node.name, 'detail')}
  >
    <td className="py-4 px-2 font-medium flex items-center gap-3 group-hover:text-primary transition-colors">
      <Server className="h-4 w-4 text-primary" />
      {node.name}
    </td>
    <td className="py-4 px-2">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="font-medium">{node.status}</span>
      </div>
    </td>
    <td className="py-4 px-2 text-muted-foreground font-mono">{node.version}</td>
    <td className="py-4 px-2 text-right text-muted-foreground font-mono">{node.cpu}</td>
    <td className="py-4 px-2 text-right text-muted-foreground font-mono">{node.memory}</td>
    <td className="py-4 px-2 text-right">
      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
        {node.pods}
      </span>
    </td>
    <td className="py-4 px-2 text-right">
      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); onAction(node.name, 'security') }}>
          <Shield className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); onAction(node.name, 'config') }}>
          <Settings className="h-3.5 w-3.5" />
        </Button>
      </div>
    </td>
  </tr>
))

NodeRow.displayName = 'NodeRow'

export function NodesTable() {
  const { toast } = useToast()

  const nodes = useMemo(() => [
    { name: 'node-1', status: 'Ready', version: 'v1.28.4', cpu: '16', memory: '64Gi', pods: 48 },
    { name: 'node-2', status: 'Ready', version: 'v1.28.4', cpu: '16', memory: '64Gi', pods: 52 },
    { name: 'node-3', status: 'Ready', version: 'v1.28.4', cpu: '16', memory: '64Gi', pods: 45 },
    { name: 'node-4', status: 'Ready', version: 'v1.28.4', cpu: '32', memory: '128Gi', pods: 87 },
  ], [])

  const handleAction = (name: string, action: string) => {
    toast({
      title: `Node ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      description: `${action === 'detail' ? 'Showing inventory for' : 'Executing config on'} node: ${name}`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-lg font-bold">Nodes Overview</h2>
          <p className="text-muted-foreground text-xs">Cluster node status and capacity</p>
        </div>
        <button 
          className="text-primary text-xs font-bold hover:underline"
          onClick={() => toast({ title: "Infrastructure", description: "Navigating to infrastructure manager..." })}
        >
          Manage infrastructure
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="pb-3 px-2 font-medium">NAME</th>
              <th className="pb-3 px-2 font-medium">STATUS</th>
              <th className="pb-3 px-2 font-medium">VERSION</th>
              <th className="pb-3 px-2 font-medium text-right">CPU CORES</th>
              <th className="pb-3 px-2 font-medium text-right">MEMORY</th>
              <th className="pb-3 px-2 font-medium text-right">PODS</th>
              <th className="pb-3 px-2 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-foreground">
            {nodes.map((node) => (
              <NodeRow key={node.name} node={node} onAction={handleAction} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
