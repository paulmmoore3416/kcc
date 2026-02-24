# Deployment Guide

## 🎯 Deployment Overview

This guide covers deploying Kubernetes Command Center (KCC) to production environments.

## Prerequisites Checklist

- [ ] Kubernetes cluster v1.28+ running
- [ ] kubectl configured and authenticated
- [ ] Cluster admin permissions
- [ ] Linux kernel 5.8+ on all nodes (for eBPF)
- [ ] At least 16 CPU cores and 32GB RAM available
- [ ] 100GB+ persistent storage available
- [ ] LoadBalancer or Ingress controller configured

## Architecture Decision

### Deployment Options

| Option | Use Case | Complexity | Scalability |
|--------|----------|------------|-------------|
| **Single Cluster** | Development, Testing | Low | Medium |
| **Multi-Cluster** | Production, Enterprise | High | High |
| **Hybrid** | Mixed workloads | Medium | High |

## Step-by-Step Deployment

### Step 1: Verify Prerequisites

```bash
# Check Kubernetes version
kubectl version --short

# Check available resources
kubectl top nodes

# Check kernel version on nodes
kubectl get nodes -o wide
```

### Step 2: Create Namespace and RBAC

```bash
# Create namespace
kubectl create namespace kcc-system

# Label namespace for monitoring
kubectl label namespace kcc-system monitoring=enabled
```

### Step 3: Deploy ClickHouse (Data Layer)

```bash
# Apply ClickHouse StatefulSet
kubectl apply -f infrastructure/manifests/base/clickhouse.yaml

# Wait for ClickHouse to be ready
kubectl wait --for=condition=ready pod -l app=clickhouse -n kcc-system --timeout=300s

# Verify ClickHouse is running
kubectl exec -it clickhouse-0 -n kcc-system -- clickhouse-client --query "SELECT version()"
```

### Step 4: Deploy Operator (Control Plane)

```bash
# Apply CRDs and operator
kubectl apply -f infrastructure/manifests/base/operator.yaml

# Verify operator is running
kubectl get pods -n kcc-system -l app=kcc-operator

# Check operator logs
kubectl logs -n kcc-system -l app=kcc-operator -f
```

### Step 5: Deploy eBPF Agents (Observation Layer)

```bash
# Deploy eBPF DaemonSet
kubectl apply -f infrastructure/manifests/base/ebpf-agent.yaml

# Verify agents on all nodes
kubectl get pods -n kcc-system -l app=kcc-ebpf-agent -o wide

# Check agent status
kubectl logs -n kcc-system -l app=kcc-ebpf-agent --tail=50
```

### Step 6: Deploy Backend Services

```bash
# Apply backend deployment
kubectl apply -f infrastructure/manifests/base/backend.yaml

# Wait for backend to be ready
kubectl wait --for=condition=available deployment/kcc-backend -n kcc-system --timeout=300s

# Verify gRPC service
kubectl get svc kcc-backend -n kcc-system
```

### Step 7: Deploy Frontend

```bash
# Apply frontend deployment
kubectl apply -f infrastructure/manifests/base/frontend.yaml

# Wait for frontend to be ready
kubectl wait --for=condition=available deployment/kcc-frontend -n kcc-system --timeout=300s

# Get frontend URL
kubectl get svc kcc-frontend -n kcc-system
```

### Step 8: Create Initial Resources

```bash
# Create ClusterObservation
cat <<EOF | kubectl apply -f -
apiVersion: kcc.kubernetes.io/v1alpha1
kind: ClusterObservation
metadata:
  name: production-observation
spec:
  clusterName: production
  enableEBPF: true
  enableAIAnalysis: true
  enableCostTracking: true
  enableSecurityEnforcement: true
  metricsRetention: 90
  samplingRate: 0.1
EOF

# Create ClusterAdministration
cat <<EOF | kubectl apply -f -
apiVersion: kcc.kubernetes.io/v1alpha1
kind: ClusterAdministration
metadata:
  name: production-admin
spec:
  clusterName: production
  autoScalingEnabled: true
  autoHealingEnabled: true
  policyEnforcement:
    enforcePodSecurityStandards: true
    enforceNetworkPolicies: true
    enforceResourceLimits: true
EOF
```

### Step 9: Verify Complete Deployment

```bash
# Check all pods
kubectl get pods -n kcc-system

# Expected output:
# NAME                            READY   STATUS    RESTARTS   AGE
# kcc-operator-xxx                1/1     Running   0          5m
# kcc-backend-xxx                 1/1     Running   0          4m
# kcc-frontend-xxx                1/1     Running   0          3m
# kcc-ebpf-agent-node1            1/1     Running   0          4m
# kcc-ebpf-agent-node2            1/1     Running   0          4m
# clickhouse-0                    1/1     Running   0          5m

# Check custom resources
kubectl get clusterobservations,clusteradministrations

# Test frontend access
curl -I http://<FRONTEND-IP>
```

