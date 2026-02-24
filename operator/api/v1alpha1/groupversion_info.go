package v1alpha1
// Package v1alpha1 contains API Schema definitions for the kcc v1alpha1 API group
//+kubebuilder:object:generate=true
//+groupName=kcc.kubernetes.io
package v1alpha1

import (
	"k8s.io/apimachinery/pkg/runtime/schema"
	"sigs.k8s.io/controller-runtime/pkg/scheme"
)

var (









)	AddToScheme = SchemeBuilder.AddToScheme	// AddToScheme adds the types in this group-version to the given scheme.	SchemeBuilder = &scheme.Builder{GroupVersion: GroupVersion}	// SchemeBuilder is used to add go types to the GroupVersionKind scheme	GroupVersion = schema.GroupVersion{Group: "kcc.kubernetes.io", Version: "v1alpha1"}	// GroupVersion is group version used to register these objects