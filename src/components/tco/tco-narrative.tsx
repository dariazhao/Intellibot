'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import type { VendorTcoResult } from './tco-wizard';
import type { Account, TcoCostProfile } from '@/lib/schemas';

// ── Types ────────────────────────────────────────────────────────────────────

type Audience = 'c_suite' | 'vp_engineering' | 'procurement' | 'evaluation_committee';

const AUDIENCES: { value: Audience; label: string; desc: string; icon: string }[] = [
  { value: 'c_suite', label: 'C-Suite / CFO', desc: 'Strategic ROI, risk mitigation, board-level framing', icon: '👔' },
  { value: 'vp_engineering', label: 'VP Engineering / CTO', desc: 'Architecture, operational efficiency, team velocity', icon: '🛠' },
  { value: 'procurement', label: 'Procurement / Legal', desc: 'Contract terms, pricing transparency, compliance', icon: '📝' },
  { value: 'evaluation_committee', label: 'Evaluation Committee', desc: 'Balanced technical + business case for mixed audience', icon: '👥' },
];

// ── Formatting ───────────────────────────────────────────────────────────────

function fmtD(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

function pctSavings(us: number, them: number): number {
  if (them === 0) return 0;
  return Math.round(((them - us) / them) * 100);
}

// ── Narrative Generation ─────────────────────────────────────────────────────

interface NarrativeContent {
  executiveSummary: string;
  aeTrack: { heading: string; points: string[] }[];
  seTrack: { heading: string; points: string[] }[];
  discoveryQuestions: string[];
  objectionHandlers: { objection: string; response: string }[];
  competitiveLandmines: string[];
  closingCta: string;
}

function generateNarrative(
  audience: Audience,
  results: VendorTcoResult[],
  deal: { contractTermYears: number; seats: number },
  costProfiles: TcoCostProfile[],
  selectedAccount?: Account,
): NarrativeContent {
  const us = results.find(r => r.vendorType === 'us')!;
  const competitors = results.filter(r => r.vendorType !== 'us');
  const biggestDelta = competitors.reduce((max, c) => c.totalTco - us.totalTco > max.delta ? { vendor: c, delta: c.totalTco - us.totalTco } : max, { vendor: competitors[0], delta: competitors[0].totalTco - us.totalTco });
  const accountName = selectedAccount?.name || 'your organization';
  const term = deal.contractTermYears;
  const termLabel = `${term}-year`;

  const biggestCompetitor = biggestDelta.vendor;
  const bcProfile = costProfiles.find(p => p.vendorId === biggestCompetitor.vendorId);
  const usProfile = costProfiles.find(p => p.vendorType === 'us')!;

  const usYearTotals = {
    licensing: us.yearBreakdowns.reduce((s, y) => s + y.licensing, 0),
    implementation: us.yearBreakdowns.reduce((s, y) => s + y.implementation + y.dataMigration + y.training, 0),
    operations: us.yearBreakdowns.reduce((s, y) => s + y.support + y.admin + y.customization, 0),
    hidden: us.yearBreakdowns.reduce((s, y) => s + y.downtime + y.supplementalTooling, 0),
  };
  const compYearTotals = {
    licensing: biggestCompetitor.yearBreakdowns.reduce((s, y) => s + y.licensing, 0),
    implementation: biggestCompetitor.yearBreakdowns.reduce((s, y) => s + y.implementation + y.dataMigration + y.training, 0),
    operations: biggestCompetitor.yearBreakdowns.reduce((s, y) => s + y.support + y.admin + y.customization, 0),
    hidden: biggestCompetitor.yearBreakdowns.reduce((s, y) => s + y.downtime + y.supplementalTooling, 0),
  };

  const totalSavings = biggestDelta.delta;
  const savingsPct = pctSavings(us.totalTco, biggestCompetitor.totalTco);

  const audienceFraming = {
    c_suite: { lensWord: 'strategic investment', riskFrame: 'fiduciary risk', valueFrame: 'shareholder value' },
    vp_engineering: { lensWord: 'engineering efficiency', riskFrame: 'technical debt', valueFrame: 'team velocity' },
    procurement: { lensWord: 'total spend optimization', riskFrame: 'contractual exposure', valueFrame: 'cost predictability' },
    evaluation_committee: { lensWord: 'total cost of ownership', riskFrame: 'organizational risk', valueFrame: 'time-to-value' },
  }[audience];

  // ── Executive Summary ──

  const executiveSummary = audience === 'c_suite'
    ? `Over a ${termLabel} engagement, our platform delivers ${fmtD(totalSavings)} in total cost savings compared to ${biggestCompetitor.vendorName}: a ${savingsPct}% reduction in TCO. This is a ${audienceFraming.lensWord} analysis that accounts for implementation, operations, risk, and hidden costs that don't appear in vendor quotes. For ${accountName}, this translates directly to budget that can be redeployed toward ${selectedAccount?.industry === 'Financial Services' ? 'regulatory compliance and digital transformation' : selectedAccount?.industry === 'Healthcare' ? 'patient outcomes and clinical innovation' : 'core business initiatives'}.`
    : audience === 'vp_engineering'
    ? `Our platform reduces ${termLabel} TCO by ${fmtD(totalSavings)} (${savingsPct}%) versus ${biggestCompetitor.vendorName}, but the real story is ${audienceFraming.valueFrame}. Lower admin overhead (${usProfile.adminFtePct}% FTE vs. ${bcProfile?.adminFtePct || 30}%), faster implementation (4 to 6 weeks vs. ${bcProfile?.vendorId === 'comp-b' ? '12 to 20 weeks' : '8 to 12 weeks'}), and ${usProfile.avgDowntimeHoursPerYear}hrs/yr downtime vs. ${bcProfile?.avgDowntimeHoursPerYear || 8}hrs means your team ships faster and firefights less.`
    : audience === 'procurement'
    ? `This ${termLabel} TCO analysis shows ${fmtD(totalSavings)} in savings (${savingsPct}%) with our platform versus ${biggestCompetitor.vendorName}. Our pricing is transparent: no hidden module fees, no separate platform charges, and support is included at no additional cost. Every line item is auditable and contractually committed, giving ${accountName} ${audienceFraming.valueFrame} across the full contract lifecycle.`
    : `Across licensing, implementation, operations, and risk factors, our platform delivers a ${termLabel} TCO of ${fmtD(us.totalTco)}, which is ${fmtD(totalSavings)} less than ${biggestCompetitor.vendorName} (${savingsPct}% savings). This analysis gives every stakeholder, whether technical, financial, or operational, a complete picture of what each option truly costs.`;

  // ── AE Talk Track ──

  const aeTrack: { heading: string; points: string[] }[] = [
    {
      heading: 'Open: Frame the Problem',
      points: audience === 'c_suite' ? [
        `"The question isn't which platform has the most features. It's which one creates the most ${audienceFraming.valueFrame} over ${term} years while minimizing ${audienceFraming.riskFrame}."`,
        `"We've modeled the true cost of ownership across every vendor ${accountName} is evaluating. Not just the sticker price, but implementation, ongoing operations, and the costs that show up 6 months after signing."`,
        `"What we found is a ${fmtD(totalSavings)} difference. Let me walk you through where that delta comes from."`,
      ] : audience === 'procurement' ? [
        `"We know procurement needs to see the full picture. Not just Year 1, but the total contractual exposure over ${term} years. That's exactly what we've built here."`,
        `"Our pricing has no hidden modules, no surprise platform fees, and support is included. We want to make your vendor evaluation straightforward."`,
        `"Let me show you the line-by-line comparison so you can validate every number."`,
      ] : [
        `"Before we get into features, I want to ground this conversation in total cost. The vendor you pick doesn't just cost what's on the quote."`,
        `"We've mapped out every cost category: licensing, implementation, operations, and the hidden costs that vendors don't put in the proposal. The delta is ${fmtD(totalSavings)}."`,
        `"Let me walk through where that gap comes from, and then [SE name] will show you the technical architecture behind those savings."`,
      ],
    },
    {
      heading: 'Build: Quantify the Advantage',
      points: [
        compYearTotals.implementation > usYearTotals.implementation
          ? `"Implementation and onboarding alone saves ${fmtD(compYearTotals.implementation - usYearTotals.implementation)}. ${biggestCompetitor.vendorName} typically takes ${bcProfile?.vendorId === 'comp-b' ? '12 to 20 weeks with an SI partner' : '8 to 12 weeks'}. We deploy in 4 to 6 weeks with our own team. That's not just a cost difference; it's time-to-value."`
          : `"Our implementation costs are competitive, but the real advantage is speed: 4 to 6 weeks to value versus industry averages of 8 to 12 weeks."`,
        compYearTotals.operations > usYearTotals.operations
          ? `"Over ${term} years, operational costs (support, admin, and customization) add up to ${fmtD(compYearTotals.operations - usYearTotals.operations)} more with ${biggestCompetitor.vendorName}. That's real budget and real headcount tied up in maintaining a tool instead of using it."`
          : `"Our operational costs are lean because the platform is designed for self-service. Your team won't need a dedicated admin."`,
        competitors.length > 1
          ? `"This pattern holds across every vendor we modeled: ${competitors.map(c => `${c.vendorName} at ${fmtD(c.totalTco)}`).join(', ')}. All significantly above our ${fmtD(us.totalTco)}."`
          : `"Even accounting for ${biggestCompetitor.vendorName}'s strengths, the total cost picture consistently favors our platform."`,
      ],
    },
    {
      heading: 'Close: Anchor the Decision',
      points: audience === 'c_suite' ? [
        `"This isn't about picking the cheapest option. It's about deploying ${fmtD(totalSavings)} toward initiatives that drive revenue instead of vendor overhead."`,
        `"We'd like to move to a proof-of-value engagement so your team can validate these numbers in your own environment. Can we schedule that for next week?"`,
      ] : audience === 'procurement' ? [
        `"We're prepared to contractually commit to these numbers. Our agreement includes transparent pricing, included support, and no hidden escalators."`,
        `"What would be most helpful: a redlined comparison of contract terms, or a call with our legal team to streamline the review?"`,
      ] : [
        `"The ${fmtD(totalSavings)} in savings over ${term} years is the headline, but the real story is what your team does with the time and budget you get back."`,
        `"I'd recommend a 2-week proof-of-value to validate these numbers with your own data. [SE name], can you walk through what that looks like?"`,
      ],
    },
  ];

  // ── SE Talk Track ──

  const seTrack: { heading: string; points: string[] }[] = [
    {
      heading: 'Architecture & Integration',
      points: [
        `"The reason our implementation is ${bcProfile && usProfile.implementationCost < bcProfile.implementationCost ? `${Math.round((1 - usProfile.implementationCost / bcProfile.implementationCost) * 100)}% less` : 'faster'} isn't because we cut corners. We designed for configuration over customization. ${biggestCompetitor.vendorName}${bcProfile?.vendorId === 'comp-b' ? ' requires SI partner engagement because of their monolithic architecture' : bcProfile?.vendorId === 'comp-a' ? ' needs extensive GPU configuration and compute tier setup' : ' has a steeper configuration curve'}."`,
        `"We ship native connectors for the integrations that matter most (Salesforce, Snowflake, Gong) at $${usProfile.integrationCostPerConnector.toLocaleString()} per connector versus ${bcProfile ? `$${bcProfile.integrationCostPerConnector.toLocaleString()}` : 'significantly more'} with ${biggestCompetitor.vendorName}. That's ${usProfile.avgConnectorsNeeded} connectors out of the box."`,
        `"On the data migration side, our tooling handles schema mapping and validation automatically. That's why we can do it for ${fmtD(usProfile.dataMigrationCost)} versus ${bcProfile ? fmtD(bcProfile.dataMigrationCost) : 'multiples of that'}."`,
      ],
    },
    {
      heading: 'Operations & Reliability',
      points: [
        `"Admin effort is where a lot of TCO hides. Our platform needs about ${usProfile.adminFtePct}% of an FTE to manage, which is a few hours a week. ${biggestCompetitor.vendorName} typically requires ${bcProfile?.adminFtePct || 30}% of an FTE${bcProfile?.vendorId === 'comp-b' ? ', and many customers end up hiring a dedicated DBA' : ''}.${bcProfile?.vendorId === 'comp-c' ? ' And that assumes you have ML engineering talent in-house already.' : ''}"`,
        `"Our 99.95% uptime SLA translates to about ${usProfile.avgDowntimeHoursPerYear} hours of downtime per year. Based on your cost-of-downtime estimate, that's the difference between ${fmtD(usYearTotals.hidden / deal.contractTermYears)}/yr and ${fmtD(compYearTotals.hidden / deal.contractTermYears)}/yr in hidden reliability costs."`,
        `"From an ops perspective, we handle infrastructure, scaling, patching, and security updates. With ${biggestCompetitor.vendorName}, ${bcProfile?.vendorId === 'comp-c' ? 'you own the DevOps burden for production deployments' : bcProfile?.vendorId === 'comp-d' ? 'auto-scaling can trigger unpredictable cost spikes' : 'there are additional operational responsibilities your team would absorb'}."`,
      ],
    },
    {
      heading: 'Technical Proof Points',
      points: [
        `"I'd recommend we do a proof-of-value with your actual data and workloads. Typically 2 weeks, fully supported by our solutions engineering team. That lets you validate both the performance claims and the TCO model."`,
        audience === 'vp_engineering'
          ? `"We can also give your engineering team sandbox access to run their own benchmarks. We're confident in the numbers and want your team to be too."`
          : `"We'll provide a dedicated SE throughout the evaluation to handle architecture review, integration planning, and any technical deep-dives your team needs."`,
        `"At the end of the POV, we'll deliver a technical assessment report that maps directly to these TCO numbers, so there's full traceability from the analysis to the hands-on validation."`,
      ],
    },
  ];

  // ── Discovery Questions ──

  const discoveryQuestions = [
    `"Have you mapped out the full implementation timeline for ${biggestCompetitor.vendorName}? In our experience, ${bcProfile?.vendorId === 'comp-b' ? 'legacy platform migrations typically take 3 to 5x longer than initial estimates' : 'the configuration phase often extends beyond what vendors quote in the sales process'}."`,
    `"What's your current cost per hour of downtime? The reliability gap between vendors can be a six-figure difference over ${term} years that doesn't show up in pricing sheets."`,
    `"How many FTEs do you anticipate dedicating to platform administration? ${biggestCompetitor.vendorName}'s ${bcProfile?.adminFtePct || 30}% FTE requirement is an ongoing cost that compounds over the contract."`,
    `"Are you factoring in the cost of the integrations you'll need? Some vendors charge $${bcProfile?.integrationCostPerConnector.toLocaleString() || '10,000'}+ per connector, and most enterprise deployments need ${bcProfile?.avgConnectorsNeeded || 4} to ${(bcProfile?.avgConnectorsNeeded || 4) + 2}."`,
    `"Has ${biggestCompetitor.vendorName} provided a breakdown of their support tiers? ${bcProfile?.supportTier === 'premium_required' ? 'Their standard support has 48hr+ response times. Premium support is an additional cost.' : bcProfile?.supportTier === 'tiered' ? 'Their support is tiered. The level you need for enterprise SLAs is a separate line item.' : 'It\'s worth understanding exactly what\'s included versus what costs extra.'}"`,
    audience === 'c_suite' || audience === 'evaluation_committee'
      ? `"What's your threshold for acceptable vendor risk? ${bcProfile?.vendorId === 'comp-e' ? 'NeuralEdge is a Series B company with 14 months of estimated runway.' : bcProfile?.vendorId === 'comp-f' ? 'ClearView was acquired by PE in early 2026. Product investment trajectory is uncertain.' : 'Long-term vendor viability directly impacts your switching cost exposure.'}"`
      : `"What does your upgrade and patching cycle look like today? ${biggestCompetitor.vendorName}${bcProfile?.vendorId === 'comp-a' ? ' ships weekly releases, which means your admin is continuously managing updates.' : ''} That operational burden is real and ongoing."`,
  ];

  // ── Objection Handlers ──

  const objectionHandlers: { objection: string; response: string }[] = [
    {
      objection: `"${biggestCompetitor.vendorName} quoted us a lower per-seat price."`,
      response: `Acknowledge and redirect to total cost: "Per-seat pricing is one input, but it's typically only 40 to 50% of the true cost. When you add implementation (${fmtD(compYearTotals.implementation)} vs our ${fmtD(usYearTotals.implementation)}), support (${bcProfile?.supportTier === 'included' ? 'which they do include' : `which is an additional ${fmtD(bcProfile?.supportCostAnnual || 0)}/yr`}), and admin overhead (${bcProfile?.adminFtePct || 30}% FTE vs our ${usProfile.adminFtePct}%), the total picture shifts. That's exactly what this analysis captures."`,
    },
    {
      objection: `"We already have a relationship with ${biggestCompetitor.vendorName}."`,
      response: `Don't fight the relationship. Use it: "That's valuable, and we respect that. But a ${fmtD(totalSavings)} delta over ${term} years is worth a side-by-side evaluation. You can use this TCO analysis to either validate ${biggestCompetitor.vendorName}'s pricing or negotiate a better deal with them. Either way, your organization wins."`,
    },
    {
      objection: `"These hidden cost numbers seem high or speculative."`,
      response: `Offer to co-validate: "Every number in this model is editable. We built it to be transparent, not promotional. Let's pull up the assumptions and adjust them to match your experience. If your downtime cost is lower, or your admin needs are different, we'll update the model right now. The methodology is what matters."`,
    },
    {
      objection: audience === 'vp_engineering'
        ? `"Our team already knows ${biggestCompetitor.vendorName}'s tech stack."`
        : `"We don't have time for another vendor evaluation."`,
      response: audience === 'vp_engineering'
        ? `"Familiarity is real, but so is the ops tax. Your team spending ${bcProfile?.adminFtePct || 30}% of an FTE on admin is ${Math.round(((bcProfile?.adminFtePct || 30) - usProfile.adminFtePct) / usProfile.adminFtePct * 100)}% more than our platform requires. That's engineering time that could go to product work. A 2-week POV would let your team validate the migration effort is worth the long-term payoff."`
        : `"Our POV is 2 weeks, and we provide a dedicated SE. More importantly, the cost of not evaluating is ${fmtD(totalSavings)} over ${term} years. A 2-week investment to validate ${fmtD(totalSavings)} in savings is a strong ROI on your team's time."`,
    },
  ];

  // ── Competitive Landmines ──

  const competitiveLandmines = competitors.map(c => {
    const cp = costProfiles.find(p => p.vendorId === c.vendorId);
    if (!cp) return '';
    switch (cp.vendorId) {
      case 'comp-a': return `Ask about Synthetica AI's support response times on standard tier. Their published SLA is 48+ hours. Also ask whether their quote includes GPU compute costs or if that's a separate billing item.`;
      case 'comp-b': return `Ask DataVault Enterprise for a complete module list with pricing. AI/ML, governance, and each connector are separate line items. Also ask about their cloud migration timeline if they're proposing a hybrid deployment.`;
      case 'comp-c': return `Ask OpenML Studio to clarify which features require the paid enterprise tier vs. the open-source core. Also ask who provides production support if there's no premium contract. Community forums have no SLA.`;
      case 'comp-d': return `Ask Lakehouse.io for a consumption cost ceiling or cap. Their auto-scaling can spike costs 30 to 50% above estimates. Request a usage audit from an existing customer at similar scale.`;
      case 'comp-e': return `Ask NeuralEdge about their funding runway and what happens to support/product development if they need to extend their Series B. Also ask what analytics tooling you'd need alongside their NLP-only platform.`;
      case 'comp-f': return `Ask ClearView Analytics about their product roadmap since the PE acquisition, specifically what AI/ML capabilities are planned and on what timeline. Ask what additional tools you'd need for unstructured data and GenAI use cases.`;
      default: return `Request a full TCO breakdown from ${c.vendorName} using the same cost categories: implementation, support, admin FTE, integrations, and downtime. Compare their transparency to ours.`;
    }
  }).filter(Boolean);

  // ── Closing CTA ──

  const closingCta = audience === 'c_suite'
    ? `"We'd like to schedule a 2-week POV where your team validates these numbers with your own data. At the end, we'll deliver a board-ready TCO report alongside the technical assessment. Can we get that on the calendar for the next sprint cycle?"`
    : audience === 'procurement'
    ? `"We're prepared to share redlines on our standard enterprise agreement, a completed security questionnaire, and a contract-ready version of this TCO analysis. What's the best way to get this into your procurement workflow?"`
    : audience === 'vp_engineering'
    ? `"Let's set up sandbox access for your team this week. We'll pair a dedicated SE with your engineering lead for a 2-week proof-of-value using your actual data and workloads. No vendor theater, just your team running real scenarios."`
    : `"We'd suggest a 2-week proof-of-value with clear success criteria agreed upfront. Our SE team will handle setup, and we'll deliver both a technical assessment and an updated TCO model based on what we learn. Who should we coordinate with to get started?"`;

  return { executiveSummary, aeTrack, seTrack, discoveryQuestions, objectionHandlers, competitiveLandmines, closingCta };
}

// ── Talk Track Card Stepper ──────────────────────────────────────────────────

function TalkTrackCards({
  sections,
  color,
  copyToClipboard,
  copiedId,
  idPrefix,
}: {
  sections: { heading: string; points: string[] }[];
  color: string;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  idPrefix: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedSet, setCompletedSet] = useState<Set<number>>(new Set());

  const markDone = () => {
    setCompletedSet(prev => new Set(prev).add(activeIndex));
    if (activeIndex < sections.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <div className="space-y-2">
      {/* Card step indicators */}
      <div className="flex items-center gap-1">
        {sections.map((s, i) => {
          const isActive = i === activeIndex;
          const isDone = completedSet.has(i);
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`flex items-center gap-1.5 flex-1 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all ${
                isActive
                  ? `bg-[${color}]/10 border border-[${color}]/30`
                  : isDone
                  ? 'bg-green-500/8 border border-green-500/20 text-green-500'
                  : 'bg-secondary/50 border border-border text-muted-foreground'
              }`}
              style={isActive ? { backgroundColor: `${color}15`, borderColor: `${color}40`, color } : undefined}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                isDone ? 'bg-green-500 text-white' : isActive ? 'text-white' : 'bg-muted text-muted-foreground'
              }`}
                style={isActive && !isDone ? { backgroundColor: color } : undefined}
              >
                {isDone ? (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                ) : i + 1}
              </span>
              <span className="truncate hidden lg:inline">{s.heading.replace(/^(Open|Build|Close): /, '')}</span>
            </button>
          );
        })}
      </div>

      {/* Active card content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className="rounded-lg border border-border bg-secondary/20 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold">{sections[activeIndex].heading}</h4>
            <button
              onClick={() => copyToClipboard(sections[activeIndex].points.join('\n\n'), `${idPrefix}-${activeIndex}`)}
              className="shrink-0 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              title="Copy"
            >
              {copiedId === `${idPrefix}-${activeIndex}` ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2ca66c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
              )}
            </button>
          </div>

          <ul className="space-y-2.5 mb-4">
            {sections[activeIndex].points.map((point, pi) => (
              <li key={pi} className="text-[13px] text-muted-foreground leading-relaxed flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Got it / navigation */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="text-[10px] text-muted-foreground">
              {activeIndex + 1} of {sections.length}
            </span>
            {!completedSet.has(activeIndex) ? (
              <button
                onClick={markDone}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors text-white hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Got it
              </button>
            ) : activeIndex < sections.length - 1 ? (
              <button
                onClick={() => setActiveIndex(activeIndex + 1)}
                className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md bg-secondary text-foreground hover:bg-accent transition-colors"
              >
                Next
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            ) : (
              <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                All done
              </span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

interface TcoNarrativeProps {
  results: VendorTcoResult[];
  deal: { contractTermYears: number; seats: number; annualGrowthPct: number };
  selectedAccount?: Account;
  costProfiles: TcoCostProfile[];
}

export function TcoNarrative({ results, deal, selectedAccount, costProfiles }: TcoNarrativeProps) {
  const [audience, setAudience] = useState<Audience>('evaluation_committee');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const narrative = useMemo(
    () => generateNarrative(audience, results, deal, costProfiles, selectedAccount),
    [audience, results, deal, costProfiles, selectedAccount]
  );

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const CopyBtn = ({ text, id }: { text: string; id: string }) => (
    <button
      onClick={() => copyToClipboard(text, id)}
      className="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      title="Copy to clipboard"
    >
      {copiedId === id ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2ca66c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
      )}
    </button>
  );

  return (
    <div className="space-y-5">
      {/* Audience Selector */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-base">Who are you presenting to?</h3>
          <p className="text-xs text-muted-foreground mt-0.5">The narrative adapts tone, framing, and talk tracks based on your audience.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {AUDIENCES.map(a => (
            <button
              key={a.value}
              onClick={() => setAudience(a.value)}
              className={`text-left px-3 py-2.5 rounded-lg border transition-all ${
                audience === a.value
                  ? 'border-primary bg-primary/10 ring-1 ring-primary/30'
                  : 'border-border bg-secondary/50 hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-sm">{a.icon}</span>
                <span className="text-xs font-semibold">{a.label}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-snug">{a.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Executive Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border-2 border-primary/20 bg-primary/5 px-5 py-4">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">Executive Summary</h3>
          <CopyBtn text={narrative.executiveSummary} id="exec-summary" />
        </div>
        <p className="text-sm leading-relaxed text-foreground">{narrative.executiveSummary}</p>
      </motion.div>

      {/* AE + SE Talk Tracks: Side-by-Side */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="flex items-center gap-4 mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1a8dff]" />
            <span className="text-[11px] font-medium text-muted-foreground">AE: Business Narrative</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
            <span className="text-[11px] font-medium text-muted-foreground">SE: Technical Credibility</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* AE Column */}
          <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ borderTop: '3px solid #1a8dff' }}>
            <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1a8dff]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">AE Talk Track</h3>
            </div>
            <div className="p-4">
              <TalkTrackCards
                sections={narrative.aeTrack}
                color="#1a8dff"
                copyToClipboard={copyToClipboard}
                copiedId={copiedId}
                idPrefix="ae"
              />
            </div>
          </div>

          {/* SE Column */}
          <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ borderTop: '3px solid #8b5cf6' }}>
            <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">SE Talk Track</h3>
            </div>
            <div className="p-4">
              <TalkTrackCards
                sections={narrative.seTrack}
                color="#8b5cf6"
                copyToClipboard={copyToClipboard}
                copiedId={copiedId}
                idPrefix="se"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Discovery Questions + Competitive Landmines: Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card overflow-hidden" style={{ borderTop: '3px solid #2ca66c' }}>
          <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Discovery Questions</h3>
            <CopyBtn text={narrative.discoveryQuestions.join('\n\n')} id="discovery" />
          </div>
          <div className="p-4">
            <p className="text-[10px] text-muted-foreground mb-2.5">Questions to surface hidden costs and expose competitor weaknesses.</p>
            <ol className="space-y-2.5">
              {narrative.discoveryQuestions.map((q, i) => (
                <li key={i} className="text-[13px] text-muted-foreground leading-relaxed flex items-start gap-2">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-green-500/15 text-green-500 flex items-center justify-center text-[9px] font-bold shrink-0">{i + 1}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-xl border border-border bg-card overflow-hidden" style={{ borderTop: '3px solid #e5a00d' }}>
          <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Competitive Landmines</h3>
            <CopyBtn text={narrative.competitiveLandmines.join('\n\n')} id="landmines" />
          </div>
          <div className="p-4">
            <p className="text-[10px] text-muted-foreground mb-2.5">Questions to plant that will surface competitor weaknesses during their evaluation.</p>
            <ul className="space-y-2.5">
              {narrative.competitiveLandmines.map((lm, i) => (
                <li key={i} className="text-[13px] text-muted-foreground leading-relaxed flex items-start gap-2">
                  <span className="mt-0.5 shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e5a00d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                  </span>
                  <span>{lm}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Objection Handlers */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-card overflow-hidden" style={{ borderTop: '3px solid #da545b' }}>
        <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Objection Handlers</h3>
          <CopyBtn text={narrative.objectionHandlers.map(o => `OBJECTION: ${o.objection}\nRESPONSE: ${o.response}`).join('\n\n')} id="objections" />
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {narrative.objectionHandlers.map((oh, i) => (
            <div key={i} className="rounded-lg border border-border overflow-hidden">
              <div className="px-3 py-2 bg-red-500/5 border-b border-border">
                <span className="text-[10px] font-bold text-red-500">OBJECTION</span>
                <p className="text-[13px] text-foreground font-medium mt-0.5">{oh.objection}</p>
              </div>
              <div className="px-3 py-2.5">
                <span className="text-[10px] font-bold text-green-500">RESPONSE</span>
                <p className="text-[13px] text-muted-foreground leading-relaxed mt-0.5">{oh.response}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Closing CTA */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-xl border-2 border-green-500/20 bg-green-500/5 px-5 py-4">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-green-500">Recommended Close</h3>
          <CopyBtn text={narrative.closingCta} id="closing" />
        </div>
        <p className="text-sm leading-relaxed text-foreground">{narrative.closingCta}</p>
      </motion.div>

      {/* Export CTAs */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => {
              const full = [
                '# TCO Narrative: ' + (selectedAccount?.name || 'Deal Analysis'),
                '', '## Executive Summary', narrative.executiveSummary,
                '', '## AE Talk Track', ...narrative.aeTrack.flatMap(s => [`### ${s.heading}`, ...s.points.map(p => `- ${p}`), '']),
                '## SE Talk Track', ...narrative.seTrack.flatMap(s => [`### ${s.heading}`, ...s.points.map(p => `- ${p}`), '']),
                '## Discovery Questions', ...narrative.discoveryQuestions.map((q, i) => `${i + 1}. ${q}`),
                '', '## Competitive Landmines', ...narrative.competitiveLandmines.map(l => `- ${l}`),
                '', '## Objection Handlers', ...narrative.objectionHandlers.map(o => `**${o.objection}**\n${o.response}`),
                '', '## Recommended Close', narrative.closingCta,
              ].join('\n');
              navigator.clipboard.writeText(full);
              setCopiedId('full-export');
              setTimeout(() => setCopiedId(null), 3000);
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/15 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              {copiedId === 'full-export' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2ca66c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
              )}
            </div>
            <div>
              <div className="text-sm font-semibold text-primary">{copiedId === 'full-export' ? 'Copied!' : 'Copy Full Narrative'}</div>
              <div className="text-[11px] text-muted-foreground">All sections as formatted markdown</div>
            </div>
          </button>

          <Link
            href={selectedAccount ? `/account/${selectedAccount.slug}/battlecard` : '/battlecards'}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-foreground transition-colors"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            </div>
            <div>
              <div className="text-sm font-semibold">Generate Battlecard</div>
              <div className="text-[11px] text-muted-foreground">{selectedAccount ? `Pair with a battlecard for ${selectedAccount.name}` : 'Select an account and pair with a battlecard'}</div>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
