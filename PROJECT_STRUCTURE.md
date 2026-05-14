# Kraken Cloud Control - Project Structure

## Overview
Enterprise-grade Kubernetes administration platform with real-time observation, AI-powered insights, and comprehensive cluster management.

## Directory Layout

```
kcc/
├── operator/           # Go Kubernetes Operator (Operator SDK)
│   ├── api/           # CRD definitions (ClusterObservation, ClusterAdministration)
│   ├── controllers/   # Reconciliation loops
│   └── config/        # RBAC, manifests, generated CRDs
├── backend/           # Go gRPC backend services (Go 1.25)
│   ├── api/           # Proto definitions
│   ├── services/      # Business logic (AI, Cluster, Cost, Security)
│   └── ebpf/          # eBPF agents and kernel monitoring
├── frontend/          # Next.js 14 dashboard
│   ├── app/           # App router pages (Warm Amber Theme)
│   ├── components/    # React components (Apache ECharts integration)
│   └── lib/           # Utils, API clients
├── infrastructure/    # Deployment configs
│   ├── helm/          # Helm charts
│   ├── manifests/     # K8s YAML (Kustomize)
│   └── terraform/     # IaC
└── docs/              # Documentation
    ├── QUICKSTART.md
    ├── DEPLOYMENT.md
    └── SUCCESS_REPORT.md # Latest deployment metrics and cluster status
```

## Technology Stack

### Core
- **Operator**: Go + Operator SDK + controller-runtime
- **Backend**: Go + gRPC + client-go (v1.25+)
- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Observation**: eBPF + OpenTelemetry

### Data Layer
- **Storage**: ClickHouse
- **Messaging**: gRPC Streaming
- **Telemetry**: OpenTelemetry Collector

### UI Framework
- **Styling**: Tailwind CSS
- **Components**: Shadcn/UI
- **State**: TanStack Query
- **Visualization**: Apache ECharts

### Advanced Features
- **AI**: LLM-powered root cause analysis (Gemini 1.5)
- **FinOps**: OpenCost integration + Kraken Hedge
- **Security**: eBPF runtime enforcement
- **Time-Travel**: Historical state debugging
