# Kubernetes Command Center - Project Structure

## Overview
Enterprise-grade Kubernetes administration platform with real-time observation, AI-powered insights, and comprehensive cluster management.

## Directory Layout

```
kcc/
├── operator/           # Go Kubernetes Operator (Operator SDK)
│   ├── api/           # CRD definitions
│   ├── controllers/   # Reconciliation loops
│   └── config/        # RBAC, manifests
├── backend/           # Go gRPC backend services
│   ├── api/           # Proto definitions
│   ├── services/      # Business logic
│   └── ebpf/          # eBPF agents
├── frontend/          # Next.js dashboard
│   ├── app/           # App router pages
│   ├── components/    # React components
│   └── lib/           # Utils, API clients
├── infrastructure/    # Deployment configs
│   ├── helm/          # Helm charts
│   ├── manifests/     # K8s YAML
│   └── terraform/     # IaC
└── docs/              # Documentation
```

## Technology Stack

### Core
- **Operator**: Go + Operator SDK + controller-runtime
- **Backend**: Go + gRPC + client-go
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
- **AI**: LLM-powered root cause analysis
- **FinOps**: OpenCost integration
- **Security**: eBPF runtime enforcement
- **Time-Travel**: Historical state debugging
