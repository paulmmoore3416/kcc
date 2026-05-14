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
    { label: 'Critical Pods', value: 3, percentage: 75, color: 'blue' },
    { label: 'High Priority', value: 7, percentage: 85, color: 'blue' },
    { label: 'Medium Priority', value: 4, percentage: 60, color: 'blue' },
    { label: 'Low Priority', value: 1, percentage: 20, color: 'blue' },
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
      <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Resource Trend (Bar Chart Style) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1">
            <h3 className="text-muted-foreground text-sm font-medium">Resources</h3>
            <h2 className="text-foreground text-xl font-bold">Allocated today</h2>
          </div>
          <BarChart
            className="h-64 mt-4"
            data={barData}
            index="time"
            categories={["value"]}
            colors={["blue"]}
            showLegend={false}
            showGridLines={false}
            yAxisWidth={30}
          />
        </div>

        {/* Priority Status (Progress Bars Style) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="space-y-1">
            <h2 className="text-foreground text-sm font-medium">Pending tasks</h2>
          </div>
          <div className="space-y-6">
            {openTasks.map((task) => (
              <div key={task.label} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-muted-foreground text-sm">{task.label}</span>
                  <span className="text-foreground font-bold">{task.value}</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${task.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident List */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-foreground text-sm font-medium">Anomalies nearing threshold</h2>
          <div className="overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="pb-2 font-medium">Incident</th>
                  <th className="pb-2 font-medium text-right">Node</th>
                  <th className="pb-2 font-medium text-right">Deadline</th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                {incidents.map((inc, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 max-w-[150px] truncate font-medium">{inc.subject}</td>
                    <td className="py-3 text-right text-muted-foreground">{inc.node}</td>
                    <td className="py-3 text-right text-muted-foreground">{inc.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Middle Section: Big Metric Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-muted-foreground text-sm font-medium">Response</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">12</span>
              <span className="text-muted-foreground text-xl font-medium">sec</span>
            </div>
            <p className="text-muted-foreground text-xs">Average API latency</p>
          </div>
          <div className="mt-8 relative">
            <div className="rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-primary/50 flex flex-col">
              <span className="text-3xl font-bold">4</span>
              <span className="text-muted-foreground text-xs">Nodes online</span>
            </div>
          </div>
          <div className="mt-4 relative">
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 transition-all hover:border-destructive/50 flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">6</span>
                <p className="text-muted-foreground text-xs">Pods waiting</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-muted-foreground text-sm font-medium">Efficiency</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">1h 13m</span>
            </div>
            <p className="text-muted-foreground text-xs">First pod stabilization</p>
          </div>
          <div className="mt-8 relative">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 transition-all hover:border-emerald-500/50 flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">67%</span>
                <p className="text-muted-foreground text-xs">Node utilization rate</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          </div>
          <div className="mt-4 relative">
            <div className="rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-primary/50 flex flex-col">
              <span className="text-3xl font-bold">16</span>
              <span className="text-muted-foreground text-xs">Unassigned PVs</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-muted-foreground text-sm font-medium">Networking</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">7</span>
              <span className="text-muted-foreground text-xl font-medium">sec</span>
            </div>
            <p className="text-muted-foreground text-xs">Average packet loss</p>
          </div>
          <div className="mt-8 relative">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 transition-all hover:border-emerald-500/50 flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">1</span>
                <p className="text-muted-foreground text-xs">Agents on backup</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          </div>
          <div className="mt-4 relative">
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 transition-all hover:border-destructive/50 flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">3</span>
                <p className="text-muted-foreground text-xs">Calls waiting</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Gauge Card */}
        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm flex flex-col items-center justify-center relative">
          <h3 className="absolute top-6 left-6 text-muted-foreground text-sm font-medium">Cluster Health</h3>
          <div className="w-full max-w-[240px] pt-8">
            <DonutChart
              data={[
                { name: 'Healthy', value: 100 },
                { name: 'Remaining', value: 0 },
              ]}
              category="value"
              index="name"
              colors={["blue", "gray"]}
              variant="pie"
              showLabel={false}
              className="h-48"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <span className="text-5xl font-bold">100%</span>
            </div>
          </div>
          <div className="w-full flex justify-between px-4 mt-8 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            <span>0%</span>
            <span>100%</span>
          </div>
        </motion.div>
      </div>

      {/* Footer-like status */}
      <motion.div variants={item} className="flex justify-between items-center px-2 py-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-emerald-500/10 rounded flex items-center justify-center">
            <Activity className="h-5 w-5 text-emerald-500" />
          </div>
          <span className="font-bold text-sm">Kraken Cloud Control</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-sm font-medium">
          <Clock className="h-4 w-4" />
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
