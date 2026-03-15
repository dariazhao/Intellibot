import type { GongTranscript } from "@/lib/schemas";

export const gongTranscripts: GongTranscript[] = [
  {
    id: "gong-001",
    accountId: "acc-001",
    title: "Quarterly Business Review — Meridian Data Platform",
    date: "2026-03-10",
    summary:
      "Productive QBR with Meridian's data engineering leadership. Platform adoption increased 22% quarter-over-quarter, driven by the fraud detection and risk analytics workloads. Meridian wants to consolidate from three analytics vendors to one by year-end. Discussion touched on Lakehouse.io as an alternative, but our governance and compliance capabilities remain a strong differentiator in financial services.",
    goals: [
      "Consolidate three analytics platforms into a single vendor by Q4 2026",
      "Move ML model training workloads from experimental to production grade",
      "Achieve SOC2 Type II compliance for all data pipelines by August",
      "Reduce total data infrastructure spend by 15% per board mandate",
    ],
    gaps: [
      "Real-time feature store not yet deployed — blocking faster fraud detection iteration",
      "Data lineage tracking lacks granularity required for upcoming FINRA audit",
      "No self-service ML model deployment workflow for business analysts",
    ],
    competitorsMentioned: ["Synthetica AI", "Lakehouse.io"],
  },
  {
    id: "gong-002",
    accountId: "acc-001",
    title: "Technical Deep Dive — Fraud Detection Model Performance",
    date: "2026-01-28",
    summary:
      "Working session with Meridian's ML engineering team focused on fraud detection model performance. Current model latency at 12ms meets their sub-15ms SLA. Discussed transitioning to a real-time feature store architecture to improve model accuracy by enabling fresher features. The team is highly technical and engaged, with clear ownership of the ML pipeline.",
    goals: [
      "Deploy real-time feature store for sub-second feature freshness",
      "Improve fraud detection model F1 score from 0.89 to 0.94",
      "Automate model retraining pipeline with drift detection triggers",
    ],
    gaps: [
      "Current batch feature pipeline introduces 4-hour feature staleness",
      "No automated model monitoring or drift detection in place",
      "Model registry lacks version control integration with their CI/CD pipeline",
    ],
    competitorsMentioned: [],
  },
  {
    id: "gong-003",
    accountId: "acc-002",
    title: "Renewal Risk Discussion — Platform Performance Issues",
    date: "2026-03-08",
    summary:
      "Difficult call with Apex's Director of IT Infrastructure. Their clinical analytics dashboards are experiencing timeout errors during peak hours (7-9 AM EST). Root cause appears to be concurrent query contention on their shared compute cluster. Client expressed frustration about support ticket response times averaging 36 hours. Renewal at risk if performance issues are not resolved before June evaluation period.",
    goals: [
      "Resolve dashboard timeout issues before April clinical review cycle",
      "Reduce support ticket response time to under 4 hours for critical issues",
      "Re-engage Chief Data Officer Dr. Rachel Kim who has gone silent",
    ],
    gaps: [
      "Shared compute cluster cannot handle concurrent clinical reporting workloads",
      "No dedicated support tier — Apex on standard SLA despite $1.8M ARR",
      "Missing HIPAA-specific audit logging that their compliance team requires",
      "No integration with their Epic EHR system for real-time clinical data ingestion",
    ],
    competitorsMentioned: ["NeuralEdge"],
  },
  {
    id: "gong-004",
    accountId: "acc-003",
    title: "Expansion Discovery — Predictive Maintenance Use Case",
    date: "2026-03-12",
    summary:
      "Highly productive call with TitanForge's IoT and Manufacturing Excellence teams. Their POC on two factory sites demonstrated 23% reduction in unplanned downtime using our predictive maintenance models. Budget has been approved for full rollout across all 14 sites. VP of Operations Mark Tanaka is the economic buyer. TitanForge sees this as a strategic investment in Industry 4.0 transformation.",
    goals: [
      "Deploy predictive maintenance models across all 14 factory sites by Q3 2026",
      "Integrate with existing SCADA and PLC systems at each plant",
      "Build centralized model registry with edge deployment capability",
      "Achieve 30% reduction in unplanned downtime across all facilities",
    ],
    gaps: [
      "Edge computing infrastructure varies significantly across sites — standardization needed",
      "No existing data pipeline from legacy SCADA systems to our platform",
      "Network bandwidth constraints at rural factory locations for model sync",
    ],
    competitorsMentioned: ["Lakehouse.io"],
  },
  {
    id: "gong-005",
    accountId: "acc-004",
    title: "Initial Discovery Call — Retail Analytics Requirements",
    date: "2026-03-07",
    summary:
      "First substantive conversation with NovaBright's Head of Digital, Karen Park. They operate 200+ retail stores but lack unified analytics — currently relying on spreadsheets and basic ClearView dashboards. No ML capabilities today. Karen is motivated to modernize but faces budget constraints and a skeptical CFO who wants proven ROI before committing. Lakehouse.io is also in their evaluation set.",
    goals: [
      "Implement unified customer analytics across all 200+ store locations",
      "Deploy real-time inventory optimization using demand forecasting models",
      "Build customer segmentation models for personalized marketing",
      "Prove ROI within 90 days to secure full budget approval from CFO",
    ],
    gaps: [
      "No existing data warehouse or centralized data infrastructure",
      "POS system data locked in proprietary vendor format — extraction required",
      "Data literacy across the organization is low — need extensive training plan",
      "No dedicated data engineering team — will need managed services support",
    ],
    competitorsMentioned: ["ClearView Analytics", "Lakehouse.io"],
  },
  {
    id: "gong-006",
    accountId: "acc-005",
    title: "Mid-cycle Check-in — Data Governance Compliance",
    date: "2026-03-03",
    summary:
      "Review of Pinnacle's data governance posture ahead of their upcoming FERC regulatory audit. They need enhanced data lineage tracking for grid telemetry data and automated PII detection across their operational datasets. Our governance module is well-positioned here. New CDO Robert Faulkner (ex-Shell) is centralizing all data initiatives — need to build relationship quickly.",
    goals: [
      "Pass FERC regulatory audit with automated compliance reporting",
      "Implement end-to-end data lineage for all grid telemetry pipelines",
      "Deploy automated PII detection and masking for operational data",
      "Establish data governance framework across all business units",
    ],
    gaps: [
      "Current data lineage only covers 40% of critical data pipelines",
      "No automated PII detection — manual review process is unsustainable",
      "Data catalog incomplete — 60% of datasets lack proper metadata",
    ],
    competitorsMentioned: ["DataVault Enterprise"],
  },
  {
    id: "gong-007",
    accountId: "acc-006",
    title: "Escalation Call — Route Optimization Model Accuracy",
    date: "2026-03-05",
    summary:
      "Tense call with Quantum's VP of Operations regarding degrading route optimization model accuracy. Post-holiday data drift in shipment volume patterns caused model predictions to deviate significantly from actuals. Recommended adjusting retraining cadence from monthly to weekly. VP also mentioned their data science team has been exploring Synthetica AI and OpenML Studio as alternatives, which is concerning.",
    goals: [
      "Restore route optimization model accuracy to pre-holiday baseline within 2 weeks",
      "Implement automated data drift detection with alerting",
      "Reduce model retraining cycle from monthly to weekly",
      "Demonstrate cost savings from improved route optimization to justify continued investment",
    ],
    gaps: [
      "No automated data drift detection — model degradation went unnoticed for 6 weeks",
      "Retraining pipeline requires manual intervention and takes 8+ hours to complete",
      "No A/B testing framework for comparing model versions in production",
      "Warehouse demand forecasting module still not deployed after 4 months",
    ],
    competitorsMentioned: ["Synthetica AI", "OpenML Studio"],
  },
  {
    id: "gong-008",
    accountId: "acc-007",
    title: "Cold Outreach Follow-up — Content Recommendation Engine",
    date: "2026-03-11",
    summary:
      "Connected with Stellar Media's VP of Product Sarah Lin. Their current collaborative filtering recommendation model is underperforming — click-through rates dropped 15% over the past quarter. Interested in our GenAI-powered recommendation engine but skeptical about cost relative to open-source alternatives. CTO Alex Petrov is the technical decision-maker and favors OpenML Studio.",
    goals: [
      "Improve content recommendation click-through rate by 25% within 6 months",
      "Deploy personalized content feeds across web and mobile apps",
      "Reduce content curation team headcount dependency through automation",
    ],
    gaps: [
      "No GenAI infrastructure in place — would need to build from scratch",
      "Content metadata is poorly structured — needs enrichment before ML models can leverage it",
      "Data governance and user consent framework immature for personalization use cases",
    ],
    competitorsMentioned: ["OpenML Studio", "Synthetica AI", "NeuralEdge"],
  },
  {
    id: "gong-009",
    accountId: "acc-003",
    title: "Technical Architecture Workshop — Multi-site Deployment",
    date: "2026-03-06",
    summary:
      "Two-day on-site workshop designing multi-site deployment architecture for TitanForge's 14 factories. Agreed on hub-and-spoke model: edge processing nodes at each factory for real-time sensor data ingestion, with centralized model registry and training infrastructure at their Detroit data center. Strong technical alignment — their platform engineering team is highly capable.",
    goals: [
      "Finalize hub-and-spoke architecture design for board approval",
      "Define edge compute hardware requirements for each factory site",
      "Establish model deployment pipeline from central registry to edge nodes",
      "Create phased rollout plan: 4 sites in Q2, 5 in Q3, 5 in Q4",
    ],
    gaps: [
      "Three factory sites lack sufficient network bandwidth for real-time data sync",
      "Legacy PLC protocols at two sites require custom data adapters",
      "Security team needs to approve edge-to-cloud communication architecture",
    ],
    competitorsMentioned: [],
  },
  {
    id: "gong-010",
    accountId: "acc-005",
    title: "Executive Introduction — New CDO Robert Faulkner",
    date: "2026-02-20",
    summary:
      "First meeting with Pinnacle Energy's newly hired CDO Robert Faulkner. He brings 15 years of experience from Shell where he led their global data platform consolidation. His mandate at Pinnacle is to unify data infrastructure across all business units and establish an AI Center of Excellence. He is evaluating all existing vendor relationships. Receptive but non-committal — wants to see concrete ROI data within 60 days.",
    goals: [
      "Establish AI Center of Excellence with centralized platform by Q4 2026",
      "Unify data infrastructure across upstream, midstream, and downstream operations",
      "Deploy AI-driven grid optimization models for renewable energy integration",
      "Achieve 20% reduction in data infrastructure costs through vendor consolidation",
    ],
    gaps: [
      "Siloed data infrastructure across business units — no unified catalog",
      "Existing models not reproducible — no MLOps practices in place",
      "Talent gap: only 3 ML engineers for enterprise-wide AI ambitions",
    ],
    competitorsMentioned: ["DataVault Enterprise", "Lakehouse.io"],
  },
];
