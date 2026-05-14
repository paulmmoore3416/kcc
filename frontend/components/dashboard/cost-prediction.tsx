'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { TrendingUp, AlertTriangle, Zap } from 'lucide-react'

echarts.use([LineChart, GridComponent, TooltipComponent, LegendComponent, DatasetComponent, CanvasRenderer])

export function CostPrediction() {
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

  const predictionOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: darkModeColors.gridColor,
      textStyle: { color: darkModeColors.textColor },
      formatter: (params: any) => {
        let result = params[0].name + '<br/>'
        params.forEach((param: any) => {
          result += `${param.seriesName}: <span style="color: ${param.color};">$${param.value.toLocaleString()}</span><br/>`
        })
        return result
      },
    },
    legend: {
      data: ['Current Trend', 'Predicted Cost', 'Optimized Path'],
      textStyle: { color: darkModeColors.textColor },
    },
    xAxis: {
      type: 'category',
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    yAxis: {
      type: 'value',
      name: 'Cost (USD)',
      axisLine: { lineStyle: { color: darkModeColors.gridColor } },
      splitLine: { lineStyle: { color: darkModeColors.gridColor } },
      axisLabel: { color: darkModeColors.textColor },
    },
    series: [
      {
        name: 'Current Trend',
        type: 'line',
        data: [12000, 13200, 14100, 15800, 16500, 17200, 18100, 19000],
        itemStyle: { color: darkModeColors.warning },
        lineStyle: { color: darkModeColors.warning, width: 2, type: 'dashed' },
      },
      {
        name: 'Predicted Cost',
        type: 'line',
        smooth: true,
        data: [12000, 13200, 14100, 15800, 16500, 17200, 18100, 19000],
        itemStyle: { color: darkModeColors.danger },
        lineStyle: { color: darkModeColors.danger, width: 3 },
      },
      {
        name: 'Optimized Path',
        type: 'line',
        smooth: true,
        data: [12000, 12800, 12900, 13500, 13200, 12800, 12500, 12000],
        itemStyle: { color: darkModeColors.success },
        lineStyle: { color: darkModeColors.success, width: 3 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(16, 185, 129, 0.2)' },
            { offset: 1, color: 'rgba(16, 185, 129, 0.05)' },
          ]),
        },
      },
    ],
  }

  return (
    <div className="space-y-4">
      <Card className="border-border bg-card/50 border-l-4 border-l-warning">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-warning" />
                Cost Prediction & Optimization
              </CardTitle>
              <CardDescription>AI-powered 8-week forecast with hedge recommendations</CardDescription>
            </div>
            <Badge className="bg-warning/20 text-warning">Predicted +58% spike</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ height: '320px' }}>
            <ReactEChartsCore
              echarts={echarts}
              option={predictionOption}
              notMerge={true}
              lazyUpdate={true}
            />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="font-semibold text-red-300">Current Trajectory</span>
              </div>
              <div className="text-sm text-muted-foreground">
                +$7,000 additional cost over next 8 weeks if trends continue
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-blue-400" />
                <span className="font-semibold text-blue-300">Kraken Hedge Active</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Auto-hedging with xStocks covering predicted spike
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="font-semibold text-green-300">Potential Savings</span>
              </div>
              <div className="text-sm text-muted-foreground">
                $7,000+ through optimization + hedge strategy
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
