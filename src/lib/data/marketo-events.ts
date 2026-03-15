import type { MarketoEvent } from "@/lib/schemas";

export const marketoEvents: MarketoEvent[] = [
  // ── Meridian Financial Group (acc-001) ──
  {
    id: "mkt-001",
    accountId: "acc-001",
    type: "email_open",
    title: "Opened: AI Governance in Financial Services Whitepaper",
    date: "2026-02-18",
    score: 15,
  },
  {
    id: "mkt-002",
    accountId: "acc-001",
    type: "content_downloaded",
    title: "Downloaded: Financial Services Data Platform ROI Calculator",
    date: "2026-02-02",
    score: 25,
  },
  {
    id: "mkt-003",
    accountId: "acc-001",
    type: "webinar_attended",
    title: "Attended: Real-time Fraud Detection with ML — Best Practices",
    date: "2026-01-22",
    score: 30,
  },

  // ── Apex Healthcare Systems (acc-002) ──
  {
    id: "mkt-004",
    accountId: "acc-002",
    type: "form_filled",
    title: "Registered: HIPAA-Compliant AI Pipelines Webinar",
    date: "2026-02-14",
    score: 20,
  },
  {
    id: "mkt-005",
    accountId: "acc-002",
    type: "webinar_attended",
    title: "Attended: HIPAA-Compliant AI Pipelines Webinar",
    date: "2026-02-21",
    score: 30,
  },
  {
    id: "mkt-006",
    accountId: "acc-002",
    type: "email_open",
    title: "Opened: Healthcare AI Case Study — Clinical Decision Support",
    date: "2026-01-18",
    score: 10,
  },

  // ── TitanForge Manufacturing (acc-003) ──
  {
    id: "mkt-007",
    accountId: "acc-003",
    type: "content_downloaded",
    title: "Downloaded: Manufacturing AI Maturity Assessment Toolkit",
    date: "2026-02-10",
    score: 25,
  },
  {
    id: "mkt-008",
    accountId: "acc-003",
    type: "webinar_attended",
    title: "Attended: Predictive Maintenance at Scale — Customer Panel",
    date: "2026-01-30",
    score: 35,
  },
  {
    id: "mkt-009",
    accountId: "acc-003",
    type: "form_filled",
    title: "Requested: Custom ROI Analysis for Multi-site Deployment",
    date: "2026-03-01",
    score: 40,
  },

  // ── NovaBright Retail (acc-004) ──
  {
    id: "mkt-010",
    accountId: "acc-004",
    type: "email_open",
    title: "Opened: Retail Analytics Transformation Guide",
    date: "2026-02-25",
    score: 10,
  },
  {
    id: "mkt-011",
    accountId: "acc-004",
    type: "content_downloaded",
    title: "Downloaded: Customer Segmentation with ML — Starter Guide",
    date: "2026-03-05",
    score: 20,
  },

  // ── Pinnacle Energy Corp (acc-005) ──
  {
    id: "mkt-012",
    accountId: "acc-005",
    type: "content_downloaded",
    title: "Downloaded: Energy Sector AI Compliance Guide",
    date: "2026-01-15",
    score: 25,
  },
  {
    id: "mkt-013",
    accountId: "acc-005",
    type: "webinar_attended",
    title: "Attended: Data Governance for Regulated Industries",
    date: "2026-02-08",
    score: 30,
  },
  {
    id: "mkt-014",
    accountId: "acc-005",
    type: "email_open",
    title: "Opened: FERC Compliance Automation with AI",
    date: "2026-03-02",
    score: 15,
  },

  // ── Quantum Logistics Inc (acc-006) ──
  {
    id: "mkt-015",
    accountId: "acc-006",
    type: "email_open",
    title: "Opened: Supply Chain AI Benchmark Report 2026",
    date: "2026-01-30",
    score: 15,
  },
  {
    id: "mkt-016",
    accountId: "acc-006",
    type: "content_downloaded",
    title: "Downloaded: Route Optimization ML Model Templates",
    date: "2026-02-05",
    score: 25,
  },
  {
    id: "mkt-017",
    accountId: "acc-006",
    type: "form_filled",
    title: "Requested: Supply Chain AI Workshop for Leadership Team",
    date: "2026-02-18",
    score: 35,
  },

  // ── Stellar Media Group (acc-007) ──
  {
    id: "mkt-018",
    accountId: "acc-007",
    type: "webinar_attended",
    title: "Attended: GenAI for Media & Entertainment",
    date: "2026-02-05",
    score: 30,
  },
  {
    id: "mkt-019",
    accountId: "acc-007",
    type: "email_open",
    title: "Opened: Content Personalization at Scale — Platform Overview",
    date: "2026-02-28",
    score: 10,
  },
  {
    id: "mkt-020",
    accountId: "acc-007",
    type: "content_downloaded",
    title: "Downloaded: GenAI Content Recommendation Engine Datasheet",
    date: "2026-03-10",
    score: 20,
  },
];
