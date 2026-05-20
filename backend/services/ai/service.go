package ai

import (
	"context"
	"fmt"
	"os"
	"time"

	"k8s.io/client-go/kubernetes"
)

// Service provides AI-powered insights using multiple providers (Gemini, Ollama)
type Service struct {
	clientset    *kubernetes.Clientset
	provider     AIProvider
	kraken       *KrakenHedgingService
	speechmatics *SpeechmaticsService
	cache        *ResponseCache
	rateLimiter  *RateLimiter
}

// NewService creates a new AI service with a dynamic provider
func NewService(clientset *kubernetes.Clientset) (*Service, error) {
	ctx := context.Background()
	providerType := os.Getenv("AI_PROVIDER")

	var provider AIProvider
	var err error

	switch providerType {
	case "gemini":
		provider, err = NewGeminiProvider(ctx)
		if err != nil {
			fmt.Printf("Warning: Failed to initialize Gemini provider: %v. Falling back to Ollama.\n", err)
			provider = NewOllamaProvider()
		}
	case "ollama":
		provider = NewOllamaProvider()
	default:
		// Default to Ollama for sovereign autonomy if not specified
		provider = NewOllamaProvider()
	}

	kraken := NewKrakenHedgingService()
	speechmatics := NewSpeechmaticsService()
	cache := NewResponseCache(5 * time.Minute)
	rateLimiter := NewRateLimiter(60, time.Second)

	return &Service{
		clientset:    clientset,
		provider:     provider,
		kraken:       kraken,
		speechmatics: speechmatics,
		cache:        cache,
		rateLimiter:  rateLimiter,
	}, nil
}

// AnalyzeRootCause performs AI-driven root cause analysis
func (s *Service) AnalyzeRootCause(ctx context.Context, incidentID, description string, occurredAt time.Time) (*AnalysisResult, error) {
	if err := s.rateLimiter.Allow(ctx); err != nil {
		return nil, fmt.Errorf("rate limit exceeded: %w", err)
	}
	s.rateLimiter.TrackRequest("root_cause_analysis")

	cacheKey := fmt.Sprintf("rca:%s:%s:%s", s.provider.Name(), incidentID, description)
	if cached, found := s.cache.Get(cacheKey); found {
		return cached.(*AnalysisResult), nil
	}

	result, err := s.provider.AnalyzeRootCause(ctx, incidentID, description, occurredAt)
	if err != nil {
		return nil, err
	}

	s.cache.Set(cacheKey, result)
	return result, nil
}

// GetRecommendations provides optimization recommendations
func (s *Service) GetRecommendations(ctx context.Context, category string) ([]Recommendation, error) {
	return s.provider.GetRecommendations(ctx, category)
}

// PredictFailure predicts potential failures
func (s *Service) PredictFailure(ctx context.Context, resourceType, resourceName string) (*FailurePrediction, error) {
	return s.provider.PredictFailure(ctx, resourceType, resourceName)
}

// ProcessVoiceCommand handles natural language commands
func (s *Service) ProcessVoiceCommand(ctx context.Context, command string) (string, error) {
	return s.provider.ProcessVoiceCommand(ctx, command)
}

// GetSpeechToken returns a temporary token for Speechmatics
func (s *Service) GetSpeechToken(ctx context.Context) (string, error) {
	return s.speechmatics.GetTemporaryToken()
}

// GetProviderName returns the name of the active AI provider
func (s *Service) GetProviderName() string {
	return s.provider.Name()
}

// Types

type AnalysisResult struct {
	Analysis        string
	PossibleCauses  []string
	Recommendations []string
	ConfidenceScore float64
}

type Recommendation struct {
	ID               string
	Title            string
	Description      string
	Category         string
	Priority         string
	PotentialSavings float64
}

type FailurePrediction struct {
	Probability    float64
	RiskFactors    []string
	Recommendation string
}
