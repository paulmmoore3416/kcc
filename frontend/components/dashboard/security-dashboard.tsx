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
        <motion.div variants={item} className="k8s-card">
          <Text className="text-slate-400 font-medium">Active Alerts</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">3</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Badge color="red" className="bg-red-500/10 text-red-400 border-red-500/20">2 CRITICAL</Badge>
            <Badge color="orange" className="bg-orange-500/10 text-orange-400 border-orange-500/20">1 HIGH</Badge>
          </div>
        </motion.div>

        <motion.div variants={item} className="k8s-card">
          <Text className="text-slate-400 font-medium">Compliance Score</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary">94%</span>
          </div>
          <div className="mt-4">
            <span className="text-xs text-slate-500 font-medium tracking-wide">CIS KUBERNETES BENCHMARK</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="k8s-card">
          <Text className="text-slate-400 font-medium">eBPF Events</Text>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">12.4M</span>
          </div>
          <div className="mt-4 flex items-center gap-1">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-primary">SCANNING ACTIVE</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Alerts List */}
        <motion.div variants={item} className="k8s-card lg:col-span-7">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-500" />
              <Title className="text-white">Real-time Security Events</Title>
            </div>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-800 hover:border-${alert.color}-500/30 transition-all group`}>
                <div className={`mt-1 h-10 w-10 rounded-lg bg-${alert.color}-500/10 flex items-center justify-center flex-shrink-0`}>
                  <AlertTriangle className={`h-6 w-6 text-${alert.color}-500`} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-bold group-hover:text-primary transition-colors">{alert.type}</h4>
                    <span className="text-slate-500 text-xs font-medium">{alert.time}</span>
                  </div>
                  <p className="text-sm text-slate-400">{alert.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{alert.resource}</span>
                    <Badge color={alert.color as any} className={`bg-${alert.color}-500/10 text-${alert.color}-400 border-${alert.color}-500/20`}>
                      {alert.action}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Section */}
        <motion.div variants={item} className="k8s-card lg:col-span-5">
          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <Title className="text-white">Compliance Checks</Title>
          </div>
          
          <div className="space-y-3">
            {compliance.map((check) => (
              <div key={check.code} className="p-4 rounded-xl bg-slate-800/30 border border-slate-800 flex items-center justify-between group hover:bg-slate-800/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded flex items-center justify-center bg-${check.color}-500/10`}>
                    {check.status === 'Passed' ? <CheckCircle className={`h-4 w-4 text-${check.color}-500`} /> : <AlertTriangle className={`h-4 w-4 text-${check.color}-500`} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{check.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">{check.code}</p>
                  </div>
                </div>
                <Badge color={check.color as any} className={`bg-${check.color}-500/10 text-${check.color}-400 border-${check.color}-500/20`}>
                  {check.status}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="h-4 w-4 text-primary" />
              <p className="text-xs font-bold text-white">Security Posture</p>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Automated scanning is currently covering 98% of your production resources. 2 vulnerabilities require immediate attention.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
