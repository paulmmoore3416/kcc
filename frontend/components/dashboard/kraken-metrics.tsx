'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Shield, DollarSign, Activity, Zap, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card as TremorCard, Title, Text, AreaChart, BarChart, DonutChart, LineChart, Badge, Metric, Flex, Grid, ProgressBar } from '@tremor/react'

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

export function KrakenMetrics() {
  // Kraken hedging performance data
  const hedgingPerformance = [
    { month: 'Jan', hedged: 4200, unhedged: 5800, savings: 1600 },
    { month: 'Feb', hedged: 4500, unhedged: 6200, savings: 1700 },
    { month: 'Mar', hedged: 4100, unhedged: 5900, savings: 1800 },
    { month: 'Apr', hedged: 4800, unhedged: 6800, savings: 2000 },
    { month: 'May', hedged: 4600, unhedged: 6500, savings: 1900 },
    { month: 'Jun', hedged: 4300, unhedged: 6100, savings: 1800 },
  ]

  // Real-time Kraken trading activity
  const tradingActivity = [
    { time: '00:00', volume: 1200, value: 45000 },
    { time: '04:00', volume: 980, value: 38000 },
    { time: '08:00', volume: 1450, value: 52000 },
    { time: '12:00', volume: 1680, value: 61000 },
    { time: '16:00', volume: 1520, value: 55000 },
    { time: '20:00', volume: 1340, value: 48000 },
  ]

  // Asset allocation for hedging
  const assetAllocation = [
    { asset: 'xStocks', value: 45000, percentage: 45 },
    { asset: 'Stablecoins', value: 30000, percentage: 30 },
    { asset: 'Commodities', value: 15000, percentage: 15 },
    { asset: 'Bonds', value: 10000, percentage: 10 },
  ]

  // Kraken API performance metrics
  const apiMetrics = [
    { endpoint: 'Trade Execution', latency: 45, success: 99.8 },
    { endpoint: 'Market Data', latency: 12, success: 99.9 },
    { endpoint: 'Account Balance', latency: 28, success: 99.7 },
    { endpoint: 'Order Status', latency: 35, success: 99.6 },
  ]

  // Hedging strategies performance
  const strategies = [
    { name: 'Volatility Hedge', active: true, roi: 12.4, risk: 'Low', trades: 156 },
    { name: 'Cost Spike Protection', active: true, roi: 18.7, risk: 'Medium', trades: 89 },
    { name: 'Long-term Stability', active: true, roi: 8.2, risk: 'Very Low', trades: 234 },
    { name: 'Aggressive Growth', active: false, roi: 0, risk: 'High', trades: 0 },
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
          <h2 className="text-3xl font-bold tracking-tight">Kraken Financial Intelligence</h2>
          <p className="text-muted-foreground mt-1">Real-time hedging, trading analytics, and cost protection</p>
        </div>
        <Badge size="xl" color="emerald" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
          <Activity className="h-4 w-4 mr-2" />
          LIVE TRADING
        </Badge>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={item} className="rounded-xl border border-border bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Shield className="h-8 w-8 text-emerald-500" />
            <Badge color="emerald" size="xs">ACTIVE</Badge>
          </div>
          <Text className="text-muted-foreground font-medium">Total Hedged Value</Text>
          <Metric className="mt-2">$100,000</Metric>
          <div className="mt-4 flex items-center gap-1">
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-500">+15.2% this month</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8 text-blue-500" />
            <Badge color="blue" size="xs">SAVINGS</Badge>
          </div>
          <Text className="text-muted-foreground font-medium">Cost Savings (YTD)</Text>
          <Metric className="mt-2">$10,800</Metric>
          <div className="mt-4 flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-bold text-blue-500">18.7% ROI</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Zap className="h-8 w-8 text-purple-500" />
            <Badge color="purple" size="xs">REAL-TIME</Badge>
          </div>
          <Text className="text-muted-foreground font-medium">Active Trades (24h)</Text>
          <Metric className="mt-2">1,247</Metric>
          <div className="mt-4 flex items-center gap-1">
            <Activity className="h-4 w-4 text-purple-500" />
            <span className="text-xs font-bold text-purple-500">99.8% success rate</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-gradient-to-br from-orange-500/10 to-orange-500/5 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="h-8 w-8 text-orange-500" />
            <Badge color="orange" size="xs">PROTECTED</Badge>
          </div>
          <Text className="text-muted-foreground font-medium">Risk Exposure</Text>
          <Metric className="mt-2">Low</Metric>
          <div className="mt-4">
            <ProgressBar value={15} color="orange" className="mt-2" />
            <span className="text-xs text-muted-foreground mt-1 block">15% of portfolio</span>
          </div>
        </motion.div>
      </div>

      {/* Hedging Performance Chart */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
        <Flex justifyContent="between" alignItems="center" className="mb-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-500" />
            <Title className="text-foreground">Hedging Performance vs Unhedged Costs</Title>
          </div>
          <Badge color="emerald" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            $10.8K SAVED YTD
          </Badge>
        </Flex>
        <AreaChart
          className="h-80 mt-4"
          data={hedgingPerformance}
          index="month"
          categories={["hedged", "unhedged", "savings"]}
          colors={["emerald", "red", "blue"]}
          valueFormatter={(number) => `$${number.toLocaleString()}`}
          showLegend={true}
          showGridLines={true}
          curveType="monotone"
        />
      </motion.div>

      {/* Trading Activity and Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm lg:col-span-7">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-purple-500" />
            <Title className="text-foreground">Real-Time Trading Activity</Title>
          </div>
          <LineChart
            className="h-72 mt-4"
            data={tradingActivity}
            index="time"
            categories={["volume", "value"]}
            colors={["purple", "blue"]}
            valueFormatter={(number) => number > 1000 ? `$${(number/1000).toFixed(1)}K` : number.toString()}
            showLegend={true}
            showGridLines={true}
            curveType="monotone"
          />
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm lg:col-span-5">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="h-5 w-5 text-blue-500" />
            <Title className="text-foreground">Asset Allocation</Title>
          </div>
          <DonutChart
            className="h-48 mt-4"
            data={assetAllocation}
            category="value"
            index="asset"
            colors={["blue", "emerald", "orange", "purple"]}
            valueFormatter={(number) => `$${number.toLocaleString()}`}
            showLabel={true}
          />
          <div className="mt-6 space-y-3">
            {assetAllocation.map((asset) => (
              <div key={asset.asset} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm font-medium">{asset.asset}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{asset.percentage}%</span>
                  <span className="text-sm font-bold">${asset.value.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Kraken API Performance */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <Title className="text-foreground">Kraken API Performance</Title>
          </div>
          <Badge color="emerald" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            99.8% UPTIME
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {apiMetrics.map((metric) => (
            <div key={metric.endpoint} className="p-4 rounded-lg bg-muted/30 border border-border">
              <Text className="text-muted-foreground text-xs font-medium mb-2">{metric.endpoint}</Text>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold">{metric.latency}ms</span>
                <span className="text-xs text-muted-foreground">latency</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Success Rate</span>
                <span className="text-xs font-bold text-emerald-500">{metric.success}%</span>
              </div>
              <ProgressBar value={metric.success} color="emerald" className="mt-2" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Hedging Strategies */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <Title className="text-foreground">Active Hedging Strategies</Title>
          </div>
          <span className="text-sm text-muted-foreground">3 of 4 strategies active</span>
        </div>
        <div className="space-y-4">
          {strategies.map((strategy) => (
            <div 
              key={strategy.name} 
              className={`flex items-center justify-between p-5 rounded-xl border transition-all ${
                strategy.active 
                  ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40' 
                  : 'bg-muted/20 border-border opacity-60'
              }`}
            >
              <div className="flex items-center gap-4">
                {strategy.active ? (
                  <CheckCircle className="h-6 w-6 text-emerald-500" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/30" />
                )}
                <div>
                  <h4 className="font-bold">{strategy.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge 
                      size="xs" 
                      color={strategy.risk === 'Low' || strategy.risk === 'Very Low' ? 'emerald' : strategy.risk === 'Medium' ? 'orange' : 'red'}
                    >
                      {strategy.risk} Risk
                    </Badge>
                    <span className="text-xs text-muted-foreground">{strategy.trades} trades executed</span>
                  </div>
                </div>
              </div>
              {strategy.active && (
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <span className="text-2xl font-bold text-emerald-500">+{strategy.roi}%</span>
                  </div>
                  <span className="text-xs text-muted-foreground">ROI</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Kraken Integration Status */}
      <motion.div variants={item} className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="h-6 w-6 text-emerald-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Kraken Integration Active</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your infrastructure costs are being actively hedged through Kraken's trading platform. 
              The system automatically executes trades to protect against cost volatility and optimize your cloud spending.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-background/50 border border-border">
                <Text className="text-muted-foreground text-xs mb-1">API Connection</Text>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-bold">Connected</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border">
                <Text className="text-muted-foreground text-xs mb-1">Last Trade</Text>
                <span className="text-sm font-bold">2 minutes ago</span>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border">
                <Text className="text-muted-foreground text-xs mb-1">Next Rebalance</Text>
                <span className="text-sm font-bold">In 4 hours</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Made with Bob
