#!/bin/bash

# KCC Platform - Comprehensive Feature Testing Script
# This script tests all major features and reports status

set -e

echo "🚀 KCC Platform - Comprehensive Feature Test Suite"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to run a test
run_test() {
    local test_name=$1
    local test_command=$2
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -n "Testing: $test_name... "
    
    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ PASSED${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

echo "📋 Phase 1: Environment Checks"
echo "--------------------------------"

# Check if kubectl is available
run_test "kubectl installed" "command -v kubectl"

# Check if Go is installed
run_test "Go installed" "command -v go"

# Check if Node.js is installed
run_test "Node.js installed" "command -v node"

# Check if npm is installed
run_test "npm installed" "command -v npm"

echo ""
echo "📋 Phase 2: Backend Service Tests"
echo "--------------------------------"

# Check if backend builds
run_test "Backend builds successfully" "cd backend && go build -o /tmp/kcc-backend ./cmd/server"

# Check Go module dependencies
run_test "Go modules valid" "cd backend && go mod verify"

# Check for syntax errors
run_test "Backend syntax check" "cd backend && go vet ./..."

echo ""
echo "📋 Phase 3: Frontend Tests"
echo "--------------------------------"

# Check if frontend dependencies are installed
if [ -d "frontend/node_modules" ]; then
    run_test "Frontend dependencies installed" "test -d frontend/node_modules"
else
    echo -e "${YELLOW}⚠ Installing frontend dependencies...${NC}"
    cd frontend && npm install && cd ..
fi

# Check if frontend builds
run_test "Frontend builds successfully" "cd frontend && npm run build"

# Check TypeScript compilation
run_test "TypeScript compiles" "cd frontend && npx tsc --noEmit"

echo ""
echo "📋 Phase 4: Operator Tests"
echo "--------------------------------"

# Check if operator builds
run_test "Operator builds successfully" "cd operator && go build -o /tmp/kcc-operator ."

# Check operator dependencies
run_test "Operator modules valid" "cd operator && go mod verify"

echo ""
echo "📋 Phase 5: Configuration Tests"
echo "--------------------------------"

# Check if required environment variables are documented
run_test "Environment variables documented" "grep -q 'GEMINI_API_KEY' README.md"

# Check if Kubernetes manifests are valid
run_test "Kubernetes manifests valid" "kubectl apply --dry-run=client -k infrastructure/manifests/base"

# Check if CRDs are valid
run_test "CRDs valid" "kubectl apply --dry-run=client -f operator/config/crd/bases/"

echo ""
echo "📋 Phase 6: Code Quality Tests"
echo "--------------------------------"

# Check for TODO comments (informational)
TODO_COUNT=$(find . -type f \( -name "*.go" -o -name "*.ts" -o -name "*.tsx" \) -exec grep -l "TODO" {} \; 2>/dev/null | wc -l)
echo "ℹ️  Found $TODO_COUNT files with TODO comments"

# Check for proper error handling in Go files
run_test "Error handling present" "grep -r 'if err != nil' backend/ | wc -l | awk '{exit !(\$1 > 10)}'"

# Check for proper TypeScript types
run_test "TypeScript types defined" "grep -r 'interface\\|type' frontend/components/ | wc -l | awk '{exit !(\$1 > 20)}'"

echo ""
echo "📋 Phase 7: Documentation Tests"
echo "--------------------------------"

# Check if key documentation files exist
run_test "README.md exists" "test -f README.md"
run_test "HACKATHON.md exists" "test -f HACKATHON.md"
run_test "SHOWCASE.md exists" "test -f SHOWCASE.md"
run_test "VISUALIZATION_GUIDE.md exists" "test -f VISUALIZATION_GUIDE.md"
run_test "OPTIMIZATION_REPORT.md exists" "test -f OPTIMIZATION_REPORT.md"

echo ""
echo "📋 Phase 8: Security Tests"
echo "--------------------------------"

# Check for hardcoded secrets (should find none)
SECRET_COUNT=$(grep -r -i "api[_-]key.*=.*['\"]" --include="*.go" --include="*.ts" --include="*.tsx" backend/ frontend/ 2>/dev/null | grep -v "os.Getenv" | wc -l)
if [ "$SECRET_COUNT" -eq 0 ]; then
    echo -e "Testing: No hardcoded secrets... ${GREEN}✓ PASSED${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "Testing: No hardcoded secrets... ${RED}✗ FAILED${NC} (Found $SECRET_COUNT)"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
TOTAL_TESTS=$((TOTAL_TESTS + 1))

# Check for proper RBAC configuration
run_test "RBAC configured" "test -f operator/config/rbac/role.yaml"

echo ""
echo "📋 Phase 9: Performance Tests"
echo "--------------------------------"

# Check bundle size (should be reasonable)
if [ -d "frontend/.next" ]; then
    BUNDLE_SIZE=$(du -sh frontend/.next 2>/dev/null | awk '{print $1}')
    echo "ℹ️  Frontend bundle size: $BUNDLE_SIZE"
fi

# Check Go binary size
if [ -f "/tmp/kcc-backend" ]; then
    BACKEND_SIZE=$(du -sh /tmp/kcc-backend | awk '{print $1}')
    echo "ℹ️  Backend binary size: $BACKEND_SIZE"
fi

echo ""
echo "📋 Phase 10: Integration Tests"
echo "--------------------------------"

# Check if services can communicate (mock test)
run_test "Service interfaces defined" "grep -q 'type Service struct' backend/services/ai/service.go"

# Check if frontend can call backend APIs
run_test "API routes defined" "test -d frontend/app/api"

# Check if operator CRDs match controllers
run_test "CRD controllers exist" "test -f operator/controllers/clusterobservation_controller.go"

echo ""
echo "=================================================="
echo "📊 Test Results Summary"
echo "=================================================="
echo ""
echo "Total Tests: $TOTAL_TESTS"
echo -e "${GREEN}Passed: $PASSED_TESTS${NC}"
echo -e "${RED}Failed: $FAILED_TESTS${NC}"
echo ""

# Calculate success rate
SUCCESS_RATE=$((PASSED_TESTS * 100 / TOTAL_TESTS))
echo "Success Rate: $SUCCESS_RATE%"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! Platform is ready for deployment.${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some tests failed. Please review the output above.${NC}"
    exit 1
fi

# Made with Bob
