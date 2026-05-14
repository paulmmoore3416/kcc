'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
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
  TrendingUp,
  Settings,
  User,
  Shield,
  Database,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionCard, type SectionStatus } from '@/components/dashboard/section-card'
import { SectionHeader } from '@/components/dashboard/section-header'
import { MetricCard, type MetricSeverity } from '@/components/dashboard/metric-card'

// Performance Enhancement 1: Lazy Loading heavy components
const ClusterOverview = dynamic(() => import('@/components/dashboard/cluster-overview').then(mod => mod.ClusterOverview), { ssr: false, loading: () => <SkeletonCard /> })
const PodsTable = dynamic(() => import('@/components/dashboard/pods-table').then(mod => mod.PodsTable), { ssr: false, loading: () => <SkeletonCard /> })
const NodesTable = dynamic(() => import('@/components/dashboard/nodes-table').then(mod => mod.NodesTable), { ssr: false, loading: () => <SkeletonCard /> })
const CostDashboard = dynamic(() => import('@/components/dashboard/cost-dashboard').then(mod => mod.CostDashboard), { ssr: false, loading: () => <SkeletonCard /> })
const SecurityDashboard = dynamic(() => import('@/components/dashboard/security-dashboard').then(mod => mod.SecurityDashboard), { ssr: false, loading: () => <SkeletonCard /> })
const MetricsCharts = dynamic(() => import('@/components/dashboard/metrics-charts').then(mod => mod.MetricsCharts), { ssr: false, loading: () => <SkeletonCard /> })
const PerformanceMetrics = dynamic(() => import('@/components/dashboard/performance-metrics').then(mod => mod.PerformanceMetrics), { ssr: false, loading: () => <SkeletonCard /> })
const AIInsights = dynamic(() => import('@/components/dashboard/ai-insights').then(mod => mod.AIInsights), { ssr: false, loading: () => <SkeletonCard /> })
const ResourceHeatmap = dynamic(() => import('@/components/dashboard/resource-heatmap').then(mod => mod.ResourceHeatmap), { ssr: false, loading: () => <SkeletonCard /> })
const NetworkTraffic = dynamic(() => import('@/components/dashboard/network-traffic').then(mod => mod.NetworkTraffic), { ssr: false, loading: () => <SkeletonCard /> })
const CostPrediction = dynamic(() => import('@/components/dashboard/cost-prediction').then(mod => mod.CostPrediction), { ssr: false, loading: () => <SkeletonCard /> })

const VoiceAssistant = dynamic(() => import('@/components/dashboard/voice-assistant').then(mod => mod.VoiceAssistant), { ssr: false })
const Sidebar = dynamic(() => import('@/components/dashboard/sidebar').then(mod => mod.Sidebar), { ssr: false })

// UI/UX Enhancement: Skeleton Loader
const SkeletonCard = () => (
  <div className="w-full h-64 rounded-2xl bg-muted/20 animate-pulse flex items-center justify-center">
    <div className="flex flex-col items-center gap-2">
      <Activity className="h-8 w-8 text-muted-foreground/20" />
      <span className="text-xs text-muted-foreground/40 font-medium">Synchronizing data...</span>
    </div>
  </div>
)

