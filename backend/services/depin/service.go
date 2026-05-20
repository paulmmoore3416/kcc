package depin

import (
	"context"
	"fmt"

	"k8s.io/client-go/kubernetes"
)

// Service provides DePIN management and telemetry
type Service struct {
	providers map[string]DePINProvider
	clientset *kubernetes.Clientset
	Strategy  *ProvisioningStrategy
}

// NewService creates a new DePIN service
func NewService(clientset *kubernetes.Clientset) *Service {
	// Initialize with OptimAI provider as default
	optimai := NewOptimAIProvider(clientset, "kcc-depin", "https://optimai-rpc.example.com", "paulmmoore3416@gmail.com")
	filecoin := NewFilecoinProvider(clientset)
	
	s := &Service{
		clientset: clientset,
		providers: map[string]DePINProvider{
			"optimai":  optimai,
			"filecoin": filecoin,
		},
	}
	
	s.Strategy = NewProvisioningStrategy(s)
	return s
}

// GetMetrics returns metrics for a provider
func (s *Service) GetMetrics(ctx context.Context, providerName string) (*DePINMetrics, error) {
	provider, ok := s.providers[providerName]
	if !ok {
		return nil, fmt.Errorf("provider %s not found", providerName)
	}
	return provider.GetMetrics(ctx)
}

// ListNodes returns nodes for a provider
func (s *Service) ListNodes(ctx context.Context, providerName string) ([]NodeInfo, error) {
	provider, ok := s.providers[providerName]
	if !ok {
		return nil, fmt.Errorf("provider %s not found", providerName)
	}
	return provider.ListNodes(ctx)
}

// CreateNode provisions a new node
func (s *Service) CreateNode(ctx context.Context, providerName, nodeName string, cpu, mem string) (string, error) {
	provider, ok := s.providers[providerName]
	if !ok {
		return "", fmt.Errorf("provider %s not found", providerName)
	}
	
	limits := ResourceLimits{
		CPU:    cpu,
		Memory: mem,
	}
	
	return provider.CreateNode(ctx, nodeName, limits)
}

// DeleteNode removes a node
func (s *Service) DeleteNode(ctx context.Context, providerName, nodeID string) error {
	provider, ok := s.providers[providerName]
	if !ok {
		return fmt.Errorf("provider %s not found", providerName)
	}
	return provider.DeleteNode(ctx, nodeID)
}

// UpdateLimits updates resource limits for a node
func (s *Service) UpdateLimits(ctx context.Context, providerName, nodeID string, cpu, mem string) error {
	provider, ok := s.providers[providerName]
	if !ok {
		return fmt.Errorf("provider %s not found", providerName)
	}
	
	limits := ResourceLimits{
		CPU:    cpu,
		Memory: mem,
	}
	
	return provider.UpdateLimits(ctx, nodeID, limits)
}
