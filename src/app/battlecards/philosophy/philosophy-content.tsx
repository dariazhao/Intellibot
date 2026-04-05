'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

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

export function BattlecardPhilosophyContent() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (t: string, id: string) => { navigator.clipboard.writeText(t); setCopied(id); setTimeout(() => setCopied(null), 2000); };

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-12 pb-20">
      {/* Hero */}
      <S>
        <div className="text-center space-y-3 pt-6">
          <Tag color="#632CA6">Behind the Tool</Tag>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Battlecard Philosophy</h1>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Why static battlecards fail in fast-moving AI markets, and how instant generation solves it.
          </p>
        </div>
      </S>

      {/* My Take */}
      <S>
        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 px-6 py-5">
          <div className="text-xs font-bold uppercase tracking-wider text-primary mb-3">My take</div>
          <p className="text-[15px] leading-relaxed mb-1">
            In AI-native GTM, we ship daily, competitors move at the same pace, the market evolves rapidly, and customers demand the best. A battlecard made on Monday is outdated by Friday. Instant battlecards generate fresh, deal-specific competitive intel from live data sources on demand. This eliminates the maintenance burden, scales the PMM function, and ensures every rep gets the same quality of competitive support regardless of deal size.
          </p>
          <p className="text-sm text-muted-foreground italic text-right">— Daria Zhao, Director of AI PMM at Yext</p>
        </div>
      </S>

      {/* The Problem (compact) */}
      <S>
        <Tag color="#da545b">The Problem</Tag>
        <h2 className="text-lg font-bold mb-4">Four structural failures of traditional battlecards</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { title: 'Stale by Friday', body: 'Manual updates can\'t keep pace with weekly competitor launches, funding rounds, and pricing changes.', stat: '3-6 week avg staleness' },
            { title: 'One-size-fits-none', body: 'A deal in healthcare vs. financial services needs different objection handling. Static cards can\'t adapt.', stat: '70% of reps modify or ignore' },
            { title: 'PMM bottleneck', body: '1 PMM supporting 50+ reps can\'t do 1:1 deal assist. Top deals get help; the rest get a stale PDF.', stat: '15+ hrs/week on reactive support' },
            { title: 'Low adoption', body: 'Reps can\'t find them, don\'t trust they\'re current, or find them too generic. The intel never reaches the call.', stat: '<30% adoption rate' },
          ].map((p) => (
            <div key={p.title} className="rounded-lg border border-border bg-card p-3.5">
              <div className="text-[13px] font-semibold mb-1">{p.title}</div>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">{p.body}</p>
              <span className="text-[9px] font-medium text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">{p.stat}</span>
            </div>
          ))}
        </div>
      </S>

      {/* Traditional vs Instant (compact table) */}
      <S>
        <Tag color="#632CA6">The Shift</Tag>
        <h2 className="text-lg font-bold mb-4">Generate, don't maintain</h2>
        <div className="overflow-hidden rounded-xl border border-border text-xs">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-3.5 py-2.5 font-semibold uppercase tracking-wider text-muted-foreground text-[10px]">Dimension</th>
                <th className="text-left px-3.5 py-2.5 font-semibold uppercase tracking-wider text-red-500 text-[10px]">Traditional</th>
                <th className="text-left px-3.5 py-2.5 font-semibold uppercase tracking-wider text-green-500 text-[10px]">Instant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Freshness', 'Updated monthly by PMM', 'Generated from live data at time of use'],
                ['Customization', 'One card per competitor', 'Unique per account, industry, deal stage'],
                ['Audience', 'Single tone', 'Executive, technical, or procurement'],
                ['Coverage', 'Top 3-5 competitors', 'Every tracked competitor, on demand'],
                ['Time to access', 'Search Drive, hope it exists', '< 60 seconds from account page'],
                ['Maintenance', '20-40% of PMM bandwidth', 'Zero manual maintenance'],
              ].map(([dim, trad, inst]) => (
                <tr key={dim}>
                  <td className="px-3.5 py-2 font-medium">{dim}</td>
                  <td className="px-3.5 py-2 text-muted-foreground">{trad}</td>
                  <td className="px-3.5 py-2">{inst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </S>

      {/* Data Sources (compact) */}
      <S>
        <Tag color="#1a8dff">Intelligence Layer</Tag>
        <h2 className="text-lg font-bold mb-1">Multi-source, not single-author</h2>
        <p className="text-xs text-muted-foreground mb-4">Each source contributes a different dimension. The synthesis is the value.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            { src: 'Gong', what: 'What reps hear on calls', color: '#632CA6' },
            { src: 'Salesforce', what: 'Deal context and account data', color: '#2ca66c' },
            { src: 'G2', what: 'Third-party customer sentiment', color: '#f2762e' },
            { src: 'Marketo', what: 'Prospect engagement signals', color: '#1a8dff' },
            { src: 'News', what: 'This week\'s competitive moves', color: '#da545b' },
            { src: 'Roadmap', what: 'What\'s coming, not just what exists', color: '#17b8be' },
          ].map((s) => (
            <div key={s.src} className="rounded-lg border border-border bg-card px-3 py-2.5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded flex items-center justify-center text-[9px] font-bold shrink-0" style={{ backgroundColor: `${s.color}15`, color: s.color }}>{s.src.slice(0, 2).toUpperCase()}</div>
              <div>
                <div className="text-[12px] font-semibold">{s.src}</div>
                <div className="text-[10px] text-muted-foreground">{s.what}</div>
              </div>
            </div>
          ))}
        </div>
      </S>

      {/* PMM Scale (compact) */}
      <S>
        <Tag color="#e5a00d">PMM Scale</Tag>
        <h2 className="text-lg font-bold mb-1">From bottleneck to architect</h2>
        <p className="text-xs text-muted-foreground mb-4">The PMM defines the narrative. The system delivers it at scale.</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3.5">
            <div className="text-[9px] font-bold uppercase tracking-wider text-red-500 mb-2">Without</div>
            <ul className="space-y-1.5">
              {['PMM bottlenecks every deal', 'Only top deals get support', 'Reps improvise or go in cold', 'Inconsistent messaging'].map((x, i) => (
                <li key={i} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                  <span className="mt-1 w-1 h-1 rounded-full bg-red-500/60 shrink-0" />{x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3.5">
            <div className="text-[9px] font-bold uppercase tracking-wider text-green-500 mb-2">With instant battlecards</div>
            <ul className="space-y-1.5">
              {['Every rep self-serves for any deal', 'Same quality for every deal size', 'Consistent positioning org-wide', 'PMM focuses on strategy'].map((x, i) => (
                <li key={i} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                  <span className="mt-1 w-1 h-1 rounded-full bg-green-500/60 shrink-0" />{x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </S>

      {/* What Sales Leaders Care About (compact) */}
      <S>
        <Tag color="#2ca66c">Sales Leader View</Tag>
        <h2 className="text-lg font-bold mb-4">Outcomes, not features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            { metric: 'Win rate', how: 'Every rep enters competitive calls with current, deal-specific intel', color: '#2ca66c' },
            { metric: 'Deal velocity', how: 'No waiting for PMM. Generate a battlecard in 60 seconds and keep moving', color: '#1a8dff' },
            { metric: 'Rep ramp', how: 'Week-2 hires get the same competitive intel as year-5 veterans', color: '#632CA6' },
            { metric: 'Consistency', how: 'Same data sources + positioning framework = one story to the market', color: '#e5a00d' },
            { metric: 'Coverage', how: 'Every tracked competitor, not just the top 3 with dedicated cards', color: '#17b8be' },
            { metric: 'PMM leverage', how: 'Configure once, support the entire org. Cost per deal drops 10x', color: '#da545b' },
          ].map((m) => (
            <div key={m.metric} className="rounded-lg border border-border bg-card px-3.5 py-3" style={{ borderLeft: `3px solid ${m.color}` }}>
              <div className="text-[13px] font-semibold mb-0.5">{m.metric}</div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{m.how}</p>
            </div>
          ))}
        </div>
      </S>

      {/* Objection Handlers (compact) */}
      <S>
        <Tag color="#da545b">In the Field</Tag>
        <h2 className="text-lg font-bold mb-4">Handling pushback</h2>
        <div className="space-y-2.5">
          {[
            { id: 'trust', obj: '"I don\'t trust AI-generated content."', resp: '"The AI doesn\'t invent intel. It synthesizes data from Gong, G2, Salesforce, and news feeds. Every claim is grounded in a real source. The AI is the assembly layer, not the intelligence layer."' },
            { id: 'replace', obj: '"This replaces the PMM."', resp: '"The opposite. It frees the PMM from 15+ hrs/week of reactive deal support to focus on positioning, launches, and win/loss. The PMM defines the narrative; the system delivers it at scale."' },
            { id: 'existing', obj: '"We already have cards in Highspot."', resp: '"When was the last time a rep used one? When was it last updated? Static cards go stale, reps lose trust, adoption drops. Generation on demand solves freshness and trust structurally."' },
            { id: 'generic', obj: '"AI content is too generic."', resp: '"Generic AI is generic because it lacks context. Our cards pull from the specific account, competitors, and audience. A card for Meridian Financial against Synthetica AI in a $2.4M expansion is not a generic \'how to compete\' slide."' },
          ].map((d) => (
            <div key={d.id} className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="px-4 py-2.5 bg-red-500/5 border-b border-border">
                <span className="text-[9px] font-bold text-red-500 mr-2">THEY SAY</span>
                <span className="text-[13px] font-medium">{d.obj}</span>
              </div>
              <div className="px-4 py-2.5 flex items-start justify-between gap-2">
                <div>
                  <span className="text-[9px] font-bold text-green-500 mr-2">YOU SAY</span>
                  <span className="text-[12px] text-muted-foreground leading-relaxed">{d.resp}</span>
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
          <p className="text-sm text-muted-foreground">Pick an account, select competitors and tone, generate in under 60 seconds.</p>
          <Link href="/battlecards" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            Launch Battlecards
          </Link>
        </div>
      </S>

    </div>
  );
}
