# KCC Platform - Troubleshooting Guide

## Common Issues and Solutions

### 1. Port Already in Use Error

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::4200
```

**Solution:**
Use the stop script to clean up all ports before starting:
```bash
./scripts/stop-kcc.sh
./kcc
```

**Manual Solution:**
```bash
# Find and kill process on port 4200
lsof -t -i:4200 | xargs kill -9

# Or kill all KCC-related processes
pkill -f "next dev"
pkill -f "go run"
```

---

### 2. Kubernetes Connection Failed

**Error Message:**
```
❌ Error: Cannot connect to Kubernetes cluster.
```

**Solution:**
Ensure your Kubernetes cluster is running:
```bash
# For kind
kind get clusters
kind create cluster --name kcc-cluster

# For minikube
minikube status
minikube start

# For Docker Desktop
# Enable Kubernetes in Docker Desktop settings

# Verify connection
kubectl cluster-info
```

---

### 3. Missing Dependencies

**Error Message:**
```
Error: Go is not installed.
Error: NPM is not installed.
```

**Solution:**
Install required dependencies:
```bash
# Install Go (1.25+)
# Visit: https://golang.org/dl/

# Install Node.js and npm (18+)
# Visit: https://nodejs.org/

# Verify installations
go version
node --version
npm --version
```

---

### 4. Frontend Build Errors

**Error Message:**
```
Module not found: Can't resolve '@/components/...'
```

**Solution:**
Reinstall frontend dependencies:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

### 5. Backend Compilation Errors

**Error Message:**
```
package github.com/paulmmoore3416/kcc/backend/services/ai: cannot find package
```

**Solution:**
Update Go modules:
```bash
cd backend
go mod tidy
go mod download
go build ./cmd/server
```

---

### 6. Operator CRD Not Found

**Error Message:**
```
no matches for kind "ClusterObservation" in version "kcc.kubernetes.io/v1alpha1"
```

**Solution:**
Install CRDs first:
```bash
kubectl apply -f operator/config/crd/bases/
kubectl get crds | grep kcc
```

---

### 7. Environment Variables Not Loaded

**Error Message:**
```
Warning: Failed to initialize AI service (check GEMINI_API_KEY)
```

**Solution:**
Create a `.env` file in the root directory:
```bash
# Create .env file
cat > .env << EOF
GEMINI_API_KEY=your-gemini-api-key
SPEECHMATICS_API_KEY=your-speechmatics-key
SPEECHMATICS_MGMT_TOKEN=your-speechmatics-token
KRAKEN_API_KEY=your-kraken-key
EOF

# Or export manually
export GEMINI_API_KEY="your-key"
export SPEECHMATICS_API_KEY="your-key"
```

---

### 8. Rate Limit Exceeded

**Error Message:**
```
rate limit exceeded, retry after 1s
```

**Solution:**
This is expected behavior. The system has rate limiting to prevent API abuse:
- Default: 60 requests per minute
- Wait 1 second and retry
- Or adjust rate limits in `backend/services/ai/service.go`

---

### 9. Cache Not Working

**Symptoms:**
- Slow AI responses even for repeated queries
- High API costs

**Solution:**
Cache is working if you see faster responses on repeated queries. To verify:
```bash
# Check logs for cache hits
# Look for "cache hit" messages in backend logs

# Clear cache (restart backend)
./scripts/stop-kcc.sh
./kcc
```

---

### 10. Dashboard Not Loading

**Symptoms:**
- Blank page
- Console errors
- 404 errors

**Solution:**
```bash
# 1. Check if frontend is running
lsof -i :3000

# 2. Check browser console for errors
# Open DevTools (F12) and check Console tab

# 3. Rebuild frontend
cd frontend
npm run build
npm run dev

# 4. Clear browser cache
# Ctrl+Shift+R (hard refresh)
```

---

## Diagnostic Commands

### Check All Services Status
```bash
# Check if services are running
lsof -i :4200  # Frontend
lsof -i :50051 # Backend
lsof -i :8082  # Operator metrics
lsof -i :8083  # Operator health

