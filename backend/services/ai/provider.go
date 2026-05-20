package ai

import (
	"context"
	"time"
)

// AIProvider defines the interface for AI-powered insights and operations
type AIProvider interface {
	AnalyzeRootCause(ctx context.Context, incidentID, description string, occurredAt time.Time) (*AnalysisResult, error)
	GetRecommendations(ctx context.Context, category string) ([]Recommendation, error)
	PredictFailure(ctx context.Context, resourceType, resourceName string) (*FailurePrediction, error)
	ProcessVoiceCommand(ctx context.Context, command string) (string, error)
	Name() string
}
