package mining

import (
	"fmt"
	"time"
)

// FocusRow is a FinOps FOCUS-style cost record for mining energy, so mining
// shows up next to cloud spend in KCC's FinOps views.
type FocusRow struct {
	BillingPeriodStart string            `json:"BillingPeriodStart"`
	ChargePeriodStart  string            `json:"ChargePeriodStart"`
	ChargePeriodEnd    string            `json:"ChargePeriodEnd"`
	ChargeCategory     string            `json:"ChargeCategory"`
	ChargeDescription  string            `json:"ChargeDescription"`
	ProviderName       string            `json:"ProviderName"`
	ServiceName        string            `json:"ServiceName"`
	ServiceCategory    string            `json:"ServiceCategory"`
	ResourceId         string            `json:"ResourceId"`
	ResourceName       string            `json:"ResourceName"`
	ConsumedQuantity   float64           `json:"ConsumedQuantity"`
	ConsumedUnit       string            `json:"ConsumedUnit"`
	PricingUnit        string            `json:"PricingUnit"`
	ListUnitPrice      float64           `json:"ListUnitPrice"`
	BilledCost         float64           `json:"BilledCost"`
	EffectiveCost      float64           `json:"EffectiveCost"`
	BillingCurrency    string            `json:"BillingCurrency"`
	Tags               map[string]string `json:"Tags"`
}

// Focus estimates one row per enabled miner for a night of mining, splitting
// the rig's projected power by each miner's share of watts.
func (s *Service) Focus() []FocusRow {
	s.mu.RLock()
	defer s.mu.RUnlock()
	rows := []FocusRow{}
	if s.feed == nil {
		return rows
	}
	f := s.feed
	now := time.Now().UTC()
	start := now.Truncate(24 * time.Hour)
	hours := f.Economics.HoursPerNight
	if hours <= 0 {
		hours = 8
	}
	for _, m := range f.Miners {
		if !m.Enabled || m.Watts == nil {
			continue
		}
		kwh := *m.Watts * hours / 1000
		cost := kwh * f.Power.USDPerKWh
		rows = append(rows, FocusRow{
			BillingPeriodStart: time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, time.UTC).Format(time.RFC3339),
			ChargePeriodStart:  start.Format(time.RFC3339),
			ChargePeriodEnd:    start.Add(24 * time.Hour).Format(time.RFC3339),
			ChargeCategory:     "Usage",
			ChargeDescription:  fmt.Sprintf("Electricity for %s mining %s (%.1f h/night)", m.Device, m.Coin, hours),
			ProviderName:       "On-premises",
			ServiceName:        "Crypto Mining",
			ServiceCategory:    "Compute",
			ResourceId:         "mining/" + m.ID,
			ResourceName:       m.Device,
			ConsumedQuantity:   kwh,
			ConsumedUnit:       "kWh",
			PricingUnit:        "kWh",
			ListUnitPrice:      f.Power.USDPerKWh,
			BilledCost:         cost,
			EffectiveCost:      cost,
			BillingCurrency:    "USD",
			Tags:               map[string]string{"coin": m.Coin, "algo": m.Algo, "kcc.module": "mining"},
		})
	}
	return rows
}
