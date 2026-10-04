package depin

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/paulmmoore3416/kcc/backend/services/mining"
)

// ErrReadOnly is returned for node lifecycle calls on observe-only providers.
var ErrReadOnly = errors.New("provider is read-only: manage miners on the rig itself")

// MiningProvider exposes a local mining rig (kcc.mining/v1 feed) as a DePIN
// provider, so its rewards and power cost appear in the DePIN Hub and Hydra wallet.
type MiningProvider struct {
	svc *mining.Service
}

func NewMiningProvider(svc *mining.Service) *MiningProvider { return &MiningProvider{svc: svc} }

func (p *MiningProvider) GetMetrics(ctx context.Context) (*DePINMetrics, error) {
	s := p.svc.Summary()
	if s.Feed == nil {
		return nil, fmt.Errorf("mining feed unavailable: %s", s.Error)
	}
	f := s.Feed
	symbol, best := "XTM", 0.0
	for coin, v := range s.Totals.BalanceByCoin {
		if v > best {
			symbol, best = coin, v
		}
	}
	var paid float64
	for _, b := range f.Balances {
		if b.Coin == symbol && b.Paid != nil {
			paid += *b.Paid
		}
	}
	uptime := 0.0
	if s.Totals.EnabledMiners > 0 {
		uptime = float64(s.Totals.ActiveMiners) / float64(s.Totals.EnabledMiners)
	}
	return &DePINMetrics{
		WalletBalance:           best,
		RewardMultiplier:        1,
		UptimeEfficiency:        uptime,
		TotalRewardsAccumulated: best + paid,
		RewardTokenSymbol:       symbol,
		NetProfit:               f.Economics.NetUSDNight,
		InfrastructureCost:      f.Economics.PowerCostUSDNight,
	}, nil
}

func (p *MiningProvider) ListNodes(ctx context.Context) ([]NodeInfo, error) {
	s := p.svc.Summary()
	if s.Feed == nil {
		return []NodeInfo{}, nil
	}
	nodes := []NodeInfo{}
	for _, m := range s.Feed.Miners {
		if !m.Enabled {
			continue
		}
		status, rate := "Idle", "0"
		if m.Active {
			status = "Running"
		}
		if m.Hashrate != nil {
			rate = fmt.Sprintf("%.2f %s", *m.Hashrate, m.Unit)
		}
		nodes = append(nodes, NodeInfo{
			ID: "mining/" + m.ID, Name: fmt.Sprintf("%s · %s %s", m.Device, m.Coin, m.Algo), Provider: "mining", Status: status,
			ResourceUsage: ResourceUsage{CPU: rate}, CreatedAt: time.Unix(s.FetchedAt, 0),
		})
	}
	return nodes, nil
}

func (p *MiningProvider) CreateNode(ctx context.Context, name string, limits ResourceLimits) (string, error) {
	return "", ErrReadOnly
}
func (p *MiningProvider) DeleteNode(ctx context.Context, nodeID string) error { return ErrReadOnly }
func (p *MiningProvider) UpdateLimits(ctx context.Context, nodeID string, limits ResourceLimits) error {
	return ErrReadOnly
}
