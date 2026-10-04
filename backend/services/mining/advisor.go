package mining

import (
	"fmt"
	"strings"
	"time"
)

// advise turns the feed into a short list of rule-based recommendations.
// The rules are deliberately simple and explainable; the AI providers can be
// asked to elaborate on them through /api/mining/advice?ai=1.
func advise(f *Feed, t Totals, connected bool) []Advice {
	out := []Advice{}
	add := func(sev, title, detail string, a ...any) {
		out = append(out, Advice{Severity: sev, Title: title, Detail: fmt.Sprintf(detail, a...)})
	}
	if !connected {
		add("warn", "Feed is stale", "KCC has not received a fresh kcc.mining/v1 sample. Check that the rig exporter is running.")
	}
	for _, h := range f.Health {
		if h.Status == "crit" {
			add("crit", "Rig health: "+h.Name, "%s", h.Detail)
		}
	}
	inWindow := f.Window != nil && (time.Now().Hour() >= f.Window.StartHour || time.Now().Hour() < f.Window.StopHour)
	for _, m := range f.Miners {
		if !m.Enabled {
			continue
		}
		if f.Mining && !m.Active {
			add("warn", m.Device+" miner down", "%s (%s) is enabled but not running while the rig is mining.", m.ID, m.Algo)
		}
		if m.Active && m.Hashrate != nil && m.ExpectedHashrate > 0 && *m.Hashrate < 0.75*m.ExpectedHashrate {
			add("warn", m.Device+" below baseline", "%s is at %.0f%% of its expected %.2f %s. Look for thermal throttling or a lost MSR/huge-pages tweak.",
				m.ID, *m.Hashrate/m.ExpectedHashrate*100, m.ExpectedHashrate, m.Unit)
		}
		if m.TempC != nil && *m.TempC >= 80 {
			add("warn", m.Device+" running hot", "%.0f °C. A lower power cap usually costs far less hashrate than it saves in heat.", *m.TempC)
		}
	}
	if t.RejectRatePct > 5 {
		add("warn", "High share reject rate", "%.1f%% of shares rejected. Check pool latency or overclock stability.", t.RejectRatePct)
	}
	e := f.Economics
	switch {
	case e.RevenueUSDNight > 0 && e.NetUSDNight < 0:
		add("info", "Mining below power cost", "Tonight's projection: $%.2f revenue vs $%.2f electricity (net $%.2f). Fine for an accumulation strategy; break-even needs ~%.0f%% higher prices.",
			e.RevenueUSDNight, e.PowerCostUSDNight, e.NetUSDNight, (e.PowerCostUSDNight/e.RevenueUSDNight-1)*100)
	case e.NetUSDNight > 0:
		add("info", "Mining is profitable", "Projected net $%.2f per night after $%.2f electricity.", e.NetUSDNight, e.PowerCostUSDNight)
	}
	if e.NightsToPayout != nil && *e.NightsToPayout > 0 {
		add("info", "Next pool payout", "About %.0f nights to the %.0f XTM payout threshold at the current rate.", *e.NightsToPayout, e.PayoutThresholdXTM)
	}
	if !f.Mining && inWindow {
		add("warn", "Rig idle inside its mining window", "The schedule says %02d:00-%02d:00 but no miner is running (skip-tonight or a failed start?).", f.Window.StartHour, f.Window.StopHour)
	}
	coins := map[string]bool{}
	for _, m := range f.Miners {
		if m.Enabled {
			coins[m.Coin] = true
		}
	}
	if len(coins) > 1 {
		list := make([]string, 0, len(coins))
		for c := range coins {
			list = append(list, c)
		}
		add("info", "Hashpower split across coins", "Enabled miners target %s. Concentrating on one coin maximises its payout rate.", strings.Join(list, ", "))
	}
	return out
}