# Check Kubernetes resources
kubectl get pods -n kcc-system
kubectl get crds | grep kcc
kubectl get clusterobservations
kubectl get clusteradministrations
```

### View Logs
```bash
# Backend logs (if running in background)
tail -f /tmp/kcc-backend.log

# Operator logs
kubectl logs -n kcc-system deployment/kcc-operator -f

# Frontend logs
# Check terminal where ./kcc was run
```

### Test API Endpoints
```bash
# Test backend gRPC health
grpcurl -plaintext localhost:50051 grpc.health.v1.Health/Check

# Test operator health
curl http://localhost:8083/healthz

# Test operator metrics
curl http://localhost:8082/metrics
```

---

## Performance Issues

### Slow Dashboard Loading
1. Check network tab in browser DevTools
2. Verify backend is responding: `curl http://localhost:50051`
3. Check if lazy loading is working (components load progressively)
4. Clear browser cache

### High Memory Usage
1. Check Go memory: `ps aux | grep "go run"`
2. Check Node memory: `ps aux | grep "next dev"`
3. Restart services: `./scripts/stop-kcc.sh && ./kcc`

### Slow AI Responses
1. Verify cache is enabled (check logs)
2. Check rate limiter status
3. Verify GEMINI_API_KEY is set
4. Check network latency to Gemini API

---

## Testing Issues

### Test Script Fails
```bash
# Run with verbose output
bash -x ./scripts/test-all-features.sh

# Run individual test phases
cd backend && go build ./cmd/server
cd frontend && npm run build
cd operator && go build .
```

### Build Failures
```bash
# Clean and rebuild everything
./scripts/stop-kcc.sh
cd backend && go clean && go build ./cmd/server
cd frontend && rm -rf .next && npm run build
cd operator && go clean && go build .
```

---

## Getting Help

### Collect Diagnostic Information
```bash
# System info
uname -a
go version
node --version
kubectl version

# Service status
lsof -i :3000,50051,8082,8083

# Kubernetes status
kubectl cluster-info
kubectl get nodes
kubectl get pods --all-namespaces

# Logs
# Copy relevant error messages from terminal
```

### Report Issues
When reporting issues, include:
1. Error message (full stack trace)
2. Steps to reproduce
3. System information (OS, Go version, Node version)
4. Kubernetes cluster type (kind, minikube, etc.)
5. Output of diagnostic commands above

---

## Quick Fixes

### Nuclear Option (Reset Everything)
```bash
# Stop all services
./scripts/stop-kcc.sh

# Clean all build artifacts
cd backend && go clean -cache -modcache
cd frontend && rm -rf .next node_modules
cd operator && go clean

# Reinstall dependencies
cd frontend && npm install
cd backend && go mod download
cd operator && go mod download

# Rebuild and restart
./kcc
```

### Port Conflicts
```bash
# Find what's using ports
lsof -i :4200
lsof -i :50051

# Kill specific process
kill -9 <PID>

# Or use the stop script
./scripts/stop-kcc.sh
```

---

## Prevention Tips

1. **Always stop services properly**: Use `./scripts/stop-kcc.sh` instead of Ctrl+C
2. **Check ports before starting**: Run stop script before starting
3. **Keep dependencies updated**: Regularly run `go mod tidy` and `npm update`
4. **Monitor logs**: Watch for warnings and errors
5. **Use environment variables**: Never hardcode API keys
6. **Test after changes**: Run `./scripts/test-all-features.sh` after modifications

---

## Still Having Issues?

If none of these solutions work:

1. Check the [GitHub Issues](https://github.com/paulmmoore3416/kcc/issues)
2. Review the [Documentation](./README.md)
3. Check the [Optimization Report](./OPTIMIZATION_REPORT.md)
4. Review the [Enhancement Summary](./FINAL_ENHANCEMENTS.md)

**The platform has been thoroughly tested and optimized. Most issues are related to environment setup or port conflicts.**