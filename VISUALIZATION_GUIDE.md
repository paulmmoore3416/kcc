# 📊 KCC Visualization Guide

## Quick Navigation

### Main Dashboard Tabs
1. **Overview** - Cluster health at a glance with key metrics
2. **Pods** - Detailed pod listing and management
3. **Nodes** - Node inventory and resource allocation
4. **Metrics** - Traditional metrics charts
5. **Performance** - Real-time gauge visualizations
6. **Network** - Network traffic analysis
7. **Cost Forecast** - 8-week cost prediction model
8. **AI Insights** - Machine learning recommendations
9. **Cost** - Historical cost analysis
10. **Security** - Real-time security events and compliance
11. **Heatmap** - 24x24 node utilization grid

---

## 📈 Component Guide

### 1. Performance Metrics (Gauge Charts)

**Location**: Dashboard → Performance tab

#### What You See
- 4 circular gauge charts showing:
  - CPU Usage (%)
  - Memory Usage (%)
  - Disk I/O (%)
  - Network Latency (ms)

#### How to Read
- **Green Zone** (0-30%): Normal operation ✅
- **Yellow Zone** (31-70%): Medium usage, monitor
- **Red Zone** (71-100%): High usage, action recommended

#### Example Interpretation
```
CPU: 72% (Yellow) → CPU usage is elevated, consider scaling or optimization
Memory: 58% (Yellow) → Healthy range but growing
Disk I/O: 85% (Red) → ALERT - Storage bottleneck detected
Network: 45% (Yellow) → Normal latency range
```

#### Action Items
- Click "Review consolidation plan" if scores are high
- Use insights to identify optimization opportunities

---

### 2. AI Insights

**Location**: Dashboard → AI Insights tab + bottom section

#### 4 Card Types

**🔵 Optimization (Blue)**
```
Title: Pod Density Optimization Opportunity
Description: Detected 3 pods with low resource utilization...
Impact: Potential 15% cost savings
Confidence: 92%
Action: Review consolidation plan
```
→ *Use this to reduce infrastructure costs*

**🔴 Anomaly (Red)**
```
Title: Unusual Traffic Pattern Detected
Description: Network egress from prod-db spiked 300%...
Impact: Requires immediate investigation
Confidence: 88%
Action: View traffic analysis
```
→ *Investigate and resolve immediately*

**🟡 Recommendation (Amber)**
```
Title: Upgrade Memory Allocation
Description: Cluster-monitoring pods experiencing pressure...
Impact: Improve reliability & reduce OOM events
Confidence: 95%
Action: Apply recommendation
```
→ *Schedule this change in your maintenance window*

**🟢 Success (Green)**
```
Title: Cost Hedge Successfully Executed
Description: Kraken AI predicted $5,000 spike...
Impact: Protected infrastructure margins by 3.2%
Confidence: 100%
Action: View hedge details
```
→ *Review what worked well for future reference*

#### Best Practices
1. Sort by **Confidence** (higher = more reliable)
2. Prioritize **Anomalies** (Red) first
3. Batch **Recommendations** (Amber) into updates
4. Track **Success** (Green) for improvements

---

### 3. Network Traffic

**Location**: Dashboard → Network tab

#### Key Metrics
| Metric | Normal Range | Alert Threshold |
|--------|--------------|-----------------|
| Inbound | 500-1200 Mbps | > 1500 Mbps |
| Outbound | 300-800 Mbps | > 1000 Mbps |
| Packet Loss | < 0.01% | > 0.1% |
| Latency (p95) | < 5ms | > 10ms |

#### What the Chart Shows
```
Dual-line chart over 24 hours:
- Cyan line: Inbound traffic (incoming requests)
- Purple line: Outbound traffic (responses + egress)
- Gradient area: Visual traffic volume
```

#### Interpreting Patterns
- **Steady lines**: Normal consistent load
- **Spikes**: Traffic bursts (common during peak hours)
- **Diverging lines**: More traffic flowing out than in (possible data exfiltration?)
- **Flat lines**: Potential network issue

#### Actions to Take
```
If Inbound spike + Outbound normal:
  → Popular service, consider load balancing

If Outbound spike + Inbound normal:
  → Check for data export, streaming, or backup jobs

If Both spike:
  → High bidirectional traffic, possible attack or data sync

If Latency high:
  → Network path issue, check routing/congestion
```

---

### 4. Cost Prediction

**Location**: Dashboard → Cost Forecast tab

#### 3-Line Model Explained

1. **Current Trend (Dashed Warning Line)**
   - Extrapolates current spending pattern forward
   - Shows "if nothing changes" scenario
   - Usually trending upward

