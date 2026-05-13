package ai

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
)

// SpeechmaticsService handles interactions with the Speechmatics API
type SpeechmaticsService struct {
	apiKey    string
	mgmtToken string
}

// NewSpeechmaticsService creates a new Speechmatics service
func NewSpeechmaticsService() *SpeechmaticsService {
	return &SpeechmaticsService{
		apiKey:    os.Getenv("SPEECHMATICS_API_KEY"),
		mgmtToken: os.Getenv("SPEECHMATICS_MGMT_TOKEN"),
	}
}

// GetTemporaryToken generates a temporary API key for frontend use
func (s *SpeechmaticsService) GetTemporaryToken() (string, error) {
	if s.mgmtToken == "" {
		return "", fmt.Errorf("SPEECHMATICS_MGMT_TOKEN not set")
	}

	// Speechmatics Management API endpoint for temporary keys
	// Note: The exact endpoint might vary based on their current API version.
	// This is a common pattern for their Management API.
	url := "https://management.api.speechmatics.com/v1/api_keys"
	
	payload := map[string]interface{}{
		"label": "kcc-frontend-session",
		"ttl":   3600, // 1 hour
	}
	
	jsonPayload, _ := json.Marshal(payload)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
	if err != nil {
		return "", err
	}
	
	req.Header.Set("Authorization", "Bearer "+s.mgmtToken)
	req.Header.Set("Content-Type", "application/json")
	
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	
	if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("speechmatics management api error: %s", resp.Status)
	}
	
	var result struct {
		Key string `json:"key"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", err
	}
	
	return result.Key, nil
}
