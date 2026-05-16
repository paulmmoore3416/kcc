'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Users, FileText, Settings, Bell, TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign, Zap, Database, Cloud, GitBranch, Target } from 'lucide-react'
import { Card as TremorCard, Title, Text, BarChart, DonutChart, Badge, Metric, Flex, ProgressBar, List, ListItem } from '@tremor/react'
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

export function AdvancedFinOpsAdmin() {
  // Budget Management Data
  const budgets = [
    { department: 'Engineering', allocated: 50000, spent: 42500, forecast: 48000, status: 'on-track' },
    { department: 'Data Science', allocated: 35000, spent: 31200, forecast: 36500, status: 'warning' },
    { department: 'DevOps', allocated: 28000, spent: 19800, forecast: 24000, status: 'under' },
    { department: 'QA', allocated: 15000, spent: 14200, forecast: 15800, status: 'warning' },
  ]

  // Policy Compliance Data
  const policies = [
    { name: 'Resource Tagging', compliance: 94, violations: 12, severity: 'medium' },
    { name: 'Cost Allocation', compliance: 88, violations: 28, severity: 'high' },
    { name: 'Reserved Instances', compliance: 76, violations: 45, severity: 'medium' },
    { name: 'Idle Resources', compliance: 82, violations: 34, severity: 'high' },
    { name: 'Security Groups', compliance: 98, violations: 4, severity: 'low' },
  ]

  // Chargeback/Showback Data
  const chargebackData = [
    { team: 'Platform Team', compute: 12500, storage: 3200, network: 1800, total: 17500 },
    { team: 'ML Team', compute: 18900, storage: 5600, network: 2100, total: 26600 },
    { team: 'API Team', compute: 8400, storage: 2100, network: 3400, total: 13900 },
    { team: 'Analytics Team', compute: 15200, storage: 8900, network: 1600, total: 25700 },
  ]

  // Commitment Management (RIs, Savings Plans)
  const commitments = [
    { type: 'EC2 Reserved Instances', coverage: 78, savings: 12400, expiring: 45, status: 'active' },
    { type: 'Compute Savings Plans', coverage: 65, savings: 8900, expiring: 120, status: 'active' },
    { type: 'RDS Reserved Instances', coverage: 82, savings: 5600, expiring: 15, status: 'expiring-soon' },
    { type: 'ElastiCache Reserved', coverage: 91, savings: 3200, expiring: 180, status: 'active' },
  ]

  // Automated Actions Log
  const automatedActions = [
    { action: 'Scaled down dev environment', time: '2 hours ago', savings: 450, status: 'success' },
    { action: 'Deleted unused EBS volumes', time: '5 hours ago', savings: 280, status: 'success' },
    { action: 'Stopped idle EC2 instances', time: '1 day ago', savings: 1200, status: 'success' },
    { action: 'Rightsized RDS instance', time: '2 days ago', savings: 890, status: 'success' },
    { action: 'Moved S3 to Glacier', time: '3 days ago', savings: 340, status: 'success' },
  ]

  // Forecasting & Capacity Planning
  const capacityForecast = [
    { month: 'Jul', predicted: 58000, capacity: 75000, utilization: 77 },
    { month: 'Aug', predicted: 62000, capacity: 75000, utilization: 83 },
    { month: 'Sep', predicted: 68000, capacity: 75000, utilization: 91 },
    { month: 'Oct', predicted: 74000, capacity: 75000, utilization: 99 },
    { month: 'Nov', predicted: 82000, capacity: 100000, utilization: 82 },
    { month: 'Dec', predicted: 88000, capacity: 100000, utilization: 88 },
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
          <h2 className="text-3xl font-bold tracking-tight">Advanced FinOps Administration</h2>
          <p className="text-muted-foreground mt-1">Enterprise-grade cost governance and automation</p>
        </div>
        <Badge size="xl" color="blue" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
          <Shield className="h-4 w-4 mr-2" />
          ENTERPRISE
        </Badge>
      </div>

      <Tabs defaultValue="budgets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-auto">
          <TabsTrigger value="budgets">Budget Management</TabsTrigger>
          <TabsTrigger value="policies">Policy Compliance</TabsTrigger>
          <TabsTrigger value="chargeback">Chargeback</TabsTrigger>
          <TabsTrigger value="commitments">Commitments</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>

        {/* 1. Budget Management & Alerts */}
        <TabsContent value="budgets" className="space-y-6">
          <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                <Title className="text-foreground">Department Budget Tracking</Title>
              </div>
              <Button size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure Budgets
              </Button>
            </div>
            
            <div className="space-y-4">
              {budgets.map((budget) => {
                const percentSpent = (budget.spent / budget.allocated) * 100
                const percentForecast = (budget.forecast / budget.allocated) * 100
                
                return (
                  <div key={budget.department} className="p-5 rounded-xl bg-muted/30 border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg">{budget.department}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${budget.spent.toLocaleString()} of ${budget.allocated.toLocaleString()} spent
                        </p>
                      </div>
                      <Badge 
                        color={budget.status === 'on-track' ? 'emerald' : budget.status === 'warning' ? 'orange' : 'blue'}
                        size="lg"
                      >
                        {budget.status === 'on-track' ? 'On Track' : budget.status === 'warning' ? 'At Risk' : 'Under Budget'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Current Spend</span>
                        <span className="font-bold">{percentSpent.toFixed(1)}%</span>
                      </div>
                      <ProgressBar value={percentSpent} color={percentSpent > 90 ? 'red' : percentSpent > 75 ? 'orange' : 'emerald'} />
                      
                      <div className="flex items-center justify-between text-sm mt-3">
                        <span className="text-muted-foreground">Forecasted</span>
                        <span className="font-bold text-orange-500">{percentForecast.toFixed(1)}%</span>
                      </div>
                      <ProgressBar value={percentForecast} color={percentForecast > 100 ? 'red' : 'orange'} />
                    </div>
                    
                    {percentForecast > 100 && (
                      <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                        <div className="text-sm">
                          <span className="font-bold text-red-500">Budget Overrun Alert: </span>
                          <span className="text-muted-foreground">
                            Projected to exceed by ${(budget.forecast - budget.allocated).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Budget Alerts Configuration */}
          <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="h-5 w-5 text-orange-500" />
              <Title className="text-foreground">Alert Thresholds</Title>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Warning</span>
                  <Badge color="yellow" size="xs">75%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Email notification to team leads</p>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Critical</span>
                  <Badge color="orange" size="xs">90%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Slack alert + email to directors</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Emergency</span>
                  <Badge color="red" size="xs">100%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Auto-freeze + executive escalation</p>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* 2. Policy Compliance & Governance */}
        <TabsContent value="policies" className="space-y-6">
          <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                <Title className="text-foreground">Policy Compliance Dashboard</Title>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Overall Compliance:</span>
                <Badge color="emerald" size="lg">87.6%</Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              {policies.map((policy) => (
                <div key={policy.name} className="p-5 rounded-xl bg-muted/30 border border-border hover:border-purple-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        policy.compliance >= 90 ? 'bg-emerald-500/10' : policy.compliance >= 80 ? 'bg-orange-500/10' : 'bg-red-500/10'
                      }`}>
                        {policy.compliance >= 90 ? (
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <AlertTriangle className={`h-5 w-5 ${policy.compliance >= 80 ? 'text-orange-500' : 'text-red-500'}`} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold">{policy.name}</h4>
                        <p className="text-sm text-muted-foreground">{policy.violations} violations detected</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{policy.compliance}%</div>
                      <Badge 
                        color={policy.severity === 'high' ? 'red' : policy.severity === 'medium' ? 'orange' : 'yellow'}
                        size="xs"
                      >
                        {policy.severity} priority
                      </Badge>
                    </div>
                  </div>
                  <ProgressBar 
                    value={policy.compliance} 
                    color={policy.compliance >= 90 ? 'emerald' : policy.compliance >= 80 ? 'orange' : 'red'} 
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <Button size="sm" variant="outline">View Violations</Button>
                    <Button size="sm">Auto-Remediate</Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Policy Actions */}
          <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="h-5 w-5 text-yellow-500" />
              <Title className="text-foreground">Automated Remediation</Title>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Auto-Tag Resources</span>
                  <Badge color="emerald" size="xs">ENABLED</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Automatically apply missing cost allocation tags</p>
                <div className="flex items-center gap-2 text-xs text-emerald-500">
                  <CheckCircle className="h-3 w-3" />
                  <span>142 resources tagged this week</span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Enforce RI Coverage</span>
                  <Badge color="emerald" size="xs">ENABLED</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Recommend RIs for stable workloads</p>
                <div className="flex items-center gap-2 text-xs text-emerald-500">
                  <CheckCircle className="h-3 w-3" />
                  <span>$8.4K potential savings identified</span>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* 3. Chargeback & Showback */}
        <TabsContent value="chargeback" className="space-y-6">
          <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <Title className="text-foreground">Team Cost Allocation</Title>
              </div>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
            
            <div className="space-y-4">
              {chargebackData.map((team) => (
                <div key={team.team} className="p-5 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">{team.team}</h4>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${team.total.toLocaleString()}</div>
                      <span className="text-xs text-muted-foreground">Monthly Total</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="text-xs text-muted-foreground mb-1">Compute</div>
                      <div className="text-lg font-bold">${team.compute.toLocaleString()}</div>
                      <div className="text-xs text-blue-500">{((team.compute/team.total)*100).toFixed(0)}%</div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <div className="text-xs text-muted-foreground mb-1">Storage</div>
                      <div className="text-lg font-bold">${team.storage.toLocaleString()}</div>
                      <div className="text-xs text-purple-500">{((team.storage/team.total)*100).toFixed(0)}%</div>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <div className="text-xs text-muted-foreground mb-1">Network</div>
                      <div className="text-lg font-bold">${team.network.toLocaleString()}</div>
                      <div className="text-xs text-orange-500">{((team.network/team.total)*100).toFixed(0)}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Allocation Methods */}
          <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <GitBranch className="h-5 w-5 text-emerald-500" />
              <Title className="text-foreground">Allocation Methods</Title>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-bold">Tag-Based</span>
                </div>
                <p className="text-xs text-muted-foreground">Allocate costs using resource tags (team, project, environment)</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-bold">Usage-Based</span>
                </div>
                <p className="text-xs text-muted-foreground">Proportional allocation based on actual resource consumption</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-bold">Fixed Allocation</span>
                </div>
                <p className="text-xs text-muted-foreground">Predefined percentages for shared infrastructure costs</p>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* 4. Commitment Management */}
        <TabsContent value="commitments" className="space-y-6">
          <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-500" />
                <Title className="text-foreground">Reserved Instances & Savings Plans</Title>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Total Savings:</span>
                <Badge color="emerald" size="lg">$30.1K/mo</Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              {commitments.map((commitment) => (
                <div key={commitment.type} className="p-5 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold">{commitment.type}</h4>
                      <p className="text-sm text-muted-foreground">
                        {commitment.expiring} days until next expiration
                      </p>
                    </div>
                    <Badge 
                      color={commitment.status === 'active' ? 'emerald' : 'orange'}
                      size="lg"
                    >
                      {commitment.status === 'active' ? 'Active' : 'Expiring Soon'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Coverage</div>
                      <div className="text-2xl font-bold">{commitment.coverage}%</div>
                      <ProgressBar value={commitment.coverage} color="emerald" className="mt-2" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Monthly Savings</div>
                      <div className="text-2xl font-bold text-emerald-500">${commitment.savings.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  {commitment.status === 'expiring-soon' && (
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium text-orange-500">Action Required</span>
                      </div>
                      <Button size="sm" variant="outline">Renew Now</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Commitment Recommendations */}
          <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <Title className="text-foreground">New Commitment Opportunities</Title>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">EC2 m5.2xlarge - us-east-1</h4>
                  <p className="text-xs text-muted-foreground mt-1">Stable usage for 90+ days</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-500">$2.4K/mo</div>
                  <span className="text-xs text-muted-foreground">potential savings</span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">RDS PostgreSQL db.r5.xlarge</h4>
                  <p className="text-xs text-muted-foreground mt-1">Production database - high utilization</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-500">$1.8K/mo</div>
                  <span className="text-xs text-muted-foreground">potential savings</span>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* 5. Automated Cost Optimization */}
        <TabsContent value="automation" className="space-y-6">
          <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <Title className="text-foreground">Automated Actions Log</Title>
              </div>
              <Badge color="emerald" size="lg">
                <CheckCircle className="h-3 w-3 mr-1" />
                $3.16K Saved This Week
              </Badge>
            </div>
            
            <div className="space-y-3">
              {automatedActions.map((action, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/30 border border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{action.action}</h4>
                      <p className="text-xs text-muted-foreground">{action.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-500">${action.savings}</div>
                    <span className="text-xs text-muted-foreground">saved</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Automation Rules */}
          <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                <Title className="text-foreground">Active Automation Rules</Title>
              </div>
              <Button size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Manage Rules
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">Stop Dev Instances</span>
                  <Badge color="emerald" size="xs">ACTIVE</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Weekdays 8PM - 8AM, All weekends</p>
                <div className="text-xs text-emerald-500">~$1.2K/mo savings</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">Delete Unused Volumes</span>
                  <Badge color="emerald" size="xs">ACTIVE</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Unattached for 7+ days</p>
                <div className="text-xs text-emerald-500">~$450/mo savings</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">Snapshot Lifecycle</span>
                  <Badge color="emerald" size="xs">ACTIVE</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Delete snapshots older than 90 days</p>
                <div className="text-xs text-emerald-500">~$280/mo savings</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">S3 Lifecycle Policies</span>
                  <Badge color="emerald" size="xs">ACTIVE</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Move to Glacier after 30 days</p>
                <div className="text-xs text-emerald-500">~$680/mo savings</div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* 6. Capacity Planning & Forecasting */}
        <TabsContent value="forecasting" className="space-y-6">
          <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                <Title className="text-foreground">6-Month Capacity Forecast</Title>
              </div>
              <Badge color="orange" size="lg">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Capacity Expansion Needed
              </Badge>
            </div>
            
            <BarChart
              className="h-80 mt-4"
              data={capacityForecast}
              index="month"
              categories={["predicted", "capacity"]}
              colors={["blue", "gray"]}
              valueFormatter={(number) => `$${(number/1000).toFixed(0)}K`}
              showLegend={true}
              showGridLines={true}
            />
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="text-xs text-muted-foreground mb-1">Capacity Alert</div>
                <div className="text-lg font-bold text-orange-500">October 2026</div>
                <p className="text-xs text-muted-foreground mt-2">Predicted to reach 99% capacity utilization</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="text-xs text-muted-foreground mb-1">Recommended Action</div>
                <div className="text-lg font-bold">Expand by 33%</div>
                <p className="text-xs text-muted-foreground mt-2">Add $25K monthly capacity by September</p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-xs text-muted-foreground mb-1">Growth Rate</div>
                <div className="text-lg font-bold text-emerald-500">+8.2%/mo</div>
                <p className="text-xs text-muted-foreground mt-2">Average monthly cost increase</p>
              </div>
            </div>
          </motion.div>

          {/* Scenario Planning */}
          <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Cloud className="h-5 w-5 text-blue-500" />
              <Title className="text-foreground">Scenario Planning</Title>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm">Conservative Growth (5%/mo)</h4>
                  <Badge color="emerald" size="xs">BEST CASE</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Dec 2026 Forecast:</span>
                  <span className="font-bold">$76K/mo</span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm">Expected Growth (8%/mo)</h4>
                  <Badge color="blue" size="xs">LIKELY</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Dec 2026 Forecast:</span>
                  <span className="font-bold">$88K/mo</span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm">Aggressive Growth (12%/mo)</h4>
                  <Badge color="orange" size="xs">WORST CASE</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Dec 2026 Forecast:</span>
                  <span className="font-bold">$104K/mo</span>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

// Made with Bob
