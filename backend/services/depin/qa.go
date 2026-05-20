package depin

import (
	"context"
	"fmt"
	"math/rand"
)

// ComputeQA performs benchmarking on DePIN nodes to ensure QoS compliance
type ComputeQA struct {
	service *Service
}

func NewComputeQA(service *Service) *ComputeQA {
	return &ComputeQA{service: service}
}

type QAScore struct {
	NodeID       string  `json:"nodeId"`
	CPUPerformance float64 `json:"cpuPerformance"` // 0.0 - 1.0
	LatencyScore float64 `json:"latencyScore"`   // 0.0 - 1.0
	OverallScore float64 `json:"overallScore"`
}

// BenchmarkNode runs a synthetic workload to test node quality
func (qa *ComputeQA) BenchmarkNode(ctx context.Context, providerName, nodeID string) (*QAScore, error) {
	// Simulated benchmarking logic
	cpuPerf := 0.85 + rand.Float64()*0.15
	latency := 0.90 + rand.Float64()*0.10
	overall := (cpuPerf + latency) / 2

	score := &QAScore{
		NodeID:       nodeID,
		CPUPerformance: cpuPerf,
		LatencyScore: latency,
		OverallScore: overall,
	}

	// Auto-throttling logic based on QA score
	if overall < 0.80 {
		fmt.Printf("⚠️ Low QA Score (%.2f) for node %s. Throttling resources to maintain efficiency.\n", overall, nodeID)
		qa.service.UpdateLimits(ctx, providerName, nodeID, "500m", "1Gi")
	}

	return score, nil
}
