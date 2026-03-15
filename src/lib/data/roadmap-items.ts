import type { RoadmapItem } from "@/lib/schemas";

export const roadmapItems: RoadmapItem[] = [
  {
    id: "rm-001",
    title: "Federated Learning for Cross-Organizational Model Training",
    quarter: "Q2 2026",
    description:
      "Enable multiple organizations to collaboratively train ML models without sharing raw data. Supports privacy-preserving model aggregation with differential privacy guarantees. Target verticals: financial services consortiums, healthcare research networks, and multi-division enterprises.",
    status: "in_progress",
  },
  {
    id: "rm-002",
    title: "AI Regulation Compliance Automation (EU AI Act, NIST AI RMF)",
    quarter: "Q2 2026",
    description:
      "Automated compliance assessment and reporting for emerging AI regulations. Includes risk classification of AI systems per EU AI Act categories, automated documentation generation for high-risk AI systems, and NIST AI Risk Management Framework alignment scoring with remediation recommendations.",
    status: "in_progress",
  },
  {
    id: "rm-003",
    title: "Real-time Data Mesh Architecture Support",
    quarter: "Q3 2026",
    description:
      "Native support for data mesh organizational patterns with domain-level data product management, federated governance with centralized policy enforcement, self-service data product creation and discovery, and cross-domain data contract management with SLA monitoring.",
    status: "planned",
  },
  {
    id: "rm-004",
    title: "GenAI Application Builder with Enterprise Guardrails",
    quarter: "Q3 2026",
    description:
      "Low-code builder for enterprise GenAI applications with built-in safety guardrails. Includes visual RAG pipeline designer, prompt template library with governance controls, automated testing for bias, toxicity, and factual accuracy, and usage-based cost allocation at the application level.",
    status: "planned",
  },
  {
    id: "rm-005",
    title: "Edge AI Platform General Availability",
    quarter: "Q4 2026",
    description:
      "Production release of the Edge AI platform for deploying and managing ML models at the network edge. Includes automated model compression for resource-constrained devices, fleet management for thousands of edge nodes, edge-to-cloud data synchronization with conflict resolution, and offline-first architecture with store-and-forward capability.",
    status: "planned",
  },
  {
    id: "rm-006",
    title: "Automated ML Model Monitoring with Drift Detection",
    quarter: "Q2 2026",
    description:
      "Production-grade model monitoring suite with automated data drift detection, prediction drift alerting, model performance degradation tracking, and automated retraining trigger workflows. Integrates with the feature store and model registry for end-to-end ML lifecycle management.",
    status: "completed",
  },
];