## Production Configurations

### High Availability Setup

```yaml
# operator/deployment.yaml
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

### Resource Limits (Production)

```yaml
resources:
  requests:
    cpu: 500m
    memory: 512Mi
  limits:
    cpu: 2000m
    memory: 2Gi
```

### Persistent Storage

```yaml
volumeClaimTemplates:
- metadata:
    name: data
  spec:
    accessModes: ["ReadWriteOnce"]
    storageClassName: fast-ssd
    resources:
      requests:
        storage: 500Gi
```

## Security Hardening

### 1. Network Policies

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: kcc-backend-policy
  namespace: kcc-system
spec:
  podSelector:
    matchLabels:
      app: kcc-backend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: kcc-frontend
    ports:
    - protocol: TCP
      port: 50051
```

### 2. Pod Security Standards

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: kcc-system
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

### 3. RBAC Configuration

Already included in operator.yaml with minimal required permissions.

## Monitoring Setup

### Prometheus Integration

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kcc-operator-metrics
  namespace: kcc-system
  labels:
    app: kcc-operator
spec:
  ports:
  - port: 8080
    name: metrics
  selector:
    app: kcc-operator
---
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: kcc-operator
  namespace: kcc-system
spec:
  selector:
    matchLabels:
      app: kcc-operator
  endpoints:
  - port: metrics
```

## Backup and Disaster Recovery

### Backup ClickHouse Data

```bash
# Create backup
kubectl exec -it clickhouse-0 -n kcc-system -- clickhouse-backup create backup-$(date +%Y%m%d)

# List backups
kubectl exec -it clickhouse-0 -n kcc-system -- clickhouse-backup list
```

### Backup CRDs

```bash
# Export all ClusterObservations
kubectl get clusterobservations -o yaml > clusterobservations-backup.yaml

# Export all ClusterAdministrations
kubectl get clusteradministrations -o yaml > clusteradministrations-backup.yaml
```

## Scaling Guidelines

### Horizontal Scaling

```bash
# Scale backend
kubectl scale deployment kcc-backend -n kcc-system --replicas=5

# Scale frontend
kubectl scale deployment kcc-frontend -n kcc-system --replicas=3
```

### Vertical Scaling

Update resource requests/limits in deployment manifests and apply.

## Upgrade Procedure

### Rolling Update

```bash
# Update operator image
kubectl set image deployment/kcc-operator -n kcc-system operator=ghcr.io/paulmmoore3416/kcc-operator:v2.0.0

# Monitor rollout
kubectl rollout status deployment/kcc-operator -n kcc-system

# Rollback if needed
kubectl rollout undo deployment/kcc-operator -n kcc-system
```

## Troubleshooting

### Common Issues

#### Operator Not Starting

```bash
# Check events
kubectl describe pod <operator-pod> -n kcc-system

# Check RBAC
kubectl auth can-i list pods --as=system:serviceaccount:kcc-system:kcc-operator
```

#### eBPF Agents Failing

```bash
# Check kernel requirements
kubectl exec -it <ebpf-agent-pod> -n kcc-system -- uname -r

# Check eBPF mount
kubectl exec -it <ebpf-agent-pod> -n kcc-system -- ls /sys/kernel/debug/tracing
```

#### ClickHouse Connection Issues

```bash
# Test connectivity
kubectl exec -it <backend-pod> -n kcc-system -- nc -zv clickhouse.kcc-system.svc.cluster.local 9000

# Check ClickHouse logs
kubectl logs clickhouse-0 -n kcc-system --tail=100
```

## Performance Tuning

### ClickHouse Optimization

```sql
-- Optimize tables periodically
OPTIMIZE TABLE metrics FINAL;
OPTIMIZE TABLE logs FINAL;
```

### Backend Connection Pooling

```go
// Increase gRPC connection pool
grpc.WithMaxCallRecvMsgSize(10*1024*1024)
grpc.WithMaxCallSendMsgSize(10*1024*1024)
```

## Cleanup

### Remove KCC Platform

```bash
# Delete all resources
kubectl delete -k infrastructure/manifests/base

# Delete namespace
kubectl delete namespace kcc-system

# Verify cleanup
kubectl get all -n kcc-system
```

## Support

For deployment issues:
- Check [GitHub Issues](https://github.com/paulmmoore3416/PJ/issues)
- Join [Slack Community](https://kcc-platform.slack.com)
- Email: support@kcc-platform.io
