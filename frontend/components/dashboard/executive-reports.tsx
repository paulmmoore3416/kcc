'use client'

import { motion } from 'framer-motion'
import { FileText, Download, Mail, Calendar, TrendingUp, DollarSign, PieChart, BarChart3, Users, Building2, Clock } from 'lucide-react'
import { Card as TremorCard, Title, Text, AreaChart, Badge, Flex } from '@tremor/react'
import { Button } from '@/components/ui/button'

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

export function ExecutiveReports() {
  // Executive summary data
  const quarterlyTrend = [
    { month: 'Jan', spend: 52000, budget: 55000, forecast: 53000 },
    { month: 'Feb', spend: 54500, budget: 55000, forecast: 54800 },
    { month: 'Mar', spend: 53800, budget: 55000, forecast: 54200 },
    { month: 'Apr', spend: 58200, budget: 60000, forecast: 59000 },
    { month: 'May', spend: 59400, budget: 60000, forecast: 59800 },
    { month: 'Jun', spend: 56445, budget: 60000, forecast: 57500 },
  ]

  const reportTemplates = [
    {
      id: 'exec-monthly',
      name: 'Monthly Executive Summary',
      description: 'High-level overview of cloud spending, trends, and key metrics',
      frequency: 'Monthly',
      recipients: 'C-Suite, Finance',
      lastGenerated: '2 days ago',
      format: ['PDF', 'PowerPoint'],
      sections: ['Cost Overview', 'Trend Analysis', 'Top Spenders', 'Savings Opportunities', 'Forecasts'],
      automated: true
    },
    {
      id: 'dept-breakdown',
      name: 'Department Cost Breakdown',
      description: 'Detailed cost allocation by department and project',
      frequency: 'Weekly',
      recipients: 'Department Heads',
      lastGenerated: '1 day ago',
      format: ['Excel', 'PDF'],
      sections: ['Department Costs', 'Project Allocation', 'Resource Usage', 'Chargeback Details'],
      automated: true
    },
    {
      id: 'optimization',
      name: 'Optimization Opportunities Report',
      description: 'AI-identified cost savings and efficiency improvements',
      frequency: 'Weekly',
      recipients: 'Engineering, FinOps',
      lastGenerated: '3 hours ago',
      format: ['PDF', 'CSV'],
      sections: ['Rightsizing Recommendations', 'Idle Resources', 'Reserved Instance Analysis', 'Spot Instance Opportunities'],
      automated: true
    },
    {
      id: 'compliance',
      name: 'Compliance & Governance Report',
      description: 'Policy adherence, tagging compliance, and budget alerts',
      frequency: 'Monthly',
      recipients: 'Compliance, Finance',
      lastGenerated: '5 days ago',
      format: ['PDF'],
      sections: ['Policy Violations', 'Tagging Compliance', 'Budget Status', 'Anomaly Detection'],
      automated: true
    },
    {
      id: 'quarterly-board',
      name: 'Quarterly Board Report',
      description: 'Strategic overview for board meetings and investors',
      frequency: 'Quarterly',
      recipients: 'Board of Directors',
      lastGenerated: '15 days ago',
      format: ['PowerPoint', 'PDF'],
      sections: ['Financial Summary', 'Strategic Initiatives', 'ROI Analysis', 'Future Projections'],
      automated: false
    }
  ]

  const scheduledReports = [
    {
      name: 'Monthly Executive Summary',
      nextRun: 'Tomorrow at 9:00 AM',
      recipients: 5,
      status: 'scheduled'
    },
    {
      name: 'Weekly Department Breakdown',
      nextRun: 'Friday at 5:00 PM',
      recipients: 12,
      status: 'scheduled'
    },
    {
      name: 'Optimization Report',
      nextRun: 'In 3 hours',
      recipients: 8,
      status: 'scheduled'
    }
  ]

  const keyMetrics = {
    totalSpend: 56445,
    budgetUtilization: 94.1,
    savingsIdentified: 12400,
    forecastAccuracy: 96.8,
    reportsSent: 47,
    activeRecipients: 28
  }

  const handleExport = (format: string, reportId: string) => {
    console.log(`Exporting ${reportId} as ${format}`)
    // In production, this would trigger actual export
  }

  const handleSchedule = (reportId: string) => {
    console.log(`Scheduling report ${reportId}`)
    // In production, this would open scheduling modal
  }

  const handleSendNow = (reportId: string) => {
    console.log(`Sending report ${reportId} immediately`)
    // In production, this would trigger immediate report generation and sending
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
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Executive Reporting Suite</h2>
            <p className="text-sm text-muted-foreground">Automated insights and analytics for stakeholders</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-blue-500" />
            <Text className="text-muted-foreground font-medium text-xs">Total Spend</Text>
          </div>
          <div className="text-2xl font-bold">${(keyMetrics.totalSpend / 1000).toFixed(1)}K</div>
          <div className="text-xs text-muted-foreground mt-1">This month</div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="h-4 w-4 text-emerald-500" />
            <Text className="text-muted-foreground font-medium text-xs">Budget Used</Text>
          </div>
          <div className="text-2xl font-bold">{keyMetrics.budgetUtilization}%</div>
          <div className="text-xs text-muted-foreground mt-1">Of allocated</div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <Text className="text-muted-foreground font-medium text-xs">Savings ID'd</Text>
          </div>
          <div className="text-2xl font-bold">${(keyMetrics.savingsIdentified / 1000).toFixed(1)}K</div>
          <div className="text-xs text-muted-foreground mt-1">Opportunities</div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-4 w-4 text-orange-500" />
            <Text className="text-muted-foreground font-medium text-xs">Forecast Accuracy</Text>
          </div>
          <div className="text-2xl font-bold">{keyMetrics.forecastAccuracy}%</div>
          <div className="text-xs text-muted-foreground mt-1">Last quarter</div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-cyan-500" />
            <Text className="text-muted-foreground font-medium text-xs">Reports Sent</Text>
          </div>
          <div className="text-2xl font-bold">{keyMetrics.reportsSent}</div>
          <div className="text-xs text-muted-foreground mt-1">This month</div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-pink-500" />
            <Text className="text-muted-foreground font-medium text-xs">Recipients</Text>
          </div>
          <div className="text-2xl font-bold">{keyMetrics.activeRecipients}</div>
          <div className="text-xs text-muted-foreground mt-1">Active users</div>
        </motion.div>
      </div>

      {/* Quarterly Trend Chart */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
        <Flex justifyContent="between" alignItems="center" className="mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <Title className="text-foreground">Quarterly Financial Overview</Title>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Chart
            </Button>
          </div>
        </Flex>
        <AreaChart
          className="h-80 mt-4"
          data={quarterlyTrend}
          index="month"
          categories={["spend", "budget", "forecast"]}
          colors={["blue", "gray", "emerald"]}
          valueFormatter={(number) => `$${(number / 1000).toFixed(1)}K`}
          showLegend={true}
          showGridLines={true}
          curveType="monotone"
        />
      </motion.div>

      {/* Report Templates */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-500" />
            <Title className="text-foreground">Report Templates</Title>
          </div>
          <Badge color="indigo" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20">
            {reportTemplates.length} TEMPLATES
          </Badge>
        </div>

        <div className="space-y-4">
          {reportTemplates.map((report) => (
            <div 
              key={report.id}
              className="p-5 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-lg">{report.name}</h4>
                    {report.automated && (
                      <Badge color="emerald" size="xs">
                        AUTOMATED
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Frequency: </span>
                      <span className="font-semibold">{report.frequency}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Recipients: </span>
                      <span className="font-semibold">{report.recipients}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Generated: </span>
                      <span className="font-semibold">{report.lastGenerated}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Formats: </span>
                      <span className="font-semibold">{report.format.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4 pt-3 border-t border-border/50">
                <Text className="text-xs text-muted-foreground mb-2">Report Sections:</Text>
                <div className="flex flex-wrap gap-2">
                  {report.sections.map((section, idx) => (
                    <Badge key={idx} color="blue" size="xs" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                      {section}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {report.format.map((format) => (
                  <Button 
                    key={format}
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport(format, report.id)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Export {format}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSchedule(report.id)}
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  Schedule
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleSendNow(report.id)}
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Send Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scheduled Reports */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <Title className="text-foreground">Scheduled Reports</Title>
          </div>
          <Badge color="orange" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
            {scheduledReports.length} UPCOMING
          </Badge>
        </div>

        <div className="space-y-3">
          {scheduledReports.map((scheduled, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h5 className="font-semibold">{scheduled.name}</h5>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {scheduled.nextRun}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {scheduled.recipients} recipients
                    </span>
                  </div>
                </div>
              </div>
              <Badge color="orange" size="xs">
                {scheduled.status.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Custom Report Builder CTA */}
      <motion.div variants={item} className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Need a Custom Report?</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered report builder can create custom analytics tailored to your organization's specific needs. 
              Choose metrics, visualizations, and delivery schedules that matter most to your stakeholders.
            </p>
          </div>
          <Button size="lg">
            <FileText className="h-4 w-4 mr-2" />
            Launch Report Builder
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Made with Bob
