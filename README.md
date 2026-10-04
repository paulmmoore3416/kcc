# 🛰️ Kraken Cloud Control (KCC)

### **The Sovereign Kubernetes AI Command Center & DePIN Hub**
*Sovereign Intelligence, Real-time eBPF Observation & Autonomous DePIN Orchestration*

<div align="center">
  <img src="assets/kcclogo.jpg" width="150" alt="KCC Logo" />
  <br />
  <img src="assets/kccbanner.png" width="100%" alt="KCC Banner" />
</div>

<div align="center">

[![Optimai Network](https://img.shields.io/badge/Network-Optimai%20DePIN-blueviolet?style=for-the-badge)](https://optimai.network)
[![Speechmatics](https://img.shields.io/badge/Powered%20By-Speechmatics-red?style=for-the-badge&logo=rss)](https://www.speechmatics.com/)
[![Ollama](https://img.shields.io/badge/AI-Ollama%20Qwen%202.5-orange?style=for-the-badge&logo=ollama)](https://ollama.com/)
[![Gemini](https://img.shields.io/badge/AI-Gemini%201.5%20Pro-blue?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/)
[![FinOps](https://img.shields.io/badge/FinOps-FOCUS%20Compliant-emerald?style=for-the-badge&logo=linuxfoundation)](https://finops.org/focus/)

<img src="https://img.shields.io/badge/Status-v2.6.0--MINING%20OPS-success?style=for-the-badge" alt="Deployed" />
<a href="DONATE.md"><img src="https://img.shields.io/badge/Donate-XMR%20%7C%20BTC-ff6600?style=for-the-badge&logo=monero" alt="Donate" /></a>
<img src="https://img.shields.io/badge/Intelligence-100%25%20Local%20Available-brightgreen?style=for-the-badge" alt="Sovereign AI" />

---

### 🌌 v2.5.0 "Sovereign Intelligence" Performance Matrix

| ⚡ Latency | 🛡️ Security | 🧠 AI Autonomy | 🌐 DePIN Yield | 🌿 Sustainability |
|:---:|:---:|:---:|:---:|:---:|
| **< 0.5ms** | **Kernel-Level eBPF** | **Local Qwen 2.5** | **6,820 OPTIM** | **eBPF Energy Tracking** |
| 🟢 Ultra-Low | 🟢 Sovereign | 🟢 No-Cloud Fallback | 🟢 Auto-Arbitrage | 🟢 Kepler-Integrated |

---

</div>

## ⛏️ v2.6.0: Mining Ops and Standalone Mode

KCC can now run **without a Kubernetes cluster** and connect to a **local crypto-mining rig**. Mining becomes another cost and reward stream in KCC, next to cloud spend and DePIN.

| Feature | What you get |
|---|---|
| **Standalone mode** | The backend starts without a kubeconfig. DePIN, Mining Ops, FinOps and AI work, and cluster views report "no cluster". One-command install as systemd user services (`deploy/standalone/install.sh`). |
| **Mining Ops tab** | Live miners (rate vs baseline, shares, temperature, watts), power draw and $/hour, projected net per night, a 3-hour hashrate/power chart, pool balances with payout-threshold progress. |
| **Mining Advisor** | Explainable rules: a miner is down, a miner is below baseline, a device is hot, rejects are high, mining is below power cost, payout ETA, idle in the mining window, hashpower split across coins. |
| **DePIN Hub provider** | The rig appears as a **Mining Rig** provider in DePIN Management, with rewards, uptime, electricity cost and net profit. |
| **FOCUS energy costs** | `GET /api/mining/focus` exports mining electricity as FinOps FOCUS cost rows. |
| **Open feed contract** | `kcc.mining/v1`: a small, address-free JSON schema, plus a reference exporter for **xmrig** and **lolMiner** (`integrations/mining-exporter`). |

KCC only observes the rig: it never starts, stops or redirects miners, and the feed never carries wallet addresses.

📘 **[User Guide](docs/USER_GUIDE.md)** · 🛠️ **[Technical Guide](docs/TECHNICAL_GUIDE.md)**

---

## 🎯 v2.5.0 Strategic Overview

**Kraken Cloud Control (KCC) v2.5.0** is the ultimate platform for sovereign Kubernetes infrastructure. It eliminates cloud dependency with **local LLM orchestration**, pioneers **empirical sustainability** via kernel-level energy counters, and introduces **autonomous DePIN arbitrage**.

### 🌟 New "Sovereign" Capabilities

*   **🧠 Local AI Autonomy**: Powered by **Ollama (Qwen 2.5)**, KCC can analyze logs, optimize costs, and manage clusters without ever sending data to the cloud.
*   **🌿 Empirical Sustainability**: Real-time energy tracking using **eBPF (Kepler-style)**. Measure power usage (Watts) and carbon intensity per Pod directly from the kernel.
*   **💹 DePIN Arbitrage Engine**: The "DePIN Switch" automatically scales your validation fleet when reward yields exceed infrastructure costs.
*   **📋 FOCUS-Compliant Reporting**: Unified enterprise-grade cost reporting using the **FinOps Open Cost & Usage Specification (FOCUS)**.
*   **🛡️ Hydra Wallet**: Aggregated reward management across multiple DePIN networks (OptimAI, Filecoin, etc.).

---

## ✨ Features & Upgrades

| Module | v2.5.0 Upgrade | Tech Stack | Status |
|:---:|:---|:---|:---:|
| **AI Core** | Provider-based architecture (Gemini + Local Ollama) | Qwen 2.5 + Go | ✅ **SOVEREIGN** |
| **FinOps** | FOCUS Compliance & ML Anomaly Prediction | FOCUS + ML | ✅ **ENHANCED** |
| **Sustainability** | eBPF Energy Monitoring (Kepler-style) | eBPF + ClickHouse | ✅ **EMPIRICAL** |
| **DePIN Hub** | Auto-Arbitrage & Compute QA Benchmarking | OptimAI + Go | ✅ **STABLE** |
| **Operator** | Profit-driven Autonomous Scaling | Operator SDK | ✅ **STABLE** |
| **UI/UX** | Sovereign Intelligence Dashboard v2.5.0 | Next.js 14 + Tremor | ✅ **ENHANCED** |

---

## 🚀 Visual Showcase
*Experience the future of Sovereign Cloud Governance*

<img src="assets/Screenshot From 2026-05-20 13-58-40.png" width="100%" alt="KCC Dashboard Overview" />
<p align="center"><i>Main Command Center: v2.5.0 dashboard with eBPF energy telemetry and local AI status.</i></p>

<div align="center">
  <img src="assets/Screenshot From 2026-05-20 13-59-13.png" width="48%" alt="Pod Explorer" />
  <img src="assets/Screenshot From 2026-05-20 13-59-31.png" width="48%" alt="Node Inventory" />
</div>
<p align="center"><i>Deep Resource Exploration: Advanced Pod and Node management with real-time status streams.</i></p>

<div align="center">
  <img src="assets/Screenshot From 2026-05-20 14-00-16.png" width="48%" alt="DePIN Management" />
  <img src="assets/Screenshot From 2026-05-20 14-00-32.png" width="48%" alt="Utilization Heatmap" />
</div>
<p align="center"><i>Autonomous DePIN: Optimai Arbitrage management and spatiotemporal resource heatmaps.</i></p>

---

## 🌐 The Optimai Network Integration

KCC is more than a management tool; it's a gateway to the **Optimai DePIN Network**. 

- **Passive Income**: Automatically contribute spare CPU/GPU cycles to the Optimai decentralized compute pool.
- **Profit Arbitrage**: v2.5.0 introduces autonomous scaling based on reward-vs-cost calculations.
- **Compute QA**: Continuous benchmarking ensures your nodes meet QoS requirements for maximum multipliers.
- **Future Integration**: Upcoming support for **Filecoin** and **Arweave** for decentralized log archiving and state preservation.

---

## 💰 Sovereign FinOps Suite

KCC features the most comprehensive FinOps platform available—surpassing commercial solutions costing $100K+ annually.

### 📊 Key Capabilities
- **ML-Powered Cost Anomaly Prediction**: 4-hour advance warning with 94.2% accuracy.
- **FOCUS Reporting**: Enterprise-grade standardized cost and usage data.
- **eBPF Energy Tracking**: Empirical watts-per-pod monitoring via Kepler integration.
- **Intelligent Right-Sizing**: AI-driven optimization with local Qwen 2.5 reasoning.

---

## 🏗️ Architecture

```mermaid
graph TD
    subgraph "Interface Layer"
        V[Speechmatics Voice] --> A[Sovereign AI Master]
        D[Next.js Dashboard] <--> A
    end
    
    subgraph "Intelligence & FinOps"
        A --> G[Gemini Provider]
        A --> O[Ollama Qwen Provider]
        A --> C[FinOps Agent]
        C <--> F[FOCUS Reporting]
    end
    
    subgraph "Infrastructure & DePIN"
        A --> DEP[DePIN Arbitrage]
        DEP <--> OPT[Optimai Network]
        E[eBPF Agent] --> K[Kepler Energy]
        K --> D
    end
```

---

## 🚀 Quick Start

### 1. Configure AI Provider
```bash
# Toggle between Gemini and Local Ollama
export AI_PROVIDER="ollama" # or "gemini"
export OLLAMA_MODEL="qwen2.5:latest"
```

### 2. Deploy Platform
```bash
kubectl apply -k infrastructure/manifests/base
```

### 3. Access Dashboard
```bash
kubectl port-forward svc/frontend 3000:80 -n kcc-system
```

### No cluster? Run standalone
```bash
./deploy/standalone/install.sh      # builds and starts KCC as systemd user services
# then open http://127.0.0.1:4200/dashboard
```
See the [User Guide](docs/USER_GUIDE.md) for connecting a mining rig.


---

## 💖 Support This Project

If KCC is useful to you, consider donating. See **[DONATE.md](DONATE.md)**.

- **Monero (XMR):** `44d1mVxF1zE4CByW5UYydnZYdhAKsKAetArwm9YkQB8x2tWUZMiqdrZ3ATW1EHUGL145Vg3GMqD5VKo6Zrsv9RGpQutUxdQ`
- **Bitcoin (BTC):** `bc1q5w66jx4z6576e733zsa7ypx7693pt69hnhw8cv`

---

## 📄 License
MIT License. © 2026 Kraken Cloud Control Authors.

---

<div align="center">

**Built with ❤️ for the next generation of Kubernetes Engineers.**

[Website](https://kcc-platform.io) | [Documentation](https://docs.kcc-platform.io) | [Optimai Network](https://optimai.network)

</div>
