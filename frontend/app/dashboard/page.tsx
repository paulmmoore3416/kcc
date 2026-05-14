'use client'

import { Activity, Server, Database, DollarSign, Shield, TrendingUp, AlertTriangle, CheckCircle, Brain, Search, Bell, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClusterOverview } from '@/components/dashboard/cluster-overview'
import { PodsTable } from '@/components/dashboard/pods-table'
import { NodesTable } from '@/components/dashboard/nodes-table'
import { CostDashboard } from '@/components/dashboard/cost-dashboard'
import { SecurityDashboard } from '@/components/dashboard/security-dashboard'
import { MetricsCharts } from '@/components/dashboard/metrics-charts'
import { VoiceAssistant } from '@/components/dashboard/voice-assistant'
import { PerformanceMetrics } from '@/components/dashboard/performance-metrics'
import { AIInsights } from '@/components/dashboard/ai-insights'
import { ResourceHeatmap } from '@/components/dashboard/resource-heatmap'
import { NetworkTraffic } from '@/components/dashboard/network-traffic'
import { CostPrediction } from '@/components/dashboard/cost-prediction'

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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0f1120] text-slate-200">
      {/* Sidebar/Header Integration (Zendesk Style) */}
      <header className="border-b border-slate-800 bg-[#1a1b3a] px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">KCC</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button className="px-4 py-2 rounded-lg bg-slate-800 text-white">Dashboard</button>
            <button className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">Workloads</button>
            <button className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">Clusters</button>
            <button className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">Costs</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search resources..." 
              className="bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 w-64"
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full ring-2 ring-[#1a1b3a]" />
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <Settings className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-blue-600 border border-slate-700" />
        </div>
      </header>

      <main className="p-8 max-w-[1600px] mx-auto">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-8">
            <div className="flex items-center justify-between">
              <TabsList className="bg-[#1a1b3a] border border-slate-800 p-1 h-auto gap-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-slate-950 px-6 py-2">Overview</TabsTrigger>
                <TabsTrigger value="pods" className="px-6 py-2">Pods</TabsTrigger>
                <TabsTrigger value="nodes" className="px-6 py-2">Nodes</TabsTrigger>
                <TabsTrigger value="metrics" className="px-6 py-2">Metrics</TabsTrigger>
                <TabsTrigger value="performance" className="px-6 py-2">Performance</TabsTrigger>
                <TabsTrigger value="network" className="px-6 py-2">Network</TabsTrigger>
                <TabsTrigger value="prediction" className="px-6 py-2">Cost Forecast</TabsTrigger>
                <TabsTrigger value="ai" className="px-6 py-2">AI Insights</TabsTrigger>
                <TabsTrigger value="cost" className="px-6 py-2">Cost</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Cluster Healthy</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-8">
                <TabsContent value="overview" className="space-y-8 m-0 outline-none">
                  <ClusterOverview />
                </TabsContent>

                <TabsContent value="pods" className="m-0 outline-none">
                  <div className="k8s-card">
                    <PodsTable />
                  </div>
                </TabsContent>

                <TabsContent value="nodes" className="m-0 outline-none">
                  <div className="k8s-card">
                    <NodesTable />
                  </div>
                </TabsContent>

                <TabsContent value="metrics" className="m-0 outline-none">
                  <MetricsCharts />
                </TabsContent>

                <TabsContent value="cost" className="m-0 outline-none">
                  <CostDashboard />
                </TabsContent>

                {/* Additional Enhanced Views */}
                <TabsContent value="performance" className="space-y-8 m-0 outline-none">
                  <PerformanceMetrics />
                </TabsContent>

                <TabsContent value="ai" className="space-y-8 m-0 outline-none">
                  <AIInsights />
                </TabsContent>

                <TabsContent value="network" className="space-y-8 m-0 outline-none">
                  <NetworkTraffic />
                </TabsContent>

                <TabsContent value="prediction" className="space-y-8 m-0 outline-none">
                  <CostPrediction />
                </TabsContent>

                <TabsContent value="heatmap" className="space-y-8 m-0 outline-none">
                  <ResourceHeatmap />
                </TabsContent>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <VoiceAssistant />
                
                {/* Quick Actions (Zendesk List Style) */}
                <motion.div variants={item} className="k8s-card space-y-4">
                  <h3 className="text-white text-sm font-bold">Recommended Actions</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-primary/50 transition-all cursor-pointer group">
                      <div className="mt-1 h-2 w-2 bg-primary rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">Optimize Node Scaling</p>
                        <p className="text-xs text-slate-500">Savings potential: $124/mo</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-primary/50 transition-all cursor-pointer group">
                      <div className="mt-1 h-2 w-2 bg-primary rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">Update Registry Credentials</p>
                        <p className="text-xs text-slate-500">Security requirement: High</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-primary/50 transition-all cursor-pointer group">
                      <div className="mt-1 h-2 w-2 bg-slate-600 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">Backup etcd snapshots</p>
                        <p className="text-xs text-slate-500">Scheduled: 2h from now</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </Tabs>

          {/* Full-Width Enhanced Sections Below Tabs */}
          <div className="space-y-8 pt-8 border-t border-slate-800">
            <PerformanceMetrics />
            <AIInsights />
            <NetworkTraffic />
            <CostPrediction />
            <ResourceHeatmap />
            <SecurityDashboard />
          </div>
        </motion.div>
      </main>
    </div>
  )
}
