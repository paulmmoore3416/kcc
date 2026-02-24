# Quick Start Guide

## Prerequisites

Before installing KCC, ensure you have:

- Kubernetes cluster v1.28 or higher
- `kubectl` configured to access your cluster
- Helm 3.x (for Helm installation)
- Linux kernel 5.8+ (for eBPF support)

## Installation Steps

### 1. Create Namespace

```bash
kubectl create namespace kcc-system
```

### 2. Deploy KCC Platform

#### Using Kustomize (Recommended)

```bash
kubectl apply -k https://github.com/paulmmoore3416/PJ/infrastructure/manifests/base
```

#### Using Helm

```bash
helm repo add kcc https://paulmmoore3416.github.io/PJ
helm install kcc kcc/kcc-platform -n kcc-system
```

### 3. Verify Installation

```bash
# Check all pods are running
kubectl get pods -n kcc-system

# Expected output:
# NAME                            READY   STATUS    RESTARTS   AGE
# kcc-operator-xxx                1/1     Running   0          2m
# kcc-backend-xxx                 1/1     Running   0          2m
# kcc-frontend-xxx                1/1     Running   0          2m
# kcc-ebpf-agent-xxx              1/1     Running   0          2m
# clickhouse-0                    1/1     Running   0          2m
```

### 4. Access the Dashboard

```bash
# Get the frontend service external IP
kubectl get svc kcc-frontend -n kcc-system

# For local development, use port-forward
kubectl port-forward -n kcc-system svc/kcc-frontend 3000:80
```

Open your browser to:
- **Production**: http://<EXTERNAL-IP>
- **Local**: http://localhost:3000

## First-Time Setup

### 1. Create ClusterObservation

```bash
cat <<EOF | kubectl apply -f -
apiVersion: kcc.kubernetes.io/v1alpha1
kind: ClusterObservation
metadata:
  name: my-cluster-observation
spec:
  clusterName: production
  enableEBPF: true
  enableAIAnalysis: true
  enableCostTracking: true
  metricsRetention: 90
  samplingRate: 0.1
EOF
```

### 2. Create ClusterAdministration

```bash
cat <<EOF | kubectl apply -f -
apiVersion: kcc.kubernetes.io/v1alpha1
kind: ClusterAdministration
metadata:
  name: my-cluster-admin
spec:
  clusterName: production
  autoScalingEnabled: true
  autoHealingEnabled: true
  policyEnforcement:
    enforcePodSecurityStandards: true
    enforceNetworkPolicies: true
EOF
```

### 3. Verify Resources

```bash
kubectl get clusterobservations
kubectl get clusteradministrations
```

## Next Steps

- Explore the dashboard at http://localhost:3000
- Check out the [User Guide](USER_GUIDE.md) for detailed features
- Read the [API Documentation](API.md) for programmatic access
- Review [Configuration Options](CONFIGURATION.md) for customization

## Troubleshooting

### Pods Not Starting

```bash
# Check pod logs
kubectl logs -n kcc-system <pod-name>

# Check events
kubectl get events -n kcc-system --sort-by='.lastTimestamp'
```

### eBPF Agent Issues

Ensure your kernel supports eBPF:

```bash
# Check kernel version (needs 5.8+)
uname -r

# Check eBPF support
ls /sys/kernel/debug/tracing
```

### Frontend Not Accessible

```bash
# Check service status
kubectl describe svc kcc-frontend -n kcc-system

# Check ingress (if using)
kubectl get ingress -n kcc-system
```

## Support

- GitHub Issues: https://github.com/paulmmoore3416/PJ/issues
- Documentation: https://docs.kcc-platform.io
- Community Slack: https://kcc-platform.slack.com
