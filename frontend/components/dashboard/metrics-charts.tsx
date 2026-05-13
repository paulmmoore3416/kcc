'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { LineChart, BarChart, GaugeChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { AlertTriangle, TrendingUp } from 'lucide-react'

echarts.use([
  LineChart,
  BarChart,
  GaugeChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
])

export function MetricsCharts() {
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

  const realtimeOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: darkModeColors.gridColor,
      textStyle: { color: darkModeColors.textColor },
    },
    legend: {
      data: ['CPU Usage', 'Memory Usage', 'Network I/O'],
      textStyle: { color: darkModeColors.textColor },
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 20 }, (_, i) => `${i}s`),
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    yAxis: {
      type: 'value',
      name: 'Usage %',
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      splitLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    series: [
      {
        name: 'CPU Usage',
        type: 'line',
        smooth: true,
        data: [65, 67, 64, 68, 70, 72, 69, 71, 73, 75, 74, 76, 78, 77, 75, 73, 71, 70, 72, 74],
        itemStyle: { color: darkModeColors.primary },
        lineStyle: { color: darkModeColors.primary, width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 217, 255, 0.2)' },
            { offset: 1, color: 'rgba(0, 217, 255, 0.05)' },
          ]),
        },
      },
      {
        name: 'Memory Usage',
        type: 'line',
        smooth: true,
        data: [78, 79, 80, 81, 80, 82, 81, 83, 84, 85, 84, 86, 85, 87, 86, 85, 84, 83, 82, 81],
        itemStyle: { color: darkModeColors.secondary },
        lineStyle: { color: darkModeColors.secondary, width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(139, 92, 246, 0.2)' },
            { offset: 1, color: 'rgba(139, 92, 246, 0.05)' },
          ]),
        },
      },
      {
        name: 'Network I/O',
        type: 'line',
        smooth: true,
        data: [45, 48, 46, 49, 52, 50, 53, 51, 54, 56, 55, 57, 59, 58, 56, 54, 52, 50, 48, 46],
        itemStyle: { color: darkModeColors.tertiary },
        lineStyle: { color: darkModeColors.tertiary, width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(6, 182, 212, 0.2)' },
            { offset: 1, color: 'rgba(6, 182, 212, 0.05)' },
          ]),
        },
      },
    ],
  }

  const cpuDistributionOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: darkModeColors.gridColor,
      textStyle: { color: darkModeColors.textColor },
    },
    xAxis: {
      type: 'category',
      data: ['Pod-1', 'Pod-2', 'Pod-3', 'Pod-4', 'Pod-5', 'Pod-6'],
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      splitLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    series: [
      {
        type: 'bar',
        data: [320, 290, 340, 280, 310, 300],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: darkModeColors.primary },
            { offset: 1, color: darkModeColors.secondary },
          ]),
          borderRadius: [6, 6, 0, 0],
        },
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Real-Time Resource Metrics</CardTitle>
          <CardDescription className="text-muted-foreground">Live cluster resource utilization (streaming via gRPC)</CardDescription>
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
        <Card className="border-border bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Network Throughput</CardTitle>
            <CardDescription className="text-muted-foreground">Ingress and egress traffic patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Ingress</span>
                  <span className="text-sm font-bold text-primary">2.4 Gbps</span>
                </div>
                <div className="h-2.5 bg-background/50 rounded-full overflow-hidden border border-border">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: '75%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">75% utilization</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Egress</span>
                  <span className="text-sm font-bold text-secondary">1.8 Gbps</span>
                </div>
                <div className="h-2.5 bg-background/50 rounded-full overflow-hidden border border-border">
                  <div className="h-full bg-gradient-to-r from-secondary to-tertiary" style={{ width: '58%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">58% utilization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Storage Usage</CardTitle>
            <CardDescription className="text-muted-foreground">Persistent volume consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Total Capacity</span>
                  <span className="text-sm font-bold text-foreground">10 TiB</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Used Space</span>
                  <span className="text-sm font-bold text-primary">6.8 TiB (68%)</span>
                </div>
                <div className="h-2.5 bg-background/50 rounded-full overflow-hidden border border-border">
                  <div className="h-full bg-gradient-to-r from-primary via-secondary to-tertiary" style={{ width: '68%' }} />
                </div>
              </div>
              <div className="flex items-start space-x-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-orange-400/80">Approaching 75% threshold. Consider cleanup.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Top CPU Consumers</CardTitle>
          <CardDescription className="text-muted-foreground">CPU usage by pod</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactEChartsCore
            echarts={echarts}
            option={cpuDistributionOption}
            style={{ height: '300px' }}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">P95 Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">45ms</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +2ms vs last hour
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Request Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12.4K/s</div>
            <p className="text-xs text-muted-foreground mt-1">Requests per second</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">0.02%</div>
            <p className="text-xs text-muted-foreground mt-1">Healthy error rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
