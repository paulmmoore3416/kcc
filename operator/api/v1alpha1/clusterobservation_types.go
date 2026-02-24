package v1alpha1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// ClusterObservationSpec defines the desired state of ClusterObservation
type ClusterObservationSpec struct {
	// ClusterName is the name of the target cluster
	ClusterName string `json:"clusterName"`

	// EnableEBPF enables eBPF-based kernel monitoring
	EnableEBPF bool `json:"enableEBPF,omitempty"`

	// EnableAIAnalysis enables AI-powered root cause analysis
	EnableAIAnalysis bool `json:"enableAIAnalysis,omitempty"`

	// EnableCostTracking enables FinOps cost observability
	EnableCostTracking bool `json:"enableCostTracking,omitempty"`

	// EnableSecurityEnforcement enables eBPF runtime security
	EnableSecurityEnforcement bool `json:"enableSecurityEnforcement,omitempty"`

	// MetricsRetention defines how long to retain metrics (in days)
	MetricsRetention int32 `json:"metricsRetention,omitempty"`

	// SamplingRate for telemetry data (0.0 to 1.0)
	SamplingRate float64 `json:"samplingRate,omitempty"`
}

// ClusterObservationStatus defines the observed state of ClusterObservation
type ClusterObservationStatus struct {
	// Phase represents the current phase of observation
	Phase string `json:"phase,omitempty"`

	// Conditions represent the latest available observations
	Conditions []metav1.Condition `json:"conditions,omitempty"`

	// EBPFAgentStatus indicates if eBPF agents are running
	EBPFAgentStatus string `json:"ebpfAgentStatus,omitempty"`

	// TelemetryCollectorStatus indicates collector health
	TelemetryCollectorStatus string `json:"telemetryCollectorStatus,omitempty"`

	// StorageStatus indicates ClickHouse connection status
	StorageStatus string `json:"storageStatus,omitempty"`

	// LastObservedTime is the timestamp of last observation
	LastObservedTime *metav1.Time `json:"lastObservedTime,omitempty"`

	// TotalPods being monitored
	TotalPods int32 `json:"totalPods,omitempty"`

	// TotalNodes being monitored
	TotalNodes int32 `json:"totalNodes,omitempty"`

	// AlertsActive count of active alerts
	AlertsActive int32 `json:"alertsActive,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status
//+kubebuilder:resource:scope=Cluster
//+kubebuilder:printcolumn:name="Cluster",type=string,JSONPath=`.spec.clusterName`
//+kubebuilder:printcolumn:name="Phase",type=string,JSONPath=`.status.phase`
//+kubebuilder:printcolumn:name="Pods",type=integer,JSONPath=`.status.totalPods`
//+kubebuilder:printcolumn:name="Nodes",type=integer,JSONPath=`.status.totalNodes`
//+kubebuilder:printcolumn:name="Age",type=date,JSONPath=`.metadata.creationTimestamp`

// ClusterObservation is the Schema for the clusterobservations API
type ClusterObservation struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   ClusterObservationSpec   `json:"spec,omitempty"`
	Status ClusterObservationStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

// ClusterObservationList contains a list of ClusterObservation
type ClusterObservationList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []ClusterObservation `json:"items"`
}

func init() {
	SchemeBuilder.Register(&ClusterObservation{}, &ClusterObservationList{})
}
