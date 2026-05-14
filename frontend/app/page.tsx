import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Server, DollarSign, Shield, Zap, TrendingUp, Brain, Lock } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">
              KCC Platform
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </Link>
            <Link href="/dashboard">
              <Button>
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 text-center flex flex-col items-center">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Enterprise Kubernetes Management
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl">
            Professional Kubernetes Administration
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Real-time observation, AI-powered insights, and comprehensive cluster management
            with eBPF-based monitoring and autonomous SRE agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="h-12 px-8 text-base">
                Launch Platform
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                View Documentation
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-24 border-t border-border">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card hover:bg-muted/50 transition-colors">
              <CardHeader>
                <Activity className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Real-Time Observation</CardTitle>
                <CardDescription>
                  eBPF-based kernel monitoring with near-zero overhead. Stream metrics, logs, and traces.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card hover:bg-muted/50 transition-colors">
              <CardHeader>
                <Brain className="h-10 w-10 text-primary mb-4" />
                <CardTitle>AI-Powered SRE</CardTitle>
                <CardDescription>
                  Autonomous agents powered by Gemini for intelligent incident response and remediation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card hover:bg-muted/50 transition-colors">
              <CardHeader>
                <DollarSign className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Cost Observability</CardTitle>
                <CardDescription>
                  FinOps integration with OpenCost. Track metrics and forecast costs intelligently.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card hover:bg-muted/50 transition-colors">
              <CardHeader>
                <Lock className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Security Management</CardTitle>
                <CardDescription>
                  Comprehensive security monitoring with policy enforcement and threat detection.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 Kubernetes Command Center. Enterprise Edition.</p>
        </div>
      </footer>
    </div>
  )
}
