'use client'

import { motion } from 'framer-motion'
import { Cloud, TrendingDown, TrendingUp, ArrowRight, Zap, DollarSign, BarChart3 } from 'lucide-react'
import { Card as TremorCard, Title, Text, BarChart, DonutChart, Badge, Flex, ProgressBar } from '@tremor/react'

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

export function MultiCloudComparison() {
  // Multi-cloud cost data
  const cloudProviders = [
    {
      name: 'AWS',
      logo: '☁️',
      currentCost: 28450,
      previousCost: 29800,
      trend: -4.5,
      services: [
        { name: 'EC2', cost: 12500 },
        { name: 'EKS', cost: 8200 },
        { name: 'RDS', cost: 4500 },
        { name: 'S3', cost: 2100 },
        { name: 'Other', cost: 1150 }
      ],
      efficiency: 87,
      recommendations: 3
    },
    {
      name: 'GCP',
      logo: '🌐',
      currentCost: 18920,
      previousCost: 17500,
      trend: 8.1,
      services: [
        { name: 'GKE', cost: 9200 },
        { name: 'Compute Engine', cost: 5800 },
        { name: 'Cloud SQL', cost: 2400 },
        { name: 'Cloud Storage', cost: 1200 },
        { name: 'Other', cost: 320 }
      ],
      efficiency: 92,
      recommendations: 1
    },
    {
      name: 'Azure',
      logo: '⚡',
      currentCost: 9075,
      previousCost: 9200,
      trend: -1.4,
      services: [
        { name: 'AKS', cost: 4200 },
        { name: 'Virtual Machines', cost: 2800 },
        { name: 'SQL Database', cost: 1500 },
        { name: 'Blob Storage', cost: 475 },
        { name: 'Other', cost: 100 }
      ],
      efficiency: 89,
      recommendations: 2
    }
  ]

  const totalCost = cloudProviders.reduce((sum, provider) => sum + provider.currentCost, 0)
  const totalPreviousCost = cloudProviders.reduce((sum, provider) => sum + provider.previousCost, 0)
  const overallTrend = ((totalCost - totalPreviousCost) / totalPreviousCost) * 100

  // Cost comparison by service type across clouds
  const serviceComparison = [
    { service: 'Kubernetes', AWS: 8200, GCP: 9200, Azure: 4200 },
    { service: 'Compute', AWS: 12500, GCP: 5800, Azure: 2800 },
    { service: 'Database', AWS: 4500, GCP: 2400, Azure: 1500 },
    { service: 'Storage', AWS: 2100, GCP: 1200, Azure: 475 },
  ]

  // Cost distribution across clouds
  const cloudDistribution = cloudProviders.map(provider => ({
    name: provider.name,
    cost: provider.currentCost
  }))

  // Potential savings by migrating workloads
  const migrationOpportunities = [
    {
      workload: 'Development Clusters',
      currentProvider: 'AWS',
      currentCost: 4200,
      targetProvider: 'GCP',
      targetCost: 2800,
      savings: 1400,
      savingsPercent: 33
    },
    {
      workload: 'Batch Processing',
      currentProvider: 'GCP',
      currentCost: 3500,
      targetProvider: 'Azure Spot',
      targetCost: 1200,
      savings: 2300,
      savingsPercent: 66
    },
    {
      workload: 'Object Storage',
      currentProvider: 'AWS S3',
      currentCost: 2100,
      targetProvider: 'GCP Coldline',
      targetCost: 850,
      savings: 1250,
      savingsPercent: 60
    }
  ]

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
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Cloud className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Multi-Cloud Cost Intelligence</h2>
            <p className="text-sm text-muted-foreground">Unified view across AWS, GCP, and Azure</p>
          </div>
        </div>
        <Badge color="blue" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
          3 CLOUDS CONNECTED
        </Badge>
      </motion.div>

      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <Text className="text-muted-foreground font-medium">Total Multi-Cloud Spend</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold">${(totalCost / 1000).toFixed(1)}K</span>
          </div>
          <div className="mt-4 flex items-center gap-1">
            {overallTrend > 0 ? (
              <TrendingUp className="h-4 w-4 text-orange-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-emerald-500" />
            )}
            <span className={`text-xs font-bold ${overallTrend > 0 ? 'text-orange-500' : 'text-emerald-500'}`}>
              {overallTrend > 0 ? '+' : ''}{overallTrend.toFixed(1)}% vs last month
            </span>
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <Text className="text-muted-foreground font-medium">Most Efficient Cloud</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold">GCP</span>
          </div>
          <div className="mt-4">
            <span className="text-xs text-muted-foreground font-medium">92% efficiency score</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <Text className="text-muted-foreground font-medium">Migration Savings</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-emerald-500">$4.9K</span>
          </div>
          <div className="mt-4">
            <span className="text-xs text-muted-foreground font-medium">Potential monthly</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <Text className="text-muted-foreground font-medium">Active Recommendations</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold">6</span>
          </div>
          <div className="mt-4">
            <span className="text-xs text-muted-foreground font-medium">Cross-cloud optimizations</span>
          </div>
        </motion.div>
      </div>

      {/* Cloud Provider Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {cloudProviders.map((provider) => (
          <motion.div 
            key={provider.name}
            variants={item} 
            className="rounded-xl border border-border bg-card/50 p-6 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{provider.logo}</span>
                <div>
                  <h3 className="text-xl font-bold">{provider.name}</h3>
                  <Text className="text-xs text-muted-foreground">Cloud Provider</Text>
                </div>
              </div>
              {provider.recommendations > 0 && (
                <Badge color="orange" size="xs">
                  {provider.recommendations} RECS
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <Text className="text-muted-foreground text-xs">Monthly Cost</Text>
                  <span className="text-2xl font-bold">${(provider.currentCost / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex items-center gap-1">
                  {provider.trend > 0 ? (
                    <TrendingUp className="h-3 w-3 text-orange-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-emerald-500" />
                  )}
                  <span className={`text-xs font-bold ${provider.trend > 0 ? 'text-orange-500' : 'text-emerald-500'}`}>
                    {provider.trend > 0 ? '+' : ''}{provider.trend}%
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Text className="text-xs text-muted-foreground">Cost Efficiency</Text>
                  <Text className="text-xs font-bold">{provider.efficiency}%</Text>
                </div>
                <ProgressBar value={provider.efficiency} color="blue" className="h-2" />
              </div>

              <div className="pt-3 border-t border-border/50">
                <Text className="text-xs text-muted-foreground mb-3">Service Breakdown</Text>
                <div className="space-y-2">
                  {provider.services.slice(0, 3).map((service) => (
                    <div key={service.name} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{service.name}</span>
                      <span className="font-semibold">${(service.cost / 1000).toFixed(1)}K</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Service Comparison Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm lg:col-span-8">
          <Flex justifyContent="between" alignItems="center" className="mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <Title className="text-foreground">Service Cost Comparison</Title>
            </div>
          </Flex>
          <BarChart
            className="h-80 mt-4"
            data={serviceComparison}
            index="service"
            categories={["AWS", "GCP", "Azure"]}
            colors={["orange", "blue", "cyan"]}
            valueFormatter={(number) => `$${(number / 1000).toFixed(1)}K`}
            showLegend={true}
            showGridLines={true}
          />
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm lg:col-span-4">
          <div className="flex items-center gap-2 mb-6">
            <Cloud className="h-5 w-5 text-primary" />
            <Title className="text-foreground">Cost Distribution</Title>
          </div>
          <DonutChart
            className="h-64 mt-4"
            data={cloudDistribution}
            category="cost"
            index="name"
            colors={["orange", "blue", "cyan"]}
            valueFormatter={(number) => `$${(number / 1000).toFixed(1)}K`}
          />
        </motion.div>
      </div>

      {/* Migration Opportunities */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-500" />
            <Title className="text-foreground">Smart Migration Opportunities</Title>
          </div>
          <Badge color="emerald" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            AI-OPTIMIZED
          </Badge>
        </div>

        <div className="space-y-4">
          {migrationOpportunities.map((opportunity, index) => (
            <div 
              key={index}
              className="p-5 rounded-xl bg-muted/30 border border-border hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-lg">{opportunity.workload}</h4>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-500">-${(opportunity.savings / 1000).toFixed(1)}K</div>
                  <div className="text-xs text-muted-foreground">{opportunity.savingsPercent}% savings</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <span className="text-muted-foreground">Current:</span>
                  <span className="font-semibold">{opportunity.currentProvider}</span>
                  <span className="text-muted-foreground">${(opportunity.currentCost / 1000).toFixed(1)}K</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="font-semibold">{opportunity.targetProvider}</span>
                  <span className="text-emerald-500 font-semibold">${(opportunity.targetCost / 1000).toFixed(1)}K</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Made with Bob
