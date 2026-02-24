'use client'

import { Activity, Server, Database, DollarSign, Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClusterOverview } from '@/components/dashboard/cluster-overview'
import { PodsTable } from '@/components/dashboard/pods-table'
import { NodesTable } from '@/components/dashboard/nodes-table'
import { CostDashboard } from '@/components/dashboard/cost-dashboard'
import { SecurityDashboard } from '@/components/dashboard/security-dashboard'
import { MetricsCharts } from '@/components/dashboard/metrics-charts'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-white to-warm-100">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Kubernetes Command Center
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Cluster Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-warm-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pods</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-warm-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Nodes</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                All nodes healthy
              </p>
            </CardContent>
          </Card>

          <Card className="border-warm-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$56,445</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-5%</span> vs last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-warm-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">2 critical</span> require action
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-white/80 backdrop-blur-md">
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
    </div>
  )
}
