'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  LineChart,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  CanvasRenderer,
])

export function ClusterOverview() {
  const darkModeColors = {
    primary: '#00d9ff',
    secondary: '#8b5cf6',
    tertiary: '#06b6d4',
    background: '#1f2937',
    gridColor: '#374151',
    textColor: '#e8eef2',
  }

  const cpuUsageOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: darkModeColors.gridColor,
      textStyle: { color: darkModeColors.textColor },
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    yAxis: {
      type: 'value',
      name: 'CPU %',
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      splitLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    series: [
      {
        name: 'CPU Usage',
        type: 'line',
        smooth: true,
        data: [45, 52, 61, 78, 65, 58],
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

  const memoryUsageOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: darkModeColors.gridColor,
      textStyle: { color: darkModeColors.textColor },
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    yAxis: {
      type: 'value',
      name: 'Memory GB',
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      splitLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    series: [
      {
        name: 'Memory Usage',
        type: 'line',
        smooth: true,
        data: [128, 145, 167, 189, 178, 165],
        itemStyle: {
          color: darkModeColors.secondary,
        },
        lineStyle: {
          color: darkModeColors.secondary,
          width: 3,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(139, 92, 246, 0.3)' },
            { offset: 1, color: 'rgba(139, 92, 246, 0.05)' },
          ]),
        },
      },
    ],
  }

  const namespaceDistributionOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: darkModeColors.gridColor,
      textStyle: { color: darkModeColors.textColor },
    },
    legend: {
      bottom: '0%',
      left: 'center',
      textStyle: { color: darkModeColors.textColor },
    },
    series: [
      {
        name: 'Pods by Namespace',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#1f2937',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: 'bold',
            color: darkModeColors.textColor,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 450, name: 'production', itemStyle: { color: darkModeColors.primary } },
          { value: 320, name: 'staging', itemStyle: { color: darkModeColors.secondary } },
          { value: 280, name: 'development', itemStyle: { color: darkModeColors.tertiary } },
          { value: 197, name: 'monitoring', itemStyle: { color: '#10b981' } },
        ],
      },
    ],
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2 border-border bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">CPU Usage Trend</CardTitle>
          <CardDescription className="text-muted-foreground">Cluster-wide CPU utilization over the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactEChartsCore
            echarts={echarts}
            option={cpuUsageOption}
            style={{ height: '320px' }}
          />
        </CardContent>
      </Card>

      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Pod Distribution</CardTitle>
          <CardDescription className="text-muted-foreground">Pods across namespaces</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactEChartsCore
            echarts={echarts}
            option={namespaceDistributionOption}
            style={{ height: '320px' }}
          />
        </CardContent>
      </Card>

      <Card className="col-span-2 border-border bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Memory Usage Trend</CardTitle>
          <CardDescription className="text-muted-foreground">Cluster-wide memory consumption over the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactEChartsCore
            echarts={echarts}
            option={memoryUsageOption}
            style={{ height: '320px' }}
          />
        </CardContent>
      </Card>

      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Cluster Health</CardTitle>
          <CardDescription className="text-muted-foreground">Real-time component status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-foreground">API Server</span>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-semibold">Healthy</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-foreground">etcd</span>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-semibold">Healthy</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-foreground">Scheduler</span>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-semibold">Healthy</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-foreground">Controller Manager</span>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-semibold">Healthy</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-border pt-3">
            <span className="text-sm font-medium text-foreground">eBPF Agents</span>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-semibold">Running (24/24)</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-foreground">Telemetry</span>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-semibold">Active</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
