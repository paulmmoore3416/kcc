"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { 
  Plus, 
  Trash2, 
  Activity, 
  Wallet, 
  Zap, 
  ShieldCheck, 
  Settings2,
  RefreshCw,
  Server,
  TrendingUp,
  Globe,
  Leaf,
  History,
  DollarSign,
  Brain
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export function DePINManagementBlade() {
  const [metrics, setMetrics] = useState({
    walletBalance: 4490,
    rewardMultiplier: 2.5,
    uptimeEfficiency: 98.4,
    totalRewards: 12540,
    tokenSymbol: "OPTIM",
    netProfit: 6245.50,
    infraCost: 538.80
  })

  const [enhancements, setEnhancements] = useState<any>(null)
  const [nodes, setNodes] = useState<any[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeProvider, setActiveProvider] = useState("optimai")
  const [temporalRewind, setTemporalRewind] = useState(100)

  const fetchData = async () => {
    setIsRefreshing(true)
    try {
      const metricsRes = await fetch(`http://localhost:8080/api/metrics`)
      const metricsData = await metricsRes.json()
      
      const allDepinRes = await fetch('http://localhost:8080/api/depin/all')
      const allDepinData = await allDepinRes.json()
      
      const providerData = allDepinData[activeProvider] || metricsData.depin

      if (providerData) {
        setMetrics({
          walletBalance: providerData.WalletBalance * (temporalRewind / 100),
          rewardMultiplier: providerData.RewardMultiplier,
          uptimeEfficiency: providerData.UptimeEfficiency * 100,
          totalRewards: providerData.TotalRewardsAccumulated,
          tokenSymbol: providerData.RewardTokenSymbol,
          netProfit: providerData.NetProfit,
          infraCost: providerData.InfrastructureCost
        })
      }
      
      setEnhancements(metricsData.enhancements)

      const nodesRes = await fetch('http://localhost:8080/api/nodes')
      const nodesData = await nodesRes.json()
      if (Array.isArray(nodesData)) {
        setNodes(nodesData.map((n: any) => ({
          id: n.ID,
          name: n.Name,
          status: n.Status,
          cpu: `${n.ResourceUsage.CPU} / ${n.ResourceLimits.CPU} Cores`,
          memory: `${n.ResourceUsage.Memory} / ${n.ResourceLimits.Memory}`,
          uptime: "Active",
          rewardRate: `${(providerData?.RewardMultiplier * 0.5).toFixed(2)} ${providerData?.RewardTokenSymbol || 'OPTIM'}/hr`
        })))
      }
    } catch (error) {
      console.error("Failed to fetch DePIN data:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [activeProvider, temporalRewind])

  const handleRefresh = () => {
    fetchData()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">DePIN Management Blade</h2>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-slate-400">Orchestrate decentralized infrastructure and track elite financial telemetry.</p>
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
              <button 
                onClick={() => setActiveProvider("optimai")}
                className={`px-3 py-1 text-xs font-bold rounded ${activeProvider === "optimai" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                OptimAI
              </button>
              <button 
                onClick={() => setActiveProvider("filecoin")}
                className={`px-3 py-1 text-xs font-bold rounded ${activeProvider === "filecoin" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Filecoin
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
              <History className="h-3 w-3" /> Temporal Rewind
            </span>
            <div className="w-32">
              <Slider 
                value={[temporalRewind]} 
                onValueChange={(v) => setTemporalRewind(v[0])} 
                max={100} 
                step={1} 
                className="[&_.relative]:bg-slate-800"
              />
            </div>
          </div>
          <Button 
            variant="outline" 
            className="bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
            onClick={handleRefresh}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Sync Suite
          </Button>
        </div>
      </div>

      {/* Enhancement 1: Automated Profit/Loss Ledger */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-950/50 border-slate-800 backdrop-blur-sm border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Net Profit (Ledger)</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${metrics.netProfit.toLocaleString()}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <Zap className="h-3 w-3 mr-1" />
              ROI: +18.7%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-950/50 border-slate-800 backdrop-blur-sm border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Infrastructure Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${metrics.infraCost.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">Electricity & Compute</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-950/50 border-slate-800 backdrop-blur-sm border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.walletBalance.toLocaleString()} {metrics.tokenSymbol}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <Zap className="h-3 w-3 mr-1" />
              Live Velocity Tracking
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-950/50 border-slate-800 backdrop-blur-sm border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Network Uptime</CardTitle>
            <ShieldCheck className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.uptimeEfficiency.toFixed(1)}%</div>
            <Progress value={metrics.uptimeEfficiency} className="h-1.5 mt-2 bg-slate-800" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhancement 5: Live DePIN Heatmap (Simplified) */}
        <Card className="lg:col-span-2 bg-slate-950/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">Global Node Heatmap</CardTitle>
              <CardDescription className="text-slate-400">Real-time distribution vs global network latency.</CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse">
              LIVE NETWORK
            </Badge>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-slate-900/50 rounded-lg relative overflow-hidden border border-slate-800">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat bg-contain" />
            <div className="grid grid-cols-6 grid-rows-4 gap-4 w-full h-full p-8 relative">
               {[...Array(12)].map((_, i) => (
                 <div key={i} className={`rounded-full h-4 w-4 animate-ping bg-blue-500 absolute`} style={{
                   top: `${Math.random() * 80 + 10}%`,
                   left: `${Math.random() * 80 + 10}%`,
                   animationDelay: `${Math.random() * 2}s`
                 }} />
               ))}
               <div className="absolute bottom-4 left-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase">OptimAI Node</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Low Latency</span>
                  </div>
               </div>
            </div>
            <div className="text-center z-10">
              <p className="text-slate-500 text-xs font-mono">Simulated Geospatial Telemetry Feed Active</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Enhancement 2: Predictive Scaling Engine */}
          <Card className="bg-blue-900/10 border-blue-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-blue-400 flex items-center gap-2 uppercase tracking-wider">
                <Brain className="h-4 w-4" /> Predictive Scaling Advisor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-sm font-medium">{enhancements?.predictiveScaling?.reason || "Analyzing historical traffic patterns..."}</p>
              <Button size="sm" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 h-8 text-xs">
                Approve Pre-scale (+{enhancements?.predictiveScaling?.suggestion || 0} nodes)
              </Button>
            </CardContent>
          </Card>

          {/* Enhancement 6: AI-Driven Sustainability Advisor */}
          <Card className="bg-emerald-900/10 border-emerald-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
                <Leaf className="h-4 w-4" /> Sustainability Advisor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400">Carbon Reduction (YTD)</span>
                <span className="text-emerald-500 font-bold">{enhancements?.sustainability?.carbonReduction || "0%"}</span>
              </div>
              <p className="text-white text-xs leading-relaxed">{enhancements?.sustainability?.recommendation || "Collecting regional power grid data..."}</p>
              <div className="mt-3 p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                 <span className="text-[10px] text-slate-400 uppercase font-bold">Target Green Region</span>
                 <p className="text-emerald-400 font-bold text-xs">{enhancements?.sustainability?.greenRegion || "Detecting..."}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Node Orchestration */}
      <Card className="bg-slate-950/50 border-slate-800 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Active {activeProvider === 'optimai' ? 'OptimAI' : 'Filecoin'} Nodes</CardTitle>
            <CardDescription className="text-slate-400">Manage containerized validation nodes and eBPF-driven resource isolation.</CardDescription>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Provision Node
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="border-slate-800">
              <TableRow className="hover:bg-transparent border-slate-800">
                <TableHead className="text-slate-400">Node Name</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">CPU Usage</TableHead>
                <TableHead className="text-slate-400">Memory Usage</TableHead>
                <TableHead className="text-slate-400">Reward Rate</TableHead>
                <TableHead className="text-right text-slate-400">eBPF Throttling</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nodes.map((node) => (
                <TableRow key={node.id} className="border-slate-800 hover:bg-slate-900/50">
                  <TableCell className="font-medium text-slate-200">
                    <div className="flex items-center">
                      <Server className="h-4 w-4 mr-2 text-blue-400" />
                      {node.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      {node.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300">{node.cpu}</TableCell>
                  <TableCell className="text-slate-300">{node.memory}</TableCell>
                  <TableCell className="text-slate-300">
                    <span className="text-green-500 font-mono">{node.rewardRate}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 items-center">
                      <div className="w-24 mr-2">
                         <Progress value={45} className="h-1 bg-slate-800" />
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800">
                        <Settings2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {nodes.length === 0 && (
                <TableRow>
                   <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      No active nodes detected for {activeProvider}. Provision a new node to start earning.
                   </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Enhancement 2: Automated Worker Scaling Insight */}
      <Card className="bg-slate-900/40 border-slate-700/50 border-dashed">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full ${metrics.walletBalance > 1000 ? "bg-blue-500/10" : "bg-slate-500/10"}`}>
              <Zap className={`h-6 w-6 ${metrics.walletBalance > 1000 ? "text-blue-500" : "text-slate-500"}`} />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">
                {metrics.walletBalance > 1000 ? "Zero-Cost Worker Scaling Active" : "Worker Scaling Inactive"}
              </h4>
              <p className="text-slate-400 text-sm mt-1">
                {metrics.walletBalance > 1000 
                  ? `Your reward balance is high enough to subsidize background analytical processing. Next 48 compute hours will be offloaded to OptimAI edge network, saving an estimated $${(metrics.walletBalance * 0.0031).toFixed(2)} in local VM costs.`
                  : "Collect more rewards to activate autonomous worker scaling and offload compute tasks to the decentralized network."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
