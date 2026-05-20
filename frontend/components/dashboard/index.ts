// Enhanced Dashboard Components - Central Export Point

export { SectionCard, type SectionStatus } from './section-card'
export { SectionHeader } from './section-header'
export { MetricCard, type MetricSeverity } from './metric-card'

// Premium FinOps Enhancements
export { CostAnomalyDetection } from './cost-anomaly-detection'
export { MultiCloudComparison } from './multi-cloud-comparison'
export { RightsizingRecommendations } from './rightsizing-recommendations'
export { ExecutiveReports } from './executive-reports'
export { KrakenMetrics } from './kraken-metrics'
export { AdvancedFinOpsAdmin } from './advanced-finops-admin'
export { default as ResourceHeatmap } from './resource-usage-heatmap'
export { SuperiorEnhancements } from './superior-enhancements'

// Usage Guide:
// 
// import { SectionCard, MetricCard, SectionHeader } from '@/components/dashboard'
// 
// // SectionCard for main content sections with borders and status
// <SectionCard
//   title="Cluster Overview"
//   icon={<Activity className="h-5 w-5" />}
//   status="healthy"
//   subtitle="Real-time metrics"
//   collapsible={true}
// >
//   {content}
// </SectionCard>
//
// // MetricCard for displaying individual metrics
// <MetricCard
//   label="CPU Usage"
//   value="62"
//   unit="%"
//   severity="warning"
//   trend="up"
//   trendValue="+8%"
// />
//
// // SectionHeader for section titles
// <SectionHeader
//   title="System Metrics"
//   subtitle="Real-time performance data"
//   icon={<Zap className="h-5 w-5" />}
// />
