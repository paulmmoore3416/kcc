'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Shield, CheckCircle, Lock, Eye, Activity, ShieldCheck, ShieldAlert } from 'lucide-react'
import { Card as TremorCard, Title, Text, Badge, List, ListItem, Flex } from '@tremor/react'

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

export function SecurityDashboard() {
  const getSeverityColor = (color: string) => {
    switch (color) {
      case 'red': return {
        bg: 'bg-destructive/10',
        text: 'text-destructive',
        border: 'border-destructive/20',
        hoverBorder: 'hover:border-destructive/30'
      }
      case 'orange': return {
        bg: 'bg-orange-500/10',
        text: 'text-orange-500',
        border: 'border-orange-500/20',
        hoverBorder: 'hover:border-orange-500/30'
      }
      case 'blue': return {
        bg: 'bg-blue-500/10',
        text: 'text-blue-500',
        border: 'border-blue-500/20',
        hoverBorder: 'hover:border-blue-500/30'
      }
      case 'emerald': return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-500',
        border: 'border-emerald-500/20',
        hoverBorder: 'hover:border-emerald-500/30'
      }
      default: return {
        bg: 'bg-muted/10',
        text: 'text-muted-foreground',
        border: 'border-border',
        hoverBorder: 'hover:border-primary/30'
      }
    }
  }

  const alerts = [
    {
      id: 1,
      severity: 'Critical',
      type: 'Suspicious Process Execution',
      description: "Pod 'web-app-pod' executed unexpected binary '/tmp/cryptominer'",
      resource: 'pod/web-app-pod',
      time: '15m ago',
      action: 'Pod automatically isolated',
      color: 'red',
    },
    {
      id: 2,
      severity: 'High',
      type: 'Network Policy Violation',
      description: 'Unauthorized egress traffic detected from namespace production',
      resource: 'namespace/production',
      time: '1h ago',
      action: 'Traffic blocked',
      color: 'orange',
    },
    {
      id: 3,
      severity: 'Medium',
      type: 'CVE Detected',
      description: 'Container image contains CVE-2024-1234 (Log4j vulnerability)',
      resource: 'deployment/legacy-app',
      time: '2h ago',
      action: 'Update required',
      color: 'blue',
    },
  ]

  const compliance = [
    { name: 'Anonymous access disabled', code: 'CIS 1.2.1', status: 'Passed', color: 'emerald' },
    { name: 'Cluster-admin role restriction', code: 'CIS 5.1.1', status: 'Failed', color: 'red' },
    { name: 'Privilege escalation restricted', code: 'CIS 5.2.2', status: 'Passed', color: 'emerald' },
    { name: 'Network policies enforced', code: 'CIS 5.3.1', status: 'Passed', color: 'emerald' },
  ]

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Security Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <Text className="text-muted-foreground font-medium">Active Alerts</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold">3</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Badge color="red" className="bg-destructive/10 text-destructive border-destructive/20">2 CRITICAL</Badge>
            <Badge color="orange" className="bg-orange-500/10 text-orange-400 border-orange-500/20">1 HIGH</Badge>
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <Text className="text-muted-foreground font-medium">Compliance Score</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary">94%</span>
          </div>
          <div className="mt-4">
            <span className="text-xs text-muted-foreground font-medium tracking-wide">CIS KUBERNETES BENCHMARK</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm">
          <Text className="text-muted-foreground font-medium">eBPF Events</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold">12.4M</span>
          </div>
          <div className="mt-4 flex items-center gap-1">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-primary">SCANNING ACTIVE</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Alerts List */}
        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm lg:col-span-7">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-destructive" />
              <Title className="text-foreground">Real-time Security Events</Title>
            </div>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => {
              const colors = getSeverityColor(alert.color)
              return (
                <div key={alert.id} className={`flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border ${colors.hoverBorder} transition-all group`}>
                  <div className={`mt-1 h-10 w-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <AlertTriangle className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold group-hover:text-primary transition-colors">{alert.type}</h4>
                      <span className="text-muted-foreground text-xs font-medium">{alert.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{alert.resource}</span>
                      <Badge color={alert.color as any} className={`${colors.bg} ${colors.text} ${colors.border}`}>
                        {alert.action}
                      </Badge>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Compliance Section */}
        <motion.div variants={item} className="rounded-xl border border-border bg-card/50 p-6 shadow-sm lg:col-span-5">
          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <Title className="text-foreground">Compliance Checks</Title>
          </div>
          
          <div className="space-y-3">
            {compliance.map((check) => {
              const colors = getSeverityColor(check.color)
              return (
                <div key={check.code} className="p-4 rounded-xl bg-muted/30 border border-border flex items-center justify-between group hover:bg-muted/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded flex items-center justify-center ${colors.bg}`}>
                      {check.status === 'Passed' ? <CheckCircle className={`h-4 w-4 ${colors.text}`} /> : <AlertTriangle className={`h-4 w-4 ${colors.text}`} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold group-hover:text-primary transition-colors">{check.name}</p>
                      <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">{check.code}</p>
                    </div>
                  </div>
                  <Badge color={check.color as any} className={`${colors.bg} ${colors.text} ${colors.border}`}>
                    {check.status}
                  </Badge>
                </div>
              )
            })}
          </div>
          
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="h-4 w-4 text-primary" />
              <p className="text-xs font-bold">Security Posture</p>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Automated scanning is currently covering 98% of your production resources. 2 vulnerabilities require immediate attention.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
