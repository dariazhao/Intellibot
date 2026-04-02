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

function S({ children, d = 0 }: { children: React.ReactNode; d?: number }) {
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.35, delay: d }}>
      {children}
    </motion.section>
  );
}

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return <span className="inline-block text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-3" style={{ backgroundColor: `${color}15`, color }}>{children}</span>;
}

export function PhilosophyContent() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (t: string, id: string) => { navigator.clipboard.writeText(t); setCopied(id); setTimeout(() => setCopied(null), 2000); };

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-12 pb-20">
      {/* Hero */}
      <S>
        <div className="text-center space-y-3 pt-6">
          <Tag color="#632CA6">Behind the Tool</Tag>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">TCO Analysis Philosophy</h1>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            The methodology, assumptions, and design decisions behind the Intellibot TCO tool.
          </p>
        </div>
      </S>

      {/* My Take */}
      <S>
        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 px-6 py-5">
          <div className="text-xs font-bold uppercase tracking-wider text-primary mb-3">My take</div>
          <p className="text-[15px] leading-relaxed mb-4">
            TCO analysis shifts competitive deals from "who has the lowest sticker price" to "who costs less to actually own." Our model uses bottom-up cost modeling across 11 categories and 4 lifecycle phases. Every number is editable, every assumption is named, and the methodology creates the advantage, not cherry-picked inputs.
          </p>
          <div className="flex items-center justify-end gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-primary/30 shrink-0">
              <img src="/daria-headshot.jpg" alt="Daria" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm text-muted-foreground italic">- Daria</span>
          </div>
        </div>
      </S>

      {/* Why TCO */}
      <S>
        <Tag color="#1a8dff">Framework</Tag>
        <h2 className="text-lg font-bold mb-4">Why TCO, not ROI or price comparison?</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { t: 'ROI Calculator', q: '"Is this worth buying?"', when: 'Building internal business case', fit: false },
            { t: 'Price Comparison', q: '"Who\'s cheapest on paper?"', when: 'Procurement checkbox', fit: false },
            { t: 'TCO Analysis', q: '"Who costs less to own?"', when: 'Competitive vendor selection', fit: true },
          ].map((f) => (
            <div key={f.t} className={`rounded-lg border p-3 ${f.fit ? 'border-green-500/30 bg-green-500/5 ring-1 ring-green-500/20' : 'border-border bg-card'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold">{f.t}</span>
                {f.fit && <span className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-500">Ours</span>}
              </div>
              <p className="text-[10px] text-muted-foreground italic mb-1">{f.q}</p>
              <p className="text-[10px] text-muted-foreground">{f.when}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 bg-secondary/50 border border-border rounded-lg px-3.5 py-2.5">
          <span className="font-medium text-foreground">Key insight:</span> In a competitive eval, the prospect has already decided to buy. The question is <em>from whom</em>.
          TCO reframes the decision around total ownership cost, which favors the better-architected product.
        </p>
      </S>

      {/* Methodology */}
      <S>
        <Tag color="#632CA6">Methodology</Tag>
        <h2 className="text-lg font-bold mb-1">Bottom-up cost modeling</h2>
        <p className="text-xs text-muted-foreground mb-4">Every dollar traces to a named cost component the prospect can validate. We rejected two alternatives:</p>
        <div className="space-y-1.5 text-xs">
          {[
            { label: 'Top-down benchmarking', desc: 'Too generic. Prospects dismiss analyst averages as not specific to their situation.', v: 'Rejected', vc: '#da545b' },
            { label: 'Vendor-provided TCO sheets', desc: 'Zero credibility. Everyone knows vendor TCO tools are marketing assets.', v: 'Rejected', vc: '#da545b' },
            { label: 'Bottom-up component modeling', desc: 'Every field is editable. The prospect challenges any number in real time. Methodology wins, not inputs.', v: 'Our approach', vc: '#2ca66c' },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
              <div className="flex-1">
                <span className="font-medium text-foreground">{r.label}</span>
                <span className="text-muted-foreground ml-1.5">{r.desc}</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: `${r.vc}15`, color: r.vc }}>{r.v}</span>
            </div>
          ))}
        </div>
      </S>

      {/* 4 Phases */}
      <S>
        <Tag color="#17b8be">Cost Structure</Tag>
        <h2 className="text-lg font-bold mb-1">11 categories across 4 lifecycle phases</h2>
        <p className="text-xs text-muted-foreground mb-4">Organized by when costs hit your budget, not by vendor line item.</p>

        <div className="grid grid-cols-2 gap-2.5">
          {[
            { phase: 'The Quote', color: '#1a8dff', items: ['Licensing (40-50% of true cost)', 'Platform Fee (hidden on top of per-seat)'] },
            { phase: 'The Ramp', color: '#e5a00d', items: ['Implementation (biggest cost variance)', 'Data Migration', 'Training'] },
            { phase: 'The Run', color: '#632CA6', items: ['Support (hidden upsell)', 'Admin FTE % (biggest hidden cost)', 'Integrations', 'Customization'] },
            { phase: 'The Iceberg', color: '#da545b', items: ['Downtime Impact (your cost/hr)', 'Supplemental Tooling'] },
          ].map((p) => (
            <div key={p.phase} className="rounded-lg border border-border bg-card overflow-hidden" style={{ borderTop: `3px solid ${p.color}` }}>
              <div className="px-3.5 py-2.5">
                <div className="text-xs font-semibold mb-1.5">{p.phase}</div>
                <ul className="space-y-1">
                  {p.items.map((item) => (
                    <li key={item} className="text-[10px] text-muted-foreground flex items-start gap-1.5">
                      <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: p.color }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-lg border border-dashed border-red-500/20 bg-red-500/5 px-4 py-2.5 flex items-start gap-2.5">
          <span className="text-red-500 mt-0.5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg></span>
          <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Phase 4 is the strategic weapon.</span> These costs never appear in a competitor's proposal. Surfacing them is what makes TCO a competitive play, not just a budgeting exercise.</p>
        </div>
      </S>

      {/* Assumptions */}
      <S>
        <Tag color="#e5a00d">Assumptions</Tag>
        <h2 className="text-lg font-bold mb-4">Named and defensible</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { t: 'Implementation ~ architecture complexity', b: 'Legacy/monolithic platforms cost more to deploy. Well-supported by industry data.' },
            { t: 'Admin overhead ~ platform maturity', b: 'Self-service SaaS: ~15% FTE. Legacy with DBA: ~40%. Biggest savings driver.' },
            { t: 'Usage pricing has cost unpredictability', b: 'Consumption models exceed estimates by 30-50% at scale.' },
            { t: 'Support tiers are not equal', b: '"Included" support varies wildly. We separate it as a visible line item.' },
            { t: 'Downtime has measurable cost', b: '$10K-$50K/hr typical. Prospect sets their own number.' },
            { t: 'Growth compounds', b: '10% annual growth: 100 seats in Y1 = 121 in Y3. Small price gaps become large.' },
          ].map((a, i) => (
            <div key={i} className="rounded-lg border border-border bg-card px-3 py-2.5">
              <div className="text-[11px] font-medium mb-0.5">{a.t}</div>
              <p className="text-[10px] text-muted-foreground">{a.b}</p>
            </div>
          ))}
        </div>
      </S>

      {/* UX Decisions (accordion) */}
      <S>
        <Tag color="#2ca66c">UX Design</Tag>
        <h2 className="text-lg font-bold mb-4">Design decisions</h2>
        <Accordion>
          {[
            { q: '5-step wizard, not a spreadsheet', a: 'Guided flow prevents cognitive overload. Each step has a clear purpose. Natural narrative: setup, costs, hidden costs, results, talk track.' },
            { q: 'Pre-populated with full editability', a: 'Removes blank-page problem. Reps don\'t research competitor pricing. Every field is editable for credibility in live conversations.' },
            { q: '4 pricing models', a: 'AI/infra market uses seat, consumption, hybrid, and flat-rate. Different competitors price differently. The tool normalizes for comparison.' },
            { q: 'AE + SE narrative with audience selector', a: 'Enterprise deals are presented as a duo. C-suite, VP Eng, and Procurement need different framing of the same data.' },
            { q: '"Got it" card progression', a: 'Talk tracks are long. Card UI makes each section digestible while showing the full scope. Creates a sense of preparation.' },
          ].map((item, i) => (
            <AccordionItem key={i} value={String(i)}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent><p className="text-muted-foreground">{item.a}</p></AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </S>

      {/* Defending */}
      <S>
        <Tag color="#da545b">In the Field</Tag>
        <h2 className="text-lg font-bold mb-4">Handling pushback</h2>
        <div className="space-y-2.5">
          {[
            { id: 'biased', obj: '"Your numbers are biased."', resp: '"Every number is editable. Let\'s adjust any input you disagree with right now. The methodology is what matters, not our defaults."' },
            { id: 'price', obj: '"We just want to compare prices."', resp: '"Licensing is 40-50% of actual spend. The other half is implementation, support, admin, and ops costs that don\'t appear in a quote."' },
            { id: 'already', obj: '"We already did a TCO with them."', resp: '"Does theirs include admin FTE, downtime impact, integration maintenance, and supplemental tooling? If not, the comparison is incomplete."' },
            { id: 'roi', obj: '"Why not an ROI calculator?"', resp: '"ROI answers \'should we buy?\' TCO answers \'who should we buy from?\' In a competitive eval, TCO is the framework that wins the deal."' },
          ].map((d) => (
            <div key={d.id} className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="px-4 py-2.5 bg-red-500/5 border-b border-border">
                <span className="text-[9px] font-bold text-red-500 mr-2">THEY SAY</span>
                <span className="text-[13px] font-medium">{d.obj}</span>
              </div>
              <div className="px-4 py-2.5 flex items-start justify-between gap-2">
                <div>
                  <span className="text-[9px] font-bold text-green-500 mr-2">YOU SAY</span>
                  <span className="text-[12px] text-muted-foreground">{d.resp}</span>
                </div>
                <button onClick={() => copy(d.resp, d.id)} className="shrink-0 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors" title="Copy">
                  {copied === d.id ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2ca66c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </S>

      {/* CTA */}
      <S>
        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5 text-center space-y-3">
          <h2 className="text-base font-bold">See it in action</h2>
          <p className="text-sm text-muted-foreground">Pick a pricing model and build a TCO comparison in under 5 minutes.</p>
          <Link href="/tco" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="12" y2="10" /><line x1="8" y1="14" x2="16" y2="14" /></svg>
            Launch TCO Analysis
          </Link>
        </div>
      </S>

    </div>
  );
}
