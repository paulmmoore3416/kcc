'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { TrendingDown, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

echarts.use([
  LineChart,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
])

export function CostDashboard() {
  // Professional dark mode colors for charts
  const darkModeColors = {
    primary: '#00d9ff',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    background: '#1f2937',
    gridColor: '#374151',
    textColor: '#e8eef2',
  }

  const costTrendOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: darkModeColors.gridColor,
      textStyle: { color: darkModeColors.textColor },
      formatter: (params: any) => {
        if (params.length) {
          return `${params[0].name}<br/>Cost: <span style="color: ${darkModeColors.primary};">$${params[0].value.toLocaleString()}</span>`
        }
        return ''
      },
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      boundaryGap: false,
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    yAxis: {
      type: 'value',
      name: 'Cost (USD)',
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      splitLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    series: [
      {
        name: 'Monthly Cost',
        type: 'line',
        smooth: true,
        data: [52000, 54500, 53800, 58200, 59400, 56445],
        itemStyle: {
          color: darkModeColors.primary,
        },
        lineStyle: {
          color: darkModeColors.primary,
          width: 3,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 217, 255, 0.3)' },
            { offset: 1, color: 'rgba(0, 217, 255, 0.05)' },
          ]),
        },
      },
    ],
  }

  const costByNamespaceOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: darkModeColors.gridColor,
      textStyle: { color: darkModeColors.textColor },
    },
    xAxis: {
      type: 'category',
      data: ['production', 'staging', 'development', 'monitoring', 'ingress'],
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    yAxis: {
      type: 'value',
      name: 'Cost ($)',
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      splitLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    series: [
      {
        name: 'Monthly Cost',
        type: 'bar',
        data: [28500, 12800, 8450, 4200, 2495],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: darkModeColors.secondary },
            { offset: 1, color: darkModeColors.primary },
          ]),
          borderRadius: [6, 6, 0, 0],
        },
      },
    ],
  }

  const costPieOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: darkModeColors.gridColor,
      textStyle: { color: darkModeColors.textColor },
    },
    series: [
      {
        name: 'Cost Distribution',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: [10, 10],
          borderColor: '#1f2937',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold',
            color: darkModeColors.textColor,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 28500, name: 'Production', itemStyle: { color: darkModeColors.primary } },
          { value: 12800, name: 'Staging', itemStyle: { color: darkModeColors.secondary } },
          { value: 8450, name: 'Development', itemStyle: { color: '#06b6d4' } },
          { value: 4200, name: 'Monitoring', itemStyle: { color: '#10b981' } },
          { value: 2495, name: 'Ingress', itemStyle: { color: '#8b5cf6' } },
        ],
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card/50 hover:border-primary/50 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$56,445</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">-5.0%</span> vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 hover:border-secondary/50 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Forecast (Next Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$57,234</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-orange-400" />
              <span className="text-orange-400">+1.4%</span> projected increase
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 hover:border-primary/50 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cost per Pod</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$45.26</div>
            <p className="text-xs text-muted-foreground mt-2">
              Average across all namespaces
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 hover:border-secondary/50 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Potential Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-400">$8,950</div>
            <p className="text-xs text-muted-foreground mt-2">
              From rightsizing recommendations
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Cost Trend</CardTitle>
            <CardDescription className="text-muted-foreground">Monthly spending over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactEChartsCore
              echarts={echarts}
              option={costTrendOption}
              style={{ height: '320px' }}
            />
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Cost by Namespace</CardTitle>
            <CardDescription className="text-muted-foreground">Current month breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactEChartsCore
              echarts={echarts}
              option={costByNamespaceOption}
              style={{ height: '320px' }}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Cost Distribution by Namespace</CardTitle>
          <CardDescription className="text-muted-foreground">Visual breakdown of spending</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactEChartsCore
            echarts={echarts}
            option={costPieOption}
            style={{ height: '300px' }}
          />
        </CardContent>
      </Card>

      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Cost Optimization Recommendations</CardTitle>
          <CardDescription className="text-muted-foreground">AI-powered suggestions to reduce spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 border border-border rounded-lg bg-background/50 hover:bg-background transition-colors">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Rightsize Over-Provisioned Pods</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  12 pods are using less than 30% of their requested resources
                </p>
                <Badge className="bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30">
                  Potential savings: $3,450/month
                </Badge>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border border-border rounded-lg bg-background/50 hover:bg-background transition-colors">
              <AlertCircle className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Remove Idle Test Environment</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  'test-env' namespace has been idle for 14 days
                </p>
                <Badge className="bg-orange-400/20 text-orange-400 hover:bg-orange-400/30">
                  Potential savings: $2,800/month
                </Badge>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border border-border rounded-lg bg-background/50 hover:bg-background transition-colors">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Use Spot Instances</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Non-critical workloads can use spot instances for 70% cost reduction
                </p>
                <Badge className="bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30">
                  Potential savings: $2,700/month
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
