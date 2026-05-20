'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Sparkles, Globe, Zap, TrendingUp, Shield, Target, Cpu, Database, Network, Clock, DollarSign, AlertCircle, CheckCircle, ArrowRight, BarChart3, PieChart, Activity, Leaf, Sun, CloudRain } from 'lucide-react'
import { Card as TremorCard, Title, Text, AreaChart, BarChart, DonutChart, LineChart, Badge, Metric, Flex, ProgressBar, Grid } from '@tremor/react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

export function SuperiorEnhancements() {
  const [energyData, setEnergyData] = useState({
    powerUsageWatts: 1240.5,
    carbonIntensity: 425.0,
    totalEmissions: 9.1,
    renewablePercent: 62.0,
  });

  const [aiProvider, setAiProvider] = useState("Ollama (qwen2.5:latest)");

  // Enhancement 1: AI-Powered Cost Optimization Advisor
  const aiRecommendations = [
    {
      id: 1,
      title: 'Multi-Region Workload Optimization',
      description: 'AI detected that 3 workloads can be consolidated to us-east-1 with 40% cost reduction',
      impact: 'high',
      savings: 4800,
      confidence: 94,
      effort: 'medium',
      category: 'architecture'
    },
    {
      id: 2,
      title: 'Intelligent Auto-Scaling Configuration',
      description: 'ML model suggests custom scaling policies based on traffic patterns',
      impact: 'high',
      savings: 3200,
      confidence: 89,
      effort: 'low',
      category: 'compute'
    },
    {
      id: 3,
      title: 'Database Query Optimization',
      description: 'Detected inefficient queries causing 2.3x higher RDS costs',
      impact: 'medium',
      savings: 1900,
      confidence: 92,
      effort: 'high',
      category: 'database'
    },
    {
      id: 4,
      title: 'CDN Cache Strategy Enhancement',
      description: 'Optimize cache TTL to reduce origin requests by 65%',
      impact: 'medium',
      savings: 1400,
      confidence: 87,
      effort: 'low',
      category: 'network'
    }
  ]

  // Enhancement 2: Real-Time Cost Anomaly Prediction
  const anomalyPredictions = [
    { hour: '00:00', actual: 245, predicted: 240, anomaly: false },
    { hour: '04:00', actual: 198, predicted: 195, anomaly: false },
    { hour: '08:00', actual: 312, predicted: 305, anomaly: false },
    { hour: '12:00', actual: 456, predicted: 320, anomaly: true },
    { hour: '16:00', actual: 389, predicted: 380, anomaly: false },
    { hour: '20:00', actual: 298, predicted: 290, anomaly: false },
  ]

  // Enhancement 3: Carbon Footprint & Sustainability Tracking
  const carbonData = [
    { month: 'Jan', emissions: 12.4, cost: 52000, efficiency: 0.238 },
    { month: 'Feb', emissions: 11.8, cost: 54500, efficiency: 0.217 },
    { month: 'Mar', emissions: 10.9, cost: 53800, efficiency: 0.203 },
    { month: 'Apr', emissions: 10.2, cost: 58200, efficiency: 0.175 },
    { month: 'May', emissions: 9.8, cost: 59400, efficiency: 0.165 },
    { month: 'Jun', emissions: 9.1, cost: 56445, efficiency: 0.161 },
  ]

  const sustainabilityMetrics = [
    { region: 'us-east-1', renewable: 45, emissions: 3.2, cost: 18500 },
    { region: 'us-west-2', renewable: 78, emissions: 1.8, cost: 15200 },
    { region: 'eu-west-1', renewable: 92, emissions: 0.9, cost: 12800 },
    { region: 'ap-southeast-1', renewable: 34, emissions: 3.1, cost: 9945 },
  ]

  // Enhancement 4: Intelligent Cost Allocation with ML
  const mlCostAllocation = [
    { service: 'API Gateway', allocated: 8500, confidence: 96, method: 'ML-Based' },
    { service: 'Lambda Functions', allocated: 12300, confidence: 94, method: 'ML-Based' },
    { service: 'DynamoDB', allocated: 6700, confidence: 91, method: 'ML-Based' },
    { service: 'S3 Storage', allocated: 4200, confidence: 98, method: 'ML-Based' },
    { service: 'CloudFront', allocated: 3800, confidence: 89, method: 'ML-Based' },
  ]

  const allocationAccuracy = [
    { month: 'Jan', traditional: 72, ml: 94 },
    { month: 'Feb', traditional: 74, ml: 95 },
    { month: 'Mar', traditional: 71, ml: 96 },
    { month: 'Apr', traditional: 73, ml: 94 },
    { month: 'May', traditional: 75, ml: 97 },
    { month: 'Jun', traditional: 74, ml: 96 },
  ]

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Superior FinOps Enhancements</h2>
          <p className="text-muted-foreground mt-1">v2.5.0 Sovereign Intelligence Suite</p>
        </div>
        <div className="flex flex-col items-end gap-2">
            <Badge size="xl" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Sparkles className="h-4 w-4 mr-2" />
            INDUSTRY LEADING
            </Badge>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Active AI Provider: <strong>{aiProvider}</strong></span>
            </div>
        </div>
      </div>

      <Tabs defaultValue="ai-advisor" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="ai-advisor">AI Advisor</TabsTrigger>
          <TabsTrigger value="anomaly-prediction">Anomaly Prediction</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="ml-allocation">ML Allocation</TabsTrigger>
          <TabsTrigger value="focus">FOCUS Reports</TabsTrigger>
        </TabsList>

        {/* Enhancement 1: AI-Powered Cost Optimization Advisor */}
        <TabsContent value="ai-advisor" className="space-y-6">
          <motion.div variants={item} className="rounded-xl border border-border bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-500" />
                <Title className="text-foreground text-xl">AI-Powered Cost Optimization Advisor</Title>
              </div>
              <Badge color="purple" size="lg">
                <Sparkles className="h-3 w-3 mr-1" />
                $11.3K Potential Savings
              </Badge>
            </div>
            <p className="text-muted-foreground mb-6">
              Advanced machine learning analyzes your entire infrastructure to identify optimization opportunities 
              that traditional rule-based systems miss. Our AI considers workload patterns, business context, 
              and cross-service dependencies to provide holistic recommendations.
            </p>

            <div className="space-y-4">
              {aiRecommendations.map((rec) => (
                <div 
                  key={rec.id}
                  className="p-5 rounded-xl bg-background/50 border border-border hover:border-purple-500/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge 
                          color={rec.impact === 'high' ? 'red' : rec.impact === 'medium' ? 'orange' : 'blue'}
                          size="xs"
                        >
                          {rec.impact.toUpperCase()} IMPACT
                        </Badge>
                        <Badge color="purple" size="xs">{rec.category}</Badge>
                      </div>
                      <h4 className="font-bold text-lg group-hover:text-purple-500 transition-colors">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2">{rec.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-emerald-500">${rec.savings.toLocaleString()}</div>
                      <span className="text-xs text-muted-foreground">monthly savings</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">AI Confidence</div>
                      <div className="flex items-center gap-2">
                        <ProgressBar value={rec.confidence} color="purple" className="flex-1" />
                        <span className="text-sm font-bold">{rec.confidence}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Implementation Effort</div>
                      <Badge 
                        color={rec.effort === 'low' ? 'emerald' : rec.effort === 'medium' ? 'orange' : 'red'}
                        size="sm"
                      >
                        {rec.effort}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">ROI Timeline</div>
                      <span className="text-sm font-bold">
                        {rec.effort === 'low' ? '1 week' : rec.effort === 'medium' ? '2-3 weeks' : '1 month'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Implement Recommendation
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Learning Stats */}
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Database className="h-5 w-5 text-blue-500" />
                <Text className="text-muted-foreground font-medium">Training Data</Text>
              </div>
              <Metric>2.4M+ data points</Metric>
              <p className="text-xs text-muted-foreground mt-2">Analyzed across 180 days</p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-emerald-500" />
                <Text className="text-muted-foreground font-medium">Prediction Accuracy</Text>
              </div>
              <Metric>96.8%</Metric>
              <p className="text-xs text-muted-foreground mt-2">Validated against actual outcomes</p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <Text className="text-muted-foreground font-medium">Model Updates</Text>
              </div>
              <Metric>Every 6 hours</Metric>
              <p className="text-xs text-muted-foreground mt-2">Continuous learning from new data</p>
            </div>
          </motion.div>
        </TabsContent>

        {/* Enhancement 2: Real-Time Cost Anomaly Prediction */}
        <TabsContent value="anomaly-prediction" className="space-y-6">
          <motion.div variants={item} className="rounded-xl border border-border bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-orange-500" />
                <Title className="text-foreground text-xl">Predictive Anomaly Detection</Title>
              </div>
              <Badge color="orange" size="lg">
                <Zap className="h-3 w-3 mr-1" />
                REAL-TIME PREDICTION
              </Badge>
            </div>
            <p className="text-muted-foreground mb-6">
              Don't just detect anomalies after they happen—predict them before they occur. Our advanced ML models 
              analyze patterns and predict cost anomalies up to 4 hours in advance, giving you time to take 
              preventive action.
            </p>

            <LineChart
              className="h-80 mt-4"
              data={anomalyPredictions}
              index="hour"
              categories={["actual", "predicted"]}
              colors={["blue", "purple"]}
              valueFormatter={(number) => `$${number}`}
              showLegend={true}
              showGridLines={true}
              curveType="monotone"
            />

            <div className="mt-6 p-5 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-orange-500 mt-1" />
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">Anomaly Predicted: 12:00 PM</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    ML model predicts a 42% cost spike in 2 hours. Likely cause: Auto-scaling event in production cluster.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-xs text-muted-foreground mb-1">Predicted Increase</div>
                      <div className="text-lg font-bold text-orange-500">+$136</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-xs text-muted-foreground mb-1">Confidence Level</div>
                      <div className="text-lg font-bold">91%</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-xs text-muted-foreground mb-1">Time to Event</div>
                      <div className="text-lg font-bold">2 hours</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Button size="sm">
                      <Shield className="h-4 w-4 mr-2" />
                      Activate Cost Protection
                    </Button>
                    <Button size="sm" variant="outline">Review Details</Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Prediction Performance Metrics */}
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <Text className="text-muted-foreground font-medium text-xs">Prediction Window</Text>
              </div>
              <Metric>4 hours</Metric>
              <p className="text-xs text-muted-foreground mt-2">Advanced warning time</p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-emerald-500" />
                <Text className="text-muted-foreground font-medium text-xs">Accuracy Rate</Text>
              </div>
              <Metric>94.2%</Metric>
              <p className="text-xs text-muted-foreground mt-2">Prediction accuracy</p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-purple-500" />
                <Text className="text-muted-foreground font-medium text-xs">False Positives</Text>
              </div>
              <Metric>1.8%</Metric>
              <p className="text-xs text-muted-foreground mt-2">Industry-leading low rate</p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-orange-500" />
                <Text className="text-muted-foreground font-medium text-xs">Prevented Overruns</Text>
              </div>
              <Metric>$18.4K</Metric>
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </div>
          </motion.div>
        </TabsContent>

        {/* Enhancement 3: Carbon Footprint & Sustainability Tracking */}
        <TabsContent value="sustainability" className="space-y-6">
          <motion.div variants={item} className="rounded-xl border border-border bg-gradient-to-br from-emerald-500/10 to-green-500/10 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-emerald-500" />
                <Title className="text-foreground text-xl">Sovereign Sustainability Telemetry</Title>
              </div>
              <Badge color="emerald" size="lg">
                <TrendingUp className="h-3 w-3 mr-1" />
                Real-time eBPF Energy Monitoring
              </Badge>
            </div>
            <p className="text-muted-foreground mb-6">
              Track and optimize your cloud infrastructure's environmental impact using kernel-level energy counters. 
              Our eBPF-based Kepler integration provides empirical power consumption data per Pod, enabling 
              true sovereign sustainability management.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium">Power Usage</span>
                </div>
                <div className="text-3xl font-bold">{energyData.powerUsageWatts} W</div>
                <div className="text-xs text-muted-foreground mt-1">Real-time consumption</div>
              </div>
              <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium">Carbon Intensity</span>
                </div>
                <div className="text-3xl font-bold">{energyData.carbonIntensity}</div>
                <div className="text-xs text-muted-foreground mt-1">gCO2eq/kWh intensity</div>
              </div>
              <div className="p-5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium">Renewable %</span>
                </div>
                <div className="text-3xl font-bold">{energyData.renewablePercent}%</div>
                <div className="text-xs text-muted-foreground mt-1">Current energy mix</div>
              </div>
              <div className="p-5 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CloudRain className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">Total Emissions</span>
                </div>
                <div className="text-3xl font-bold">{energyData.totalEmissions} kg</div>
                <div className="text-xs text-muted-foreground mt-1">Monthly accumulation</div>
              </div>
            </div>

            <AreaChart
              className="h-80 mt-4"
              data={carbonData}
              index="month"
              categories={["emissions"]}
              colors={["emerald"]}
              valueFormatter={(number) => `${number} tons CO₂`}
              showLegend={false}
              showGridLines={true}
              curveType="monotone"
            />
          </motion.div>

          {/* Regional Sustainability Breakdown */}
          <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="h-5 w-5 text-emerald-500" />
              <Title className="text-foreground">Regional Sustainability Analysis</Title>
            </div>
            <div className="space-y-4">
              {sustainabilityMetrics.map((region) => (
                <div key={region.region} className="p-5 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold">{region.region}</h4>
                      <p className="text-sm text-muted-foreground">${region.cost.toLocaleString()} monthly spend</p>
                    </div>
                    <Badge 
                      color={region.renewable >= 80 ? 'emerald' : region.renewable >= 50 ? 'orange' : 'red'}
                      size="lg"
                    >
                      {region.renewable}% Renewable
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Carbon Emissions</div>
                      <div className="text-xl font-bold">{region.emissions} tons CO₂</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Renewable Energy</div>
                      <ProgressBar value={region.renewable} color={region.renewable >= 80 ? 'emerald' : 'orange'} />
                    </div>
                  </div>
                  {region.renewable < 80 && (
                    <div className="mt-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs">
                      <span className="font-bold text-orange-500">Recommendation: </span>
                      <span className="text-muted-foreground">
                        Consider migrating workloads to {sustainabilityMetrics.find(r => r.renewable >= 80)?.region} for lower carbon footprint
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Enhancement 4: Intelligent Cost Allocation with ML */}
        <TabsContent value="ml-allocation" className="space-y-6">
          <motion.div variants={item} className="rounded-xl border border-border bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Cpu className="h-6 w-6 text-blue-500" />
                <Title className="text-foreground text-xl">ML-Powered Cost Allocation</Title>
              </div>
              <Badge color="blue" size="lg">
                <Brain className="h-3 w-3 mr-1" />
                96% Accuracy
              </Badge>
            </div>
            <p className="text-muted-foreground mb-6">
              Traditional cost allocation relies on manual tagging and static rules. Our ML-powered system 
              automatically learns usage patterns and relationships to allocate shared costs with unprecedented 
              accuracy—even for untagged resources.
            </p>

            <div className="space-y-4 mb-6">
              {mlCostAllocation.map((service) => (
                <div key={service.service} className="p-5 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Database className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-bold">{service.service}</h4>
                        <p className="text-xs text-muted-foreground">{service.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${service.allocated.toLocaleString()}</div>
                      <span className="text-xs text-muted-foreground">allocated</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">ML Confidence</span>
                    <div className="flex items-center gap-2">
                      <ProgressBar value={service.confidence} color="blue" className="w-32" />
                      <span className="text-sm font-bold">{service.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-bold mb-2">ML Allocation Benefits</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      Automatically allocates costs for untagged resources
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      Learns from historical patterns and usage relationships
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      Adapts to organizational changes automatically
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      96% accuracy vs 74% for traditional methods
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Enhancement 5: FOCUS Reporting */}
        <TabsContent value="focus" className="space-y-6">
          <motion.div variants={item} className="rounded-xl border border-border bg-gradient-to-br from-indigo-500/10 to-blue-500/10 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Target className="h-6 w-6 text-indigo-500" />
                <Title className="text-foreground text-xl">FOCUS Enterprise Reporting</Title>
              </div>
              <Badge color="indigo" size="lg">
                <CheckCircle className="h-3 w-3 mr-1" />
                V1.0 COMPLIANT
              </Badge>
            </div>
            <p className="text-muted-foreground mb-6">
              Generate standardized, enterprise-grade cost reports using the **FinOps Open Cost & Usage Specification (FOCUS)**. 
              Eliminate vendor-specific terminology and provide a unified view of your sovereign infrastructure costs.
            </p>

            <div className="rounded-xl border border-border bg-slate-900 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-800 text-slate-400">
                        <tr>
                            <th className="px-6 py-3">Charge Period</th>
                            <th className="px-6 py-3">Service</th>
                            <th className="px-6 py-3">Resource</th>
                            <th className="px-6 py-3">Billed Cost</th>
                            <th className="px-6 py-3">Effective Cost</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        <tr>
                            <td className="px-6 py-4">2026-05-01</td>
                            <td className="px-6 py-4">Compute</td>
                            <td className="px-6 py-4">optimai-node-01</td>
                            <td className="px-6 py-4 font-bold text-emerald-400">$120.50</td>
                            <td className="px-6 py-4 font-bold text-blue-400">$115.40</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">2026-05-01</td>
                            <td className="px-6 py-4">Storage</td>
                            <td className="px-6 py-4">filecoin-vol-A</td>
                            <td className="px-6 py-4 font-bold text-emerald-400">$45.20</td>
                            <td className="px-6 py-4 font-bold text-blue-400">$42.10</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="mt-6 flex gap-2">
                <Button className="flex-1">Export FOCUS CSV</Button>
                <Button variant="outline" className="flex-1">Schedule PDF Report</Button>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Summary Card */}
      <motion.div variants={item} className="rounded-xl border border-border bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-emerald-500/10 p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3">Sovereign FinOps Innovation</h3>
            <p className="text-muted-foreground mb-6">
              Kraken Cloud Control v2.5.0 introduces the world's first **Sovereign FinOps** suite. By combining 
              local Qwen 2.5 intelligence with kernel-level energy tracking and FOCUS standardization, 
              we provide a level of autonomy and transparency that commercial platforms cannot match.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <div className="text-xs text-muted-foreground mb-1">AI Autonomy</div>
                <div className="text-xl font-bold text-purple-400">100% LOCAL</div>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <div className="text-xs text-muted-foreground mb-1">Energy Fidelity</div>
                <div className="text-xl font-bold text-emerald-400">eBPF DRIVEN</div>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <div className="text-xs text-muted-foreground mb-1">Compliance</div>
                <div className="text-xl font-bold text-blue-400">FOCUS V1</div>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <div className="text-xs text-muted-foreground mb-1">Reward Alpha</div>
                <div className="text-xl font-bold text-orange-400">2.5x MULTI</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
