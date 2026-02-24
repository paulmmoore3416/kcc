'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
])

export function MetricsCharts() {
  const realtimeOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['CPU', 'Memory', 'Network'],
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 20 }, (_, i) => `${i}s`),
    },
    yAxis: {
      type: 'value',
      name: 'Usage %',
    },
    series: [
      {
        name: 'CPU',
        type: 'line',
        smooth: true,
        data: [65, 67, 64, 68, 70, 72, 69, 71, 73, 75, 74, 76, 78, 77, 75, 73, 71, 70, 72, 74],
        itemStyle: { color: '#ee7e18' },
      },
      {
        name: 'Memory',
        type: 'line',
        smooth: true,
        data: [78, 79, 80, 81, 80, 82, 81, 83, 84, 85, 84, 86, 85, 87, 86, 85, 84, 83, 82, 81],
        itemStyle: { color: '#e0640e' },
      },
      {
        name: 'Network',
        type: 'line',
        smooth: true,
        data: [45, 48, 46, 49, 52, 50, 53, 51, 54, 56, 55, 57, 59, 58, 56, 54, 52, 50, 48, 46],
        itemStyle: { color: '#f2993b' },
      },
    ],
  }

  return (
    <div className="space-y-4">
      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle>Real-Time Metrics</CardTitle>
          <CardDescription>Live cluster resource utilization (streaming via gRPC)</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactEChartsCore
            echarts={echarts}
            option={realtimeOption}
            style={{ height: '400px' }}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-warm-200">
          <CardHeader>
            <CardTitle>Network Throughput</CardTitle>
            <CardDescription>Ingress and egress traffic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Ingress</span>
                  <span className="text-sm font-semibold">2.4 Gbps</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Egress</span>
                  <span className="text-sm font-semibold">1.8 Gbps</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '58%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warm-200">
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
            <CardDescription>Persistent volume consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Total Capacity</span>
                  <span className="text-sm font-semibold">10 TiB</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Used</span>
                  <span className="text-sm font-semibold">6.8 TiB (68%)</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '68%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
