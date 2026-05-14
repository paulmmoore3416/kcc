'use client'

import React from 'react'
import { 
  Activity, 
  Server, 
  Database, 
  Shield, 
  TrendingUp, 
  Brain, 
  Network, 
  Layout,
  Box,
  Cpu,
  DollarSign,
  Lock,
  Menu,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: Layout },
  { id: 'pods', label: 'Pods', icon: Box },
  { id: 'nodes', label: 'Nodes', icon: Server },
  { id: 'metrics', label: 'Metrics', icon: Activity },
  { id: 'performance', label: 'Performance', icon: Cpu },
  { id: 'network', label: 'Network', icon: Network },
  { id: 'prediction', label: 'Cost Forecast', icon: TrendingUp },
  { id: 'ai', label: 'AI Insights', icon: Brain },
  { id: 'cost', label: 'Cost', icon: DollarSign },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'utilization', label: 'Heatmap', icon: Database },
]

export function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed }: SidebarProps) {
  return (
    <div 
      className={cn(
        "relative h-screen border-r border-border bg-card transition-all duration-300 flex flex-col z-40",
        collapsed ? "w-[80px] items-center" : "w-[260px] items-start"
      )}
    >
      {/* Sidebar Header */}
      <div className={cn(
        "h-16 flex items-center px-6 w-full border-b border-border/50 bg-background/50 backdrop-blur-sm",
        collapsed ? "justify-center px-0" : "justify-between"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center p-1.5 rounded-md bg-primary/10 text-primary border border-primary/20">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">KCC</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 w-full py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {!collapsed && (
          <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">Main Navigation</p>
        )}
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
              activeTab === item.id 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
              activeTab === item.id ? "text-primary" : "text-muted-foreground"
            )} />
            {!collapsed && (
              <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
            )}
            {activeTab === item.id && (
              <div 
                className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
              />
            )}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border border-border opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className={cn(
        "p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm w-full",
        collapsed ? "flex justify-center" : "block"
      )}>
        {!collapsed ? (
          <div className="space-y-4">
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-primary/80 uppercase">Cluster Quota</span>
                <span className="text-[10px] font-medium text-muted-foreground">84%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '84%' }} />
              </div>
            </div>
            <Button className="w-full gap-2 shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4" />
              <span>Create Resource</span>
            </Button>
          </div>
        ) : (
          <Button size="icon" className="h-10 w-10 rounded-xl shadow-lg shadow-primary/20">
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  )
}
