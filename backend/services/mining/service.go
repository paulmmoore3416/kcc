// Package mining connects KCC to a local crypto-mining rig through a read-only
// kcc.mining/v1 telemetry feed (see docs/TECHNICAL_GUIDE.md). KCC never controls
// the miners and never sees wallet addresses: it observes, costs and advises.
package mining

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"
)

const (
	defaultURL   = "http://127.0.0.1:8420/api/kcc/v1"
	historyLimit = 2160 // 6 h at the default 10 s poll interval
)

// Service polls the mining feed and keeps the latest document plus a short history.
type Service struct {
	url      string
	interval time.Duration
	client   *http.Client

	mu        sync.RWMutex
	feed      *Feed
	fetchedAt time.Time
	lastErr   error
	history   []Point
}

// NewService reads KCC_MINING_URL (feed URL) and KCC_MINING_POLL (Go duration, default 10s).
func NewService() *Service {
	url := os.Getenv("KCC_MINING_URL")
	if url == "" {
		url = defaultURL
	}
	interval, err := time.ParseDuration(os.Getenv("KCC_MINING_POLL"))
	if err != nil || interval < 2*time.Second {
		interval = 10 * time.Second
	}
	return &Service{url: url, interval: interval, client: &http.Client{Timeout: 5 * time.Second}}
}

// Enabled is false when KCC_MINING_URL=off.
func (s *Service) Enabled() bool { return s.url != "off" }

// Run polls until ctx is cancelled.
func (s *Service) Run(ctx context.Context) {
	if !s.Enabled() {
		return
	}
	t := time.NewTicker(s.interval)
	defer t.Stop()
	for {
		s.poll(ctx)
		select {
		case <-ctx.Done():
			return
		case <-t.C:
		}
	}
}

func (s *Service) poll(ctx context.Context) {
	req, _ := http.NewRequestWithContext(ctx, http.MethodGet, s.url, nil)
	req.Header.Set("User-Agent", "kraken-cloud-control")
	resp, err := s.client.Do(req)
	var f Feed
	if err == nil {
		defer resp.Body.Close()
		if resp.StatusCode != http.StatusOK {
			err = fmt.Errorf("feed returned HTTP %d", resp.StatusCode)
		} else if err = json.NewDecoder(resp.Body).Decode(&f); err == nil && !strings.HasPrefix(f.Schema, "kcc.mining/v1") {
			err = fmt.Errorf("unsupported feed schema %q", f.Schema)
		}
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	s.lastErr = err
	if err != nil {
		return
	}
	s.feed, s.fetchedAt = &f, time.Now()
	p := Point{TS: s.fetchedAt.Unix(), Watts: f.Power.WattsLive, Hashrates: map[string]float64{}, Temps: map[string]float64{}}
	for _, m := range f.Miners {
		if m.Hashrate != nil {
			p.Hashrates[m.ID] = *m.Hashrate
		}
		if m.TempC != nil {
			p.Temps[m.Device] = *m.TempC
		}
	}
	s.history = append(s.history, p)
	if len(s.history) > historyLimit {
		s.history = s.history[len(s.history)-historyLimit:]
	}
}

// Summary returns the latest feed with totals and advice.
func (s *Service) Summary() Summary {
	s.mu.RLock()
	defer s.mu.RUnlock()
	out := Summary{Source: s.url, Advice: []Advice{}}
	if !s.Enabled() {
		out.Error = "mining integration disabled (KCC_MINING_URL=off)"
		return out
	}
	if s.lastErr != nil {
		out.Error = s.lastErr.Error()
	}
	if s.feed == nil {
		if out.Error == "" {
			out.Error = "waiting for first sample"
		}
		return out
	}
	out.Connected = s.lastErr == nil && time.Since(s.fetchedAt) < 3*s.interval
	out.FetchedAt, out.Feed = s.fetchedAt.Unix(), s.feed
	out.Totals = totals(s.feed)
	out.Advice = advise(s.feed, out.Totals, out.Connected)
	return out
}

// History returns samples newer than since (unix seconds).
func (s *Service) History(since int64) []Point {
	s.mu.RLock()
	defer s.mu.RUnlock()
	out := make([]Point, 0, len(s.history))
	for _, p := range s.history {
		if p.TS > since {
			out = append(out, p)
		}
	}
	return out
}

func totals(f *Feed) Totals {
	t := Totals{HashrateByUnit: map[string]float64{}, BalanceByCoin: map[string]float64{}}
	var acc, rej int64
	for _, m := range f.Miners {
		if m.Enabled {
			t.EnabledMiners++
		}
		if m.Active {
			t.ActiveMiners++
		}
		if m.Hashrate != nil {
			t.HashrateByUnit[m.Unit] += *m.Hashrate
		}
		if m.Accepted != nil {
			acc += *m.Accepted
		}
		if m.Rejected != nil {
			rej += *m.Rejected
		}
	}
	if acc+rej > 0 {
		t.RejectRatePct = float64(rej) / float64(acc+rej) * 100
	}
	var xtmPool float64
	for _, b := range f.Balances {
		v := deref(b.Confirmed) + deref(b.Pending)
		t.BalanceByCoin[b.Coin] += v
		if b.Coin == "XTM" && b.Threshold != nil {
			xtmPool += deref(b.Confirmed)
		}
	}
	for coin, v := range t.BalanceByCoin {
		if p, ok := f.Prices[coin]; ok && p.USD != nil {
			t.BalanceUSD += v * *p.USD
		}
	}
	if f.Economics.PayoutThresholdXTM > 0 {
		t.PayoutProgress = min(xtmPool/f.Economics.PayoutThresholdXTM*100, 100)
	}
	t.CostPerHourUSD = f.Power.WattsLive / 1000 * f.Power.USDPerKWh
	return t
}

func deref(p *float64) float64 {
	if p == nil {
		return 0
	}
	return *p
}
