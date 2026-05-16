'use client'

import { motion } from 'framer-motion'
import { Cpu, MemoryStick, HardDrive, TrendingDown, CheckCircle, AlertCircle, Zap, Target, Activity } from 'lucide-react'
import { Card as TremorCard, Title, Text, BarChart, Badge, Flex, ProgressBar } from '@tremor/react'

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

export function RightsizingRecommendations() {
  // Resource utilization data
  const utilizationData = [
    { resource: 'CPU', requested: 100, actual: 35, optimal: 45 },
    { resource: 'Memory', requested: 100, actual: 52, optimal: 65 },
    { resource: 'Storage', requested: 100, actual: 68, optimal: 80 },
  ]

  // Detailed rightsizing recommendations
  const recommendations = [
    {
      id: 'rs-1',
      workload: 'nginx-deployment',
      namespace: 'production',
      type: 'Deployment',
      replicas: 5,
      priority: 'critical',
      currentResources: {
        cpu: '2000m',
        memory: '4Gi',
        storage: '20Gi'
      },
      actualUsage: {
        cpu: '450m',
        memory: '1.8Gi',
        storage: '12Gi'
      },
      recommendedResources: {
        cpu: '600m',
        memory: '2.5Gi',
        storage: '15Gi'
      },
      utilizationScore: 28,
      monthlySavings: 1850,
      confidence: 96,
      analysis: {
        cpu: 'Over-provisioned by 70%. Peak usage never exceeds 600m.',
        memory: 'Over-provisioned by 55%. Average usage stable at 1.8Gi.',
        storage: 'Over-provisioned by 40%. Growth rate minimal.'
      },
      impact: 'Low risk - workload has consistent patterns',
      autoApply: true
    },
    {
      id: 'rs-2',
      workload: 'api-gateway',
      namespace: 'production',
      type: 'StatefulSet',
      replicas: 3,
      priority: 'high',
      currentResources: {
        cpu: '1500m',
        memory: '3Gi',
        storage: '50Gi'
      },
      actualUsage: {
        cpu: '1200m',
        memory: '2.4Gi',
        storage: '38Gi'
      },
      recommendedResources: {
        cpu: '1500m',
        memory: '3Gi',
        storage: '45Gi'
      },
      utilizationScore: 78,
      monthlySavings: 280,
      confidence: 89,
      analysis: {
        cpu: 'Well-sized. Usage at 80% during peak hours.',
        memory: 'Well-sized. Consistent usage pattern.',
        storage: 'Slight over-provisioning. Can reduce by 10%.'
      },
      impact: 'Minimal - only storage adjustment needed',
      autoApply: false
    },
    {
      id: 'rs-3',
      workload: 'data-processor',
      namespace: 'analytics',
      type: 'CronJob',
      replicas: 1,
      priority: 'medium',
      currentResources: {
        cpu: '4000m',
        memory: '8Gi',
        storage: '100Gi'
      },
      actualUsage: {
        cpu: '800m',
        memory: '3.2Gi',
        storage: '45Gi'
      },
      recommendedResources: {
        cpu: '1200m',
        memory: '4Gi',
        storage: '60Gi'
      },
      utilizationScore: 32,
      monthlySavings: 2450,
      confidence: 94,
      analysis: {
        cpu: 'Severely over-provisioned. Batch job uses 20% of allocation.',
        memory: 'Over-provisioned by 60%. Peak usage at 3.5Gi.',
        storage: 'Over-provisioned by 55%. Data retention can be optimized.'
      },
      impact: 'Low risk - batch workload with predictable patterns',
      autoApply: true
    },
    {
      id: 'rs-4',
      workload: 'redis-cache',
      namespace: 'production',
      type: 'StatefulSet',
      replicas: 3,
      priority: 'critical',
      currentResources: {
        cpu: '1000m',
        memory: '6Gi',
        storage: '30Gi'
      },
      actualUsage: {
        cpu: '350m',
        memory: '5.2Gi',
        storage: '22Gi'
      },
      recommendedResources: {
        cpu: '500m',
        memory: '6Gi',
        storage: '25Gi'
      },
      utilizationScore: 72,
      monthlySavings: 680,
      confidence: 91,
      analysis: {
        cpu: 'Over-provisioned. Cache operations are memory-intensive, not CPU.',
        memory: 'Appropriately sized. 87% utilization is healthy for cache.',
        storage: 'Slight over-provisioning. Can reduce by 17%.'
      },
      impact: 'Low risk - memory remains unchanged',
      autoApply: false
    }
  ]

  const totalSavings = recommendations.reduce((sum, rec) => sum + rec.monthlySavings, 0)
  const avgUtilization = Math.round(recommendations.reduce((sum, rec) => sum + rec.utilizationScore, 0) / recommendations.length)
  const autoApplyCount = recommendations.filter(rec => rec.autoApply).length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'red'
      case 'high': return 'orange'
      case 'medium': return 'yellow'
      default: return 'gray'
    }
  }

  const getUtilizationColor = (score: number) => {
    if (score >= 70) return 'emerald'
    if (score >= 50) return 'yellow'
    return 'red'
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Intelligent Right-Sizing Engine</h2>
            <p className="text-sm text-muted-foreground">AI-powered resource optimization with 30-day analysis</p>
          </div>
        </div>
        <Badge color="emerald" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
          CONTINUOUS LEARNING
        </Badge>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-4 w-4 text-emerald-500" />
            <Text className="text-muted-foreground font-medium text-xs">Potential Savings</Text>
          </div>
          <div className="text-3xl font-bold text-emerald-500">${(totalSavings / 1000).toFixed(1)}K</div>
          <div className="text-xs text-muted-foreground mt-1">Per month</div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-orange-500" />
            <Text className="text-muted-foreground font-medium text-xs">Avg Utilization</Text>
          </div>
          <div className="text-3xl font-bold">{avgUtilization}%</div>
          <div className="text-xs text-muted-foreground mt-1">Cluster-wide</div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-blue-500" />
            <Text className="text-muted-foreground font-medium text-xs">Recommendations</Text>
          </div>
          <div className="text-3xl font-bold">{recommendations.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Active workloads</div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-purple-500" />
            <Text className="text-muted-foreground font-medium text-xs">Auto-Apply Ready</Text>
          </div>
          <div className="text-3xl font-bold">{autoApplyCount}</div>
          <div className="text-xs text-muted-foreground mt-1">High confidence</div>
        </motion.div>
      </div>

      {/* Resource Utilization Overview */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
        <Flex justifyContent="between" alignItems="center" className="mb-6">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <Title className="text-foreground">Resource Utilization Analysis</Title>
          </div>
        </Flex>
        <BarChart
          className="h-64 mt-4"
          data={utilizationData}
          index="resource"
          categories={["requested", "actual", "optimal"]}
          colors={["gray", "orange", "emerald"]}
          valueFormatter={(number) => `${number}%`}
          showLegend={true}
          showGridLines={true}
        />
      </motion.div>

      {/* Detailed Recommendations */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            <Title className="text-foreground">Workload Recommendations</Title>
          </div>
          <div className="flex items-center gap-2">
            <Badge color="emerald" size="xs">
              {autoApplyCount} AUTO-APPLY
            </Badge>
            <Badge color="blue" size="xs">
              {recommendations.length - autoApplyCount} MANUAL REVIEW
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          {recommendations.map((rec) => (
            <div 
              key={rec.id}
              className="p-6 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-xl">{rec.workload}</h4>
                    <Badge color={getPriorityColor(rec.priority)} size="xs">
                      {rec.priority.toUpperCase()}
                    </Badge>
                    {rec.autoApply && (
                      <Badge color="emerald" size="xs">
                        AUTO-APPLY
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Namespace: <span className="font-semibold text-foreground">{rec.namespace}</span></span>
                    <span>Type: <span className="font-semibold text-foreground">{rec.type}</span></span>
                    <span>Replicas: <span className="font-semibold text-foreground">{rec.replicas}</span></span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-500">${(rec.monthlySavings / 1000).toFixed(1)}K</div>
                  <div className="text-xs text-muted-foreground">Monthly savings</div>
                </div>
              </div>

              {/* Utilization Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Text className="text-xs text-muted-foreground">Overall Utilization Score</Text>
                  <div className="flex items-center gap-2">
                    <Text className="text-xs font-bold">{rec.utilizationScore}%</Text>
                    <Badge color={getUtilizationColor(rec.utilizationScore)} size="xs">
                      {rec.utilizationScore >= 70 ? 'OPTIMAL' : rec.utilizationScore >= 50 ? 'FAIR' : 'POOR'}
                    </Badge>
                  </div>
                </div>
                <ProgressBar value={rec.utilizationScore} color={getUtilizationColor(rec.utilizationScore)} className="h-2" />
              </div>

              {/* Resource Comparison */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-card/50 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu className="h-4 w-4 text-blue-500" />
                    <Text className="text-xs font-medium text-muted-foreground">CPU</Text>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current:</span>
                      <span className="font-semibold">{rec.currentResources.cpu}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Actual:</span>
                      <span className="font-semibold text-orange-500">{rec.actualUsage.cpu}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Optimal:</span>
                      <span className="font-semibold text-emerald-500">{rec.recommendedResources.cpu}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card/50 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <MemoryStick className="h-4 w-4 text-purple-500" />
                    <Text className="text-xs font-medium text-muted-foreground">Memory</Text>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current:</span>
                      <span className="font-semibold">{rec.currentResources.memory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Actual:</span>
                      <span className="font-semibold text-orange-500">{rec.actualUsage.memory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Optimal:</span>
                      <span className="font-semibold text-emerald-500">{rec.recommendedResources.memory}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card/50 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <HardDrive className="h-4 w-4 text-cyan-500" />
                    <Text className="text-xs font-medium text-muted-foreground">Storage</Text>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current:</span>
                      <span className="font-semibold">{rec.currentResources.storage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Actual:</span>
                      <span className="font-semibold text-orange-500">{rec.actualUsage.storage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Optimal:</span>
                      <span className="font-semibold text-emerald-500">{rec.recommendedResources.storage}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <Text className="text-xs font-bold text-blue-500">AI ANALYSIS</Text>
                  <Badge color="blue" size="xs">{rec.confidence}% CONFIDENCE</Badge>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground font-medium">CPU: </span>
                    <span>{rec.analysis.cpu}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-medium">Memory: </span>
                    <span>{rec.analysis.memory}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-medium">Storage: </span>
                    <span>{rec.analysis.storage}</span>
                  </div>
                </div>
              </div>

              {/* Impact Assessment */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <Text className="text-xs font-medium">Impact Assessment:</Text>
                  <span className="text-xs">{rec.impact}</span>
                </div>
                {rec.autoApply && (
                  <Badge color="emerald" size="xs">
                    SAFE TO AUTO-APPLY
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Made with Bob
