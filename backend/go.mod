module github.com/paulmmoore3416/kcc/backend

go 1.22

require (
	google.golang.org/grpc v1.61.0
	google.golang.org/protobuf v1.32.0
	k8s.io/client-go v0.29.0
	k8s.io/api v0.29.0
	k8s.io/apimachinery v0.29.0
	github.com/ClickHouse/clickhouse-go/v2 v2.18.0
	github.com/cilium/ebpf v0.12.3
	go.opentelemetry.io/otel v1.22.0
	go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc v1.22.0
	go.opentelemetry.io/otel/sdk v1.22.0
	github.com/go-logr/logr v1.4.1
)

require (
	github.com/golang/protobuf v1.5.3
	golang.org/x/net v0.20.0
	golang.org/x/sys v0.16.0
)
