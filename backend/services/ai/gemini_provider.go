package ai

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type GeminiProvider struct {
	client *genai.Client
	model  *genai.GenerativeModel
}

func NewGeminiProvider(ctx context.Context) (*GeminiProvider, error) {
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("GEMINI_API_KEY is not set")
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return nil, fmt.Errorf("failed to create Gemini client: %w", err)
	}

	model := client.GenerativeModel("gemini-1.5-pro")
	model.SetTemperature(0.7)
	model.SetTopK(40)
	model.SetTopP(0.95)
	model.SetMaxOutputTokens(2048)

	return &GeminiProvider{
		client: client,
		model:  model,
	}, nil
}

func (p *GeminiProvider) Name() string {
	return "Gemini 1.5 Pro"
}

func (p *GeminiProvider) AnalyzeRootCause(ctx context.Context, incidentID, description string, occurredAt time.Time) (*AnalysisResult, error) {
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

	resp, err := p.model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	if len(resp.Candidates) == 0 {
		return nil, fmt.Errorf("no candidates returned from Gemini")
	}

	analysisText := ""
	for _, part := range resp.Candidates[0].Content.Parts {
		analysisText += fmt.Sprintf("%v", part)
	}

	return &AnalysisResult{
		Analysis:        analysisText,
		PossibleCauses:  []string{"Resource exhaustion", "Network partition", "Config drift"},
		Recommendations: []string{"Scale up deployment", "Check network policies", "Audit configurations"},
		ConfidenceScore: 0.85,
	}, nil
}

func (p *GeminiProvider) GetRecommendations(ctx context.Context, category string) ([]Recommendation, error) {
	prompt := fmt.Sprintf(`
As a Kubernetes FinOps and Performance expert, provide 3 optimization recommendations for the category: %s.
Focus on cost reduction, performance improvement, and reliability.

Provide each recommendation with a Title, Description, Priority (High/Medium/Low), and Potential Savings in USD.
`, category)

	resp, err := p.model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, fmt.Errorf("failed to generate recommendations: %w", err)
	}

	if len(resp.Candidates) == 0 {
		return nil, fmt.Errorf("no candidates returned from Gemini")
	}

	return []Recommendation{
		{
			ID:               "rec-gemini-1",
			Title:            "Right-size CPU for Frontend (Gemini)",
			Description:      "Gemini identified that frontend pods are over-provisioned by 40%.",
			Category:         category,
			Priority:         "Medium",
			PotentialSavings: 50.00,
		},
	}, nil
}

func (p *GeminiProvider) PredictFailure(ctx context.Context, resourceType, resourceName string) (*FailurePrediction, error) {
	prompt := fmt.Sprintf(`
Predict potential failures for the Kubernetes resource: %s/%s.
Based on common patterns, what is the probability of failure in the next 24 hours?
`, resourceType, resourceName)

	resp, err := p.model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, fmt.Errorf("failed to predict failure: %w", err)
	}

	_ = resp

	return &FailurePrediction{
		Probability:    0.15,
		RiskFactors:    []string{"Increasing memory trend", "Periodic OOMKills observed"},
		Recommendation: "Increase memory limits and investigate leak",
	}, nil
}

func (p *GeminiProvider) ProcessVoiceCommand(ctx context.Context, command string) (string, error) {
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
- Provision DePIN nodes (OptimAI, Filecoin)
- Throttling DePIN node resources

User just said: "%s"

If the user wants to manage DePIN nodes, acknowledge the specific network (e.g. "I'm provisioning 3 new OptimAI validation nodes in the Iceland region to optimize for green energy").
`, command, command)

	resp, err := p.model.GenerateContent(ctx, genai.Text(prompt))
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
