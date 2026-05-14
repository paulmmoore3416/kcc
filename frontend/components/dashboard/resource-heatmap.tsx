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
    secondary: '#a855f7', // Purple
    accent: '#6366f1',    // Indigo
    background: 'rgba(17, 24, 39, 0.4)',
    gridColor: 'rgba(75, 85, 99, 0.3)',
    textColor: '#94a3b8',
  }

  // Generate mock heatmap data
  const generateHeatmapData = () => {
    const nodesCount = 12 // Reduced for better visual on "map" feel
    const hoursCount = 24
    const data = []

    for (let i = 0; i < nodesCount; i++) {
      for (let j = 0; j < hoursCount; j++) {
        // Create some patterns: peak hours and certain nodes
        const hourFactor = Math.sin((j / 24) * Math.PI * 2) * 20 + 50
        const nodeFactor = Math.random() * 30
        const usage = Math.min(100, Math.max(0, Math.floor(hourFactor + nodeFactor)))
        data.push([j, i, usage])
      }
    }
    return data
  }

  const nodes = Array.from({ length: 12 }, (_, i) => `Node ${String(i + 1).padStart(2, '0')}`)
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)

  const heatmapOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: 'rgba(0, 217, 255, 0.5)',
      borderWidth: 1,
      textStyle: { color: '#f8fafc', fontSize: 12 },
      formatter: (params: any) => {
        // Robust safety check to prevent "data is undefined" error
        if (!params || !params.value || !Array.isArray(params.value)) {
          return ''
        }
        const hour = params.value[0]
        const nodeIdx = params.value[1]
        const usage = params.value[2]
        return `
          <div style="font-weight: 600; margin-bottom: 4px; color: #00d9ff">Node Statistics</div>
          <div style="display: flex; justify-content: space-between; gap: 12px">
            <span style="color: #94a3b8">Resource:</span>
            <span>${nodes[nodeIdx] || 'Unknown'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; gap: 12px">
            <span style="color: #94a3b8">Time:</span>
            <span>${hours[hour] || 'Unknown'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; gap: 12px">
            <span style="color: #94a3b8">Utilization:</span>
            <span style="color: ${usage > 80 ? '#f43f5e' : usage > 50 ? '#fbbf24' : '#10b981'}">${usage}%</span>
          </div>
        `
      },
    },
    grid: {
      left: '3%',
      right: '8%',
      top: '10%',
      bottom: '12%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: hours,
      splitArea: { show: false },
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor, fontSize: 10 },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'category',
      data: nodes,
      splitArea: { show: false },
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor, fontSize: 10 },
      axisTick: { show: false },
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      itemWidth: 15,
      itemHeight: 140,
      inRange: {
        // Modern palette: deep purple -> vibrant blue -> bright cyan
        color: ['#1e1b4b', '#4338ca', '#6366f1', '#06b6d4', '#00d9ff'],
      },
      text: ['High', 'Low'],
      textStyle: {
        color: darkModeColors.textColor,
        fontSize: 10,
      },
    },
    series: [
      {
        name: 'Node Utilization',
        type: 'heatmap',
        data: generateHeatmapData(),
        label: {
          show: false,
        },
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(15, 23, 42, 0.5)',
          borderWidth: 2,
        },
        emphasis: {
          itemStyle: {
            borderColor: '#00d9ff',
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 217, 255, 0.5)',
          },
        },
      },
    ],
  }

  return (
    <Card className="border-border bg-card/50 overflow-hidden backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground/90">Cluster Resource Topology</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Spatiotemporal distribution of CPU/Memory load across nodes</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div style={{ height: '320px', width: '100%' }}>
          <ReactEChartsCore
            echarts={echarts}
            option={heatmapOption}
            notMerge={true}
            lazyUpdate={true}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

