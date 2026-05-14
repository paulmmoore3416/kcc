package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"google.golang.org/grpc/health"
	"google.golang.org/grpc/health/grpc_health_v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"

	"github.com/paulmmoore3416/kcc/backend/services/cluster"
	"github.com/paulmmoore3416/kcc/backend/services/cost"
	"github.com/paulmmoore3416/kcc/backend/services/observation"
	"github.com/paulmmoore3416/kcc/backend/services/security"
	"github.com/paulmmoore3416/kcc/backend/services/ai"
)

const (
	defaultPort = "50051"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// Initialize Kubernetes client
	config, err := getKubernetesConfig()
	if err != nil {
		log.Fatalf("Failed to get Kubernetes config: %v", err)
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create Kubernetes client: %v", err)
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

	// Register gRPC services (proto registration would happen here)
	// pb.RegisterClusterServiceServer(grpcServer, clusterService)
	// pb.RegisterObservationServiceServer(grpcServer, observationService)
	// pb.RegisterCostServiceServer(grpcServer, costService)
	// pb.RegisterSecurityServiceServer(grpcServer, securityService)

	// Enable reflection for debugging
	reflection.Register(grpcServer)

	// Start server
	listener, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	log.Printf("Kraken Cloud Control Backend gRPC server starting on port %s", port)

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
