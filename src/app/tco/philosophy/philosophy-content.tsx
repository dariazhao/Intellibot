'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

// ── Helpers ──────────────────────────────────────────────────────────────────

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4"
      style={{ backgroundColor: `${color}15`, color }}
    >
      {children}
    </span>
  );
}

function CostPhaseCard({
  phase,
  title,
  subtitle,
  color,
  items,
}: {
  phase: string;
  title: string;
  subtitle: string;
  color: string;
  items: { name: string; why: string }[];
}) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ borderTop: `3px solid ${color}` }}>
      <div className="px-5 py-4">
        <div className="flex items-center gap-2.5 mb-1">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {phase}
          </span>
          <span className="text-sm font-semibold">{title}</span>
        </div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <div className="border-t border-border divide-y divide-border">
        {items.map((item) => (
          <div key={item.name} className="px-5 py-3">
            <div className="text-[13px] font-medium mb-0.5">{item.name}</div>
            <div className="text-xs text-muted-foreground leading-relaxed">{item.why}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonRow({
  label,
  description,
  verdict,
  verdictColor,
}: {
  label: string;
  description: string;
  verdict: string;
  verdictColor: string;
}) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-border last:border-0">
      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
      </div>
      <span
        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 mt-0.5"
        style={{ backgroundColor: `${verdictColor}15`, color: verdictColor }}
      >
        {verdict}
      </span>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function PhilosophyContent() {
  const [copiedDefense, setCopiedDefense] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDefense(id);
    setTimeout(() => setCopiedDefense(null), 2000);
  };

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-16 pb-24">
      {/* ── Hero ── */}
      <Section>
        <div className="text-center space-y-4 pt-8">
          <SectionLabel color="#632CA6">Behind the Tool</SectionLabel>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
            TCO Analysis Philosophy
          </h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            The methodology, assumptions, and design decisions behind the Intellibot TCO tool.
            Built for reps who need to quantify competitive advantage and close enterprise deals.
          </p>
        </div>
      </Section>

      {/* ── Why TCO ── */}
      <Section delay={0.05}>
        <SectionLabel color="#1a8dff">Starting Point</SectionLabel>
        <h2 className="text-xl font-bold mb-3">Why TCO, not ROI or a price comparison?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          There are three common frameworks for justifying a purchase decision in enterprise software.
          Each answers a different question. Choosing the wrong one weakens your deal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              title: 'ROI Calculator',
              question: '"Is this worth buying at all?"',
              when: 'Early-stage, building internal business case',
              fit: false,
              color: '#e5a00d',
            },
            {
              title: 'Price Comparison',
              question: '"Who\'s cheapest on paper?"',
              when: 'Procurement checkbox, not strategic',
              fit: false,
              color: '#da545b',
            },
            {
              title: 'TCO Analysis',
              question: '"Which option costs less to own?"',
              when: 'Competitive evaluation, final vendor selection',
              fit: true,
              color: '#2ca66c',
            },
          ].map((f) => (
            <div
              key={f.title}
              className={`rounded-xl border p-4 space-y-2 ${
                f.fit
                  ? 'border-green-500/30 bg-green-500/5 ring-1 ring-green-500/20'
                  : 'border-border bg-card'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{f.title}</span>
                {f.fit && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-500/15 text-green-500">
                    Our choice
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground italic">{f.question}</p>
              <p className="text-xs text-muted-foreground">{f.when}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg bg-secondary/50 border border-border px-4 py-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">The key insight:</span> In a competitive evaluation,
            the prospect has already decided to buy. The question is <em>from whom</em>. TCO shifts the
            conversation from "who has the lowest sticker price" to "who costs less to actually run."
            That reframe almost always favors the better-architected product.
          </p>
        </div>
      </Section>

      {/* ── Methodology ── */}
      <Section delay={0.05}>
        <SectionLabel color="#632CA6">Methodology</SectionLabel>
        <h2 className="text-xl font-bold mb-3">Bottom-up cost modeling</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Every dollar in the final number traces back to a specific, named cost component that the rep
          and prospect can validate independently. We chose this over two common alternatives:
        </p>

        <div className="space-y-3 mb-6">
          <ComparisonRow
            label="Top-down benchmarking"
            description={'"Gartner says the average TCO for an AI platform is $X/user/year." Too generic. Prospects dismiss it because it\'s not specific to their situation.'}
            verdict="Rejected"
            verdictColor="#da545b"
          />
          <ComparisonRow
            label="Vendor-provided TCO sheets"
            description="Pre-baked PDFs designed to make the vendor look good. Everyone knows they're marketing assets. Zero credibility in a competitive eval."
            verdict="Rejected"
            verdictColor="#da545b"
          />
          <ComparisonRow
            label="Bottom-up component modeling"
            description="Build TCO from individual cost components. Every field is editable. The prospect can challenge any number in real time. The methodology creates the advantage, not cherry-picked inputs."
            verdict="Our approach"
            verdictColor="#2ca66c"
          />
        </div>
      </Section>

      {/* ── The 11 Cost Categories ── */}
      <Section delay={0.05}>
        <SectionLabel color="#17b8be">Cost Structure</SectionLabel>
        <h2 className="text-xl font-bold mb-3">11 cost categories across 4 lifecycle phases</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Costs are organized by <em>when they hit your budget</em>, not by vendor line item.
          This structure maps to how enterprises actually plan spend: one-time vs. recurring, visible vs. hidden.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CostPhaseCard
            phase="Phase 1"
            title="The Quote"
            subtitle="What the vendor tells you"
            color="#1a8dff"
            items={[
              { name: 'Licensing', why: 'The headline number on the proposal. Typically only 40-50% of true cost.' },
              { name: 'Platform Fee', why: 'Some vendors charge a fixed annual fee on top of per-seat pricing. Easy to miss in a proposal.' },
            ]}
          />
          <CostPhaseCard
            phase="Phase 2"
            title="The Ramp"
            subtitle="One-time costs to get live"
            color="#e5a00d"
            items={[
              { name: 'Implementation', why: 'The single biggest cost variance between vendors. Legacy platforms can cost 4-5x more.' },
              { name: 'Data Migration', why: 'Schema mapping, validation, and reconciliation from legacy systems. Often underestimated.' },
              { name: 'Training', why: 'Change management cost. More complex platforms need more enablement.' },
            ]}
          />
          <CostPhaseCard
            phase="Phase 3"
            title="The Run"
            subtitle="Annual costs to operate"
            color="#632CA6"
            items={[
              { name: 'Support', why: 'The hidden upsell. "Included" support often means 48hr+ response times. Enterprise SLAs cost extra.' },
              { name: 'Admin FTE %', why: 'Often the biggest hidden cost. Expressed as % of a person\'s time for intuitive comparison.' },
              { name: 'Integrations', why: 'Year 1 is build cost; subsequent years are 15% annual maintenance.' },
              { name: 'Customization', why: 'Annual spend tailoring the platform to your workflows.' },
            ]}
          />
          <CostPhaseCard
            phase="Phase 4"
            title="The Iceberg"
            subtitle="Costs that never appear in vendor quotes"
            color="#da545b"
            items={[
              { name: 'Downtime Impact', why: 'Hours of downtime x your cost-per-hour. Your number, not ours. Often a six-figure annual delta.' },
              { name: 'Supplemental Tooling', why: 'When a vendor lacks capabilities you need, you buy additional software. A real cost that belongs in the comparison.' },
            ]}
          />
        </div>

        <div className="mt-5 rounded-lg border-2 border-dashed border-red-500/20 bg-red-500/5 px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-red-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            </span>
            <div>
              <div className="text-sm font-semibold text-foreground mb-1">Phase 4 is the strategic weapon</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                These costs are real, quantifiable, and never appear in a competitor's proposal.
                Surfacing them is what makes TCO analysis a competitive play, not just a budgeting exercise.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Key Assumptions ── */}
      <Section delay={0.05}>
        <SectionLabel color="#e5a00d">Assumptions</SectionLabel>
        <h2 className="text-xl font-bold mb-3">Named assumptions</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Every model has assumptions. We name ours explicitly so reps can defend them
          and prospects can challenge them. Transparency is the point.
        </p>

        <div className="space-y-2.5">
          {[
            {
              title: 'Implementation cost correlates with architecture complexity',
              body: 'Monolithic/legacy platforms cost more because they require more configuration, SI partners, and custom development. This is well-supported by industry data across hundreds of enterprise deployments.',
            },
            {
              title: 'Admin overhead correlates with platform design maturity',
              body: 'A well-designed SaaS platform built for self-service needs ~15% of an FTE. A legacy platform requiring a dedicated DBA needs ~40%. This single assumption drives the most savings in the model.',
            },
            {
              title: 'Usage-based pricing has inherent cost unpredictability',
              body: 'Consumption models often exceed initial estimates by 30-50% at scale. Auto-scaling, burst workloads, and data growth all contribute. The model captures this through volume inputs, and the assumptions text flags it explicitly.',
            },
            {
              title: 'Support tiers are not equal',
              body: '"Included support" at one vendor is not the same as "included support" at another. The model separates support into a visible line item so the prospect can compare what they\'re actually getting.',
            },
            {
              title: 'Downtime has a measurable business cost',
              body: 'Varies by industry ($10K-$50K/hr is typical for mid-market enterprise). The model lets the prospect set their own number, making the calculation defensible because it uses their data.',
            },
            {
              title: 'Growth compounds over the contract term',
              body: 'A 10% annual seat growth rate means 100 seats in Year 1 becomes 121 in Year 3. Small per-seat price differences become large at scale. This is math, not an assumption.',
            },
          ].map((a, i) => (
            <div key={i} className="rounded-lg border border-border bg-card px-4 py-3">
              <div className="flex items-start gap-2.5">
                <span className="mt-1 w-5 h-5 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-medium mb-0.5">{a.title}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Design Decisions ── */}
      <Section delay={0.05}>
        <SectionLabel color="#2ca66c">UX Design</SectionLabel>
        <h2 className="text-xl font-bold mb-3">Design decisions for self-service</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          A TCO tool is only useful if reps actually use it. Every UX decision is optimized for
          speed-to-value and credibility in live prospect conversations.
        </p>

        <Accordion>
          {[
            {
              q: '5-step wizard, not a spreadsheet',
              a: '50+ input fields on one screen is overwhelming. A guided flow gives each step a clear purpose and prevents cognitive overload. The wizard also creates a natural narrative: setup, costs, hidden costs, results, talk track.',
            },
            {
              q: 'Pre-populated benchmarks with full editability',
              a: 'Removes the blank-page problem. Reps don\'t need to research competitor pricing. But every field is editable, which preserves credibility. If a prospect says "that\'s not what they quoted us," the rep adjusts in real time.',
            },
            {
              q: '4 pricing models (seat, consumption, hybrid, flat-rate)',
              a: 'The AI/infrastructure market in 2026 uses all four. Different competitors price differently (Lakehouse.io is consumption-based, DataVault is seat-based). The tool normalizes them for apples-to-apples comparison.',
            },
            {
              q: 'Tooltips on every technical term',
              a: 'Not every rep knows what "admin FTE %" or "vendor lock-in cost" means. 17 pre-written tooltips make the tool self-serve without dumbing down the methodology.',
            },
            {
              q: 'Results before narrative (progressive disclosure)',
              a: 'Charts and tables give the "so what" (you save $X). The narrative gives the "now what" (here\'s how to present it). Results first, because reps need to see the headline number before committing to the talk track.',
            },
            {
              q: 'AE + SE narrative split with audience selector',
              a: 'Reflects how enterprise deals are actually presented. The AE owns the business case; the SE provides technical credibility. The audience selector (C-suite, VP Eng, Procurement, Eval Committee) acknowledges that same data needs different framing.',
            },
            {
              q: '"Got it" card progression on talk tracks',
              a: 'Talk tracks are long. Showing all 3 sections at once makes them feel overwhelming. The card UI makes each section digestible while still showing there are 3 total. The "Got it" mechanic creates a sense of preparation.',
            },
            {
              q: 'High-threat competitors pre-selected',
              a: 'Reduces clicks and ensures reps compare against the most relevant rivals by default. Low-threat competitors are available but not pre-checked.',
            },
          ].map((item, i) => (
            <AccordionItem key={i} value={String(i)}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* ── Defending the Methodology ── */}
      <Section delay={0.05}>
        <SectionLabel color="#da545b">In the Field</SectionLabel>
        <h2 className="text-xl font-bold mb-3">Defending this methodology</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Real objections you'll hear and how to respond. Each response is designed
          to be used verbatim in a live conversation.
        </p>

        <div className="space-y-3">
          {[
            {
              id: 'biased',
              objection: '"Your numbers are biased."',
              response: '"Every number in this model is editable. Let\'s pull it up right now and adjust any input you disagree with. If your downtime cost is lower, or your admin needs are different, we\'ll update it on the spot. The methodology is what matters, not our defaults."',
            },
            {
              id: 'price',
              objection: '"We just want to compare prices."',
              response: '"Licensing is typically 40-50% of what you\'ll actually spend. The other half is implementation, support, admin time, and operational costs that don\'t appear in a quote. Comparing prices without those is like comparing car prices without insurance, maintenance, and fuel."',
            },
            {
              id: 'already',
              objection: '"We already did a TCO with [competitor]."',
              response: '"Great. Let\'s compare methodologies. Does theirs include admin FTE overhead? Downtime impact? Integration maintenance? Supplemental tooling for capabilities they don\'t have? If they left those out, the comparison is incomplete."',
            },
            {
              id: 'roi',
              objection: '"Why not just use an ROI calculator?"',
              response: '"ROI answers \'should we buy this?\' TCO answers \'who should we buy from?\' In a competitive evaluation, the prospect has already decided to buy. TCO is the framework that wins the deal, not just justifies the budget."',
            },
          ].map((d) => (
            <div key={d.id} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-5 py-3 bg-red-500/5 border-b border-border flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">They say</span>
                  <p className="text-sm font-medium text-foreground mt-0.5">{d.objection}</p>
                </div>
              </div>
              <div className="px-5 py-3 flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">You say</span>
                  <p className="text-[13px] text-muted-foreground leading-relaxed mt-0.5">{d.response}</p>
                </div>
                <button
                  onClick={() => copyText(d.response, d.id)}
                  className="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors mt-1"
                  title="Copy response"
                >
                  {copiedDefense === d.id ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2ca66c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA: Try it ── */}
      <Section delay={0.05}>
        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center space-y-4">
          <h2 className="text-lg font-bold">See it in action</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            The best way to understand the methodology is to run an analysis yourself.
            Pick a pricing model and build a TCO comparison in under 5 minutes.
          </p>
          <Link
            href="/tco"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6" />
              <line x1="8" y1="10" x2="12" y2="10" />
              <line x1="8" y1="14" x2="16" y2="14" />
            </svg>
            Launch TCO Analysis
          </Link>
        </div>
      </Section>

      {/* ── Author Signoff ── */}
      <Section delay={0.05}>
        <div className="border-t border-border pt-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 shadow-md shrink-0">
              <img
                src="/daria-headshot.jpg"
                alt="Daria"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-base font-semibold">Daria</div>
              <p className="text-sm text-muted-foreground mt-1 max-w-md leading-relaxed">
                Built Intellibot to give enterprise reps self-serve competitive intelligence.
                This TCO methodology is based on real-world deal patterns from sales-led AI and software companies.
              </p>
              <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
                <a
                  href="https://www.linkedin.com/in/dariazhao/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 border border-[#0A66C2]/20 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Get in touch
                </a>
                <a
                  href="https://luma.com/calendar/cal-y7Q8MCsPwKeiJ8r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/15 border border-primary/20 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Sign up for future events
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
