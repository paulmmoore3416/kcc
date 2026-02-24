'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { LineChart, BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
])

export function CostDashboard() {
  const costTrendOption = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        return `${params[0].name}<br/>Cost: $${params[0].value}`
      },
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: {
      type: 'value',
      name: 'Cost (USD)',
    },
    series: [
      {
        name: 'Monthly Cost',
        type: 'line',
        smooth: true,
        data: [52000, 54500, 53800, 58200, 59400, 56445],
        itemStyle: {
          color: '#22c55e',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(34, 197, 94, 0.3)' },
            { offset: 1, color: 'rgba(34, 197, 94, 0.05)' },
          ]),
        },
      },
    ],
  }

  const costByNamespaceOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: ['production', 'staging', 'development', 'monitoring', 'ingress'],
    },
    yAxis: {
      type: 'value',
      name: 'Cost ($)',
    },
    series: [
      {
        name: 'Monthly Cost',
        type: 'bar',
        data: [28500, 12800, 8450, 4200, 2495],
        itemStyle: {
          color: '#ee7e18',
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-warm-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$56,445</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">-5.0%</span> vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-warm-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Forecast (Next Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$57,234</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-600">+1.4%</span> projected increase
            </p>
          </CardContent>
        </Card>

        <Card className="border-warm-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cost per Pod</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45.26</div>
            <p className="text-xs text-muted-foreground mt-1">
              Average across all namespaces
            </p>
          </CardContent>
        </Card>

        <Card className="border-warm-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$8,950</div>
            <p className="text-xs text-muted-foreground mt-1">
              From rightsizing recommendations
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-warm-200">
          <CardHeader>
            <CardTitle>Cost Trend</CardTitle>
            <CardDescription>Monthly spending over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactEChartsCore
              echarts={echarts}
              option={costTrendOption}
              style={{ height: '300px' }}
            />
          </CardContent>
        </Card>

        <Card className="border-warm-200">
          <CardHeader>
            <CardTitle>Cost by Namespace</CardTitle>
            <CardDescription>Current month breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactEChartsCore
              echarts={echarts}
              option={costByNamespaceOption}
              style={{ height: '300px' }}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle>Cost Optimization Recommendations</CardTitle>
          <CardDescription>AI-powered suggestions to reduce spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Rightsize Over-Provisioned Pods</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  12 pods are using less than 30% of their requested resources
                </p>
                <p className="text-sm font-semibold text-green-600">Potential savings: $3,450/month</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Remove Idle Test Environment</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  'test-env' namespace has been idle for 14 days
                </p>
                <p className="text-sm font-semibold text-green-600">Potential savings: $2,800/month</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Use Spot Instances</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Non-critical workloads can use spot instances
                </p>
                <p className="text-sm font-semibold text-green-600">Potential savings: $2,700/month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
