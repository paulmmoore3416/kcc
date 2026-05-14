'use client'

import React, { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { TooltipComponent, DatasetComponent } from 'echarts/components'
import { Zap, Cpu, HardDrive, Network } from 'lucide-react'

echarts.use([GaugeChart, TooltipComponent, DatasetComponent, CanvasRenderer])

const GaugeWrapper = ({ value, name, color, darkModeColors }: any) => {
  const option = useMemo(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      show: true,
      confine: true,
      formatter: '{b}: {c}%',
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: darkModeColors.gridColor,
      textStyle: { color: darkModeColors.textColor },
    },
    series: [
      {
        type: 'gauge',
        radius: '100%',
        center: ['50%', '50%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        splitNumber: 10,
        itemStyle: {
          color: color,
        },
        progress: {
          show: true,
          width: 12,
          roundCap: true,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 12,
            color: [[1, 'rgba(255, 255, 255, 0.05)']],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        title: {
          show: true,
          offsetCenter: [0, '35%'],
          color: '#94a3b8',
          fontSize: 12,
          fontWeight: 500,
        },
        detail: {
          valueAnimation: true,
          width: '100%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '-10%'],
          fontSize: 28,
          fontWeight: 'bold',
          formatter: '{value}%',
          color: color,
        },
        data: [
          {
            value: value,
            name: name,
          },
        ],
      },
    ],
  }), [value, name, color, darkModeColors])

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
      style={{ height: '100%', width: '100%' }}
    />
  )
}

export function PerformanceMetrics() {
  const darkModeColors = useMemo(() => ({
    primary: '#00d9ff',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    background: '#1f2937',
    gridColor: '#374151',
    textColor: '#e8eef2',
  }), [])

  const metrics = useMemo(() => [
    { value: 72, name: 'CPU Usage', icon: Cpu, color: darkModeColors.primary },
    { value: 58, name: 'Memory Usage', icon: HardDrive, color: darkModeColors.secondary },
    { value: 85, name: 'Disk I/O', icon: Network, color: '#f59e0b' },
    { value: 45, name: 'Network Latency', icon: Zap, color: darkModeColors.success },
  ], [darkModeColors])

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
                <div className="flex items-center justify-end">
                  <Icon className="h-4 w-4" style={{ color: metric.color }} />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div style={{ height: '140px' }}>
                  <GaugeWrapper 
                    value={metric.value} 
                    name={metric.name} 
                    color={metric.color} 
                    darkModeColors={darkModeColors}
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
