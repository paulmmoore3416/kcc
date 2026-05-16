#!/bin/bash

# KCC Platform - Stop All Services Script
# This script properly stops all KCC services and cleans up ports

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🛑 Stopping Kraken Cloud Control Services${NC}"
echo "=============================================="
echo ""

# Function to kill processes on a port
kill_port() {
    local port=$1
    local pids=$(lsof -t -i:$port 2>/dev/null || true)
    
    if [ ! -z "$pids" ]; then
        echo -e "${RED}Stopping processes on port $port...${NC}"
        for pid in $pids; do
            echo "  Killing PID $pid"
            kill -9 $pid 2>/dev/null || true
        done
        return 0
    else
        echo -e "${GREEN}Port $port is already free${NC}"
        return 1
    fi
}

# Kill processes by name
echo "Stopping KCC processes by name..."
pkill -f "go run cmd/server/main.go" 2>/dev/null || true
pkill -f "go run main.go" 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true

sleep 1

# Kill processes on specific ports
echo ""
echo "Cleaning up ports..."
CLEANED=false

if kill_port 4200; then CLEANED=true; fi
if kill_port 50051; then CLEANED=true; fi
if kill_port 8082; then CLEANED=true; fi
if kill_port 8083; then CLEANED=true; fi

if [ "$CLEANED" = true ]; then
    echo ""
    echo -e "${YELLOW}Waiting for ports to release...${NC}"
    sleep 2
    
    # Verify all ports are free
    echo ""
    echo "Verifying ports are free..."
    ALL_FREE=true
    for port in 4200 50051 8082 8083; do
        if lsof -t -i:$port 2>/dev/null; then
            echo -e "${RED}⚠️  Port $port is still in use${NC}"
            ALL_FREE=false
        else
            echo -e "${GREEN}✓ Port $port is free${NC}"
        fi
    done
    
    if [ "$ALL_FREE" = true ]; then
        echo ""
        echo -e "${GREEN}✅ All KCC services stopped successfully!${NC}"
    else
        echo ""
        echo -e "${YELLOW}⚠️  Some ports are still in use. You may need to manually kill processes.${NC}"
        echo "Run: lsof -i :3000 (or other port) to identify processes"
    fi
else
    echo ""
    echo -e "${GREEN}✅ No KCC services were running${NC}"
fi

echo ""
echo "Done!"

# Made with Bob
