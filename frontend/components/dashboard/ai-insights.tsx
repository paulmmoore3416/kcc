'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Brain, Lightbulb, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface AIInsightsProps {
  onAction?: (actionId: string, type: string) => void
}

export function AIInsights({ onAction }: AIInsightsProps) {
  const { toast } = useToast()
  
  const insights = [
    {
      id: 'opt-1',
      type: 'optimization',
      title: 'Pod Density Optimization Opportunity',
      description: 'Detected 3 pods with low resource utilization that could be consolidated',
      impact: 'Potential 15% cost savings',
      icon: Lightbulb,
      action: 'Review consolidation plan',
      confidence: 92,
    },
    {
      id: 'ano-1',
      type: 'anomaly',
      title: 'Unusual Traffic Pattern Detected',
      description: 'Network egress from prod-db spiked 300% in the last 30 minutes',
      impact: 'Requires immediate investigation',
      icon: AlertTriangle,
      action: 'View traffic analysis',
      confidence: 88,
    },
    {
      id: 'rec-1',
      type: 'recommendation',
      title: 'Upgrade Memory Allocation',
      description: 'Cluster-monitoring pods experiencing memory pressure. Recommend 2GB → 4GB',
      impact: 'Improve reliability & reduce OOM events',
      icon: TrendingUp,
      action: 'Apply recommendation',
      confidence: 95,
    },
    {
      id: 'suc-1',
      type: 'success',
      title: 'Cost Hedge Successfully Executed',
      description: 'Kraken AI predicted $5,000 cost spike. Auto-hedged with xStocks positions.',
      impact: 'Protected infrastructure margins by 3.2%',
      icon: CheckCircle,
      action: 'View hedge details',
      confidence: 100,
    },
  ]

  const handleAction = (id: string, type: string, title: string) => {
    toast({
      title: "Action Initiated",
      description: `Executing: ${title}`,
      variant: "default",
    })
    if (onAction) {
      onAction(id, type)
    }
  }

  const getStylesForType = (type: string) => {
    switch (type) {
      case 'optimization':
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          badge: 'bg-blue-500/20 text-blue-300',
          icon: 'text-blue-400',
        }
      case 'anomaly':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          badge: 'bg-red-500/20 text-red-300',
          icon: 'text-red-400',
        }
      case 'recommendation':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          badge: 'bg-amber-500/20 text-amber-300',
          icon: 'text-amber-400',
        }
      case 'success':
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          badge: 'bg-green-500/20 text-green-300',
          icon: 'text-green-400',
        }
      default:
        return {
          bg: 'bg-slate-500/10',
          border: 'border-slate-500/30',
          badge: 'bg-slate-500/20 text-slate-300',
          icon: 'text-slate-400',
        }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Brain className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI-Powered Insights</h2>
          <p className="text-sm text-muted-foreground">Gemini 1.5 Pro Analysis & Recommendations</p>
        </div>
      </div>

      <div className="grid gap-4">
        {insights.map((insight) => {
          const styles = getStylesForType(insight.type)
          const Icon = insight.icon

          return (
            <Card
              key={insight.id}
              className={`border-2 ${styles.border} ${styles.bg} hover:border-primary/50 transition-all cursor-pointer`}
            >
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Icon className={`h-6 w-6 flex-shrink-0 ${styles.icon} mt-1`} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className={styles.badge}>{insight.impact}</Badge>
                          <Badge variant="outline" className="text-xs">
                            Confidence: {insight.confidence}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/10 text-primary"
                      onClick={() => handleAction(insight.id, insight.type, insight.title)}
                    >
                      {insight.action}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
