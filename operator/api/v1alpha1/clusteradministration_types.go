package v1alpha1

import (
	"k8s.io/apimachinery/pkg/runtime"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// ClusterAdministrationSpec defines the desired state of ClusterAdministration
type ClusterAdministrationSpec struct {
	// ClusterName is the name of the target cluster
	ClusterName string `json:"clusterName"`

	// AutoScalingEnabled enables automatic scaling based on metrics
	AutoScalingEnabled bool `json:"autoScalingEnabled,omitempty"`

	// AutoHealingEnabled enables automatic healing of failed pods
	AutoHealingEnabled bool `json:"autoHealingEnabled,omitempty"`

	// ResourceQuotas defines resource limits per namespace
	ResourceQuotas map[string]ResourceQuota `json:"resourceQuotas,omitempty"`

	// PolicyEnforcement defines security and compliance policies
	PolicyEnforcement PolicyEnforcementConfig `json:"policyEnforcement,omitempty"`

	// BackupSchedule defines backup configuration
	BackupSchedule string `json:"backupSchedule,omitempty"`
}

// ResourceQuota defines resource limits
type ResourceQuota struct {
	CPU    string `json:"cpu,omitempty"`
	Memory string `json:"memory,omitempty"`
	Pods   int32  `json:"pods,omitempty"`
}

// PolicyEnforcementConfig defines policy settings
type PolicyEnforcementConfig struct {
	// EnforcePodSecurityStandards enables PSS enforcement
	EnforcePodSecurityStandards bool `json:"enforcePodSecurityStandards,omitempty"`

	// EnforceNetworkPolicies enables network policy enforcement
	EnforceNetworkPolicies bool `json:"enforceNetworkPolicies,omitempty"`

	// EnforceResourceLimits requires resource limits on all pods
	EnforceResourceLimits bool `json:"enforceResourceLimits,omitempty"`

	// AllowedRegistries defines approved container registries
	AllowedRegistries []string `json:"allowedRegistries,omitempty"`
}

// ClusterAdministrationStatus defines the observed state of ClusterAdministration
type ClusterAdministrationStatus struct {
	// Phase represents the current operational phase
	Phase string `json:"phase,omitempty"`

	// Conditions represent the latest available observations
	Conditions []metav1.Condition `json:"conditions,omitempty"`

	// TotalNamespaces under management
	TotalNamespaces int32 `json:"totalNamespaces,omitempty"`

	// HealthyPods count
	HealthyPods int32 `json:"healthyPods,omitempty"`

	// UnhealthyPods count
	UnhealthyPods int32 `json:"unhealthyPods,omitempty"`

	// PolicyViolations count
	PolicyViolations int32 `json:"policyViolations,omitempty"`

	// LastReconcileTime is the timestamp of last reconciliation
	LastReconcileTime *metav1.Time `json:"lastReconcileTime,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status
//+kubebuilder:resource:scope=Cluster
//+kubebuilder:printcolumn:name="Cluster",type=string,JSONPath=`.spec.clusterName`
//+kubebuilder:printcolumn:name="Phase",type=string,JSONPath=`.status.phase`
//+kubebuilder:printcolumn:name="Healthy",type=integer,JSONPath=`.status.healthyPods`
//+kubebuilder:printcolumn:name="Unhealthy",type=integer,JSONPath=`.status.unhealthyPods`
//+kubebuilder:printcolumn:name="Age",type=date,JSONPath=`.metadata.creationTimestamp`

// ClusterAdministration is the Schema for the clusteradministrations API
type ClusterAdministration struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   ClusterAdministrationSpec   `json:"spec,omitempty"`
	Status ClusterAdministrationStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

// ClusterAdministrationList contains a list of ClusterAdministration
type ClusterAdministrationList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []ClusterAdministration `json:"items"`
}

func (in *ClusterAdministration) DeepCopyObject() runtime.Object {
	return in
}

func (in *ClusterAdministrationList) DeepCopyObject() runtime.Object {
	return in
}

func init() {
	SchemeBuilder.Register(&ClusterAdministration{}, &ClusterAdministrationList{})
}
