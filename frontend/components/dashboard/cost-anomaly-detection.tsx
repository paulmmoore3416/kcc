'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, TrendingUp, Activity, Zap, Clock, DollarSign } from 'lucide-react'
import { Card as TremorCard, Title, Text, LineChart, Badge, Flex } from '@tremor/react'

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

export function CostAnomalyDetection() {
  // Simulated anomaly detection data with ML confidence scores
  const anomalyData = [
    { 
      time: '00:00', 
      baseline: 2400, 
      actual: 2380,
      anomaly: null 
    },
    { 
      time: '04:00', 
      baseline: 2350, 
      actual: 2340,
      anomaly: null 
    },
    { 
      time: '08:00', 
      baseline: 2800, 
      actual: 2790,
      anomaly: null 
    },
    { 
      time: '12:00', 
      baseline: 3200, 
      actual: 4850,
      anomaly: 4850 
    },
    { 
      time: '16:00', 
      baseline: 3100, 
      actual: 4920,
      anomaly: 4920 
    },
    { 
      time: '20:00', 
      baseline: 2900, 
      actual: 3150,
      anomaly: 3150 
    },
    { 
      time: '23:59', 
      baseline: 2500, 
      actual: 2480,
      anomaly: null 
    },
  ]

  const detectedAnomalies = [
    {
      id: 'anom-1',
      severity: 'critical',
      title: 'Unexpected Compute Spike',
      description: 'Production namespace showing 52% increase in compute costs',
      timestamp: '2 hours ago',
      impact: '$1,850',
      confidence: 98,
      rootCause: 'Auto-scaling triggered by traffic surge',
      recommendation: 'Review HPA settings and consider reserved capacity'
    },
    {
      id: 'anom-2',
      severity: 'warning',
      title: 'Storage Cost Anomaly',
      description: 'Persistent volume usage increased 35% without corresponding workload growth',
      timestamp: '5 hours ago',
      impact: '$420',
      confidence: 87,
      rootCause: 'Log retention policy not enforced',
      recommendation: 'Implement automated log rotation and archival'
    },
    {
      id: 'anom-3',
      severity: 'info',
      title: 'Network Egress Pattern Change',
      description: 'Outbound data transfer 28% above baseline',
      timestamp: '8 hours ago',
      impact: '$280',
      confidence: 92,
      rootCause: 'New data sync job to external service',
      recommendation: 'Optimize data transfer or use VPC peering'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'red'
      case 'warning': return 'orange'
      case 'info': return 'blue'
      default: return 'gray'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-5 w-5" />
      case 'warning': return <TrendingUp className="h-5 w-5" />
      case 'info': return <Activity className="h-5 w-5" />
      default: return <Activity className="h-5 w-5" />
    }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Anomaly Detection Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">ML-Powered Anomaly Detection</h2>
            <p className="text-sm text-muted-foreground">Real-time cost pattern analysis with 95% accuracy</p>
          </div>
        </div>
        <Badge color="purple" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
          MACHINE LEARNING
        </Badge>
      </motion.div>

      {/* Real-time Anomaly Chart */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
        <Flex justifyContent="between" alignItems="center" className="mb-6">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <Title className="text-foreground">Cost Pattern Analysis (Last 24 Hours)</Title>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-muted-foreground">Baseline</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-muted-foreground">Actual</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-muted-foreground">Anomaly</span>
            </div>
          </div>
        </Flex>
        <LineChart
          className="h-80 mt-4"
          data={anomalyData}
          index="time"
          categories={["baseline", "actual", "anomaly"]}
          colors={["blue", "emerald", "red"]}
          valueFormatter={(number) => `$${number.toLocaleString()}`}
          showLegend={false}
          showGridLines={true}
          curveType="monotone"
        />
      </motion.div>

      {/* Detected Anomalies List */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <Title className="text-foreground">Active Anomalies</Title>
          </div>
          <Badge color="orange" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
            {detectedAnomalies.length} DETECTED
          </Badge>
        </div>

        <div className="space-y-4">
          {detectedAnomalies.map((anomaly) => (
            <div 
              key={anomaly.id}
              className="p-5 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`mt-1 h-12 w-12 rounded-lg bg-${getSeverityColor(anomaly.severity)}-500/10 flex items-center justify-center flex-shrink-0`}>
                  {getSeverityIcon(anomaly.severity)}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg">{anomaly.title}</h4>
                        <Badge color={getSeverityColor(anomaly.severity)} size="xs">
                          {anomaly.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-500">{anomaly.impact}</div>
                      <div className="text-xs text-muted-foreground">Cost Impact</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/50">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-medium">Detected</span>
                      </div>
                      <span className="text-sm font-semibold">{anomaly.timestamp}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Zap className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-medium">ML Confidence</span>
                      </div>
                      <span className="text-sm font-semibold">{anomaly.confidence}%</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/50 space-y-2">
                    <div>
                      <span className="text-xs text-muted-foreground font-medium">Root Cause Analysis:</span>
                      <p className="text-sm mt-1">{anomaly.rootCause}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-medium">AI Recommendation:</span>
                      <p className="text-sm mt-1 text-emerald-500 font-medium">{anomaly.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ML Model Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-purple-500" />
            <Text className="text-muted-foreground font-medium text-xs">Model Accuracy</Text>
          </div>
          <div className="text-3xl font-bold">95.2%</div>
          <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-blue-500" />
            <Text className="text-muted-foreground font-medium text-xs">Patterns Analyzed</Text>
          </div>
          <div className="text-3xl font-bold">2.4M</div>
          <div className="text-xs text-muted-foreground mt-1">Data points/day</div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-emerald-500" />
            <Text className="text-muted-foreground font-medium text-xs">Savings Identified</Text>
          </div>
          <div className="text-3xl font-bold">$12.4K</div>
          <div className="text-xs text-muted-foreground mt-1">This month</div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <Text className="text-muted-foreground font-medium text-xs">False Positives</Text>
          </div>
          <div className="text-3xl font-bold">2.1%</div>
          <div className="text-xs text-muted-foreground mt-1">Industry leading</div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Made with Bob