2. **Predicted Cost (Solid Red Line)**
   - AI forecasted cost (accounting for known spikes)
   - Based on 94.2% accurate ML model
   - Represents most likely outcome

3. **Optimized Path (Solid Green Line)**
   - Cost if all recommendations applied
   - Shows potential savings
   - Target trajectory

#### Example Reading
```
Week 1-4: All three lines overlap ($12K-15K/week)
  → Stable baseline period

Week 5-8: Lines diverge significantly
  → Current: $19K (projected spike)
  → Predicted: $19K (spike confirmed)
  → Optimized: $12K (with fixes)
  → Savings Opportunity: $7K/week ($28K for 4 weeks)
```

#### How Kraken Hedging Works
- KCC predicts cost spike
- Automatically creates Kraken positions (xStocks)
- If costs spike, hedge profits offset losses
- Net result: Protected margins + reduced cost volatility

#### Decision Making
```
IF Predicted line trending up:
  Action: Review "Optimization opportunities" in AI Insights
  Urgency: Plan changes for next quarter

IF Predicted line above $60K/week:
  Action: Activate cost optimization tasks
  Urgency: Immediate (impacts budget)

IF Optimized line < 80% of Current:
  Action: Execute recommended changes
  Urgency: High ROI available
```

---

### 5. Resource Heatmap

**Location**: Dashboard → Heatmap section (bottom)

#### How to Read
- **X-axis**: 24 hours (0-23)
- **Y-axis**: 24 nodes (node-1 to node-24)
- **Color**: CPU utilization percentage
  - 🟢 Green: Low (< 30%)
  - 🟡 Yellow: Medium (30-70%)
  - 🔴 Red: High (70-100%)

#### Example Pattern Analysis

**Scenario 1: Morning Peak Pattern**
```
Hours 7-9: Mostly yellow/red across all nodes
Hours 17-19: Similar spike
Hours 23-6: All green (off-peak)

Interpretation: Daily usage pattern with peak hours
Action: Pre-scale before peak hours, deallocate after
Savings: 20-30% by right-sizing for off-peak
```

**Scenario 2: Node Clustering**
```
Nodes 1-8: Consistently red
Nodes 9-24: Consistently green

Interpretation: Uneven load distribution
Action: Rebalance workloads or check node sizing
Savings: 15-20% by redistributing load
```

**Scenario 3: Weekend Drop**
```
Weekdays (Mon-Fri): Yellow throughout
Weekends (Sat-Sun): All green

Interpretation: Expected business hours pattern
Action: Ensure right-sizing accounts for variance
Savings: Reserved instances for baseline, on-demand for peaks
```

#### Interaction Tips
- **Hover over cells**: See exact usage percentage
- **Look for patterns**: Recurring patterns → schedulable changes
- **Compare nodes**: Identify underutilized nodes for consolidation
- **Track over time**: Weekly comparison shows efficiency gains

---

### 6. Security Dashboard

**Location**: Dashboard → Cost tab (contains security info)

#### Alert Severity Levels

**🔴 Critical (Red)**
```
Example: Pod executing /tmp/cryptominer
Impact: Immediate security breach
Action: Pod automatically isolated, investigate origin
Timeline: Response < 15 seconds
```

**🟠 High (Orange)**
```
Example: Unauthorized network traffic
Impact: Potential lateral movement
Action: Network policies updated, traffic blocked
Timeline: Response < 1 minute
```

**🔵 Medium (Blue)**
```
Example: CVE detected in image
Impact: Potential vulnerability
Action: Alert sent, update required
Timeline: Schedule within 24 hours
```

**🟢 Low/Info (Green)**
```
Example: Scheduled backup executed
Impact: None (informational)
Action: Logged for compliance
Timeline: No urgency
```

#### Recommended Response Times
| Severity | Response Time | SLA |
|----------|---------------|-----|
| Critical | < 15 seconds | Yes |
| High | < 5 minutes | Yes |
| Medium | < 24 hours | No |
| Low | No SLA | No |

---

## 🎯 Common Use Cases & Solutions

### Use Case 1: "My costs are out of control"

**Steps:**
1. Go to **Cost Forecast** tab
2. Identify where Predicted line diverges from Current line
3. Navigate to **AI Insights** tab
4. Look for Blue cards (Optimization) with highest savings potential
5. Execute recommendations in priority order
6. Monitor **Resource Heatmap** for uneven distribution
7. In **Cost Prediction**, verify Optimized line shows savings

**Expected Result:** 10-15% cost reduction within 1-2 weeks

