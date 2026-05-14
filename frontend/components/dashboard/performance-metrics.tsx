'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { TooltipComponent, DatasetComponent } from 'echarts/components'
import { Zap, Cpu, HardDrive, Network } from 'lucide-react'

echarts.use([GaugeChart, TooltipComponent, DatasetComponent, CanvasRenderer])

export function PerformanceMetrics() {
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

  const createGaugeOption = (value: number, name: string, color: string) => ({
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        radius: '85%',
        center: ['50%', '50%'],
        startAngle: 225,
        endAngle: -45,
        progress: {
          itemStyle: {
            borderRadius: 10,
            borderColor: 'transparent',
          },
        },
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, darkModeColors.danger],
              [0.7, darkModeColors.warning],
              [1, darkModeColors.success],
            ],
          },
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2,
          },
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 4,
          },
        },
        axisLabel: {
          color: 'auto',
          distance: 40,
          fontSize: 16,
        },
        detail: {
          valueAnimation: true,
          formatter: `${value}%`,
          color: color,
          fontSize: 24,
          fontWeight: 'bold',
        },
        data: [{ value: value, name: name }],
      },
    ],
  })

  const metrics = [
    { value: 72, name: 'CPU Usage', icon: Cpu, color: darkModeColors.primary },
    { value: 58, name: 'Memory Usage', icon: HardDrive, color: darkModeColors.secondary },
    { value: 85, name: 'Disk I/O', icon: Network, color: '#f59e0b' },
    { value: 45, name: 'Network Latency', icon: Zap, color: darkModeColors.success },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Performance Metrics</h2>
        <p className="text-muted-foreground">Real-time system performance indicators</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <Card key={idx} className="border-border bg-card/50 overflow-hidden">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.name}
                  </CardTitle>
                  <Icon className="h-4 w-4" style={{ color: metric.color }} />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div style={{ height: '140px' }}>
                  <ReactEChartsCore
                    echarts={echarts}
                    option={createGaugeOption(metric.value, metric.name, metric.color)}
                    notMerge={true}
                    lazyUpdate={true}
                  />
                </div>
                <div className="text-center mt-2">
                  <Badge
                    className={
                      metric.value > 80
                        ? 'bg-red-500/20 text-red-300'
                        : metric.value > 60
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-green-500/20 text-green-300'
                    }
                  >
                    {metric.value > 80 ? 'High' : metric.value > 60 ? 'Medium' : 'Normal'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
