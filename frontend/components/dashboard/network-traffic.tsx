'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { Network, TrendingUp, TrendingDown } from 'lucide-react'

echarts.use([BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent, DatasetComponent, CanvasRenderer])

export function NetworkTraffic() {
  const darkModeColors = {
    primary: '#00d9ff',
    secondary: '#8b5cf6',
    tertiary: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    background: '#1f2937',
    gridColor: '#374151',
    textColor: '#e8eef2',
  }

  const networkOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: darkModeColors.gridColor,
      textStyle: { color: darkModeColors.textColor },
    },
    legend: {
      data: ['Inbound', 'Outbound'],
      textStyle: { color: darkModeColors.textColor },
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    yAxis: {
      type: 'value',
      name: 'Traffic (Mbps)',
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      splitLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    series: [
      {
        name: 'Inbound',
        type: 'line',
        smooth: true,
        data: [520, 632, 801, 934, 1090, 1200, 1080],
        itemStyle: { color: darkModeColors.primary },
        lineStyle: { color: darkModeColors.primary, width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 217, 255, 0.3)' },
            { offset: 1, color: 'rgba(0, 217, 255, 0.05)' },
          ]),
        },
      },
      {
        name: 'Outbound',
        type: 'line',
        smooth: true,
        data: [320, 302, 301, 334, 390, 330, 320],
        itemStyle: { color: darkModeColors.secondary },
        lineStyle: { color: darkModeColors.secondary, width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(139, 92, 246, 0.3)' },
            { offset: 1, color: 'rgba(139, 92, 246, 0.05)' },
          ]),
        },
      },
    ],
  }

  return (
    <div className="space-y-4">
      <Card className="border-border bg-card/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5 text-primary" />
                Network Traffic
              </CardTitle>
              <CardDescription>Real-time inbound and outbound traffic</CardDescription>
            </div>
            <div className="flex gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Peak: 1,200 Mbps</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-secondary" />
                  <span className="text-sm text-muted-foreground">Current: 945 Mbps</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ height: '300px' }}>
            <ReactEChartsCore
              echarts={echarts}
              option={networkOption}
              notMerge={true}
              lazyUpdate={true}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Bandwidth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856 Mbps</div>
            <Badge className="mt-2 bg-green-500/20 text-green-300">↓ 12% from yesterday</Badge>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Packet Loss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.02%</div>
            <Badge className="mt-2 bg-green-500/20 text-green-300">Excellent</Badge>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Latency (p95)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4ms</div>
            <Badge className="mt-2 bg-green-500/20 text-green-300">Optimal</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
