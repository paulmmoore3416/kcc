package mining

// Feed is the kcc.mining/v1 telemetry document a mining rig exposes over HTTP.
// See docs/TECHNICAL_GUIDE.md#kccminingv1-schema. A feed must never carry wallet
// addresses, keys or tokens: KCC only needs rates, power, balances and health.
type Feed struct {
	Schema     string           `json:"schema"`
	TS         float64          `json:"ts"`
	Source     string           `json:"source"`
	Mining     bool             `json:"mining"`
	Window     *Window          `json:"window,omitempty"`
	CPUMode    string           `json:"cpu_mode,omitempty"`
	TariOnly   bool             `json:"tari_only"`
	NodesPause bool             `json:"nodes_paused"`
	Miners     []Miner          `json:"miners"`
	Power      Power            `json:"power"`
	Economics  Economics        `json:"economics"`
	Balances   []Balance        `json:"balances"`
	Prices     map[string]Price `json:"prices"`
	Health     []HealthCheck    `json:"health"`
	Nodes      map[string]any   `json:"nodes,omitempty"`
}

type Window struct {
	StartHour int `json:"start_hour"`
	StopHour  int `json:"stop_hour"`
}

type Miner struct {
	ID               string   `json:"id"`
	Device           string   `json:"device"`
	Algo             string   `json:"algo"`
	Coin             string   `json:"coin"`
	Unit             string   `json:"unit"`
	Enabled          bool     `json:"enabled"`
	Active           bool     `json:"active"`
	Hashrate         *float64 `json:"hashrate"`
	ExpectedHashrate float64  `json:"expected_hashrate"`
	Accepted         *int64   `json:"accepted"`
	Rejected         *int64   `json:"rejected"`
	Pool             string   `json:"pool"`
	TempC            *float64 `json:"temp_c"`
	Watts            *float64 `json:"watts"`
	CoinsPerNight    float64  `json:"coins_per_night"`
}

type Power struct {
	WattsLive           float64 `json:"watts_live"`
	WattsMiningEstimate float64 `json:"watts_mining_estimate"`
	USDPerKWh           float64 `json:"usd_per_kwh"`
}

type Economics struct {
	HoursPerNight      float64  `json:"hours_per_night"`
	XTMPerNight        float64  `json:"xtm_per_night"`
	RevenueUSDNight    float64  `json:"revenue_usd_night"`
	PowerCostUSDNight  float64  `json:"power_cost_usd_night"`
	NetUSDNight        float64  `json:"net_usd_night"`
	NightsToPayout     *float64 `json:"nights_to_payout"`
	PayoutThresholdXTM float64  `json:"payout_threshold_xtm"`
}

type Balance struct {
	ID        string   `json:"id"`
	Label     string   `json:"label"`
	Coin      string   `json:"coin"`
	Confirmed *float64 `json:"confirmed"`
	Pending   *float64 `json:"pending"`
	Paid      *float64 `json:"paid"`
	Threshold *float64 `json:"threshold"`
}

type Price struct {
	USD   *float64 `json:"usd"`
	Ch24h *float64 `json:"ch_24h"`
}

type HealthCheck struct {
	Name   string `json:"name"`
	Status string `json:"status"` // good | warn | crit | idle
	Detail string `json:"detail"`
}

// Point is one history sample kept in memory by the collector.
type Point struct {
	TS        int64              `json:"ts"`
	Watts     float64            `json:"watts"`
	Hashrates map[string]float64 `json:"hashrates"`
	Temps     map[string]float64 `json:"temps"`
}

// Summary is what KCC serves to its dashboard at /api/mining/summary.
type Summary struct {
	Connected bool     `json:"connected"`
	Error     string   `json:"error,omitempty"`
	Source    string   `json:"source"`
	FetchedAt int64    `json:"fetched_at"`
	Feed      *Feed    `json:"feed,omitempty"`
	Totals    Totals   `json:"totals"`
	Advice    []Advice `json:"advice"`
}

// Totals aggregates the feed per coin so the UI does not have to.
type Totals struct {
	ActiveMiners   int                `json:"active_miners"`
	EnabledMiners  int                `json:"enabled_miners"`
	HashrateByUnit map[string]float64 `json:"hashrate_by_unit"`
	BalanceByCoin  map[string]float64 `json:"balance_by_coin"`
	BalanceUSD     float64            `json:"balance_usd"`
	CostPerHourUSD float64            `json:"cost_per_hour_usd"`
	RejectRatePct  float64            `json:"reject_rate_pct"`
	PayoutProgress float64            `json:"payout_progress_pct"`
}

// Advice is a rule-based recommendation from the mining advisor.
type Advice struct {
	Severity string `json:"severity"` // info | warn | crit
	Title    string `json:"title"`
	Detail   string `json:"detail"`
}