---

### Use Case 2: "Pod is crashing with OOM"

**Steps:**
1. Go to **Performance** tab
2. Check Memory gauge - likely in red (> 70%)
3. Check **AI Insights** for Recommendation card about memory
4. Look at **Resource Heatmap** - check if memory-heavy node is overloaded
5. Review specific pod in **Pods** tab
6. Apply memory increase recommendation

**Expected Result:** OOM errors eliminated, pod stability improved

---

### Use Case 3: "Network latency spiked"

**Steps:**
1. Go to **Network Traffic** tab
2. Identify spike time window
3. Correlate with **Performance** metrics (CPU/Disk also high?)
4. Check **Security Dashboard** for any suspicious activity
5. Review **Anomalies** in AI Insights
6. Execute recommended remediation

**Expected Result:** Root cause identified, remediation executed < 15 seconds

---

### Use Case 4: "I need to scale before peak hours"

**Steps:**
1. Go to **Resource Heatmap** tab
2. Identify peak hour times (usually yellow/red zones)
3. Note the days this occurs
4. In **Cost Forecast**, calculate impact of pre-scaling
5. Go to **AI Insights** and review scaling recommendations
6. Enable auto-scaling or set scheduled scale-up

**Expected Result:** Consistent performance, no user-facing slowdowns

---

### Use Case 5: "Security alert - check if it's real"

**Steps:**
1. Go to **Security Dashboard**
2. Review alert severity level
3. Check **AI Insights** for Anomaly (Red) cards
4. Review the **Confidence** score (higher = more likely real)
5. If Critical (red badge), pod is already isolated
6. Investigate root cause using provided metadata
7. Mark as false positive or escalate

**Expected Result:** Security incident properly triaged and resolved

---

## 🔧 Dashboard Customization

### Tab Selection
Click any tab to focus on that view. Tabs include:
- Overview (default)
- Pods, Nodes, Metrics (operational)
- Performance, Network, Cost Forecast, AI Insights (new enhanced views)
- Cost, Security (analysis)

### Chart Interactions
- **Hover**: See detailed tooltips
- **Zoom**: Click and drag to zoom into specific time ranges
- **Restore**: Click restore button to reset zoom
- **Download**: Right-click chart for export options

### Sidebar Actions
- Recommended actions with ROI estimates
- Quick links to common operations
- Status indicators for cluster health

---

## 📱 Mobile Usage

All dashboards are mobile-responsive:
- **Phone (< 640px)**: Single column, charts stack vertically
- **Tablet (640-1024px)**: 2-column layout
- **Desktop (> 1024px)**: 3-4 column layout with full details

### Mobile Tips
- Use tabs to narrow focus (one metric at a time)
- Horizontal scroll for wider charts
- Use Performance tab instead of Heatmap for smaller screens
- Network tab is most useful on mobile for quick checks

---

## 🔄 Real-Time Updates

All metrics refresh automatically:
- **Live gauges** (Performance): < 1 second
- **Charts** (Network, Metrics): 5-10 seconds
- **Cost Forecast**: Every hour (model update)
- **AI Insights**: Every 15 minutes (ML processing)
- **Heatmap**: Every 5 minutes (pattern detection)

### Manual Refresh
Press F5 or Cmd+R to manually refresh all data

---

## 📞 Troubleshooting

### No data showing in charts?
1. Check if cluster is connected (look for "Cluster Healthy" badge)
2. Wait 2-3 minutes for initial data collection
3. Refresh the page (F5)
4. Check backend logs: `kubectl logs deployment/kcc-backend`

### Gauges showing 0%?
1. Metrics not being collected yet
2. eBPF agent may not be running
3. Check: `kubectl get pod -l app=ebpf-agent`

### Cost predictions look wrong?
1. ML model calibrates after 2 weeks of data
2. Seasonal changes affect accuracy
3. Check: Was there a spike or scale change recently?

### Latency seems high?
1. Network latency is p95 percentile (95th percentile)
2. Max possible is p99 (99th percentile)
3. Sub-5ms is considered excellent
4. Check if specific pods are slow

---

## 🚀 Best Practices

1. **Review daily** (5 minutes): Performance gauges + AI Insights
2. **Weekly review** (15 minutes): Cost Forecast + Heatmap patterns
3. **Act on Red alerts** immediately
4. **Batch Blue cards** (optimizations) into quarterly updates
5. **Track metrics** before/after changes
6. **Share insights** with team for continuous improvement

---

<div align="center">

**Master these visualizations and transform your Kubernetes operations**

*Data-driven decisions lead to better infrastructure*

</div>
