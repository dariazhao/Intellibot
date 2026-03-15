import type { CompetitorSignal } from "@/lib/schemas";

export const competitorSignals: CompetitorSignal[] = [
  // ── Meridian Financial Group (acc-001) ──
  {
    id: "sig-001",
    accountId: "acc-001",
    competitorId: "comp-d",
    signalType: "tech_stack_detected",
    detail:
      "Lakehouse.io SDK references found in Meridian's public GitHub repositories. Appears to be evaluation-stage integration by their data science team exploring lakehouse architecture.",
    date: "2026-02-25",
    threatLevel: "high",
  },
  {
    id: "sig-002",
    accountId: "acc-001",
    competitorId: "comp-a",
    signalType: "mentioned_in_call",
    detail:
      "During QBR call, Meridian's VP of Data Engineering mentioned receiving an unsolicited proposal from Synthetica AI for their real-time analytics workloads. He said they are 'keeping options open.'",
    date: "2026-03-10",
    threatLevel: "medium",
  },
  {
    id: "sig-003",
    accountId: "acc-001",
    competitorId: "comp-b",
    signalType: "seen_in_deal",
    detail:
      "DataVault Enterprise listed as incumbent in Meridian's compliance department. Long-standing contract for audit trail and regulatory reporting. Not expanding but deeply entrenched.",
    date: "2026-01-15",
    threatLevel: "low",
  },

  // ── Apex Healthcare Systems (acc-002) ──
  {
    id: "sig-004",
    accountId: "acc-002",
    competitorId: "comp-e",
    signalType: "seen_in_deal",
    detail:
      "NeuralEdge scheduled a demo with Apex's clinical AI research team to showcase healthcare-specific LLM for automated clinical note summarization. Direct threat to our GenAI positioning in this account.",
    date: "2026-02-22",
    threatLevel: "medium",
  },
  {
    id: "sig-005",
    accountId: "acc-002",
    competitorId: "comp-a",
    signalType: "job_posting",
    detail:
      "Apex Healthcare posted a Senior Data Engineer role with 'Synthetica AI platform experience preferred' in the job requirements. Suggests evaluation or pilot may be underway.",
    date: "2026-02-10",
    threatLevel: "high",
  },
  {
    id: "sig-006",
    accountId: "acc-002",
    competitorId: "comp-c",
    signalType: "tech_stack_detected",
    detail:
      "OpenML Studio packages detected in Apex's internal PyPI mirror during a technical integration session. Used by their research team for experimental model training.",
    date: "2026-01-20",
    threatLevel: "low",
  },

  // ── TitanForge Manufacturing (acc-003) ──
  {
    id: "sig-007",
    accountId: "acc-003",
    competitorId: "comp-d",
    signalType: "mentioned_in_call",
    detail:
      "Lakehouse.io sales rep reached out to TitanForge's VP of IoT Platform. Our champion deflected but mentioned they received a compelling proposal for edge data processing.",
    date: "2026-01-20",
    threatLevel: "low",
  },
  {
    id: "sig-008",
    accountId: "acc-003",
    competitorId: "comp-a",
    signalType: "tech_stack_detected",
    detail:
      "Synthetica AI trial license detected on TitanForge's dev cluster during routine integration monitoring. Limited to a single data science sandbox environment.",
    date: "2026-02-05",
    threatLevel: "medium",
  },

  // ── NovaBright Retail (acc-004) ──
  {
    id: "sig-009",
    accountId: "acc-004",
    competitorId: "comp-f",
    signalType: "seen_in_deal",
    detail:
      "ClearView Analytics confirmed as incumbent BI vendor at NovaBright with contract renewal in November 2026. NovaBright evaluating alternatives due to lack of real-time and ML capabilities.",
    date: "2026-02-20",
    threatLevel: "low",
  },
  {
    id: "sig-010",
    accountId: "acc-004",
    competitorId: "comp-d",
    signalType: "mentioned_in_call",
    detail:
      "NovaBright's Head of Digital mentioned Lakehouse.io as one of three vendors in their evaluation alongside us. Attracted by consumption-based pricing model.",
    date: "2026-03-07",
    threatLevel: "medium",
  },

  // ── Pinnacle Energy Corp (acc-005) ──
  {
    id: "sig-011",
    accountId: "acc-005",
    competitorId: "comp-b",
    signalType: "seen_in_deal",
    detail:
      "DataVault Enterprise submitted a response to Pinnacle's RFI for a standalone data governance solution. Their legacy compliance pedigree makes them a credible contender for this specific module.",
    date: "2026-02-15",
    threatLevel: "medium",
  },
  {
    id: "sig-012",
    accountId: "acc-005",
    competitorId: "comp-d",
    signalType: "job_posting",
    detail:
      "Pinnacle posted two Data Platform Engineer roles mentioning 'experience with Lakehouse.io or similar cloud-native data platforms' as a preferred qualification.",
    date: "2026-03-01",
    threatLevel: "medium",
  },

  // ── Quantum Logistics Inc (acc-006) ──
  {
    id: "sig-013",
    accountId: "acc-006",
    competitorId: "comp-a",
    signalType: "tech_stack_detected",
    detail:
      "Synthetica AI running an unauthorized POC with Quantum's data science team for demand forecasting. Team was attracted by pre-built logistics ML models. High-priority escalation.",
    date: "2026-02-12",
    threatLevel: "high",
  },
  {
    id: "sig-014",
    accountId: "acc-006",
    competitorId: "comp-c",
    signalType: "mentioned_in_call",
    detail:
      "During escalation call, Quantum's VP of Operations mentioned their data science team has been exploring OpenML Studio as a lower-cost alternative for model training workloads.",
    date: "2026-03-05",
    threatLevel: "medium",
  },

  // ── Stellar Media Group (acc-007) ──
  {
    id: "sig-015",
    accountId: "acc-007",
    competitorId: "comp-c",
    signalType: "seen_in_deal",
    detail:
      "OpenML Studio is one of three vendors in Stellar Media's evaluation. Their technical team favors the open-source approach and existing Python ecosystem compatibility.",
    date: "2026-02-27",
    threatLevel: "medium",
  },
  {
    id: "sig-016",
    accountId: "acc-007",
    competitorId: "comp-a",
    signalType: "seen_in_deal",
    detail:
      "Synthetica AI is the second competitor in Stellar's evaluation. VP of Product was impressed by their content recommendation demo but concerned about pricing at scale.",
    date: "2026-02-27",
    threatLevel: "high",
  },
  {
    id: "sig-017",
    accountId: "acc-007",
    competitorId: "comp-e",
    signalType: "mentioned_in_call",
    detail:
      "Stellar's CTO Alex Petrov mentioned NeuralEdge during the webinar Q&A, asking how our GenAI capabilities compare to their specialized NLP models for content understanding.",
    date: "2026-02-05",
    threatLevel: "low",
  },
  {
    id: "sig-018",
    accountId: "acc-006",
    competitorId: "comp-d",
    signalType: "job_posting",
    detail:
      "Quantum Logistics posted a 'Head of Data Platform' role with Lakehouse.io listed as a key technology. Suggests potential platform re-evaluation at the leadership level.",
    date: "2026-01-25",
    threatLevel: "high",
  },
];
