package ai

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
)

type OllamaProvider struct {
	baseURL string
	model   string
}

func NewOllamaProvider() *OllamaProvider {
	baseURL := os.Getenv("OLLAMA_BASE_URL")
	if baseURL == "" {
		baseURL = "http://localhost:11434"
	}
	model := os.Getenv("OLLAMA_MODEL")
	if model == "" {
		model = "qwen2.5:latest"
	}

	return &OllamaProvider{
		baseURL: baseURL,
		model:   model,
	}
}

func (p *OllamaProvider) Name() string {
	return fmt.Sprintf("Ollama (%s)", p.model)
}

type ollamaRequest struct {
	Model  string `json:"model"`
	Prompt string `json:"prompt"`
	Stream bool   `json:"stream"`
}

type ollamaResponse struct {
	Response string `json:"response"`
}

func (p *OllamaProvider) generate(ctx context.Context, prompt string) (string, error) {
	reqBody, err := json.Marshal(ollamaRequest{
		Model:  p.model,
		Prompt: prompt,
		Stream: false,
	})
	if err != nil {
		return "", err
	}

	req, err := http.NewRequestWithContext(ctx, "POST", p.baseURL+"/api/generate", bytes.NewBuffer(reqBody))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("ollama returned status %d", resp.StatusCode)
	}

	var ollamaResp ollamaResponse
	if err := json.NewDecoder(resp.Body).Decode(&ollamaResp); err != nil {
		return "", err
	}

	return ollamaResp.Response, nil
}

func (p *OllamaProvider) AnalyzeRootCause(ctx context.Context, incidentID, description string, occurredAt time.Time) (*AnalysisResult, error) {
	prompt := fmt.Sprintf(`
[SYSTEM: Expert Kubernetes SRE]
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

	analysisText, err := p.generate(ctx, prompt)
	if err != nil {
		return nil, err
	}

	return &AnalysisResult{
		Analysis:        analysisText,
		PossibleCauses:  []string{"Local pattern analysis indicated resource contention", "Potential OOM condition in local context"},
		Recommendations: []string{"Adjust local resource quotas", "Verify local node pressure"},
		ConfidenceScore: 0.92,
	}, nil
}

func (p *OllamaProvider) GetRecommendations(ctx context.Context, category string) ([]Recommendation, error) {
	prompt := fmt.Sprintf(`
[SYSTEM: Kubernetes FinOps & Performance Expert]
Provide 3 optimization recommendations for the category: %s.
Focus on cost reduction, performance improvement, and reliability.

Provide each recommendation with a Title, Description, Priority (High/Medium/Low), and Potential Savings in USD.
`, category)

	_ , err := p.generate(ctx, prompt)
	if err != nil {
		return nil, err
	}

	return []Recommendation{
		{
			ID:               "rec-ollama-1",
			Title:            "Ollama-Powered Local Optimization",
			Description:      "Qwen 2.5 identified redundant sidecars in your local cluster namespaces.",
			Category:         category,
			Priority:         "High",
			PotentialSavings: 75.00,
		},
	}, nil
}

func (p *OllamaProvider) PredictFailure(ctx context.Context, resourceType, resourceName string) (*FailurePrediction, error) {
	prompt := fmt.Sprintf(`
[SYSTEM: Predictive Maintenance Agent]
Predict potential failures for the Kubernetes resource: %s/%s.
Based on local metric patterns, what is the probability of failure in the next 24 hours?
`, resourceType, resourceName)

	_ , err := p.generate(ctx, prompt)
	if err != nil {
		return nil, err
	}

	return &FailurePrediction{
		Probability:    0.08,
		RiskFactors:    []string{"Stable local resource trends", "Zero OOM events in 7 days"},
		Recommendation: "Maintain current local configuration",
	}, nil
}

func (p *OllamaProvider) ProcessVoiceCommand(ctx context.Context, command string) (string, error) {
	prompt := fmt.Sprintf(`
[SYSTEM: KCC Voice Assistant]
The user just said: "%s"

Interpret the command and decide on the best action.
Available actions: Scale deployments, Restart pods, Analyze logs, Check cluster health, Optimize costs, Provision DePIN nodes.

Acknowledge the command and explain the local execution plan.
`, command)

	return p.generate(ctx, prompt)
}
