'use client'

import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp, AlertCircle, CheckCircle, DollarSign, PieChart, BarChart3, TrendingUp as TrendingUpIcon } from 'lucide-react'
import { Card as TremorCard, Title, Text, AreaChart, BarChart, DonutChart, Badge, List, ListItem, Flex } from '@tremor/react'

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

export function CostDashboard() {
  const costTrendData = [
    { month: 'Jan', cost: 52000 },
    { month: 'Feb', cost: 54500 },
    { month: 'Mar', cost: 53800 },
    { month: 'Apr', cost: 58200 },
    { month: 'May', cost: 59400 },
    { month: 'Jun', cost: 56445 },
  ]

  const costByNamespace = [
    { name: 'production', cost: 28500 },
    { name: 'staging', cost: 12800 },
    { name: 'development', cost: 8450 },
    { name: 'monitoring', cost: 4200 },
    { name: 'ingress', cost: 2495 },
  ]

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Cost Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={item} className="k8s-card">
          <Text className="text-slate-400 font-medium">Current Month</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">$56,445</span>
          </div>
          <div className="mt-4 flex items-center gap-1">
            <TrendingDown className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-500">-5.0% vs last month</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="k8s-card">
          <Text className="text-slate-400 font-medium">Forecast (Next Month)</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">$57,234</span>
          </div>
          <div className="mt-4 flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-bold text-orange-500">+1.4% projected</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="k8s-card">
          <Text className="text-slate-400 font-medium">Cost per Pod</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">$45.26</span>
          </div>
          <div className="mt-4">
            <span className="text-xs text-slate-500 font-medium tracking-wide">Average across cluster</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="k8s-card">
          <Text className="text-slate-400 font-medium">Potential Savings</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-emerald-400">$8,950</span>
          </div>
          <div className="mt-4">
            <span className="text-xs text-slate-500 font-medium tracking-wide">AI recommendations</span>
          </div>
        </motion.div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div variants={item} className="k8s-card lg:col-span-8">
          <Flex justifyContent="between" alignItems="center" className="mb-6">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="h-5 w-5 text-primary" />
              <Title className="text-white">Cost Trend</Title>
            </div>
            <div className="px-3 py-1 rounded bg-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Last 6 Months
            </div>
          </Flex>
          <AreaChart
            className="h-80 mt-4"
            data={costTrendData}
            index="month"
            categories={["cost"]}
            colors={["cyan"]}
            valueFormatter={(number) => `$${number.toLocaleString()}`}
            showLegend={false}
            showGridLines={true}
            curveType="monotone"
          />
        </motion.div>

        <motion.div variants={item} className="k8s-card lg:col-span-4">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="h-5 w-5 text-primary" />
            <Title className="text-white">Distribution</Title>
          </div>
          <DonutChart
            className="h-64 mt-4"
            data={costByNamespace}
            category="cost"
            index="name"
            colors={["cyan", "blue", "indigo", "slate", "gray"]}
            variant="pie"
            valueFormatter={(number) => `$${number.toLocaleString()}`}
          />
          <List className="mt-8">
            {costByNamespace.map((item) => (
              <ListItem key={item.name} className="py-2 border-slate-800/50">
                <span className="text-slate-400 text-xs font-medium">{item.name}</span>
                <span className="text-white text-xs font-bold">${item.cost.toLocaleString()}</span>
              </ListItem>
            ))}
          </List>
        </motion.div>
      </div>

      {/* Recommendations List (Zendesk List Style) */}
      <motion.div variants={item} className="k8s-card">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            <Title className="text-white">Optimization Recommendations</Title>
          </div>
          <Badge color="emerald" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            AI-POWERED
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-6 p-4 rounded-xl bg-slate-800/30 border border-slate-800 hover:border-emerald-500/30 transition-all group">
            <div className="mt-1 h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <TrendingDown className="h-6 w-6 text-emerald-500" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-bold group-hover:text-emerald-400 transition-colors">Rightsize Over-Provisioned Pods</h4>
                <span className="text-emerald-400 font-bold">$3,450/mo potential savings</span>
              </div>
              <p className="text-sm text-slate-400">12 pods are using less than 30% of their requested resources. Scaling down recommended.</p>
            </div>
          </div>

          <div className="flex items-start gap-6 p-4 rounded-xl bg-slate-800/30 border border-slate-800 hover:border-primary/30 transition-all group">
            <div className="mt-1 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-bold group-hover:text-primary transition-colors">Remove Idle Test Environment</h4>
                <span className="text-primary font-bold">$2,800/mo potential savings</span>
              </div>
              <p className="text-sm text-slate-400">'test-env' namespace has been idle for 14 days. Suggesting archival or removal.</p>
            </div>
          </div>

          <div className="flex items-start gap-6 p-4 rounded-xl bg-slate-800/30 border border-slate-800 hover:border-emerald-500/30 transition-all group">
            <div className="mt-1 h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="h-6 w-6 text-emerald-500" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-bold group-hover:text-emerald-400 transition-colors">Use Spot Instances</h4>
                <span className="text-emerald-400 font-bold">$2,700/mo potential savings</span>
              </div>
              <p className="text-sm text-slate-400">Non-critical workloads can use spot instances for 70% cost reduction on node worker-3.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
