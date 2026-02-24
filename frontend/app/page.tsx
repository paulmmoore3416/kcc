import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Server, DollarSign, Shield, Zap, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-white to-warm-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Kubernetes Command Center
            </span>
          </div>
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-warm-700 via-warm-600 to-warm-500 bg-clip-text text-transparent">
            Professional Kubernetes Administration
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Real-time observation, AI-powered insights, and comprehensive cluster management
            with eBPF-based monitoring and zero-overhead telemetry
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                Launch Platform
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-warm-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Activity className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Real-Time Observation</CardTitle>
              <CardDescription>
                eBPF-based kernel monitoring with near-zero overhead. Stream metrics, logs, and traces in real-time.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-warm-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Server className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Cluster Administration</CardTitle>
              <CardDescription>
                Comprehensive management with auto-scaling, auto-healing, and policy enforcement.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-warm-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <DollarSign className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Cost Observability</CardTitle>
              <CardDescription>
                FinOps integration with OpenCost. Track dollar-per-pod metrics and forecast future costs.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-warm-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Security Enforcement</CardTitle>
              <CardDescription>
                Runtime security with drift detection, automatic pod isolation, and compliance reporting.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-warm-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-4" />
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>
                LLM-driven root cause analysis with vector embeddings for intelligent error detection.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-warm-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Time-Travel Debugging</CardTitle>
              <CardDescription>
                Historical state visualization with a slider to see cluster state at any point in time.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="border-warm-200 bg-gradient-warm">
          <CardContent className="p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime SLA</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">&lt;1ms</div>
                <div className="text-muted-foreground">Latency</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">1M+</div>
                <div className="text-muted-foreground">Events/sec</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">0%</div>
                <div className="text-muted-foreground">Overhead</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-md mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2026 Kubernetes Command Center. Built with Go, Next.js, and eBPF.</p>
        </div>
      </footer>
    </div>
  )
}
