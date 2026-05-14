'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Activity, Layout, Server, AlertCircle, Clock } from 'lucide-react'
import { Card as TremorCard, Title, Text, AreaChart, BarChart, DonutChart, Badge, List, ListItem, Flex, ProgressBar } from '@tremor/react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
}

export function ClusterOverview() {
  const barData = [
    { time: '00:00', value: 1 },
    { time: '01:00', value: 2 },
    { time: '02:00', value: 0 },
    { time: '03:00', value: 6 },
    { time: '04:00', value: 2 },
    { time: '05:00', value: 0 },
    { time: '06:00', value: 1 },
    { time: '07:00', value: 3 },
    { time: '08:00', value: 0 },
    { time: '09:00', value: 0 },
    { time: '10:00', value: 2 },
    { time: '11:00', value: 2 },
  ]

  const openTasks = [
    { label: 'Critical Pods', value: 3, percentage: 75, color: 'cyan' },
    { label: 'High Priority', value: 7, percentage: 85, color: 'cyan' },
    { label: 'Medium Priority', value: 4, percentage: 60, color: 'cyan' },
    { label: 'Low Priority', value: 1, percentage: 20, color: 'cyan' },
  ]

  const incidents = [
    { subject: 'OOMKill: api-gateway', node: 'node-01', time: 'in 2 minutes', severity: 'critical' },
    { subject: 'Latency Spike: auth-svc', node: 'node-04', time: 'in 2 minutes', severity: 'warning' },
    { subject: 'Pending: redis-cluster', node: 'node-02', time: 'in 13 minutes', severity: 'info' },
    { subject: 'Unschedulable: worker-3', node: 'node-03', time: 'in 13 minutes', severity: 'info' },
    { subject: 'PV Mount Failed: db-1', node: 'node-01', time: 'in 13 minutes', severity: 'warning' },
  ]

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Top Section: Main Chart + Status Bars + List */}
      <motion.div variants={item} className="k8s-card grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Resource Trend (Bar Chart Style) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1">
            <h3 className="text-slate-400 text-sm font-medium">Resources</h3>
            <h2 className="text-white text-xl font-bold">Allocated today</h2>
          </div>
          <BarChart
            className="h-64 mt-4"
            data={barData}
            index="time"
            categories={["value"]}
            colors={["cyan"]}
            showLegend={false}
            showGridLines={false}
            yAxisWidth={30}
          />
        </div>

        {/* Priority Status (Progress Bars Style) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="space-y-1">
            <h2 className="text-white text-sm font-medium">Pending tasks</h2>
          </div>
          <div className="space-y-6">
            {openTasks.map((task) => (
              <div key={task.label} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-slate-400 text-sm">{task.label}</span>
                  <span className="text-white font-bold">{task.value}</span>
                </div>
                <div className="k8s-progress-cyan">
                  <div 
                    className="k8s-progress-cyan-inner" 
                    style={{ width: `${task.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident List */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-white text-sm font-medium">Anomalies nearing threshold</h2>
          <div className="overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-500 border-b border-slate-800">
                  <th className="pb-2 font-medium">Incident</th>
                  <th className="pb-2 font-medium text-right">Node</th>
                  <th className="pb-2 font-medium text-right">Deadline</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {incidents.map((inc, i) => (
                  <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 max-w-[150px] truncate font-medium text-white">{inc.subject}</td>
                    <td className="py-3 text-right text-slate-400">{inc.node}</td>
                    <td className="py-3 text-right text-slate-400">{inc.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Middle Section: Big Metric Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={item} className="k8s-card flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-slate-400 text-sm font-medium">Response</h3>
            <div className="flex items-baseline gap-1">
              <span className="k8s-metric-value">12</span>
              <span className="text-slate-500 text-xl font-medium">sec</span>
            </div>
            <p className="text-slate-500 text-xs">Average API latency</p>
          </div>
          <div className="mt-8 relative">
            <div className="k8s-metric-box flex flex-col">
              <span className="text-4xl font-bold text-white">4</span>
              <span className="text-slate-400 text-xs">Nodes online</span>
            </div>
          </div>
          <div className="mt-4 relative">
            <div className="k8s-metric-box k8s-metric-box-alert flex items-center justify-between">
              <div>
                <span className="text-4xl font-bold text-white">6</span>
                <p className="text-slate-400 text-xs">Pods waiting</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="k8s-card flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-slate-400 text-sm font-medium">Efficiency</h3>
            <div className="flex items-baseline gap-1">
              <span className="k8s-metric-value">1h 13m</span>
            </div>
            <p className="text-slate-500 text-xs">First pod stabilization</p>
          </div>
          <div className="mt-8 relative">
            <div className="k8s-metric-box k8s-metric-box-success flex items-center justify-between border-emerald-500/30">
              <div>
                <span className="text-4xl font-bold text-white">67%</span>
                <p className="text-slate-400 text-xs">Node utilization rate</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          </div>
          <div className="mt-4 relative">
            <div className="k8s-metric-box flex flex-col">
              <span className="text-4xl font-bold text-white">16</span>
              <span className="text-slate-400 text-xs">Unassigned PVs</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="k8s-card flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-slate-400 text-sm font-medium">Networking</h3>
            <div className="flex items-baseline gap-1">
              <span className="k8s-metric-value">7</span>
              <span className="text-slate-500 text-xl font-medium">sec</span>
            </div>
            <p className="text-slate-500 text-xs">Average packet loss</p>
          </div>
          <div className="mt-8 relative">
            <div className="k8s-metric-box k8s-metric-box-success flex items-center justify-between border-emerald-500/30">
              <div>
                <span className="text-4xl font-bold text-white">1</span>
                <p className="text-slate-400 text-xs">Agents on backup</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          </div>
          <div className="mt-4 relative">
            <div className="k8s-metric-box k8s-metric-box-alert flex items-center justify-between">
              <div>
                <span className="text-4xl font-bold text-white">3</span>
                <p className="text-slate-400 text-xs">Calls waiting</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Gauge Card */}
        <motion.div variants={item} className="k8s-card flex flex-col items-center justify-center relative">
          <h3 className="absolute top-6 left-6 text-slate-400 text-sm font-medium">Cluster Health</h3>
          <div className="w-full max-w-[240px] pt-8">
            <DonutChart
              data={[
                { name: 'Healthy', value: 100 },
                { name: 'Remaining', value: 0 },
              ]}
              category="value"
              index="name"
              colors={["cyan", "slate"]}
              variant="pie"
              showLabel={false}
              className="h-48"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <span className="text-6xl font-bold text-white">100%</span>
            </div>
          </div>
          <div className="w-full flex justify-between px-4 mt-8 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            <span>0%</span>
            <span>100%</span>
          </div>
        </motion.div>
      </div>

      {/* Footer-like status */}
      <motion.div variants={item} className="flex justify-between items-center px-2 py-4 border-t border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-emerald-500/10 rounded flex items-center justify-center">
            <Activity className="h-5 w-5 text-emerald-500" />
          </div>
          <span className="text-white font-bold text-sm">Kubernetes Command Center</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500 text-sm font-medium">
          <Clock className="h-4 w-4" />
          <span>11:53 AM</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
