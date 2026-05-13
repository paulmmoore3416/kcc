import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Server, DollarSign, Shield, Zap, TrendingUp, Brain, Lock } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">
              Kubernetes Command Center
            </span>
          </div>
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-6xl font-bold mb-6 text-foreground">
            Professional Kubernetes Administration
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Real-time observation, AI-powered insights, and comprehensive cluster management
            with eBPF-based monitoring and autonomous SRE agents
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                Launch Platform
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="text-lg px-8 border-border hover:bg-card">
                Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border bg-card/50 hover:bg-card/80 transition-all hover:border-primary/50">
            <CardHeader>
              <Activity className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Real-Time Observation</CardTitle>
              <CardDescription className="text-muted-foreground">
                eBPF-based kernel monitoring with near-zero overhead. Stream metrics, logs, and traces.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-card/50 hover:bg-card/80 transition-all hover:border-secondary/50">
            <CardHeader>
              <Brain className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>AI-Powered SRE</CardTitle>
              <CardDescription className="text-muted-foreground">
                Autonomous agents powered by Gemini for intelligent incident response and remediation.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-card/50 hover:bg-card/80 transition-all hover:border-primary/50">
            <CardHeader>
              <DollarSign className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Cost Observability</CardTitle>
              <CardDescription className="text-muted-foreground">
                FinOps integration with OpenCost. Track metrics and forecast costs intelligently.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-card/50 hover:bg-card/80 transition-all hover:border-secondary/50">
            <CardHeader>
              <Lock className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Security Management</CardTitle>
              <CardDescription className="text-muted-foreground">
                Comprehensive security monitoring with policy enforcement and threat detection.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Features Detail */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Platform Capabilities</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Server className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-foreground">Cluster Administration</h3>
                <p className="text-muted-foreground">Auto-scaling, auto-healing, and intelligent policy enforcement</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Zap className="h-6 w-6 text-secondary mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-foreground">Real-time Metrics</h3>
                <p className="text-muted-foreground">Live dashboards with comprehensive visualization of all metrics</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <TrendingUp className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-foreground">Predictive Analytics</h3>
                <p className="text-muted-foreground">ML-powered forecasting for capacity planning and cost optimization</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-secondary mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-foreground">Security Observability</h3>
                <p className="text-muted-foreground">Network policies, threat detection, and compliance monitoring</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Brain className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-foreground">Autonomous SRE</h3>
                <p className="text-muted-foreground">AI agents that analyze, decide, and remediate infrastructure issues</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Activity className="h-6 w-6 text-secondary mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-foreground">Voice-Enabled Control</h3>
                <p className="text-muted-foreground">Natural language interface for cluster management and queries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-border rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Transform Your Infrastructure?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Deploy KCC today and experience the future of Kubernetes management with AI-powered autonomy.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 Kubernetes Command Center. Built for the AI Agent Olympics.</p>
        </div>
      </footer>
    </div>
  )
}
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
