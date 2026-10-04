package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/health"
	"google.golang.org/grpc/health/grpc_health_v1"
	"google.golang.org/grpc/reflection"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"

	"github.com/paulmmoore3416/kcc/backend/services/ai"
	"github.com/paulmmoore3416/kcc/backend/services/cluster"
	"github.com/paulmmoore3416/kcc/backend/services/cost"
	"github.com/paulmmoore3416/kcc/backend/services/depin"
	"github.com/paulmmoore3416/kcc/backend/services/mining"
	"github.com/paulmmoore3416/kcc/backend/services/observation"
	"github.com/paulmmoore3416/kcc/backend/services/security"
)

const (
	defaultPort = "50051"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// Initialize Kubernetes client. Without a cluster KCC runs in standalone mode
	// (DePIN, mining and FinOps views work; cluster views report "no cluster").
	var clientset *kubernetes.Clientset
	mode := "cluster"
	config, err := getKubernetesConfig()
	if err == nil {
		clientset, err = kubernetes.NewForConfig(config)
	}
	if err != nil {
		if os.Getenv("KCC_REQUIRE_CLUSTER") == "1" {
			log.Fatalf("Failed to get Kubernetes config: %v", err)
		}
		log.Printf("No Kubernetes cluster available (%v): starting in standalone mode", err)
		clientset, mode = nil, "standalone"
	}

	// Create gRPC server
	grpcServer := grpc.NewServer(
		grpc.MaxRecvMsgSize(10*1024*1024), // 10MB
		grpc.MaxSendMsgSize(10*1024*1024), // 10MB
	)

	// Register health service
	healthServer := health.NewServer()
	grpc_health_v1.RegisterHealthServer(grpcServer, healthServer)
	healthServer.SetServingStatus("", grpc_health_v1.HealthCheckResponse_SERVING)

	// Register services
	clusterService := cluster.NewService(clientset)
	aiService, err := ai.NewService(clientset)
	if err != nil {
		log.Printf("Warning: Failed to initialize AI service (check GEMINI_API_KEY): %v", err)
	}
	observationService := observation.NewService(clientset, aiService)
	costService := cost.NewService(clientset, aiService)
	securityService := security.NewService(clientset)
	depinService := depin.NewService(clientset)

	// Mining rig integration (read-only kcc.mining/v1 feed, see docs/TECHNICAL_GUIDE.md)
	miningService := mining.NewService()
	if miningService.Enabled() {
		go miningService.Run(context.Background())
		depinService.RegisterProvider("mining", depin.NewMiningProvider(miningService))
	}

	// Register gRPC services (proto registration would happen here)
	// pb.RegisterClusterServiceServer(grpcServer, clusterService)
	// pb.RegisterObservationServiceServer(grpcServer, observationService)
	// pb.RegisterCostServiceServer(grpcServer, costService)
	// pb.RegisterSecurityServiceServer(grpcServer, securityService)

	// Enable reflection for debugging
	reflection.Register(grpcServer)

	// Start server
	grpcHost := os.Getenv("KCC_GRPC_HOST") // e.g. 127.0.0.1 to keep gRPC local
	listener, err := net.Listen("tcp", fmt.Sprintf("%s:%s", grpcHost, port))
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	log.Printf("Kraken Cloud Control Backend gRPC server starting on port %s", port)

	// Start HTTP server for REST metrics (fallback for frontend)
	go func() {
		http.HandleFunc("/api/metrics", func(w http.ResponseWriter, r *http.Request) {
			setHeaders(w, r)

			depinMetrics, _ := depinService.GetMetrics(context.Background(), "optimai")
			clusterInfo, _ := clusterService.GetClusterInfo(context.Background())

			response := map[string]interface{}{
				"depin":     depinMetrics,
				"cluster":   clusterInfo,
				"timestamp": time.Now(),
				"mode":      mode,
				"enhancements": map[string]interface{}{
					"predictiveScaling": map[string]interface{}{
						"suggestion": 3,
						"reason":     "High traffic predicted in 2 hours for data-scraping tasks. Suggesting pre-scale of 3 OptimAI nodes.",
					},
					"sustainability": map[string]interface{}{
						"carbonReduction": "24.5%",
						"greenRegion":     "Iceland (100% Geothermal)",
						"recommendation":  "Migrate 2 validation nodes to Iceland region to reduce carbon footprint by 12kg/month.",
					},
				},
			}
			json.NewEncoder(w).Encode(response)
		})

		http.HandleFunc("/api/depin/all", func(w http.ResponseWriter, r *http.Request) {
			setHeaders(w, r)

			optimai, _ := depinService.GetMetrics(context.Background(), "optimai")
			filecoin, _ := depinService.GetMetrics(context.Background(), "filecoin")
			miningMetrics, _ := depinService.GetMetrics(context.Background(), "mining")

			json.NewEncoder(w).Encode(map[string]interface{}{
				"optimai":  optimai,
				"filecoin": filecoin,
				"mining":   miningMetrics,
			})
		})

		http.HandleFunc("/api/mining/summary", func(w http.ResponseWriter, r *http.Request) {
			setHeaders(w, r)
			json.NewEncoder(w).Encode(miningService.Summary())
		})

		http.HandleFunc("/api/mining/history", func(w http.ResponseWriter, r *http.Request) {
			setHeaders(w, r)
			since, _ := strconv.ParseInt(r.URL.Query().Get("since"), 10, 64)
			json.NewEncoder(w).Encode(miningService.History(since))
		})

		http.HandleFunc("/api/mining/focus", func(w http.ResponseWriter, r *http.Request) {
			setHeaders(w, r)
			json.NewEncoder(w).Encode(miningService.Focus())
		})

		http.HandleFunc("/api/mode", func(w http.ResponseWriter, r *http.Request) {
			setHeaders(w, r)
			json.NewEncoder(w).Encode(map[string]interface{}{"mode": mode, "mining": miningService.Enabled()})
		})

		http.HandleFunc("/api/nodes", func(w http.ResponseWriter, r *http.Request) {
			setHeaders(w, r)
			provider := r.URL.Query().Get("provider")
			if provider == "" {
				provider = "optimai"
			}
			nodes, err := depinService.ListNodes(context.Background(), provider)
			if err != nil || nodes == nil {
				nodes = []depin.NodeInfo{}
			}
			json.NewEncoder(w).Encode(nodes)
		})

		httpAddr := os.Getenv("KCC_HTTP_ADDR")
		if httpAddr == "" {
			httpAddr = ":8080"
		}
		log.Printf("Kraken Cloud Control REST API starting on %s", httpAddr)
		if err := http.ListenAndServe(httpAddr, nil); err != nil {
			log.Printf("HTTP server failed: %v", err)
		}
	}()

	// Graceful shutdown
	go func() {
		if err := grpcServer.Serve(listener); err != nil {
			log.Fatalf("Failed to serve: %v", err)
		}
	}()

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down gRPC server...")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	grpcServer.GracefulStop()
	<-ctx.Done()
	log.Println("Server stopped")

	// Placeholder to avoid unused variable errors
	_ = clusterService
	_ = observationService
	_ = costService
	_ = securityService
	_ = aiService
	_ = depinService
}

func getKubernetesConfig() (*rest.Config, error) {
	// Try in-cluster config first
	config, err := rest.InClusterConfig()
	if err == nil {
		return config, nil
	}

	// Fall back to kubeconfig
	kubeconfig := os.Getenv("KUBECONFIG")
	if kubeconfig == "" {
		kubeconfig = os.Getenv("HOME") + "/.kube/config"
	}

	return clientcmd.BuildConfigFromFlags("", kubeconfig)
}

// setHeaders sets JSON + CORS headers. KCC_CORS_ORIGINS is a comma-separated
// allow-list (default "*"); set it to the dashboard origin on shared machines.
func setHeaders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	allowed := os.Getenv("KCC_CORS_ORIGINS")
	if allowed == "" || allowed == "*" {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		return
	}
	origin := r.Header.Get("Origin")
	for _, o := range strings.Split(allowed, ",") {
		if strings.TrimSpace(o) == origin && origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
			return
		}
	}
}
