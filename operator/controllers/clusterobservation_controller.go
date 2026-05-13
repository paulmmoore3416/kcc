package controllers

import (
	"context"
	"time"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	kccv1alpha1 "github.com/paulmmoore3416/kcc/operator/api/v1alpha1"
)

// ClusterObservationReconciler reconciles a ClusterObservation object
type ClusterObservationReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=kcc.kubernetes.io,resources=clusterobservations,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=kcc.kubernetes.io,resources=clusterobservations/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=kcc.kubernetes.io,resources=clusterobservations/finalizers,verbs=update

func (r *ClusterObservationReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	logger := log.FromContext(ctx)

	clusterObs := &kccv1alpha1.ClusterObservation{}
	if err := r.Get(ctx, req.NamespacedName, clusterObs); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// Update status with observation status
	clusterObs.Status.Phase = "Active"
	now := metav1.Now()
	clusterObs.Status.LastObservedTime = &now

	if err := r.Status().Update(ctx, clusterObs); err != nil {
		logger.Error(err, "Failed to update ClusterObservation status")
		return ctrl.Result{}, err
	}

	return ctrl.Result{RequeueAfter: 1 * time.Minute}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *ClusterObservationReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&kccv1alpha1.ClusterObservation{}).
		Complete(r)
}
