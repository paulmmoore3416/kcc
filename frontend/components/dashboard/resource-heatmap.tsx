'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { HeatmapChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([HeatmapChart, GridComponent, TooltipComponent, VisualMapComponent, CanvasRenderer])

export function ResourceHeatmap() {
  const darkModeColors = {
    primary: '#00d9ff',
    secondary: '#8b5cf6',
    background: '#1f2937',
    gridColor: '#374151',
    textColor: '#e8eef2',
  }

  // Generate mock heatmap data
  const generateHeatmapData = () => {
    const nodes = Array.from({ length: 24 }, (_, i) => `node-${i + 1}`)
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)
    const data = []

    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < hours.length; j++) {
        data.push([j, i, Math.floor(Math.random() * 100)])
      }
    }
    return data
  }

  const heatmapOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: darkModeColors.gridColor,
      textStyle: { color: darkModeColors.textColor },
      formatter: (params: any) => {
        if (params.componentSubType === 'heatmap') {
          return `Node: ${params.value[0]}<br/>Hour: ${params.value[1]}<br/>Usage: ${params.value[2]}%`
        }
        return ''
      },
    },
    grid: {
      left: 100,
      right: 50,
      top: 40,
      bottom: 40,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      splitArea: {
        show: true,
      },
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    yAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, i) => `node-${i + 1}`),
      splitArea: {
        show: true,
      },
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'vertical',
      right: '2%',
      top: 'center',
      inRange: {
        color: ['#00b900', '#ffb100', '#ff4100'],
      },
      textStyle: {
        color: darkModeColors.textColor,
      },
    },
    series: [
      {
        name: 'Resource Usage',
        type: 'heatmap',
        data: generateHeatmapData(),
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
        },
      },
    ],
  }

  return (
    <Card className="border-border bg-card/50">
      <CardHeader>
        <CardTitle>Resource Utilization Heatmap</CardTitle>
        <CardDescription>24-hour node CPU usage distribution across cluster</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height: '400px' }}>
          <ReactEChartsCore
            echarts={echarts}
            option={heatmapOption}
            notMerge={true}
            lazyUpdate={true}
          />
        </div>
      </CardContent>
    </Card>
  )
}
