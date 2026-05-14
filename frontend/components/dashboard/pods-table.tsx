'use client'

import React, { useMemo, memo } from 'react'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { MoreVertical, Terminal, Trash2, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PodRow = memo(({ pod, onAction }: { pod: any, onAction: (name: string, action: string) => void }) => (
  <tr 
    className="border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group"
    onClick={() => onAction(pod.name, 'detail')}
  >
    <td className="py-4 px-2 font-medium max-w-[200px] truncate group-hover:text-primary transition-colors">{pod.name}</td>
    <td className="py-4 px-2">
      <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
        {pod.namespace}
      </span>
    </td>
    <td className="py-4 px-2">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="font-medium">{pod.status}</span>
      </div>
    </td>
    <td className="py-4 px-2 text-right text-muted-foreground font-mono">{pod.cpu}</td>
    <td className="py-4 px-2 text-right text-muted-foreground font-mono">{pod.memory}</td>
    <td className="py-4 px-2 text-right">
      {pod.restarts > 0 ? (
        <span className="text-destructive font-bold">{pod.restarts}</span>
      ) : (
        <span className="text-muted-foreground">0</span>
      )}
    </td>
    <td className="py-4 px-2 text-right">
      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); onAction(pod.name, 'logs') }}>
          <Terminal className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={(e) => { e.stopPropagation(); onAction(pod.name, 'delete') }}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </td>
  </tr>
))

PodRow.displayName = 'PodRow'

export function PodsTable() {
  const { toast } = useToast()
  
  const pods = useMemo(() => [
    { name: 'nginx-deployment-7d4c5f', namespace: 'production', status: 'Running', cpu: '45m', memory: '128Mi', restarts: 0 },
    { name: 'api-server-8a3b2c', namespace: 'production', status: 'Running', cpu: '120m', memory: '512Mi', restarts: 0 },
    { name: 'redis-cache-9f2e1d', namespace: 'production', status: 'Running', cpu: '30m', memory: '256Mi', restarts: 0 },
    { name: 'worker-queue-4k5j6l', namespace: 'production', status: 'Running', cpu: '85m', memory: '384Mi', restarts: 1 },
    { name: 'frontend-app-3h7g2f', namespace: 'production', status: 'Running', cpu: '65m', memory: '256Mi', restarts: 0 },
    { name: 'database-primary-2d8f3e', namespace: 'production', status: 'Running', cpu: '200m', memory: '2Gi', restarts: 0 },
    { name: 'prometheus-server-5k9j2m', namespace: 'monitoring', status: 'Running', cpu: '150m', memory: '1Gi', restarts: 0 },
    { name: 'grafana-dashboard-7l3n4p', namespace: 'monitoring', status: 'Running', cpu: '40m', memory: '192Mi', restarts: 0 },
  ], [])

  const handleAction = (name: string, action: string) => {
    toast({
      title: `Pod ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      description: `${action === 'detail' ? 'Showing details for' : 'Executing action on'} pod: ${name}`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-lg font-bold">Pods Overview</h2>
          <p className="text-muted-foreground text-xs">Real-time pod status and resource usage</p>
        </div>
        <button 
          className="text-primary text-xs font-bold hover:underline"
          onClick={() => toast({ title: "Workloads", description: "Navigating to full workload explorer..." })}
        >
          View all workloads
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="pb-3 px-2 font-medium">NAME</th>
              <th className="pb-3 px-2 font-medium">NAMESPACE</th>
              <th className="pb-3 px-2 font-medium">STATUS</th>
              <th className="pb-3 px-2 font-medium text-right">CPU</th>
              <th className="pb-3 px-2 font-medium text-right">MEMORY</th>
              <th className="pb-3 px-2 font-medium text-right">RESTARTS</th>
              <th className="pb-3 px-2 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-foreground">
            {pods.map((pod) => (
              <PodRow key={pod.name} pod={pod} onAction={handleAction} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
