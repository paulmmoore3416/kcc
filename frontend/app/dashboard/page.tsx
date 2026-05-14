'use client'

import React, { useState, useEffect } from 'react'
import { 
  Activity, 
  Search, 
  Bell, 
  Clock, 
  Brain, 
  ChevronDown, 
  Globe, 
  Zap, 
  Terminal,
  Download,
  Maximize2,
  RefreshCcw,
  Layout,
  TrendingUp
} from 'lucide-react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
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
import { Sidebar } from '@/components/dashboard/sidebar'

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

// Enhancement: Feature Section Wrapper for consistent borders and padding
const FeatureSection = ({ children, title, icon: Icon, actions }: { children: React.ReactNode, title: string, icon: any, actions?: React.ReactNode }) => (
  <div 
    className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl text-card-foreground shadow-sm overflow-hidden flex flex-col h-full"
  >
    <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-muted/30">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="font-semibold text-sm tracking-tight">{title}</h3>
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
          <Maximize2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
    <div className="p-6 flex-1 overflow-auto">
      {children}
    </div>
  </div>
)

export default function DashboardPage() {
  const [time, setTime] = useState<string>('')
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedCluster, setSelectedCluster] = useState('prod-us-east-1')

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString())
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const sectionActions = (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
        <RefreshCcw className="h-3.5 w-3.5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
        <Download className="h-3.5 w-3.5" />
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
      />

      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-8 max-w-full">
            <div className="flex items-center gap-4">
              {/* Enhancement 1: Multi-Cluster Selector */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-all cursor-pointer group">
                <Globe className="h-4 w-4 text-primary group-hover:animate-pulse" />
                <span className="text-sm font-medium">{selectedCluster}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="h-4 w-px bg-border" />

              {/* Enhancement 2: Detailed Health Status */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                  <Zap className="h-3 w-3 fill-current" />
                  <span>Control Plane OK</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
                  <Activity className="h-3 w-3" />
                  <span>Nodes: 12 Active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden xl:block group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  className="h-10 w-80 rounded-xl border border-input bg-background/50 px-4 py-2 text-sm shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none pl-10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-mono text-muted-foreground">
                  <Terminal className="h-3 w-3" />
                  <span>K</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-muted transition-colors">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-primary rounded-full ring-2 ring-background" />
                </Button>
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-primary/20 cursor-pointer hover:scale-105 transition-transform">
                  <div className="h-full w-full rounded-xl bg-background flex items-center justify-center">
                    <Layout className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <Tabs value={activeTab} className="w-full space-y-8">
            <div className="flex flex-col gap-8">
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-1">
                    <Layout className="h-3 w-3" />
                    <span>Real-time Observability</span>
                  </div>
                  <h1 className="text-4xl font-black tracking-tight flex items-baseline gap-2">
                    Dashboard 
                    <span className="text-sm font-normal text-muted-foreground tracking-normal lowercase">v2.4.0-stable</span>
                  </h1>
                </div>
                
                {time && (
                  <div className="flex items-center gap-3 px-4 py-2 bg-card border border-border rounded-2xl shadow-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold font-mono tracking-tighter">{time}</span>
                  </div>
                )}
              </div>

              {/* Enhancement 3: Multi-column dynamic layout */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-8">
                  <TabsContent value="overview" className="m-0 border-none p-0 outline-none">
                    <FeatureSection title="Cluster Overview" icon={Activity} actions={sectionActions}>
                      <ClusterOverview />
                    </FeatureSection>
                  </TabsContent>

                  <TabsContent value="pods" className="m-0 border-none p-0 outline-none">
                    <FeatureSection title="Pod Explorer" icon={Layout} actions={sectionActions}>
                      <PodsTable />
                    </FeatureSection>
                  </TabsContent>

                  <TabsContent value="nodes" className="m-0 border-none p-0 outline-none">
                    <FeatureSection title="Node Inventory" icon={Globe} actions={sectionActions}>
                      <NodesTable />
                    </FeatureSection>
                  </TabsContent>

                  <TabsContent value="metrics" className="m-0 border-none p-0 outline-none">
                    <FeatureSection title="Resource Metrics" icon={Activity} actions={sectionActions}>
                      <MetricsCharts />
                    </FeatureSection>
                  </TabsContent>

                  <TabsContent value="performance" className="m-0 border-none p-0 outline-none">
                    <FeatureSection title="Performance Analytics" icon={Zap} actions={sectionActions}>
                      <PerformanceMetrics />
                    </FeatureSection>
                  </TabsContent>

                  <TabsContent value="network" className="m-0 border-none p-0 outline-none">
                    <FeatureSection title="Network Traffic" icon={Globe} actions={sectionActions}>
                      <NetworkTraffic />
                    </FeatureSection>
                  </TabsContent>

                  <TabsContent value="prediction" className="m-0 border-none p-0 outline-none">
                    <FeatureSection title="Cost Prediction" icon={TrendingUp} actions={sectionActions}>
                      <CostPrediction />
                    </FeatureSection>
                  </TabsContent>

                  <TabsContent value="ai" className="m-0 border-none p-0 outline-none">
                    <FeatureSection title="AI Fleet Insights" icon={Brain} actions={sectionActions}>
                      <AIInsights />
                    </FeatureSection>
                  </TabsContent>

                  <TabsContent value="cost" className="m-0 border-none p-0 outline-none">
                    <FeatureSection title="FinOps Dashboard" icon={Activity} actions={sectionActions}>
                      <CostDashboard />
                    </FeatureSection>
                  </TabsContent>

                  <TabsContent value="security" className="m-0 border-none p-0 outline-none">
                    <FeatureSection title="Security Posture" icon={Globe} actions={sectionActions}>
                      <SecurityDashboard />
                    </FeatureSection>
                  </TabsContent>

                  <TabsContent value="utilization" className="m-0 border-none p-0 outline-none">
                    <FeatureSection title="Utilization Heatmap" icon={Layout} actions={sectionActions}>
                      <ResourceHeatmap />
                    </FeatureSection>
                  </TabsContent>
                </div>

                {/* Enhancement 4: Right Utility Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                  <FeatureSection title="AI Assistant" icon={Brain}>
                    <VoiceAssistant />
                  </FeatureSection>
                  
                  <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-muted/50 p-6 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                      <Zap className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm mb-6 flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      Critical Alerts
                    </h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Optimize Node Scaling', desc: 'Savings: $124/mo', color: 'primary' },
                        { title: 'Security Patch Needed', desc: 'Priority: Critical', color: 'destructive' },
                        { title: 'etcd Backup due', desc: 'Schedule: 2h left', color: 'muted-foreground' }
                      ].map((alert, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-3 rounded-xl border border-border bg-background/50 hover:border-primary/50 transition-all cursor-pointer group/item">
                          <div className={`mt-1.5 h-2 w-2 bg-${alert.color} rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)] shadow-${alert.color}`} />
                          <div>
                            <p className="text-sm font-bold group-hover/item:text-primary transition-colors">{alert.title}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{alert.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhancement 5: Quick Stats Widget */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-border bg-card text-center">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">CPU Load</p>
                      <p className="text-xl font-black">42%</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-border bg-card text-center">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Memory</p>
                      <p className="text-xl font-black">68%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </main>

        {/* Enhancement 6: Command Bar / Status Footer */}
        <footer className="h-10 border-t border-border/50 bg-muted/30 backdrop-blur-sm flex items-center justify-between px-8 text-[10px] font-medium text-muted-foreground">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>API SERVER CONNECTED</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3" />
              <span>LATENCY: 24ms</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-primary cursor-pointer transition-colors">DOCUMENTATION</span>
            <span className="hover:text-primary cursor-pointer transition-colors">SUPPORT</span>
            <span className="text-primary/50 px-2 py-0.5 rounded border border-primary/20 bg-primary/5">PREMIUM PLAN</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