const FeatureSection = ({ children, title, icon: Icon, actions, status = 'neutral' as SectionStatus, subtitle, collapsible = false }: { children: React.ReactNode, title: string, icon: any, actions?: React.ReactNode, status?: SectionStatus, subtitle?: string, collapsible?: boolean }) => {
  return (
    <SectionCard
      title={title}
      icon={Icon ? <Icon className="h-5 w-5" /> : undefined}
      status={status}
      subtitle={subtitle}
      actions={actions}
      collapsible={collapsible}
      borderGradient={true}
    >
      {children}
    </SectionCard>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardPage() {
  const { toast } = useToast()
  const [time, setTime] = useState<string>('')
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedCluster, setSelectedCluster] = useState('prod-us-east-1')
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Power User Enhancement 2: Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toast({ title: "Command Palette", description: "Search feature coming soon in v2.5.0" })
      }
      if (e.altKey && e.key >= '1' && e.key <= '9') {
        const tabs = ['overview', 'pods', 'nodes', 'metrics', 'performance', 'network', 'prediction', 'ai', 'cost']
        const index = parseInt(e.key) - 1
        if (tabs[index]) setActiveTab(tabs[index])
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toast])

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString())
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Performance Enhancement 2: Debounced Search (Logic only for now)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    // Debounce logic would go here
  }

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    toast({
      title: "Refreshing Data",
      description: "Fetching latest cluster state from gRPC stream...",
    })
    setTimeout(() => setIsRefreshing(false), 1500)
  }, [toast])

  const handleDownload = useCallback(() => {
    toast({
      title: "Report Generated",
      description: "Cluster health report downloaded successfully.",
      variant: "success",
    })
  }, [toast])

  const handleAIAction = useCallback((id: string, type: string) => {
    if (id === 'opt-1') setActiveTab('pods')
    if (id === 'ano-1') setActiveTab('network')
    if (id === 'rec-1') setActiveTab('metrics')
    if (id === 'suc-1') setActiveTab('prediction')
  }, [])

  const sectionActions = (
    <div className="flex items-center gap-1">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleRefresh}
        className={cn("h-7 w-7 text-muted-foreground hover:text-foreground", isRefreshing && "animate-spin text-primary")}
      >
        <RefreshCcw className="h-3.5 w-3.5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleDownload}
        className="h-7 w-7 text-muted-foreground hover:text-foreground"
      >
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
              <div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-all cursor-pointer group"
                onClick={() => toast({ title: "Cluster Switcher", description: "You are currently on the primary production cluster." })}
              >
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
                  value={searchQuery}
                  onChange={handleSearch}
                  className="h-10 w-80 rounded-xl border border-input bg-background/50 px-4 py-2 text-sm shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none pl-10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-mono text-muted-foreground">
                  <Terminal className="h-3 w-3" />
                  <span>K</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => toast({ title: "Notifications", description: "You have 3 new critical security alerts." })}
                  className="relative h-10 w-10 rounded-xl hover:bg-muted transition-colors"
                >
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-primary rounded-full ring-2 ring-background" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toast({ title: "Settings", description: "Platform configuration is locked for your role." })}
                  className="h-10 w-10 rounded-xl hover:bg-muted transition-colors"
                >
                  <Settings className="h-5 w-5 text-muted-foreground" />
                </Button>
                <div 
                  className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-primary/20 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toast({ title: "User Profile", description: "Logged in as Administrator" })}
                >
                  <div className="h-full w-full rounded-xl bg-background flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          <div className="w-full space-y-8">
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

              {/* Quick Metrics - Top of Page */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <MetricCard
                  label="Cluster Health"
                  value="98.5"
                  unit="%"
                  severity="healthy"
                  icon="✅"
                  trend="stable"
                  trendValue="0%"
                  description="All systems operational"
                />
                <MetricCard
                  label="Active Pods"
                  value="247"
                  unit="running"
                  severity="healthy"
                  icon="🐳"
                  trend="up"
                  trendValue="+12 today"
                  description="Optimized scaling"
                />
                <MetricCard
                  label="Resource Usage"
                  value="62"
                  unit="%"
                  severity="warning"
                  icon="⚡"
                  trend="up"
                  trendValue="+8% vs 24h"
                  description="Monitor closely"
                />
                <MetricCard
                  label="Cost (24h)"
                  value="$847"
                  unit="projected"
                  severity="healthy"
                  icon="💰"
                  trend="down"
                  trendValue="-5% savings"
                  description="Via auto-scaling"
                />
              </motion.div>

              {/* Enhancement 3: Multi-column dynamic layout */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {activeTab === 'overview' && (
                        <FeatureSection 
                          title="Cluster Overview" 
                          icon={Activity} 
                          actions={sectionActions}
                          status="healthy"
                          subtitle="Real-time cluster state and health metrics"
                        >
                          <ClusterOverview />
                        </FeatureSection>
                      )}

                      {activeTab === 'pods' && (
                        <FeatureSection 
                          title="Pod Explorer" 
                          icon={Layout} 
                          actions={sectionActions}
                          status="healthy"
                          subtitle="Manage and monitor all running containers"
                        >
                          <PodsTable />
                        </FeatureSection>
                      )}

                      {activeTab === 'nodes' && (
                        <FeatureSection 
                          title="Node Inventory" 
                          icon={Globe} 
                          actions={sectionActions}
                          status="healthy"
                          subtitle="Physical and virtual node management"
                        >
                          <NodesTable />
                        </FeatureSection>
                      )}

                      {activeTab === 'metrics' && (
                        <FeatureSection 
                          title="Resource Metrics" 
                          icon={Activity} 
                          actions={sectionActions}
                          status="healthy"
                          subtitle="CPU, memory, and disk utilization trends"
                        >
                          <MetricsCharts />
                        </FeatureSection>
                      )}

                      {activeTab === 'performance' && (
                        <FeatureSection 
                          title="Performance Analytics" 
                          icon={Zap} 
                          actions={sectionActions}
                          status="healthy"
                          subtitle="Real-time performance gauges and metrics"
                        >
                          <PerformanceMetrics />
                        </FeatureSection>
                      )}

                      {activeTab === 'network' && (
                        <FeatureSection 
                          title="Network Traffic" 
                          icon={Globe} 
                          actions={sectionActions}
                          status="warning"
                          subtitle="Inbound/outbound bandwidth analysis"
                        >
                          <NetworkTraffic />
                        </FeatureSection>
                      )}

                      {activeTab === 'prediction' && (
                        <FeatureSection 
                          title="Cost Prediction" 
                          icon={TrendingUp} 
                          actions={sectionActions}
                          status="healthy"
                          subtitle="8-week forecast with optimization paths"
                        >
                          <CostPrediction />
                        </FeatureSection>
                      )}

                      {activeTab === 'ai' && (
                        <FeatureSection 
                          title="AI Fleet Insights" 
                          icon={Brain} 
                          actions={sectionActions}
                          status="healthy"
                          subtitle="ML-powered recommendations and anomalies"
                        >
                          <AIInsights onAction={handleAIAction} />
                        </FeatureSection>
                      )}

                      {activeTab === 'cost' && (
                        <FeatureSection 
                          title="FinOps Dashboard" 
                          icon={DollarSign} 
                          actions={sectionActions}
                          status="healthy"
                          subtitle="Cost tracking and budget management"
                        >
                          <CostDashboard />
                        </FeatureSection>
                      )}

                      {activeTab === 'security' && (
                        <FeatureSection 
                          title="Security Posture" 
                          icon={Shield} 
                          actions={sectionActions}
                          status="healthy"
                          subtitle="Compliance and threat detection"
                        >
                          <SecurityDashboard />
                        </FeatureSection>
                      )}

                      {activeTab === 'utilization' && (
                        <FeatureSection 
                          title="Utilization Heatmap" 
                          icon={Database} 
                          actions={sectionActions}
                          status="healthy"
                          subtitle="Resource distribution across time and nodes"
                        >
                          <ResourceHeatmap />
                        </FeatureSection>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Enhancement 4: Right Utility Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* AI Assistant Section */}
                  <FeatureSection 
                    title="AI Assistant" 
                    icon={Brain}
                    status="healthy"
                    subtitle="Voice-powered commands"
                  >
                    <VoiceAssistant />
                  </FeatureSection>
                  
                  {/* Critical Alerts Section */}
                  <SectionCard
                    title="Critical Alerts"
                    icon={<Bell className="h-5 w-5" />}
                    status="warning"
                    subtitle="3 actions required"
                  >
                    <div className="space-y-3">
                      {[
                        { title: 'Optimize Node Scaling', desc: 'Savings: $124/mo', status: 'info' as SectionStatus },
                        { title: 'Security Patch Needed', desc: 'Priority: Critical', status: 'critical' as SectionStatus },
                        { title: 'etcd Backup due', desc: 'Schedule: 2h left', status: 'warning' as SectionStatus }
                      ].map((alert, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg border border-slate-700/50 bg-slate-900/30 hover:border-primary/50 hover:bg-slate-900/50 transition-all cursor-pointer group"
                          onClick={() => toast({ title: alert.title, description: alert.desc })}
                        >
                          <div className="mt-1">
                            {alert.status === 'critical' && <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
                            {alert.status === 'warning' && <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />}
                            {alert.status === 'info' && <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors truncate">{alert.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5 truncate">{alert.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </SectionCard>

                  {/* Quick Stats Widget */}
                  <SectionCard
                    title="Quick Stats"
                    icon={<Activity className="h-5 w-5" />}
                    status="healthy"
                    subtitle="Current utilization"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="p-4 rounded-lg border border-slate-700/50 bg-slate-900/30 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group"
                      >
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 group-hover:text-primary">CPU Load</p>
                        <p className="text-2xl font-black text-white">42%</p>
                        <p className="text-[10px] text-slate-500 mt-1">↑ 8% vs avg</p>
                      </motion.div>
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="p-4 rounded-lg border border-slate-700/50 bg-slate-900/30 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group"
                      >
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 group-hover:text-primary">Memory</p>
                        <p className="text-2xl font-black text-white">68%</p>
                        <p className="text-[10px] text-slate-500 mt-1">↓ 5% vs peak</p>
                      </motion.div>
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="p-4 rounded-lg border border-slate-700/50 bg-slate-900/30 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group"
                      >
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 group-hover:text-primary">Network</p>
                        <p className="text-2xl font-black text-white">156M</p>
                        <p className="text-[10px] text-slate-500 mt-1">↑ 12% vs avg</p>
                      </motion.div>
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="p-4 rounded-lg border border-slate-700/50 bg-slate-900/30 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group"
                      >
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 group-hover:text-primary">Storage</p>
                        <p className="text-2xl font-black text-white">82%</p>
                        <p className="text-[10px] text-slate-500 mt-1">⚠ High usage</p>
                      </motion.div>
                    </div>
                  </SectionCard>

                  {/* System Status Widget */}
                  <SectionCard
                    title="System Status"
                    icon={<Zap className="h-5 w-5" />}
                    status="healthy"
                    subtitle="Overall platform health"
                  >
                    <div className="space-y-4">
                      {[
                        { name: 'API Servers', status: 'healthy', value: '3/3' },
                        { name: 'etcd Cluster', status: 'healthy', value: '3/3' },
                        { name: 'Controllers', status: 'healthy', value: '2/2' },
                        { name: 'Nodes', status: 'warning', value: '11/12' },
                      ].map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">{item.name}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold ${item.status === 'healthy' ? 'text-emerald-400' : 'text-amber-400'}`}>
                              {item.value}
                            </span>
                            <div className={`h-2 w-2 rounded-full ${item.status === 'healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Enhanced Status Footer */}
        <footer className="h-14 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-8"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-emerald-500"
              />
              <span>API Server Connected</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Activity className="h-3 w-3" />
              <span>Latency: 24ms</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Database className="h-3 w-3" />
              <span>Events: 1.2M/s</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-6"
          >
            <button className="text-xs font-semibold text-slate-400 hover:text-primary transition-colors cursor-pointer" onClick={() => toast({ title: "Help", description: "Documentation is being loaded..." })}>
              Documentation
            </button>
            <button className="text-xs font-semibold text-slate-400 hover:text-primary transition-colors cursor-pointer" onClick={() => toast({ title: "Support", description: "Contacting technical support team..." })}>
              Support
            </button>
            <div className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-[10px] font-bold text-primary">
              PREMIUM PLAN
            </div>
          </motion.div>
        </footer>
      </div>
    </div>
  )
}
