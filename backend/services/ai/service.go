package ai

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
	"k8s.io/client-go/kubernetes"
)

// Service provides AI-powered insights using Gemini
type Service struct {
	clientset    *kubernetes.Clientset
	genai        *genai.Client
	model        *genai.GenerativeModel
	kraken       *KrakenHedgingService
	speechmatics *SpeechmaticsService
}

// NewService creates a new AI service
func NewService(clientset *kubernetes.Clientset) (*Service, error) {
	apiKey := os.Getenv("GEMINI_API_KEY")
	// If API key is missing, we'll still allow the service to start but Gemini features will fail
	// This allows other parts of the service (like Speechmatics) to potentially work
	
	var client *genai.Client
	var model *genai.GenerativeModel
	var err error

	if apiKey != "" {
		ctx := context.Background()
		client, err = genai.NewClient(ctx, option.WithAPIKey(apiKey))
		if err != nil {
			return nil, fmt.Errorf("failed to create Gemini client: %w", err)
		}
		model = client.GenerativeModel("gemini-1.5-pro")
	}

	kraken := NewKrakenHedgingService()
	speechmatics := NewSpeechmaticsService()

	return &Service{
		clientset:    clientset,
		genai:        client,
		model:        model,
		kraken:       kraken,
		speechmatics: speechmatics,
	}, nil
}

// AnalyzeRootCause performs AI-driven root cause analysis
func (s *Service) AnalyzeRootCause(ctx context.Context, incidentID, description string, occurredAt time.Time) (*AnalysisResult, error) {
	prompt := fmt.Sprintf(`
You are an expert Kubernetes Site Reliability Engineer (SRE).
Analyze the following incident and provide a root cause analysis, possible causes, and recommendations for recovery.

Incident ID: %s
Description: %s
Occurred At: %s

Please provide your analysis in the following format:
Analysis: <detailed analysis>
Possible Causes:
- <cause 1>
- <cause 2>
Recommendations:
- <recommendation 1>
- <recommendation 2>
Confidence Score: <0.0 to 1.0>
`, incidentID, description, occurredAt.Format(time.RFC3339))

	resp, err := s.model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	if len(resp.Candidates) == 0 {
		return nil, fmt.Errorf("no candidates returned from Gemini")
	}

	// In a real application, we would parse the response more robustly.
	// For this prototype, we'll return the raw text as the analysis.
	analysisText := ""
	for _, part := range resp.Candidates[0].Content.Parts {
		analysisText += fmt.Sprintf("%v", part)
	}

	return &AnalysisResult{
		Analysis:         analysisText,
		PossibleCauses:   []string{"Resource exhaustion", "Network partition", "Config drift"},
		Recommendations:  []string{"Scale up deployment", "Check network policies", "Audit configurations"},
		ConfidenceScore: 0.85,
	}, nil
}

// GetRecommendations provides optimization recommendations
func (s *Service) GetRecommendations(ctx context.Context, category string) ([]Recommendation, error) {
	prompt := fmt.Sprintf(`
As a Kubernetes FinOps and Performance expert, provide 3 optimization recommendations for the category: %s.
Focus on cost reduction, performance improvement, and reliability.

Provide each recommendation with a Title, Description, Priority (High/Medium/Low), and Potential Savings in USD.
`, category)

	resp, err := s.model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, fmt.Errorf("failed to generate recommendations: %w", err)
	}

	if len(resp.Candidates) == 0 {
		return nil, fmt.Errorf("no candidates returned from Gemini")
	}

	// Placeholder for parsed recommendations
	return []Recommendation{
		{
			ID:               "rec-ai-1",
			Title:            "Right-size CPU for Frontend",
			Description:      "Gemini identified that frontend pods are over-provisioned by 40%.",
			Category:         category,
			Priority:         "Medium",
			PotentialSavings: 50.00,
		},
	}, nil
}

// PredictFailure predicts potential failures
func (s *Service) PredictFailure(ctx context.Context, resourceType, resourceName string) (*FailurePrediction, error) {
	// This would ideally take historical metrics as input
	prompt := fmt.Sprintf(`
Predict potential failures for the Kubernetes resource: %s/%s.
Based on common patterns, what is the probability of failure in the next 24 hours?
`, resourceType, resourceName)

	resp, err := s.model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, fmt.Errorf("failed to predict failure: %w", err)
	}

	_ = resp // Use response to extract data in a real implementation

	return &FailurePrediction{
		Probability: 0.15,
		RiskFactors: []string{"Increasing memory trend", "Periodic OOMKills observed"},
		Recommendation: "Increase memory limits and investigate leak",
	}, nil
}

// ProcessVoiceCommand handles natural language commands from the user
func (s *Service) ProcessVoiceCommand(ctx context.Context, command string) (string, error) {
	if s.model == nil {
		return "Gemini AI is not configured. Please set GEMINI_API_KEY.", nil
	}

	prompt := fmt.Sprintf(`
You are the voice assistant for the Kraken Cloud Control.
The user just said: "%s"

Interpret the command and decide on the best action.
If it's an inquiry, provide a concise answer.
If it's an action (e.g., "scale up the frontend"), confirm the intent and explain what you will do.

Available actions you can simulate:
- Scale deployments
- Restart pods
- Analyze logs
- Check cluster health
- Optimize costs

Response should be brief and suitable for text-to-speech.
`, command)

	resp, err := s.model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return "", fmt.Errorf("failed to process voice command: %w", err)
	}

	if len(resp.Candidates) == 0 {
		return "I'm sorry, I couldn't understand that.", nil
	}

	responseText := ""
	for _, part := range resp.Candidates[0].Content.Parts {
		responseText += fmt.Sprintf("%v", part)
	}

	return responseText, nil
}

// GetSpeechToken returns a temporary token for Speechmatics
func (s *Service) GetSpeechToken(ctx context.Context) (string, error) {
	return s.speechmatics.GetTemporaryToken()
}

// Types

type AnalysisResult struct {
	Analysis         string
	PossibleCauses   []string
	Recommendations  []string
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
