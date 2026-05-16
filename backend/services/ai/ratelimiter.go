package ai

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// RateLimiter implements token bucket rate limiting for AI API calls
type RateLimiter struct {
	mu            sync.Mutex
	tokens        int
	maxTokens     int
	refillRate    time.Duration
	lastRefill    time.Time
	requestCounts map[string]int
	resetTime     time.Time
}

// NewRateLimiter creates a new rate limiter
// maxTokens: maximum number of tokens in the bucket
// refillRate: how often to add a token
func NewRateLimiter(maxTokens int, refillRate time.Duration) *RateLimiter {
	rl := &RateLimiter{
		tokens:        maxTokens,
		maxTokens:     maxTokens,
		refillRate:    refillRate,
		lastRefill:    time.Now(),
		requestCounts: make(map[string]int),
		resetTime:     time.Now().Add(time.Hour),
	}

	// Start refill goroutine
	go rl.refill()

	return rl
}

// Allow checks if a request can proceed
func (rl *RateLimiter) Allow(ctx context.Context) error {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	if rl.tokens <= 0 {
		return fmt.Errorf("rate limit exceeded, retry after %v", rl.refillRate)
	}

	rl.tokens--
	return nil
}

// refill adds tokens back to the bucket periodically
func (rl *RateLimiter) refill() {
	ticker := time.NewTicker(rl.refillRate)
	defer ticker.Stop()

	for range ticker.C {
		rl.mu.Lock()
		if rl.tokens < rl.maxTokens {
			rl.tokens++
		}
		rl.lastRefill = time.Now()

		// Reset hourly counters
		if time.Now().After(rl.resetTime) {
			rl.requestCounts = make(map[string]int)
			rl.resetTime = time.Now().Add(time.Hour)
		}
		rl.mu.Unlock()
	}
}

// GetStats returns current rate limiter statistics
func (rl *RateLimiter) GetStats() map[string]interface{} {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	return map[string]interface{}{
		"available_tokens": rl.tokens,
		"max_tokens":       rl.maxTokens,
		"last_refill":      rl.lastRefill,
		"next_refill":      rl.lastRefill.Add(rl.refillRate),
	}
}

// TrackRequest tracks API requests by type
func (rl *RateLimiter) TrackRequest(requestType string) {
	rl.mu.Lock()
	defer rl.mu.Unlock()
	rl.requestCounts[requestType]++
}

// GetRequestCounts returns request counts by type
func (rl *RateLimiter) GetRequestCounts() map[string]int {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	counts := make(map[string]int)
	for k, v := range rl.requestCounts {
		counts[k] = v
	}
	return counts
}

// Made with Bob
