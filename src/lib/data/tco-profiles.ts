import type { TcoCostProfile } from "@/lib/schemas";

/**
 * TCO cost profiles for our product and each competitor.
 *
 * Pricing philosophy:
 *   - Our product is competitively priced with strong out-of-box value,
 *     low implementation friction, and included support.
 *   - Competitors vary: legacy vendors have high implementation/hidden costs,
 *     cloud-native vendors have unpredictable scaling, open-source has
 *     hidden ops burden, and niche players have narrow scope requiring
 *     supplemental tooling.
 *
 * Each profile includes pricing across all four models (seat, usage, hybrid,
 * flat-rate) so reps can toggle models and see realistic vendor comparisons
 * regardless of how the deal is structured.
 *
 * All dollar amounts are USD. Per-seat prices are monthly.
 * Implementation, training, and migration are one-time costs.
 * Support, admin, customization, and downtime are annual recurring.
 */
export const tcoCostProfiles: TcoCostProfile[] = [
  // ── Our Product ──────────────────────────────────────────────────────────
  {
    vendorId: "us",
    vendorName: "Our Platform",
    vendorType: "us",

    // Seat-based
    pricePerSeatMonth: 85,
    platformFeeAnnual: 0,

    // Usage-based
    usagePricePerUnit: 0.12,
    usageUnitLabel: "compute hours",
    estimatedMonthlyUnits: 8000,

    // Hybrid
    hybridBaseFeeMonthly: 2500,
    hybridPricePerUnit: 0.06,
    hybridUnitLabel: "compute hours",
    hybridEstimatedMonthlyUnits: 8000,

    // Flat-rate
    flatRateAnnual: 150000,

    // One-time
    implementationCost: 25000,
    dataMigrationCost: 8000,
    trainingCost: 5000,

    // Support
    supportTier: "included",
    supportCostAnnual: 0,

    // Operations
    adminFtePct: 15,
    integrationCostPerConnector: 3000,
    avgConnectorsNeeded: 3,

    // Hidden / Risk
    avgDowntimeHoursPerYear: 2,
    customizationCostAnnual: 5000,

    assumptions: [
      "Per-seat pricing includes all platform features and standard support",
      "Usage pricing based on compute hours; includes storage and egress",
      "Hybrid model: fixed base covers platform access + discounted compute rate",
      "Implementation timeline: 4–6 weeks for enterprise deployments",
      "99.95% uptime SLA backed by service credits",
    ],
  },

  // ── Synthetica AI (Comp A — high threat) ─────────────────────────────────
  {
    vendorId: "comp-a",
    vendorName: "Synthetica AI",
    vendorType: "competitor",

    pricePerSeatMonth: 95,
    platformFeeAnnual: 18000,

    usagePricePerUnit: 0.22,
    usageUnitLabel: "GPU compute hours",
    estimatedMonthlyUnits: 10000,

    hybridBaseFeeMonthly: 4000,
    hybridPricePerUnit: 0.14,
    hybridUnitLabel: "GPU compute hours",
    hybridEstimatedMonthlyUnits: 10000,

    flatRateAnnual: 280000,

    implementationCost: 45000,
    dataMigrationCost: 15000,
    trainingCost: 12000,
    supportTier: "premium_required",
    supportCostAnnual: 24000,
    adminFtePct: 25,
    integrationCostPerConnector: 8000,
    avgConnectorsNeeded: 4,
    avgDowntimeHoursPerYear: 8,
    customizationCostAnnual: 18000,
    assumptions: [
      "GPU-accelerated features require premium compute tier at additional cost",
      "Usage pricing: GPU hours billed at $0.22/hr; spikes during model training",
      "Premium support ($24K/yr) needed for <4hr response; standard is 48hr+",
      "Rapid release cadence requires ongoing admin effort to stay current",
      "Implementation typically takes 8–12 weeks due to configuration complexity",
    ],
  },

  // ── DataVault Enterprise (Comp B — medium threat) ────────────────────────
  {
    vendorId: "comp-b",
    vendorName: "DataVault Enterprise",
    vendorType: "competitor",

    pricePerSeatMonth: 110,
    platformFeeAnnual: 36000,

    usagePricePerUnit: 0.35,
    usageUnitLabel: "query processing units",
    estimatedMonthlyUnits: 12000,

    hybridBaseFeeMonthly: 6000,
    hybridPricePerUnit: 0.20,
    hybridUnitLabel: "query processing units",
    hybridEstimatedMonthlyUnits: 12000,

    flatRateAnnual: 420000,

    implementationCost: 120000,
    dataMigrationCost: 35000,
    trainingCost: 25000,
    supportTier: "tiered",
    supportCostAnnual: 48000,
    adminFtePct: 40,
    integrationCostPerConnector: 15000,
    avgConnectorsNeeded: 5,
    avgDowntimeHoursPerYear: 6,
    customizationCostAnnual: 30000,
    assumptions: [
      "Module-based licensing — AI/ML add-on, governance add-on priced separately",
      "Usage model: query processing units (QPUs) vary by query complexity",
      "Implementation requires SI partner engagement (12–20 weeks typical)",
      "Legacy architecture drives higher admin overhead (dedicated DBA recommended)",
      "Hybrid/on-prem deployments add infrastructure costs not captured here",
    ],
  },

  // ── OpenML Studio (Comp C — medium threat) ───────────────────────────────
  {
    vendorId: "comp-c",
    vendorName: "OpenML Studio",
    vendorType: "competitor",

    pricePerSeatMonth: 45,
    platformFeeAnnual: 0,

    usagePricePerUnit: 0.08,
    usageUnitLabel: "compute hours",
    estimatedMonthlyUnits: 15000,

    hybridBaseFeeMonthly: 1500,
    hybridPricePerUnit: 0.05,
    hybridUnitLabel: "compute hours",
    hybridEstimatedMonthlyUnits: 15000,

    flatRateAnnual: 120000,

    implementationCost: 35000,
    dataMigrationCost: 12000,
    trainingCost: 15000,
    supportTier: "paid_required",
    supportCostAnnual: 36000,
    adminFtePct: 35,
    integrationCostPerConnector: 10000,
    avgConnectorsNeeded: 5,
    avgDowntimeHoursPerYear: 12,
    customizationCostAnnual: 25000,
    assumptions: [
      "Core is open-source ($0) but enterprise features require paid tier",
      "Usage pricing: lower rate but higher volume due to less efficient scheduling",
      "No SLA without premium support contract ($36K/yr minimum)",
      "Higher admin overhead — requires in-house ML engineering expertise",
      "Production-grade deployment requires additional DevOps investment",
    ],
  },

  // ── Lakehouse.io (Comp D — high threat) ──────────────────────────────────
  {
    vendorId: "comp-d",
    vendorName: "Lakehouse.io",
    vendorType: "competitor",

    pricePerSeatMonth: 75,
    platformFeeAnnual: 12000,

    usagePricePerUnit: 0.15,
    usageUnitLabel: "compute hours",
    estimatedMonthlyUnits: 12000,

    hybridBaseFeeMonthly: 3500,
    hybridPricePerUnit: 0.09,
    hybridUnitLabel: "compute hours",
    hybridEstimatedMonthlyUnits: 12000,

    flatRateAnnual: 240000,

    implementationCost: 55000,
    dataMigrationCost: 20000,
    trainingCost: 10000,
    supportTier: "included_basic",
    supportCostAnnual: 15000,
    adminFtePct: 30,
    integrationCostPerConnector: 6000,
    avgConnectorsNeeded: 4,
    avgDowntimeHoursPerYear: 4,
    customizationCostAnnual: 15000,
    assumptions: [
      "Consumption-based is their default — actual costs can exceed estimates by 30–50%",
      "Per-seat equivalent shown but actual pricing is compute-hour based",
      "Auto-scaling reduces downtime but causes unpredictable cost spikes",
      "Data engineering expertise required for optimal configuration",
      "GenAI features still in beta — may need supplemental tooling",
    ],
  },

  // ── NeuralEdge (Comp E — low threat) ─────────────────────────────────────
  {
    vendorId: "comp-e",
    vendorName: "NeuralEdge",
    vendorType: "competitor",

    pricePerSeatMonth: 120,
    platformFeeAnnual: 24000,

    usagePricePerUnit: 0.04,
    usageUnitLabel: "API calls (1K)",
    estimatedMonthlyUnits: 50000,

    hybridBaseFeeMonthly: 5000,
    hybridPricePerUnit: 0.025,
    hybridUnitLabel: "API calls (1K)",
    hybridEstimatedMonthlyUnits: 50000,

    flatRateAnnual: 350000,

    implementationCost: 40000,
    dataMigrationCost: 18000,
    trainingCost: 20000,
    supportTier: "limited",
    supportCostAnnual: 30000,
    adminFtePct: 20,
    integrationCostPerConnector: 12000,
    avgConnectorsNeeded: 6,
    avgDowntimeHoursPerYear: 10,
    customizationCostAnnual: 22000,
    assumptions: [
      "Narrow NLP/GenAI focus — you'll need additional analytics tooling (+$40K–80K/yr)",
      "API call pricing: billed per 1K calls; token-heavy requests cost more",
      "Small engineering team — support bandwidth is limited and slow",
      "Series B company — runway concerns may affect long-term viability",
      "Limited enterprise reference customers increases deployment risk",
    ],
  },

  // ── ClearView Analytics (Comp F — low threat) ────────────────────────────
  {
    vendorId: "comp-f",
    vendorName: "ClearView Analytics",
    vendorType: "competitor",

    pricePerSeatMonth: 55,
    platformFeeAnnual: 8000,

    usagePricePerUnit: 0.10,
    usageUnitLabel: "report runs",
    estimatedMonthlyUnits: 5000,

    hybridBaseFeeMonthly: 2000,
    hybridPricePerUnit: 0.06,
    hybridUnitLabel: "report runs",
    hybridEstimatedMonthlyUnits: 5000,

    flatRateAnnual: 95000,

    implementationCost: 20000,
    dataMigrationCost: 10000,
    trainingCost: 8000,
    supportTier: "included",
    supportCostAnnual: 0,
    adminFtePct: 20,
    integrationCostPerConnector: 5000,
    avgConnectorsNeeded: 3,
    avgDowntimeHoursPerYear: 5,
    customizationCostAnnual: 8000,
    assumptions: [
      "No native AI/ML capabilities — requires separate AI tooling (+$50K–120K/yr)",
      "Usage pricing: billed per report generation/export; dashboards not included",
      "PE-owned since Feb 2026 — product investment trajectory uncertain",
      "Aging tech stack limits API extensibility for modern workflows",
      "Lower sticker price offset by need for supplemental platforms",
    ],
  },
];
