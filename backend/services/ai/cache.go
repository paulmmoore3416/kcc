package ai

import (
	"sync"
	"time"
)

// CacheEntry represents a cached AI response
type CacheEntry struct {
	Response  interface{}
	ExpiresAt time.Time
}

// ResponseCache provides in-memory caching for AI responses
type ResponseCache struct {
	mu      sync.RWMutex
	entries map[string]*CacheEntry
	ttl     time.Duration
}

// NewResponseCache creates a new response cache
func NewResponseCache(ttl time.Duration) *ResponseCache {
	cache := &ResponseCache{
		entries: make(map[string]*CacheEntry),
		ttl:     ttl,
	}

	// Start cleanup goroutine
	go cache.cleanup()

	return cache
}

// Get retrieves a cached response
func (c *ResponseCache) Get(key string) (interface{}, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	entry, exists := c.entries[key]
	if !exists {
		return nil, false
	}

	if time.Now().After(entry.ExpiresAt) {
		return nil, false
	}

	return entry.Response, true
}

// Set stores a response in the cache
func (c *ResponseCache) Set(key string, response interface{}) {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.entries[key] = &CacheEntry{
		Response:  response,
		ExpiresAt: time.Now().Add(c.ttl),
	}
}

// cleanup removes expired entries periodically
func (c *ResponseCache) cleanup() {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		c.mu.Lock()
		now := time.Now()
		for key, entry := range c.entries {
			if now.After(entry.ExpiresAt) {
				delete(c.entries, key)
			}
		}
		c.mu.Unlock()
	}
}

// Clear removes all cached entries
func (c *ResponseCache) Clear() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.entries = make(map[string]*CacheEntry)
}

// Made with Bob
