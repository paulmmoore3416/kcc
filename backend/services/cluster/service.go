package cluster

import (
	"context"
	"fmt"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/kubernetes"
)

// Service provides cluster administration operations
type Service struct {
	clientset *kubernetes.Clientset
}

// NewService creates a new cluster service
func NewService(clientset *kubernetes.Clientset) *Service {
	return &Service{
		clientset: clientset,
	}
}

// GetClusterInfo retrieves detailed cluster information
func (s *Service) GetClusterInfo(ctx context.Context) (*ClusterInfo, error) {
	// Get nodes
	nodes, err := s.clientset.CoreV1().Nodes().List(ctx, metav1.ListOptions{})
	if err != nil {
		return nil, fmt.Errorf("failed to list nodes: %w", err)
	}

	// Get all pods
	pods, err := s.clientset.CoreV1().Pods("").List(ctx, metav1.ListOptions{})
	if err != nil {
		return nil, fmt.Errorf("failed to list pods: %w", err)
	}

	// Get namespaces
	namespaces, err := s.clientset.CoreV1().Namespaces().List(ctx, metav1.ListOptions{})
	if err != nil {
		return nil, fmt.Errorf("failed to list namespaces: %w", err)
	}

	// Get server version
	version, err := s.clientset.Discovery().ServerVersion()
	if err != nil {
		return nil, fmt.Errorf("failed to get server version: %w", err)
	}

	return &ClusterInfo{
		Name:            "default",
		Version:         version.GitVersion,
		TotalNodes:      len(nodes.Items),
		TotalPods:       len(pods.Items),
		TotalNamespaces: len(namespaces.Items),
		Status:          "Healthy",
	}, nil
}

// ListPods returns a list of pods
func (s *Service) ListPods(ctx context.Context, namespace string) ([]PodInfo, error) {
	pods, err := s.clientset.CoreV1().Pods(namespace).List(ctx, metav1.ListOptions{})
	if err != nil {
		return nil, fmt.Errorf("failed to list pods: %w", err)
	}

	result := make([]PodInfo, 0, len(pods.Items))
	for _, pod := range pods.Items {
		containers := make([]ContainerInfo, 0, len(pod.Status.ContainerStatuses))
		for _, cs := range pod.Status.ContainerStatuses {
			containers = append(containers, ContainerInfo{
				Name:         cs.Name,
				Image:        cs.Image,
				Ready:        cs.Ready,
				RestartCount: cs.RestartCount,
			})
		}

		result = append(result, PodInfo{
			Name:       pod.Name,
			Namespace:  pod.Namespace,
			Status:     string(pod.Status.Phase),
			NodeName:   pod.Spec.NodeName,
			Labels:     pod.Labels,
			Containers: containers,
			CreatedAt:  pod.CreationTimestamp.Time,
		})
	}

	return result, nil
}

// ListNodes returns a list of nodes
func (s *Service) ListNodes(ctx context.Context) ([]NodeInfo, error) {
	nodes, err := s.clientset.CoreV1().Nodes().List(ctx, metav1.ListOptions{})
	if err != nil {
		return nil, fmt.Errorf("failed to list nodes: %w", err)
	}

	result := make([]NodeInfo, 0, len(nodes.Items))
	for _, node := range nodes.Items {
		status := "Ready"
		for _, condition := range node.Status.Conditions {
			if condition.Type == "Ready" {
				if condition.Status != "True" {
					status = "NotReady"
				}
				break
			}
		}

		// Count pods on this node
		pods, _ := s.clientset.CoreV1().Pods("").List(ctx, metav1.ListOptions{
			FieldSelector: fmt.Sprintf("spec.nodeName=%s", node.Name),
		})
		podCount := 0
		if pods != nil {
			podCount = len(pods.Items)
		}

		result = append(result, NodeInfo{
			Name:      node.Name,
			Status:    status,
			Labels:    node.Labels,
			PodCount:  podCount,
			CreatedAt: node.CreationTimestamp.Time,
		})
	}

	return result, nil
}

// ScaleDeployment scales a deployment
func (s *Service) ScaleDeployment(ctx context.Context, namespace, deploymentName string, replicas int32) error {
	scale, err := s.clientset.AppsV1().Deployments(namespace).GetScale(ctx, deploymentName, metav1.GetOptions{})
	if err != nil {
		return fmt.Errorf("failed to get deployment scale: %w", err)
	}

	scale.Spec.Replicas = replicas
	_, err = s.clientset.AppsV1().Deployments(namespace).UpdateScale(ctx, deploymentName, scale, metav1.UpdateOptions{})
	if err != nil {
		return fmt.Errorf("failed to update deployment scale: %w", err)
	}

	return nil
}

// DeletePod deletes a pod
func (s *Service) DeletePod(ctx context.Context, namespace, podName string) error {
	err := s.clientset.CoreV1().Pods(namespace).Delete(ctx, podName, metav1.DeleteOptions{})
	if err != nil {
		return fmt.Errorf("failed to delete pod: %w", err)
	}
	return nil
}

// PatchPod patches a pod
func (s *Service) PatchPod(ctx context.Context, namespace, podName string, patch []byte) error {
	_, err := s.clientset.CoreV1().Pods(namespace).Patch(
		ctx,
		podName,
		types.StrategicMergePatchType,
		patch,
		metav1.PatchOptions{},
	)
	if err != nil {
		return fmt.Errorf("failed to patch pod: %w", err)
	}
	return nil
}

// Types
type ClusterInfo struct {
	Name            string
	Version         string
	TotalNodes      int
	TotalPods       int
	TotalNamespaces int
	Status          string
}

type PodInfo struct {
	Name       string
	Namespace  string
	Status     string
	NodeName   string
	Labels     map[string]string
	Containers []ContainerInfo
	CreatedAt  interface{}
}

type ContainerInfo struct {
	Name         string
	Image        string
	Ready        bool
	RestartCount int32
}

type NodeInfo struct {
	Name      string
	Status    string
	Labels    map[string]string
	PodCount  int
	CreatedAt interface{}
}
