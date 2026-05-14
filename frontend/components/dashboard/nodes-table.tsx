'use client'

import { Server } from 'lucide-react'

export function NodesTable() {
  const nodes = [
    { name: 'node-1', status: 'Ready', version: 'v1.28.4', cpu: '16', memory: '64Gi', pods: 48 },
    { name: 'node-2', status: 'Ready', version: 'v1.28.4', cpu: '16', memory: '64Gi', pods: 52 },
    { name: 'node-3', status: 'Ready', version: 'v1.28.4', cpu: '16', memory: '64Gi', pods: 45 },
    { name: 'node-4', status: 'Ready', version: 'v1.28.4', cpu: '32', memory: '128Gi', pods: 87 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-lg font-bold">Nodes Overview</h2>
          <p className="text-slate-500 text-xs">Cluster node status and capacity</p>
        </div>
        <button className="text-primary text-xs font-bold hover:underline">Manage infrastructure</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-800">
              <th className="pb-3 px-2 font-medium">NAME</th>
              <th className="pb-3 px-2 font-medium">STATUS</th>
              <th className="pb-3 px-2 font-medium">VERSION</th>
              <th className="pb-3 px-2 font-medium text-right">CPU CORES</th>
              <th className="pb-3 px-2 font-medium text-right">MEMORY</th>
              <th className="pb-3 px-2 font-medium text-right">PODS</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {nodes.map((node) => (
              <tr key={node.name} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                <td className="py-4 px-2 font-medium text-white flex items-center gap-3">
                  <Server className="h-4 w-4 text-primary" />
                  {node.name}
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full" />
                    <span className="text-white font-medium">{node.status}</span>
                  </div>
                </td>
                <td className="py-4 px-2 text-slate-400 font-mono">{node.version}</td>
                <td className="py-4 px-2 text-right text-slate-400 font-mono">{node.cpu}</td>
                <td className="py-4 px-2 text-right text-slate-400 font-mono">{node.memory}</td>
                <td className="py-4 px-2 text-right">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                    {node.pods}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
