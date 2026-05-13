'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Shield, CheckCircle, Lock, Eye } from 'lucide-react'

export function SecurityDashboard() {
  const alerts = [
    {
      id: 1,
      severity: 'Critical',
      type: 'Suspicious Process Execution',
      description: "Pod 'web-app-pod' executed unexpected binary '/tmp/cryptominer'",
      resource: 'pod/web-app-pod',
      time: '15 minutes ago',
      action: 'Pod automatically isolated',
    },
    {
      id: 2,
      severity: 'High',
      type: 'Network Policy Violation',
      description: 'Unauthorized egress traffic detected from namespace production',
      resource: 'namespace/production',
      time: '1 hour ago',
      action: 'Traffic blocked',
    },
    {
      id: 3,
      severity: 'Medium',
      type: 'CVE Detected',
      description: 'Container image contains CVE-2024-1234 (Log4j vulnerability)',
      resource: 'deployment/legacy-app',
      time: '2 hours ago',
      action: 'Update required',
    },
  ]

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          badge: 'bg-red-500/20 text-red-300',
          icon: 'text-red-400',
        }
      case 'High':
        return {
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          badge: 'bg-orange-500/20 text-orange-300',
          icon: 'text-orange-400',
        }
      case 'Medium':
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          badge: 'bg-blue-500/20 text-blue-300',
          icon: 'text-blue-400',
        }
      default:
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          badge: 'bg-green-500/20 text-green-300',
          icon: 'text-green-400',
        }
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card/50 hover:border-red-500/50 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">3</div>
            <div className="flex items-center space-x-2 mt-3 gap-2">
              <Badge className="bg-red-500/20 text-red-300 hover:bg-red-500/30">2 Critical</Badge>
              <Badge className="bg-orange-500/20 text-orange-300 hover:bg-orange-500/30">1 High</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 hover:border-primary/50 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">94%</div>
            <p className="text-xs text-muted-foreground mt-2">
              CIS Kubernetes Benchmark
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 hover:border-secondary/50 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">eBPF Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">12.4M</div>
            <p className="text-xs text-muted-foreground mt-2">
              Events processed today
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Security Alerts</CardTitle>
          <CardDescription className="text-muted-foreground">Real-time security events and violations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => {
              const styles = getSeverityStyles(alert.severity)
              return (
                <div
                  key={alert.id}
                  className={`flex items-start space-x-4 p-4 border rounded-lg ${styles.bg} ${styles.border} hover:bg-opacity-20 transition-all`}
                >
                  <AlertTriangle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${styles.icon}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <h4 className="font-semibold text-foreground truncate">{alert.type}</h4>
                      <Badge className={`${styles.badge} hover:opacity-80 flex-shrink-0`}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between text-xs gap-2 mb-2">
                      <span className="text-muted-foreground truncate">{alert.resource}</span>
                      <span className="text-muted-foreground flex-shrink-0">{alert.time}</span>
                    </div>
                    <p className="text-xs text-emerald-400 font-semibold">
                      ✓ Action taken: {alert.action}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Compliance Checks</CardTitle>
          <CardDescription className="text-muted-foreground">CIS Kubernetes Benchmark v1.8</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/30 hover:bg-background/50 transition-colors">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Anonymous access disabled</p>
                  <p className="text-xs text-muted-foreground">CIS 1.2.1</p>
                </div>
              </div>
              <Badge className="bg-emerald-400/20 text-emerald-300 hover:bg-emerald-400/30 flex-shrink-0">
                Passed
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 border border-red-500/30 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Cluster-admin role restriction</p>
                  <p className="text-xs text-muted-foreground">CIS 5.1.1</p>
                </div>
              </div>
              <Badge className="bg-red-500/20 text-red-300 hover:bg-red-500/30 flex-shrink-0">
                Failed
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/30 hover:bg-background/50 transition-colors">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Privilege escalation restricted</p>
                  <p className="text-xs text-muted-foreground">CIS 5.2.2</p>
                </div>
              </div>
              <Badge className="bg-emerald-400/20 text-emerald-300 hover:bg-emerald-400/30 flex-shrink-0">
                Passed
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/30 hover:bg-background/50 transition-colors">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Network policies enforced</p>
                  <p className="text-xs text-muted-foreground">CIS 5.3.1</p>
                </div>
              </div>
              <Badge className="bg-emerald-400/20 text-emerald-300 hover:bg-emerald-400/30 flex-shrink-0">
                Passed
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
