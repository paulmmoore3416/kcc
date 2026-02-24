'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Shield, CheckCircle } from 'lucide-react'

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

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-warm-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-red-100 text-red-800">2 Critical</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">1 High</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warm-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground mt-2">
              CIS Kubernetes Benchmark
            </p>
          </CardContent>
        </Card>

        <Card className="border-warm-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">eBPF Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4M</div>
            <p className="text-xs text-muted-foreground mt-2">
              Events processed today
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle>Security Alerts</CardTitle>
          <CardDescription>Real-time security events and violations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start space-x-4 p-4 border rounded-lg ${
                  alert.severity === 'Critical'
                    ? 'border-red-200 bg-red-50'
                    : alert.severity === 'High'
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-blue-200 bg-blue-50'
                }`}
              >
                <AlertTriangle
                  className={`h-5 w-5 mt-0.5 ${
                    alert.severity === 'Critical'
                      ? 'text-red-600'
                      : alert.severity === 'High'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">{alert.type}</h4>
                    <Badge
                      className={
                        alert.severity === 'Critical'
                          ? 'bg-red-100 text-red-800'
                          : alert.severity === 'High'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{alert.resource}</span>
                    <span className="text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-xs text-green-700 font-semibold mt-2">
                    Action taken: {alert.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle>Compliance Checks</CardTitle>
          <CardDescription>CIS Kubernetes Benchmark v1.8</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Anonymous access disabled</p>
                  <p className="text-xs text-muted-foreground">CIS 1.2.1</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Passed</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Cluster-admin role restriction</p>
                  <p className="text-xs text-muted-foreground">CIS 5.1.1</p>
                </div>
              </div>
              <Badge className="bg-red-100 text-red-800">Failed</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Privilege escalation restricted</p>
                  <p className="text-xs text-muted-foreground">CIS 5.2.2</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Passed</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Network policies enforced</p>
                  <p className="text-xs text-muted-foreground">CIS 5.3.1</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Passed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
