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

// ── Page ─────────────────────────────────────────────────────────────────────

export function BattlecardPhilosophyContent() {
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
            Battlecard Philosophy
          </h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            Why static competitive enablement is broken in fast-moving AI markets,
            how instant battlecards solve the problem, and what this means for sales leaders scaling competitive programs.
          </p>
        </div>
      </Section>

      {/* ── The Problem ── */}
      <Section delay={0.05}>
        <SectionLabel color="#da545b">The Problem</SectionLabel>
        <h2 className="text-xl font-bold mb-3">Traditional battlecards are built for a slower world</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          In enterprise AI and infrastructure, the competitive landscape changes weekly. New model releases, funding rounds,
          product launches, pricing pivots, leadership changes. A static battlecard created on Monday is stale by Friday.
          The traditional approach has four structural problems that no amount of process can fix:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              title: 'The Freshness Problem',
              icon: '🕐',
              body: 'Competitors ship weekly. Funding rounds close monthly. Analyst reports drop quarterly. A PMM manually updating battlecard decks after every competitive change creates a backlog that never clears. By the time the deck is "current," three more things have changed.',
              stat: 'Avg battlecard staleness: 3-6 weeks',
            },
            {
              title: 'The Customization Problem',
              icon: '🎯',
              body: 'A deal against Synthetica AI in healthcare is fundamentally different from a deal against Synthetica AI in financial services. The objections, use cases, regulatory concerns, and value propositions are all different. Static cards are one-size-fits-all. Reps end up improvising anyway.',
              stat: '70% of reps modify or ignore generic cards',
            },
            {
              title: 'The Scale Problem',
              icon: '📈',
              body: 'A PMM supporting 50+ reps cannot do 1:1 deal assist for every competitive conversation. They become a bottleneck. The most important deals get attention; the rest get a stale PDF and a "good luck." Meanwhile, every rep thinks their deal is the most important deal.',
              stat: '1 PMM per 40-60 reps is typical',
            },
            {
              title: 'The Adoption Problem',
              icon: '📭',
              body: 'Static battlecard programs (PDFs in Google Drive, pages in Confluence, slides in Highspot) have notoriously low adoption. Reps can\'t find them, don\'t trust they\'re current, or find them too generic to be useful. The intel exists but never reaches the conversation.',
              stat: '<30% adoption rate for static card programs',
            },
          ].map((problem) => (
            <div key={problem.title} className="rounded-xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{problem.icon}</span>
                <span className="text-sm font-semibold">{problem.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{problem.body}</p>
              <div className="text-[10px] font-medium text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full inline-block">
                {problem.stat}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg bg-secondary/50 border border-border px-4 py-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">The root cause:</span> Traditional battlecard programs
            treat competitive intelligence as a <em>document</em> problem. Create a deck, distribute it, update it periodically.
            But in fast-moving markets, competitive intelligence is a <em>data</em> problem.
            The answer isn't better documents. It's a system that generates fresh, contextual intel on demand.
          </p>
        </div>
      </Section>

      {/* ── The Approach ── */}
      <Section delay={0.05}>
        <SectionLabel color="#632CA6">The Approach</SectionLabel>
        <h2 className="text-xl font-bold mb-3">Instant battlecards: generate, don't maintain</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Intellibot's battlecards are not pre-written documents. They're generated on demand from live data sources,
          customized to the specific account, competitor, and audience. The difference is structural, not incremental:
        </p>

        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground w-[180px]">Dimension</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-red-500">Traditional</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-green-500">Instant (Intellibot)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { dim: 'Freshness', trad: 'Updated monthly or quarterly by PMM', instant: 'Generated from live data at time of use' },
                { dim: 'Customization', trad: 'One card per competitor, generic', instant: 'Unique per account, industry, and deal stage' },
                { dim: 'Audience fit', trad: 'Single tone, typically technical', instant: 'Executive, technical, or procurement tone' },
                { dim: 'Coverage', trad: 'Top 3-5 competitors, if resourced', instant: 'Every tracked competitor, on demand' },
                { dim: 'Time to access', trad: 'Search Drive/Confluence, hope it exists', instant: '< 60 seconds from account page' },
                { dim: 'Data sources', trad: 'PMM research + tribal knowledge', instant: 'Gong, Salesforce, G2, Marketo, news feeds' },
                { dim: 'Maintenance cost', trad: '20-40% of PMM bandwidth', instant: 'Zero manual maintenance' },
                { dim: 'Scale', trad: 'Bottlenecked by PMM headcount', instant: 'Self-serve for every rep, every deal' },
              ].map((row) => (
                <tr key={row.dim}>
                  <td className="px-4 py-2.5 font-medium text-foreground">{row.dim}</td>
                  <td className="px-4 py-2.5 text-muted-foreground text-xs">{row.trad}</td>
                  <td className="px-4 py-2.5 text-xs text-foreground">{row.instant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Data Sources ── */}
      <Section delay={0.05}>
        <SectionLabel color="#1a8dff">Intelligence Layer</SectionLabel>
        <h2 className="text-xl font-bold mb-3">Multi-source intelligence, not single-author opinion</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          A traditional battlecard reflects one PMM's research at one point in time. An instant battlecard
          synthesizes multiple live data sources into a single, contextual output. Each source contributes
          a different dimension of competitive intelligence:
        </p>

        <div className="space-y-2.5">
          {[
            {
              source: 'Gong',
              color: '#632CA6',
              what: 'Call recordings and transcripts',
              why: 'Reveals what competitors are actually saying in deals. Surfaces objections reps are hearing in the field, not what PMM assumes they hear. Real talk tracks from real calls.',
            },
            {
              source: 'Salesforce',
              color: '#2ca66c',
              what: 'Deal context, account data, meeting notes',
              why: 'Provides account-specific context: deal stage, ARR, industry, assigned AE. The battlecard adapts to whether this is a $500K prospect or a $3M expansion.',
            },
            {
              source: 'G2',
              color: '#f2762e',
              what: 'Customer reviews and competitor ratings',
              why: 'Third-party validation that isn\'t our marketing. Real customer complaints about competitors carry more weight than our positioning claims. Sourced and timestamped.',
            },
            {
              source: 'Marketo',
              color: '#1a8dff',
              what: 'Engagement signals and content consumption',
              why: 'Shows what the prospect has already consumed. If they downloaded a competitor comparison whitepaper, the battlecard can preempt the objections that content likely raised.',
            },
            {
              source: 'News Feeds',
              color: '#da545b',
              what: 'Competitor announcements, funding, press',
              why: 'Captures this week\'s competitive moves. A funding round, leadership change, or product launch changes the competitive narrative in real time.',
            },
            {
              source: 'Product Roadmap',
              color: '#17b8be',
              what: 'Upcoming releases and feature timeline',
              why: 'Lets the battlecard reference what\'s coming, not just what exists today. Critical for deals where "future capability" is part of the evaluation.',
            },
          ].map((s) => (
            <div key={s.source} className="rounded-lg border border-border bg-card px-4 py-3.5 flex items-start gap-3.5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-[11px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${s.color}15`, color: s.color }}
              >
                {s.source.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold">{s.source}</span>
                  <span className="text-[10px] text-muted-foreground">{s.what}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.why}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg bg-secondary/50 border border-border px-4 py-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">The compounding effect:</span> No single source is sufficient.
            Gong tells you what's happening in deals. G2 tells you what customers think. News tells you what's changing.
            Salesforce tells you who you're selling to. The battlecard synthesizes all of them into one output
            that a rep can use in 60 seconds. That synthesis is the value, not any individual data point.
          </p>
        </div>
      </Section>

      {/* ── The PMM Scale Problem ── */}
      <Section delay={0.05}>
        <SectionLabel color="#e5a00d">PMM Scale</SectionLabel>
        <h2 className="text-xl font-bold mb-3">From 1:1 deal assist to self-serve competitive intelligence</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          The traditional competitive enablement model puts the PMM at the center of every deal.
          This works at 10 reps. It breaks at 50. Here's the math:
        </p>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-secondary/20">
            <div className="text-sm font-semibold">The PMM bottleneck calculation</div>
          </div>
          <div className="p-5 space-y-4">
            {[
              { label: 'Reps supported by one PMM', value: '40-60', note: 'Industry average for enterprise sales' },
              { label: 'Competitive deals per week', value: '15-25', note: 'Deals where a competitor is actively involved' },
              { label: 'Time per 1:1 deal assist', value: '30-45 min', note: 'Research, customize, deliver, follow up' },
              { label: 'PMM hours consumed per week', value: '12-19 hrs', note: 'Just on reactive deal support' },
              { label: 'Time left for strategic work', value: '~50%', note: 'Positioning, launches, win/loss, enablement' },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">{row.label}</div>
                  <div className="text-[11px] text-muted-foreground">{row.note}</div>
                </div>
                <span className="text-sm font-mono font-semibold text-foreground shrink-0">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-2">Without instant battlecards</div>
            <ul className="space-y-2">
              {[
                'PMM is a bottleneck on every competitive deal',
                'Only top deals get real competitive support',
                'Mid-tier deals get a stale PDF and "good luck"',
                'Reps stop asking and start improvising',
                'Inconsistent messaging across the org',
                'PMM burns out on reactive work, can\'t invest in strategy',
              ].map((item, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500/60 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-green-500 mb-2">With instant battlecards</div>
            <ul className="space-y-2">
              {[
                'Every rep self-serves competitive intel for any deal',
                'Every deal gets the same quality of competitive support',
                'PMM expertise is encoded in the system, not locked in one person',
                'Reps prep in 60 seconds instead of pinging Slack',
                'Consistent positioning across every customer conversation',
                'PMM focuses on strategy: positioning, launches, win/loss programs',
              ].map((item, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500/60 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 rounded-lg border-2 border-dashed border-amber-500/20 bg-amber-500/5 px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">💡</span>
            <div>
              <div className="text-sm font-semibold text-foreground mb-1">The "DariaGPT" principle</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The goal isn't to replace the PMM. It's to turn PMM expertise into a product that scales independently
                of headcount. The PMM defines the competitive narrative, configures the data sources, and sets the
                positioning guardrails. The system delivers that expertise to 50+ reps on demand, 24/7, customized to
                each deal. The PMM becomes a strategic architect instead of a reactive support function.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── What Sales Leaders Care About ── */}
      <Section delay={0.05}>
        <SectionLabel color="#2ca66c">Sales Leader View</SectionLabel>
        <h2 className="text-xl font-bold mb-3">The metrics that matter</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Sales leaders evaluating competitive enablement tools care about outcomes, not features.
          Here's how instant battlecards move the numbers that matter:
        </p>

        <div className="space-y-3">
          {[
            {
              metric: 'Win rate against tracked competitors',
              how: 'Reps enter every competitive conversation with current, deal-specific intel instead of generic talking points or nothing at all. The quality floor rises across the entire team, not just the top performers.',
              color: '#2ca66c',
            },
            {
              metric: 'Competitive deal velocity',
              how: 'When a competitor enters a deal, the rep doesn\'t need to wait for PMM to research and respond. They generate a battlecard in 60 seconds and keep the deal moving. No Slack thread, no "let me get back to you."',
              color: '#1a8dff',
            },
            {
              metric: 'New rep ramp time',
              how: 'New hires don\'t need to absorb 6 months of tribal knowledge about competitors. The system encodes that knowledge and delivers it contextually. A rep in week 2 has the same competitive intel as a rep in year 5.',
              color: '#632CA6',
            },
            {
              metric: 'Message consistency',
              how: 'When every rep generates from the same data sources and positioning framework, the market hears a consistent story. No more "it depends on which rep you talked to" from prospects evaluating multiple vendors.',
              color: '#e5a00d',
            },
            {
              metric: 'Competitive coverage ratio',
              how: 'Traditional programs cover 3-5 competitors with dedicated battlecards. Instant generation covers every tracked competitor, including the long-tail threats that don\'t justify a dedicated PMM investment.',
              color: '#17b8be',
            },
            {
              metric: 'PMM leverage ratio',
              how: 'Instead of 1 PMM spending 15+ hours/week on reactive deal support, that same PMM configures the system once and supports the entire sales org. Competitive enablement cost per deal drops by an order of magnitude.',
              color: '#da545b',
            },
          ].map((m) => (
            <div key={m.metric} className="rounded-lg border border-border bg-card px-5 py-4" style={{ borderLeft: `3px solid ${m.color}` }}>
              <div className="text-sm font-semibold mb-1">{m.metric}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{m.how}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Design Decisions ── */}
      <Section delay={0.05}>
        <SectionLabel color="#17b8be">UX Design</SectionLabel>
        <h2 className="text-xl font-bold mb-3">Design decisions for self-service</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          The best competitive intel in the world is useless if reps don't use it.
          Every design decision optimizes for adoption, speed, and trust.
        </p>

        <Accordion>
          {[
            {
              q: 'Account-first entry point, not competitor-first',
              a: 'Reps think in accounts, not competitors. The flow starts with "which account is this for?" and then surfaces the relevant competitors for that deal. This matches the rep\'s mental model and ensures the battlecard is contextual from the start.',
            },
            {
              q: 'Tone selector: Executive, Technical, Procurement',
              a: 'The same competitive intel needs different framing depending on who\'s in the room. An executive wants strategic differentiation. A technical evaluator wants architecture depth. Procurement wants pricing transparency. One battlecard engine, three output modes.',
            },
            {
              q: 'Module selector: Feature Comparison, Pricing, Customer Stories, Roadmap',
              a: 'Not every competitive conversation needs every module. A pricing objection needs the pricing module. A feature bake-off needs the comparison module. Letting reps select modules keeps the output focused and reduces noise.',
            },
            {
              q: 'Streaming generation with visible progress',
              a: 'Instant means fast, not necessarily instant. Streaming the output character-by-character gives the rep something to read immediately while the full card generates. This is a perceived performance optimization that dramatically improves the experience vs. a loading spinner.',
            },
            {
              q: 'Slide-based output format',
              a: 'Reps need to present this content, not just read it. A slide format maps directly to how competitive intel is consumed: in pre-call prep, in live customer conversations, and in internal deal reviews. Each slide is a self-contained talking point.',
            },
            {
              q: 'Available from the account page AND the global nav',
              a: 'Two entry points serve two workflows. From the account page: "I\'m prepping for this specific deal." From the global nav: "I need to generate a card quickly." Both paths should be < 3 clicks to output.',
            },
            {
              q: 'Multi-competitor selection',
              a: 'Enterprise deals often involve 2-3 competitors simultaneously. The battlecard should address all of them in one output, not force the rep to generate separate cards and mentally synthesize them.',
            },
            {
              q: 'No login, no setup, no training required',
              a: 'The #1 killer of sales tool adoption is friction. If a rep needs a training session to use the tool, half of them never will. The interface is self-explanatory: pick account, pick competitors, pick tone, generate. That\'s it.',
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

      {/* ── Defending the Approach ── */}
      <Section delay={0.05}>
        <SectionLabel color="#da545b">In the Field</SectionLabel>
        <h2 className="text-xl font-bold mb-3">Defending this approach</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Objections you'll hear from sales leaders, PMMs, and reps, and how to respond.
        </p>

        <div className="space-y-3">
          {[
            {
              id: 'ai-trust',
              objection: '"I don\'t trust AI-generated competitive content."',
              response: '"The AI doesn\'t invent competitive intel. It synthesizes data from Gong calls, G2 reviews, Salesforce notes, and live news feeds. Every claim is grounded in a real data source. The AI is the assembly layer, not the intelligence layer. Think of it as a research assistant that reads everything and summarizes it for you in 60 seconds."',
            },
            {
              id: 'pmm-replace',
              objection: '"This replaces the PMM."',
              response: '"It\'s the opposite. This frees the PMM from spending 15+ hours a week on reactive deal support so they can focus on strategic work: positioning, product launches, win/loss analysis, and competitive strategy. The PMM defines the narrative. The system delivers it at scale. The PMM becomes more valuable, not less."',
            },
            {
              id: 'existing',
              objection: '"We already have battlecards in Highspot/Confluence/Drive."',
              response: '"When was the last time a rep used one? And when was it last updated? If the answer is \'I don\'t know\' to either question, the program isn\'t working. The issue isn\'t where the cards live. It\'s that static cards go stale, reps lose trust, and adoption drops. Generation on demand solves the freshness and trust problem structurally."',
            },
            {
              id: 'consistency',
              objection: '"How do we ensure message consistency?"',
              response: '"Better than you do today. Right now, every rep improvises their own competitive narrative based on tribal knowledge and whatever they remember from the last enablement session. With instant battlecards, every rep generates from the same data sources and positioning framework. The floor rises for the whole team, not just the reps who happen to sit near the PMM."',
            },
            {
              id: 'generic',
              objection: '"AI content is too generic to be useful in a real deal."',
              response: '"Generic AI content is generic because it lacks context. Our battlecards pull from the specific account (industry, ARR, deal stage), the specific competitors in the deal, and the specific audience (executive vs. technical vs. procurement). That context is what makes the output actionable. A battlecard for Meridian Financial Group against Synthetica AI in a $2.4M expansion is not the same as a generic \'how to compete against Synthetica\' slide."',
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

      {/* ── The Bigger Picture ── */}
      <Section delay={0.05}>
        <SectionLabel color="#632CA6">Bigger Picture</SectionLabel>
        <h2 className="text-xl font-bold mb-3">Why this matters beyond battlecards</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Instant battlecards are one expression of a larger shift in how sales-led organizations
          operate in AI-native markets. The same principles apply across competitive enablement:
        </p>

        <div className="space-y-2.5">
          {[
            {
              principle: 'Generate, don\'t maintain',
              implication: 'Any sales asset that requires manual updates to stay current is a liability, not an asset. The future of enablement is generation from live data, not static content management.',
            },
            {
              principle: 'Encode expertise, don\'t bottleneck it',
              implication: 'Every organization has people whose knowledge is locked in their heads. The goal is to make that expertise accessible to the whole team without requiring the expert to be in every conversation.',
            },
            {
              principle: 'Context is the differentiator',
              implication: 'Generic AI output is commodity. Account-specific, competitor-specific, audience-specific output is strategic. The investment is in the context layer (data integrations, positioning frameworks), not the generation layer.',
            },
            {
              principle: 'Adoption is the only metric that matters',
              implication: 'A perfect battlecard that nobody uses has zero impact on win rate. Every design decision should optimize for "will a rep actually use this in the 5 minutes before their call?"',
            },
          ].map((p, i) => (
            <div key={i} className="rounded-lg border border-border bg-card px-5 py-4">
              <div className="text-sm font-semibold mb-1">{p.principle}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.implication}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section delay={0.05}>
        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center space-y-4">
          <h2 className="text-lg font-bold">See it in action</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Pick an account, select your competitors and tone, and generate a battlecard in under 60 seconds.
          </p>
          <Link
            href="/battlecards"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Launch Battlecards
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
                Built Intellibot to solve the competitive enablement problem I lived every day as a PMM.
                When you're supporting 50+ reps in a market that changes weekly, you either build a system or burn out. This is the system.
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
