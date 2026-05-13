'use client'

import { Activity, Server, Database, DollarSign, Shield, TrendingUp, AlertTriangle, CheckCircle, Brain } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ClusterOverview } from '@/components/dashboard/cluster-overview'
import { PodsTable } from '@/components/dashboard/pods-table'
import { NodesTable } from '@/components/dashboard/nodes-table'
import { CostDashboard } from '@/components/dashboard/cost-dashboard'
import { SecurityDashboard } from '@/components/dashboard/security-dashboard'
import { MetricsCharts } from '@/components/dashboard/metrics-charts'
import { VoiceAssistant } from '@/components/dashboard/voice-assistant'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">
                Kubernetes Command Center
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-background/50 border border-border">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-sm text-foreground font-medium">Cluster Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card className="border-border bg-card/50 hover:border-primary/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Pods</CardTitle>
                  <Server className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">1,247</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-emerald-400">+12%</span> from last week
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 hover:border-secondary/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Nodes</CardTitle>
                  <Database className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">24</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    All nodes healthy
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 hover:border-primary/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Cost</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">$56,445</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-emerald-400">-5%</span> vs last month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 hover:border-secondary/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Security Alerts</CardTitle>
                  <Shield className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">3</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-red-400">2 critical</span> require action
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="bg-card/50 border border-border">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="pods">Pods</TabsTrigger>
                <TabsTrigger value="nodes">Nodes</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <ClusterOverview />
              </TabsContent>

              <TabsContent value="pods" className="space-y-4">
                <PodsTable />
              </TabsContent>

              <TabsContent value="nodes" className="space-y-4">
                <NodesTable />
              </TabsContent>

              <TabsContent value="metrics" className="space-y-4">
                <MetricsCharts />
              </TabsContent>

              <TabsContent value="cost" className="space-y-4">
                <CostDashboard />
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <SecurityDashboard />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <VoiceAssistant />
          </div>
        </div>
      </div>
    </div>
  )
}
