'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export type SectionStatus = 'healthy' | 'warning' | 'critical' | 'info' | 'neutral'

interface SectionCardProps {
  title: string
  icon?: React.ReactNode
  status?: SectionStatus
  children: React.ReactNode
  collapsible?: boolean
  defaultExpanded?: boolean
  actions?: React.ReactNode
  subtitle?: string
  borderGradient?: boolean
}

const statusBorderMap: Record<SectionStatus, string> = {
  healthy: 'border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent',
  warning: 'border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-500/5 via-transparent to-transparent',
  critical: 'border-l-4 border-l-red-500 bg-gradient-to-r from-red-500/5 via-transparent to-transparent',
  info: 'border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-500/5 via-transparent to-transparent',
  neutral: 'border-l-4 border-l-slate-500 bg-gradient-to-r from-slate-500/5 via-transparent to-transparent',
}

const statusDotMap: Record<SectionStatus, string> = {
  healthy: 'bg-emerald-500',
  warning: 'bg-amber-500',
  critical: 'bg-red-500',
  info: 'bg-blue-500',
  neutral: 'bg-slate-500',
}

const borderGradientClass = 'relative before:absolute before:inset-0 before:rounded-xl before:p-px before:bg-gradient-to-r before:from-primary/50 before:via-transparent before:to-transparent before:pointer-events-none'

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  status = 'neutral',
  children,
  collapsible = false,
  defaultExpanded = true,
  actions,
  subtitle,
  borderGradient = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  }

  const contentVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  }

  const headerVariants = {
    hover: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-xl transition-all duration-300 ${statusBorderMap[status]} ${borderGradient ? borderGradientClass : ''}`}
    >
      {/* Header */}
      <motion.div
        variants={headerVariants}
        whileHover={collapsible ? "hover" : undefined}
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
        className={`px-6 py-4 border-b border-slate-700/30 flex items-center justify-between cursor-pointer group transition-colors ${
          collapsible ? 'hover:bg-white/5' : ''
        }`}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Status Indicator */}
          {status !== 'neutral' && (
            <div className={`h-2 w-2 rounded-full flex-shrink-0 ${statusDotMap[status]} animate-pulse`} />
          )}

          {/* Icon */}
          {icon && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
              {icon}
            </div>
          )}

          {/* Title & Subtitle */}
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm text-white truncate group-hover:text-primary transition-colors">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-400 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
          {actions}
          {collapsible && (
            <motion.div
              animate={{ rotate: isExpanded ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-200" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      {!collapsible ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="p-6"
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          variants={contentVariants}
          initial={defaultExpanded ? "expanded" : "collapsed"}
          animate={isExpanded ? "expanded" : "collapsed"}
          className="overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isExpanded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: isExpanded ? 0.1 : 0 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
