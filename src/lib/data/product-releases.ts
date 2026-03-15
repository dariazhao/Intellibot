import type { ProductRelease } from "@/lib/schemas";

export const productReleases: ProductRelease[] = [
  {
    id: "rel-001",
    title: "Platform v4.2 — GenAI Integration Suite",
    date: "2026-03-01",
    description:
      "General availability of the GenAI Integration Suite including production-ready RAG pipeline, enterprise vector database, prompt management with version control, and GenAI observability dashboard with hallucination detection. Supports OpenAI, Anthropic, and self-hosted LLM endpoints.",
    category: "GenAI",
  },
  {
    id: "rel-002",
    title: "Automated Data Governance 3.0",
    date: "2026-02-15",
    description:
      "Major upgrade to the data governance module: ML-powered automated PII detection and classification across all data assets, real-time policy enforcement engine, enhanced column-level lineage with transformation provenance, and pre-built compliance report templates for SOC2, HIPAA, GDPR, and CCPA.",
    category: "Governance",
  },
  {
    id: "rel-003",
    title: "Edge AI Deployment Agent (Beta)",
    date: "2026-01-20",
    description:
      "Beta release of the Edge AI Deployment Agent enabling model deployment and inference at the edge. Supports model synchronization between cloud and edge nodes, offline inference capability, and automatic model updates when connectivity is restored. Designed for manufacturing, energy, and retail use cases.",
    category: "ML/AI",
  },
  {
    id: "rel-004",
    title: "Natural Language Query Interface",
    date: "2026-01-05",
    description:
      "New natural language query interface allows business users to ask questions in plain English and receive accurate SQL-generated results with visualizations. Powered by our fine-tuned LLM with schema-aware context injection. Supports follow-up questions, query refinement, and automatic chart recommendations.",
    category: "Analytics",
  },
  {
    id: "rel-005",
    title: "Real-time Feature Store v2",
    date: "2025-12-10",
    description:
      "Version 2 of the real-time feature store with sub-second feature freshness, point-in-time correctness for training and serving, automatic feature drift detection, and native integration with the model monitoring dashboard. Supports both batch and streaming feature computation pipelines.",
    category: "ML/AI",
  },
  {
    id: "rel-006",
    title: "Multi-Cloud Cost Optimizer",
    date: "2025-12-01",
    description:
      "Intelligent cost optimization engine that automatically right-sizes compute resources across AWS, Azure, and GCP. Includes workload-aware scheduling, spot instance automation, idle resource detection, and predictive cost forecasting. Early adopters report 25-40% reduction in cloud infrastructure spend.",
    category: "Platform",
  },
];
