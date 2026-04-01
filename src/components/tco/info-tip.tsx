'use client';

import { useState } from 'react';

interface InfoTipProps {
  term: string;
  explanation: string;
}

export function InfoTip({ term, explanation }: InfoTipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <span>{term}</span>
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(!open)}
        className="ml-1 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-muted-foreground/20 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-help shrink-0"
        aria-label={`What is ${term}?`}
      >
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </button>
      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 px-3 py-2 rounded-lg bg-foreground text-background text-xs leading-relaxed shadow-lg pointer-events-none">
          {explanation}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45 -mt-1" />
        </div>
      )}
    </span>
  );
}

/** Pre-defined tooltips for common TCO terms */
export const TCO_TIPS = {
  tco: "Total Cost of Ownership — the complete cost of acquiring, deploying, and operating a solution over its full contract lifecycle, including hidden and indirect costs.",
  pricePerSeat: "The monthly subscription cost per named user. Volume discounts may apply at higher seat counts.",
  platformFee: "A fixed annual fee some vendors charge for access to the platform itself, separate from per-seat licensing.",
  implementation: "Professional services costs for initial setup, configuration, and deployment. Includes solution architecture, environment setup, and go-live support.",
  dataMigration: "Cost to transfer existing data from legacy systems into the new platform, including ETL development, validation, and reconciliation.",
  training: "One-time investment in user onboarding, admin certification, and change management programs to drive adoption.",
  supportTier: "The level of vendor support included or required. Premium tiers typically offer faster response times, dedicated CSMs, and 24/7 coverage.",
  adminFte: "The percentage of a full-time employee needed to manage, maintain, and administer the platform day-to-day. Industry average FTE cost: $145K/year.",
  integrations: "Cost to build and maintain connections to your existing tech stack (CRM, data warehouse, BI tools, etc.).",
  downtime: "Estimated hours of unplanned outage per year. Multiply by your cost-per-hour-of-downtime to quantify business impact.",
  costPerHourDowntime: "Revenue and productivity lost per hour of system unavailability. Varies by industry — $10K–$50K/hr is typical for mid-market enterprise.",
  customization: "Annual spend on tailoring the platform to your specific workflows, including custom reports, dashboards, and automations.",
  contractTerm: "The commitment period. Longer terms typically unlock better unit pricing but increase switching cost risk.",
  seatGrowth: "The expected annual increase in licensed users. Models organic headcount growth plus departmental expansion.",
  vendorLockIn: "One-time cost to switch away from this vendor after the contract ends — including data export, retraining, and re-implementation.",
  opportunityCost: "Value lost from a longer implementation timeline. Faster time-to-value means earlier ROI realization.",
  supplementalTooling: "When a vendor lacks capabilities you need (e.g., AI/ML, governance), you must purchase additional software to fill the gap.",
  pricingModel: "How the vendor charges for their product. Different models create different cost curves and risk profiles over the contract term.",
  seatBased: "Fixed price per named user per month. Predictable costs that scale linearly with headcount. Most common for SaaS platforms.",
  usageBased: "Pay-per-use pricing based on consumption (compute hours, API calls, tokens, data processed). Costs scale with workload, not headcount. Common for AI/ML and data infrastructure.",
  hybrid: "Combines a fixed base platform fee with variable usage charges. The base fee covers platform access; usage is billed on top. Balances predictability with flexibility.",
  flatRate: "A single annual fee regardless of users or usage. Simplest to budget but least flexible. Typically negotiated for large enterprise deals with committed spend.",
  usageUnit: "The billable unit of consumption — varies by vendor. Common units: compute hours, API calls, tokens processed, queries run, or data volume (GB).",
  estimatedVolume: "Your best estimate of monthly consumption. Usage-based vendors often see 30–50% overages vs. initial estimates — model conservatively.",
  hybridBase: "The fixed monthly fee in a hybrid model that covers core platform access, baseline support, and a minimum commitment level.",
} as const;
