'use client'

import React from 'react'
import { motion } from 'framer-motion'

export type MetricSeverity = 'healthy' | 'warning' | 'critical'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  trend?: 'up' | 'down' | 'stable'
  trendValue?: string | number
  severity?: MetricSeverity
  icon?: React.ReactNode
  description?: string
}

const severityStyles: Record<MetricSeverity, { bg: string; border: string; text: string }> = {
  healthy: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
  },
  warning: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
  },
  critical: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400',
  },
}

const trendIcons = {
  up: '↑',
  down: '↓',
  stable: '→',
}

const trendColors = {
  up: 'text-red-400',
  down: 'text-emerald-400',
  stable: 'text-slate-400',
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  trend,
  trendValue,
  severity = 'healthy',
  icon,
  description,
}) => {
  const styles = severityStyles[severity]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg border ${styles.bg} ${styles.border} p-4 backdrop-blur-sm transition-all hover:shadow-lg`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <p className={`text-2xl font-bold ${styles.text}`}>
              {value}
            </p>
            {unit && <span className="text-xs text-slate-500">{unit}</span>}
          </div>
        </div>
        {icon && (
          <div className="text-xl opacity-50">
            {icon}
          </div>
        )}
      </div>

      {(description || trend) && (
        <div className="flex items-center justify-between">
          {description && (
            <p className="text-xs text-slate-500">{description}</p>
          )}
          {trend && trendValue && (
            <div className={`flex items-center gap-1 text-xs font-semibold ${trendColors[trend]}`}>
              <span>{trendIcons[trend]}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
