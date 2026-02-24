'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
  const cpuUsageOption = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    },
    yAxis: {
      type: 'value',
      name: 'CPU %',
    },
    series: [
      {
        name: 'CPU Usage',
        type: 'line',
        smooth: true,
        data: [45, 52, 61, 78, 65, 58],
        itemStyle: {
          color: '#ee7e18',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(238, 126, 24, 0.3)' },
            { offset: 1, color: 'rgba(238, 126, 24, 0.05)' },
          ]),
        },
      },
    ],
  }

  const memoryUsageOption = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    },
    yAxis: {
      type: 'value',
      name: 'Memory GB',
    },
    series: [
      {
        name: 'Memory Usage',
        type: 'line',
        smooth: true,
        data: [128, 145, 167, 189, 178, 165],
        itemStyle: {
          color: '#e0640e',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(224, 100, 14, 0.3)' },
            { offset: 1, color: 'rgba(224, 100, 14, 0.05)' },
          ]),
        },
      },
    ],
  }

  const namespaceDistributionOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '0%',
      left: 'center',
    },
    series: [
      {
        name: 'Pods by Namespace',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 450, name: 'production', itemStyle: { color: '#ee7e18' } },
          { value: 320, name: 'staging', itemStyle: { color: '#f2993b' } },
          { value: 280, name: 'development', itemStyle: { color: '#f6bd74' } },
          { value: 197, name: 'monitoring', itemStyle: { color: '#fad8aa' } },
        ],
      },
    ],
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2 border-warm-200">
        <CardHeader>
          <CardTitle>CPU Usage Trend</CardTitle>
          <CardDescription>Cluster-wide CPU utilization over the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactEChartsCore
            echarts={echarts}
            option={cpuUsageOption}
            style={{ height: '300px' }}
          />
        </CardContent>
      </Card>

      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle>Pod Distribution</CardTitle>
          <CardDescription>Pods across namespaces</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactEChartsCore
            echarts={echarts}
            option={namespaceDistributionOption}
            style={{ height: '300px' }}
          />
        </CardContent>
      </Card>

      <Card className="col-span-2 border-warm-200">
        <CardHeader>
          <CardTitle>Memory Usage Trend</CardTitle>
          <CardDescription>Cluster-wide memory consumption over the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactEChartsCore
            echarts={echarts}
            option={memoryUsageOption}
            style={{ height: '300px' }}
          />
        </CardContent>
      </Card>

      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle>Cluster Health</CardTitle>
          <CardDescription>Real-time status indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">API Server</span>
            <span className="text-sm text-green-600 font-semibold">Healthy</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">etcd</span>
            <span className="text-sm text-green-600 font-semibold">Healthy</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Scheduler</span>
            <span className="text-sm text-green-600 font-semibold">Healthy</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Controller Manager</span>
            <span className="text-sm text-green-600 font-semibold">Healthy</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">eBPF Agents</span>
            <span className="text-sm text-green-600 font-semibold">Running</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Telemetry Collector</span>
            <span className="text-sm text-green-600 font-semibold">Active</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
