package depin

import (
	"context"
	"time"
)

// DePINMetrics represents telemetry from a DePIN network
type DePINMetrics struct {
	WalletBalance           float64
	RewardMultiplier        float64
	UptimeEfficiency        float64
	TotalRewardsAccumulated float64
	RewardTokenSymbol       string
	NetProfit               float64 // Enhancement 1: Profit/Loss
	InfrastructureCost      float64 // Enhancement 1: Cost Tracking
}

// ResourceLimits represents throttling for a node
type ResourceLimits struct {
	CPU     string
	Memory  string
	Storage string
}

// ResourceUsage represents current usage of a node
type ResourceUsage struct {
	CPU     string
	Memory  string
	Storage string
}

// NodeInfo represents a managed DePIN node
type NodeInfo struct {
	ID             string
	Name           string
	Provider       string
	Status         string
	ResourceUsage  ResourceUsage
	ResourceLimits ResourceLimits
	CreatedAt      time.Time
}

// DePINProvider defines the interface for different DePIN networks
type DePINProvider interface {
	GetMetrics(ctx context.Context) (*DePINMetrics, error)
	ListNodes(ctx context.Context) ([]NodeInfo, error)
	CreateNode(ctx context.Context, name string, limits ResourceLimits) (string, error)
	DeleteNode(ctx context.Context, nodeID string) error
	UpdateLimits(ctx context.Context, nodeID string, limits ResourceLimits) error
}
