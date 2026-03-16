import type { Activity } from "@/lib/schemas";

export const activities: Activity[] = [
  // ── Meridian Financial Group (acc-001) ──
  {
    id: "act-001",
    accountId: "acc-001",
    type: "gong_call",
    title: "Quarterly Business Review — Meridian Data Platform",
    description:
      "Reviewed current usage metrics with VP of Data Engineering. Platform adoption up 22% QoQ. Discussed expanding ML model training workloads to production. Meridian wants to consolidate from 3 analytics vendors down to 1 by end of year.",
    date: "2026-03-10",
    metadata: { duration: "47 min", attendees: "4", outcome: "positive", entity: "customer" },
  },
  {
    id: "act-002",
    accountId: "acc-001",
    type: "salesforce_meeting",
    title: "Executive Sponsor Dinner — CFO + CTO",
    description:
      "Hosted dinner with CFO Patricia Langley and CTO Dev Mehta. Discussed their board-level mandate to reduce total cost of data infrastructure by 15% while improving AI capabilities. Strong alignment with our consolidation narrative.",
    date: "2026-03-04",
    metadata: { location: "NYC", type: "executive_dinner", entity: "customer" },
  },
  {
    id: "act-003",
    accountId: "acc-001",
    type: "competitor_alert",
    title: "Lakehouse.io spotted in Meridian's tech stack scan",
    description:
      "TechRadar scan detected Lakehouse.io SDK references in Meridian's public GitHub repositories. Appears to be an evaluation-stage integration in their data science team. Escalated to AE for follow-up.",
    date: "2026-02-25",
    metadata: { source: "techradar_scan", urgency: "high" },
  },
  {
    id: "act-004",
    accountId: "acc-001",
    type: "marketo_email",
    title: "Opened: 'AI Governance in Financial Services' whitepaper",
    description:
      "VP of Compliance Maria Santos opened the AI Governance whitepaper email and clicked through to download the full PDF. Second engagement from compliance team this month.",
    date: "2026-02-18",
    metadata: { recipient: "m.santos@meridianfg.com", campaign: "governance_q1" },
  },

  // ── Apex Healthcare Systems (acc-002) ──
  {
    id: "act-005",
    accountId: "acc-002",
    type: "gong_call",
    title: "Renewal Risk Discussion — Platform Performance Issues",
    description:
      "Call with Director of IT Infrastructure about recurring query latency issues. Their clinical analytics dashboards are timing out during peak hours. Engineering escalation in progress. Client expressed frustration about support response times.",
    date: "2026-03-08",
    metadata: { duration: "32 min", sentiment: "negative", attendees: "3" },
  },
  {
    id: "act-006",
    accountId: "acc-002",
    type: "salesforce_note",
    title: "Internal Note: Apex churn risk assessment",
    description:
      "Health score dropped from 72 to 65 over last 60 days. Key champion (Dr. Rachel Kim, Chief Data Officer) has gone quiet — no responses to last two outreach attempts. Renewal is June 30, need executive intervention.",
    date: "2026-03-01",
    metadata: { author: "Marcus Rivera", priority: "high" },
  },
  {
    id: "act-007",
    accountId: "acc-002",
    type: "competitor_alert",
    title: "NeuralEdge presenting to Apex's clinical AI team",
    description:
      "Intel from partner channel: NeuralEdge has scheduled a demo with Apex's clinical AI research team to showcase their healthcare-specific LLM. Focus area is automated clinical note summarization.",
    date: "2026-02-22",
    metadata: { source: "partner_intel", urgency: "medium" },
  },
  {
    id: "act-008",
    accountId: "acc-002",
    type: "marketo_email",
    title: "Webinar Registration: HIPAA-Compliant AI Pipelines",
    description:
      "Three stakeholders from Apex registered for the upcoming HIPAA compliance webinar: Dr. Rachel Kim (CDO), Tom Nguyen (Security Lead), and Lisa Park (Data Engineering Manager).",
    date: "2026-02-14",
    metadata: { registrants: "3", campaign: "healthcare_webinar_q1" },
  },

  // ── TitanForge Manufacturing (acc-003) ──
  {
    id: "act-009",
    accountId: "acc-003",
    type: "gong_call",
    title: "Expansion Discovery — Predictive Maintenance Use Case",
    description:
      "Deep-dive call with TitanForge's IoT and Manufacturing Excellence teams. They want to deploy predictive maintenance models across 14 factory sites. Current POC on 2 sites showing 23% reduction in unplanned downtime. Budget approved for full rollout.",
    date: "2026-03-12",
    metadata: { duration: "55 min", attendees: "6", outcome: "very_positive", entity: "customer" },
  },
  {
    id: "act-010",
    accountId: "acc-003",
    type: "salesforce_meeting",
    title: "Technical Architecture Workshop — Multi-site Deployment",
    description:
      "Two-day on-site workshop with TitanForge's platform engineering team to design the multi-site deployment architecture. Agreed on hub-and-spoke model with edge processing at each factory and centralized model registry.",
    date: "2026-03-06",
    metadata: { location: "Detroit, MI", duration: "2 days", type: "workshop" },
  },
  {
    id: "act-011",
    accountId: "acc-003",
    type: "salesforce_note",
    title: "Expansion Deal Update — $1.2M incremental ARR",
    description:
      "Pricing proposal for 14-site rollout submitted. VP of Operations Mark Tanaka is the economic buyer. Legal review expected to take 3-4 weeks. Target close date: April 30, 2026. Confidence level: high.",
    date: "2026-02-28",
    metadata: { deal_value: "$1,200,000", stage: "negotiation", confidence: "85%" },
  },
  {
    id: "act-012",
    accountId: "acc-003",
    type: "marketo_email",
    title: "Downloaded: Manufacturing AI Maturity Assessment",
    description:
      "CTO Angela Reeves downloaded the Manufacturing AI Maturity Assessment toolkit. This aligns with their internal initiative to benchmark AI readiness across all plants.",
    date: "2026-02-10",
    metadata: { recipient: "a.reeves@titanforge.com", campaign: "manufacturing_ai" },
  },

  // ── NovaBright Retail (acc-004) ──
  {
    id: "act-013",
    accountId: "acc-004",
    type: "gong_call",
    title: "Initial Discovery Call — Retail Analytics Requirements",
    description:
      "First substantive call with NovaBright's Head of Digital. They are drowning in customer data across 200+ stores but lack unified analytics. Currently using spreadsheets and basic Clearview dashboards. No ML capabilities today.",
    date: "2026-03-07",
    metadata: { duration: "38 min", attendees: "3", outcome: "neutral", entity: "prospect" },
  },
  {
    id: "act-014",
    accountId: "acc-004",
    type: "competitor_alert",
    title: "ClearView Analytics incumbent at NovaBright",
    description:
      "Confirmed ClearView Analytics is the incumbent BI tool. Contract renewal due November 2026. NovaBright evaluating alternatives due to inability to handle real-time inventory analytics and customer segmentation ML models.",
    date: "2026-02-20",
    metadata: { source: "discovery_call", urgency: "low" },
  },
  {
    id: "act-015",
    accountId: "acc-004",
    type: "salesforce_meeting",
    title: "Demo: Real-time Customer Segmentation",
    description:
      "Delivered product demo showcasing real-time customer segmentation using NovaBright's anonymized sample data. Head of Digital and VP of Marketing attended. Strong interest but budget concerns raised — fiscal year starts in January.",
    date: "2026-03-13",
    metadata: { attendees: "4", demo_score: "7/10", entity: "prospect" },
  },

  // ── Pinnacle Energy Corp (acc-005) ──
  {
    id: "act-016",
    accountId: "acc-005",
    type: "gong_call",
    title: "Mid-cycle Check-in — Data Governance Compliance",
    description:
      "Reviewed Pinnacle's data governance posture ahead of upcoming FERC audit. They need enhanced data lineage tracking and automated PII detection for their grid telemetry data. Our governance module is strong here.",
    date: "2026-03-03",
    metadata: { duration: "29 min", attendees: "3", outcome: "positive" },
  },
  {
    id: "act-017",
    accountId: "acc-005",
    type: "competitor_alert",
    title: "DataVault Enterprise bidding on Pinnacle's compliance module",
    description:
      "Pinnacle's procurement team issued an RFI for a standalone data governance solution. DataVault Enterprise submitted a response. Our integrated governance approach should be positioned as superior to bolt-on solutions.",
    date: "2026-02-15",
    metadata: { source: "procurement_intel", urgency: "medium" },
  },
  {
    id: "act-018",
    accountId: "acc-005",
    type: "salesforce_note",
    title: "Pinnacle stakeholder mapping update",
    description:
      "Updated org chart: New Chief Digital Officer hired — Robert Faulkner, previously CDO at Shell. He is centralizing all data and AI initiatives under his org. Need to establish relationship ASAP.",
    date: "2026-02-08",
    metadata: { author: "Marcus Rivera", priority: "high" },
  },

  // ── Quantum Logistics Inc (acc-006) ──
  {
    id: "act-019",
    accountId: "acc-006",
    type: "gong_call",
    title: "Escalation Call — Route Optimization Model Accuracy",
    description:
      "VP of Operations frustrated with route optimization model accuracy degrading over past quarter. Root cause identified as data drift in shipment volume patterns post-holiday season. Recommended retraining cadence adjustment.",
    date: "2026-03-05",
    metadata: { duration: "41 min", sentiment: "negative", attendees: "5" },
  },
  {
    id: "act-020",
    accountId: "acc-006",
    type: "salesforce_meeting",
    title: "Quarterly Executive Alignment — CEO and COO",
    description:
      "Meeting with CEO David Chung and COO Maria Vasquez. Quantum is investing $5M in supply chain AI this year. They want us as their strategic platform but need to see faster time-to-value on ML model deployments.",
    date: "2026-02-24",
    metadata: { location: "Chicago, IL", type: "executive_meeting" },
  },
  {
    id: "act-021",
    accountId: "acc-006",
    type: "competitor_alert",
    title: "Synthetica AI running POC with Quantum's data science team",
    description:
      "Internal champion reported that Quantum's data science team initiated an unauthorized POC with Synthetica AI for demand forecasting. The team was attracted by Synthetica's pre-built logistics models. AE escalating immediately.",
    date: "2026-02-12",
    metadata: { source: "champion_intel", urgency: "high" },
  },
  {
    id: "act-022",
    accountId: "acc-006",
    type: "marketo_email",
    title: "Opened: Supply Chain AI Benchmark Report 2026",
    description:
      "COO Maria Vasquez and 2 directors opened the Supply Chain AI Benchmark email. Maria clicked through and spent 8 minutes on the interactive benchmark tool.",
    date: "2026-01-30",
    metadata: { recipients: "3", campaign: "supply_chain_benchmark" },
  },

  // ── Stellar Media Group (acc-007) ──
  {
    id: "act-023",
    accountId: "acc-007",
    type: "gong_call",
    title: "Cold Outreach Follow-up — Content Recommendation Engine",
    description:
      "Connected with VP of Product Sarah Lin about their content recommendation challenges. They currently use a basic collaborative filtering model that is underperforming. Interested in our GenAI-powered recommendation engine but skeptical about cost.",
    date: "2026-03-11",
    metadata: { duration: "22 min", attendees: "2", outcome: "lukewarm", entity: "prospect" },
  },
  {
    id: "act-024",
    accountId: "acc-007",
    type: "salesforce_note",
    title: "Stellar Media — Competitive Landscape Assessment",
    description:
      "Stellar is evaluating three vendors including us, OpenML Studio, and Synthetica AI. Their technical team favors open-source but leadership wants enterprise support guarantees. Our hybrid approach could be the differentiator.",
    date: "2026-02-27",
    metadata: { author: "Sarah Chen", priority: "medium" },
  },
  {
    id: "act-025",
    accountId: "acc-007",
    type: "marketo_email",
    title: "Webinar Attended: GenAI for Media & Entertainment",
    description:
      "VP of Product Sarah Lin and CTO Alex Petrov attended the GenAI for Media webinar. Both stayed for the full 60 minutes and submitted questions during Q&A about content personalization at scale.",
    date: "2026-02-05",
    metadata: { attendees: "2", campaign: "media_genai_webinar" },
  },

  // ── Competitor News / External Intel ──
  {
    id: "act-031",
    accountId: "acc-001",
    type: "competitor_news",
    title: "Synthetica AI raises $180M Series C to expand enterprise AI platform",
    description:
      "Synthetica AI announced a $180M Series C led by Sequoia Capital, valuing the company at $2.1B. Funds will be used to expand their enterprise AI platform and double their sales team.",
    date: "2026-03-14",
    metadata: { newsSource: "TechCrunch", entity: "competitor" },
  },
  {
    id: "act-032",
    accountId: "acc-002",
    type: "competitor_news",
    title: "NeuralEdge launches healthcare-specific LLM for clinical workflows",
    description:
      "NeuralEdge announced MedLLM-3, a HIPAA-compliant large language model fine-tuned on clinical data. Targets automated clinical note summarization and diagnostic assistance.",
    date: "2026-03-13",
    metadata: { newsSource: "NeuralEdge Newsroom", entity: "competitor" },
  },
  {
    id: "act-033",
    accountId: "acc-003",
    type: "competitor_news",
    title: "Lakehouse.io partners with Siemens for industrial IoT analytics",
    description:
      "Lakehouse.io announced a strategic partnership with Siemens to integrate their data lakehouse with Siemens MindSphere for manufacturing analytics. Could impact TitanForge evaluation.",
    date: "2026-03-11",
    metadata: { newsSource: "Google News", entity: "competitor" },
  },
  {
    id: "act-034",
    accountId: "acc-006",
    type: "competitor_news",
    title: "Synthetica AI launches pre-built Supply Chain AI models",
    description:
      "Synthetica AI released a suite of pre-built models for demand forecasting, route optimization, and warehouse management. Free 90-day trial for enterprise customers.",
    date: "2026-03-09",
    metadata: { newsSource: "Synthetica AI Blog", entity: "competitor" },
  },
  {
    id: "act-035",
    accountId: "acc-005",
    type: "competitor_news",
    title: "DataVault Enterprise wins FedRAMP authorization for data governance suite",
    description:
      "DataVault Enterprise announced FedRAMP High authorization for their data governance platform. This strengthens their position in regulated industries including energy and financial services.",
    date: "2026-03-06",
    metadata: { newsSource: "DataVault Newsroom", entity: "competitor" },
  },
  {
    id: "act-036",
    accountId: "acc-007",
    type: "competitor_news",
    title: "OpenML Studio open-sources their recommendation engine framework",
    description:
      "OpenML Studio released their content recommendation framework as open source on GitHub. Already has 2.3K stars. Could attract Stellar Media's engineering team.",
    date: "2026-03-04",
    metadata: { newsSource: "TechCrunch", entity: "competitor" },
  },
  {
    id: "act-037",
    accountId: "acc-004",
    type: "competitor_news",
    title: "ClearView Analytics acquired by Oracle for $450M",
    description:
      "Oracle announced the acquisition of ClearView Analytics for $450M. NovaBright currently uses ClearView — this acquisition may accelerate their desire to switch vendors.",
    date: "2026-02-28",
    metadata: { newsSource: "Google News", entity: "competitor" },
  },

  // ── Cross-account and additional activities ──
  {
    id: "act-026",
    accountId: "acc-001",
    type: "gong_call",
    title: "Technical Deep Dive — Fraud Detection Model Performance",
    description:
      "Working session with Meridian's ML engineering team on their fraud detection model. Model latency at 12ms meets their <15ms SLA. Discussed moving to real-time feature store for improved accuracy. Team very engaged.",
    date: "2026-01-28",
    metadata: { duration: "62 min", attendees: "5", outcome: "positive" },
  },
  {
    id: "act-027",
    accountId: "acc-003",
    type: "competitor_alert",
    title: "Lakehouse.io approaching TitanForge's IoT team",
    description:
      "Lakehouse.io sales rep reached out to TitanForge's VP of IoT for a data lakehouse pitch. Our champion deflected, saying they are committed to current platform, but flagged it as a heads-up.",
    date: "2026-01-20",
    metadata: { source: "champion_intel", urgency: "low" },
  },
  {
    id: "act-028",
    accountId: "acc-005",
    type: "marketo_email",
    title: "Downloaded: Energy Sector AI Compliance Guide",
    description:
      "Three Pinnacle stakeholders downloaded the Energy Sector AI Compliance Guide: Robert Faulkner (CDO), Jennifer Walsh (Chief Compliance Officer), and Mike Torres (Head of Grid Analytics).",
    date: "2026-01-15",
    metadata: { recipients: "3", campaign: "energy_compliance_q1" },
  },
  {
    id: "act-029",
    accountId: "acc-006",
    type: "salesforce_note",
    title: "Quantum Logistics — Risk Assessment Update",
    description:
      "Health score trending down (63 to 58 in 45 days). Three contributing factors: (1) model accuracy complaints, (2) Synthetica POC, (3) delayed professional services engagement on warehouse analytics project. Recommending CSM intervention.",
    date: "2026-01-10",
    metadata: { author: "James Okafor", priority: "high" },
  },
  {
    id: "act-030",
    accountId: "acc-002",
    type: "salesforce_meeting",
    title: "On-site Visit — Clinical Data Platform Review",
    description:
      "Full-day on-site at Apex's Boston headquarters. Met with clinical informatics, IT security, and data engineering teams. Identified three quick wins for performance optimization. Dr. Kim was present but reserved.",
    date: "2026-01-05",
    metadata: { location: "Boston, MA", type: "on_site_review", duration: "6 hours" },
  },
];
