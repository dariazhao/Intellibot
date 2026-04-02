'use client';

import { useState, useEffect, useCallback } from 'react';

const TOUR_STORAGE_KEY = 'intellibot-welcome-tour-completed';

interface WelcomeTourProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

/* ─── Mini-illustration components for each card ─── */

function DashboardIllustration() {
  return (
    <div className="w-full h-44 rounded-lg bg-gradient-to-br from-[#6c5ce7]/10 to-[#1a8dff]/10 border border-border overflow-hidden p-3 flex flex-col gap-2">
      {/* 4 Metric row */}
      <div className="flex gap-1.5">
        {[
          { label: 'Health', value: '74', color: 'bg-[#2ca66c]' },
          { label: 'ARR', value: '$12.9M', color: 'bg-[#6c5ce7]' },
          { label: 'Threats', value: '2', color: 'bg-[#da545b]' },
          { label: 'Win Rate', value: '68%', color: 'bg-[#1a8dff]' },
        ].map((m) => (
          <div key={m.label} className="flex-1 bg-card rounded-md p-1.5 border border-border">
            <div className="text-[7px] text-muted-foreground">{m.label}</div>
            <div className="text-[10px] font-bold">{m.value}</div>
            <div className={`h-0.5 w-3/4 rounded-full mt-0.5 ${m.color} opacity-60`} />
          </div>
        ))}
      </div>
      {/* Deal Assist + Table row */}
      <div className="flex-1 flex gap-1.5">
        <div className="w-[90px] bg-card rounded-md border border-border p-1.5 flex flex-col gap-1 shrink-0">
          <div className="text-[7px] font-semibold text-muted-foreground">Win the Deal</div>
          {[
            { label: 'Battlecards', color: 'bg-[#6c5ce7]' },
            { label: 'TCO Analysis', color: 'bg-[#17b8be]' },
            { label: 'Head-to-Head', color: 'bg-[#1a8dff]' },
            { label: 'Competitor Intel', color: 'bg-[#e5a00d]' },
          ].map((a) => (
            <div key={a.label} className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-sm ${a.color} opacity-60`} />
              <span className="text-[6px] text-muted-foreground">{a.label}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-card rounded-md border border-border p-1.5 flex flex-col gap-[3px]">
          <div className="text-[7px] font-semibold text-muted-foreground">Accounts</div>
          {[
            { name: 'TitanForge', health: 91, color: '#2ca66c' },
            { name: 'Meridian', health: 82, color: '#2ca66c' },
            { name: 'Pinnacle', health: 73, color: '#e5a00d' },
            { name: 'NovaBright', health: 45, color: '#da545b' },
          ].map((a) => (
            <div key={a.name} className="flex items-center gap-1 h-2.5">
              <span className="text-[6px] flex-1 truncate">{a.name}</span>
              <div className="w-8 h-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${a.health}%`, backgroundColor: a.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompetitorIllustration() {
  return (
    <div className="w-full h-44 rounded-lg bg-gradient-to-br from-[#da545b]/10 to-[#e5a00d]/10 border border-border overflow-hidden p-3">
      <div className="grid grid-cols-2 gap-2 h-full">
        {[
          { name: 'Gong.io', threat: 'HIGH', color: 'text-[#da545b]', bg: 'bg-[#da545b]/10' },
          { name: 'Clari', threat: 'HIGH', color: 'text-[#da545b]', bg: 'bg-[#da545b]/10' },
          { name: 'Chorus', threat: 'MED', color: 'text-[#e5a00d]', bg: 'bg-[#e5a00d]/10' },
          { name: 'Outreach', threat: 'LOW', color: 'text-[#2ca66c]', bg: 'bg-[#2ca66c]/10' },
        ].map((c) => (
          <div key={c.name} className="bg-card rounded-md border border-border p-2 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-semibold">{c.name}</div>
              <div className="text-[9px] text-muted-foreground mt-0.5">Revenue Intelligence</div>
            </div>
            <span className={`text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded-full w-fit ${c.bg} ${c.color}`}>
              {c.threat}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BattlecardIllustration() {
  return (
    <div className="w-full h-44 rounded-lg bg-gradient-to-br from-[#2ca66c]/10 to-[#6c5ce7]/10 border border-border overflow-hidden p-3 flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded bg-[#6c5ce7]/20 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#6c5ce7]">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <div className="text-[11px] font-semibold">AI-Generated Battlecard</div>
      </div>
      {['Key Differentiators', 'Objection Handling', 'Win/Loss Patterns', 'Talk Tracks'].map((s) => (
        <div key={s} className="bg-card rounded-md border border-border px-2.5 py-1.5 flex items-center justify-between">
          <span className="text-[10px] font-medium">{s}</span>
          <div className="flex gap-0.5">
            <div className="w-8 h-1.5 rounded-full bg-[#2ca66c]/40" />
            <div className="w-5 h-1.5 rounded-full bg-[#6c5ce7]/30" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TcoIllustration() {
  return (
    <div className="w-full h-44 rounded-lg bg-gradient-to-br from-[#17b8be]/10 to-[#2ca66c]/10 border border-border overflow-hidden p-3 flex flex-col gap-2">
      {/* Pricing model selector mini */}
      <div className="flex gap-1.5 mb-0.5">
        {[
          { label: 'Per-Seat', active: true },
          { label: 'Usage', active: false },
          { label: 'Hybrid', active: false },
          { label: 'Flat', active: false },
        ].map((m) => (
          <div
            key={m.label}
            className={`text-[7px] font-semibold px-1.5 py-0.5 rounded ${
              m.active ? 'bg-[#17b8be]/20 text-[#17b8be] border border-[#17b8be]/30' : 'bg-muted text-muted-foreground border border-border'
            }`}
          >
            {m.label}
          </div>
        ))}
      </div>
      {/* Cost bars */}
      <div className="flex-1 bg-card rounded-md border border-border p-2 flex flex-col justify-center gap-1.5">
        {[
          { vendor: 'Us', cost: 45, color: 'bg-[#2ca66c]' },
          { vendor: 'Comp A', cost: 78, color: 'bg-[#6c5ce7]' },
          { vendor: 'Comp D', cost: 92, color: 'bg-[#1a8dff]' },
        ].map((v) => (
          <div key={v.vendor} className="flex items-center gap-1.5">
            <span className="text-[8px] text-muted-foreground w-10 text-right">{v.vendor}</span>
            <div className="flex-1 h-4 bg-muted/30 rounded overflow-hidden">
              <div className={`h-full ${v.color} rounded`} style={{ width: `${v.cost}%` }} />
            </div>
            <span className="text-[8px] font-mono font-bold w-9 text-right">${v.cost * 5}K</span>
          </div>
        ))}
      </div>
      {/* Savings callout */}
      <div className="bg-[#2ca66c]/10 border border-[#2ca66c]/20 rounded-md px-2 py-1 flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#2ca66c]/20 flex items-center justify-center">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#2ca66c" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <span className="text-[9px] font-semibold text-[#2ca66c]">$165K savings over 3 years</span>
      </div>
    </div>
  );
}

function CompareIllustration() {
  return (
    <div className="w-full h-44 rounded-lg bg-gradient-to-br from-[#1a8dff]/10 to-[#17b8be]/10 border border-border overflow-hidden p-3 flex flex-col gap-2">
      <div className="flex gap-2 mb-1">
        <div className="flex-1 text-center text-[10px] font-semibold bg-[#6c5ce7]/10 rounded-md py-1">Gong.io</div>
        <div className="text-[10px] text-muted-foreground self-center">vs</div>
        <div className="flex-1 text-center text-[10px] font-semibold bg-[#1a8dff]/10 rounded-md py-1">Clari</div>
      </div>
      {['AI Accuracy', 'Integrations', 'Pricing', 'Support'].map((feature, i) => (
        <div key={feature} className="flex items-center gap-2">
          <span className="text-[9px] text-muted-foreground w-16 text-right">{feature}</span>
          <div className="flex-1 flex gap-1 items-center">
            <div className="flex-1 h-2.5 bg-[#6c5ce7]/30 rounded-full" style={{ width: `${[85, 70, 60, 90][i]}%` }} />
          </div>
          <div className="flex-1 flex gap-1 items-center">
            <div className="flex-1 h-2.5 bg-[#1a8dff]/30 rounded-full" style={{ width: `${[75, 85, 80, 65][i]}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function EventStreamIllustration() {
  return (
    <div className="w-full h-44 rounded-lg bg-gradient-to-br from-[#f2762e]/10 to-[#e5a00d]/10 border border-border overflow-hidden p-3 flex flex-col gap-1.5">
      {[
        { time: '2m ago', text: 'Gong.io launched new enterprise plan', type: 'alert', color: 'bg-[#da545b]' },
        { time: '15m ago', text: 'Acme Corp viewed Clari pricing page', type: 'signal', color: 'bg-[#1a8dff]' },
        { time: '1h ago', text: 'New G2 review: "Switching from Chorus"', type: 'review', color: 'bg-[#2ca66c]' },
        { time: '3h ago', text: 'Competitor mention in Gong call', type: 'call', color: 'bg-[#e5a00d]' },
        { time: '5h ago', text: 'Outreach released API v3 update', type: 'release', color: 'bg-[#6c5ce7]' },
      ].map((ev) => (
        <div key={ev.time} className="bg-card rounded-md border border-border px-2.5 py-1.5 flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${ev.color}`} />
          <span className="text-[10px] flex-1 truncate">{ev.text}</span>
          <span className="text-[8px] text-muted-foreground shrink-0">{ev.time}</span>
        </div>
      ))}
    </div>
  );
}

function WelcomeHeroIllustration() {
  return (
    <div className="w-full h-48 rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 via-[#1a8dff]/10 to-[#2ca66c]/15 border border-border overflow-hidden relative">
      {/* Decorative glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#6c5ce7]/10 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#1a8dff]/10 blur-3xl" />

      {/* Mini app frame */}
      <div className="absolute inset-3 rounded-lg bg-card/90 border border-border shadow-xl backdrop-blur-sm overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-8 bg-[#6c5ce7] flex flex-col items-center py-2 gap-1 shrink-0">
          <div className="w-4 h-4 rounded bg-white/20" />
          <div className="w-3 h-px bg-white/20 mt-1" />
          <div className="w-4 h-4 rounded bg-white/30" />
          {[2, 3, 4].map((i) => (
            <div key={i} className="w-4 h-4 rounded bg-white/10" />
          ))}
          <div className="w-3 h-px bg-white/20" />
          {[5, 6].map((i) => (
            <div key={i} className="w-4 h-4 rounded bg-white/10" />
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div className="h-5 border-b border-border flex items-center px-2 gap-1.5 shrink-0">
            <div className="w-12 h-1.5 rounded-full bg-foreground/15" />
            <div className="ml-auto flex gap-1">
              <div className="w-3 h-3 rounded bg-muted" />
              <div className="w-10 h-3 rounded bg-[#17b8be]/20 border border-[#17b8be]/30" />
              <div className="w-10 h-3 rounded bg-[#6c5ce7]/25 border border-[#6c5ce7]/30" />
            </div>
          </div>

          {/* Dashboard content */}
          <div className="flex-1 p-2 flex flex-col gap-1.5">
            {/* Metric cards row */}
            <div className="flex gap-1">
              {[
                { val: '74', lbl: 'Health', color: '#2ca66c' },
                { val: '$12.9M', lbl: 'ARR', color: '#6c5ce7' },
                { val: '2', lbl: 'Threats', color: '#da545b' },
                { val: '68%', lbl: 'Win Rate', color: '#1a8dff' },
              ].map((m) => (
                <div key={m.lbl} className="flex-1 bg-background/60 rounded p-1 border border-border/50">
                  <div className="text-[7px] text-muted-foreground leading-none">{m.lbl}</div>
                  <div className="text-[10px] font-bold leading-tight">{m.val}</div>
                  <div className="h-0.5 rounded-full mt-0.5 opacity-50" style={{ backgroundColor: m.color, width: '60%' }} />
                </div>
              ))}
            </div>

            {/* Chart + table row */}
            <div className="flex-1 flex gap-1.5">
              {/* Chart */}
              <div className="flex-[5] bg-background/60 rounded border border-border/50 p-1.5 flex flex-col">
                <div className="text-[7px] font-semibold text-foreground/60 mb-1">Competitive Pulse</div>
                <div className="flex-1 flex items-end gap-[3px]">
                  {[35, 55, 40, 70, 45, 65, 80, 50, 60, 42, 75, 58].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        height: `${h}%`,
                        backgroundColor: i === 6 ? '#6c5ce7' : 'rgba(108,92,231,0.25)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Deal Assist + Accounts */}
              <div className="flex-[7] bg-background/60 rounded border border-border/50 p-1.5 flex flex-col gap-[3px]">
                <div className="text-[7px] font-semibold text-foreground/60 mb-0.5">Win the Deal</div>
                {[
                  { name: 'Battlecards', color: '#6c5ce7' },
                  { name: 'TCO Analysis', color: '#17b8be' },
                  { name: 'Head-to-Head', color: '#1a8dff' },
                  { name: 'Competitor Intel', color: '#e5a00d' },
                ].map((a) => (
                  <div key={a.name} className="flex items-center gap-1 h-3">
                    <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: a.color, opacity: 0.4 }} />
                    <span className="text-[6px] flex-1 truncate">{a.name}</span>
                    <div className="w-2 h-2 rounded text-muted-foreground/30">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Card data ─── */

interface TourCard {
  id: string;
  headline: string;
  body: string;
  illustration: React.ReactNode;
  isWelcome?: boolean;
  group?: 'win' | 'intel';
}

const GROUP_LABELS: Record<string, { label: string; color: string }> = {
  win: { label: 'Win the Deal', color: '#632CA6' },
  intel: { label: 'Know the Market', color: '#1a8dff' },
};

const TOUR_CARDS: TourCard[] = [
  {
    id: 'welcome',
    headline: 'Welcome to Intellibot!',
    body: "This is an external demo for a PMM workshop I ran in March 2026. Everything you see is dummy data, and no selections will be saved. So please, play around!",
    illustration: null,
    isWelcome: true,
  },
  {
    id: 'dashboard',
    headline: 'Home: Your Comp Intel Hub',
    body: "Every rep's home base for self-serve comp intel. Portfolio health, ARR, active threats, win rate, and quick-launch actions to Win the Deal or Know the Market.",
    illustration: <DashboardIllustration />,
  },
  {
    id: 'battlecards',
    headline: 'Battlecards: Always Fresh, Never Generic',
    body: 'AI-generated competitive talking points tailored to any account. Objection handlers, differentiators, and talk tracks ready for your next call.',
    illustration: <BattlecardIllustration />,
    group: 'win',
  },
  {
    id: 'tco',
    headline: 'TCO Analysis: Win on the Numbers',
    body: 'Build a Total Cost of Ownership comparison in minutes. Pick your pricing model, select competitors, and get a full AE + SE narrative to present.',
    illustration: <TcoIllustration />,
    group: 'win',
  },
  {
    id: 'compare',
    headline: 'Head-to-Head: Stack Up Against Rivals',
    body: 'Go head-to-head against the competitors in your deal. Capability matrix, strength/weakness breakdowns, and market momentum to sharpen your positioning.',
    illustration: <CompareIllustration />,
    group: 'win',
  },
  {
    id: 'competitors',
    headline: 'Competitor Intel: Know Every Rival',
    body: 'Deep profiles on every competitor: threat assessments, market positioning, recent news, and win/loss trends. Click any rival to dive deeper.',
    illustration: <CompetitorIllustration />,
    group: 'intel',
  },
  {
    id: 'events',
    headline: 'Event Stream: Real-Time Pulse',
    body: 'Live competitive intelligence: pricing changes, G2 reviews, deal mentions, and market moves surfaced as they happen.',
    illustration: <EventStreamIllustration />,
    group: 'intel',
  },
];

/* ─── Tour Component ─── */

export function WelcomeTour({ forceOpen = false, onClose }: WelcomeTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  useEffect(() => {
    if (forceOpen) {
      setCurrentCard(0);
      setIsOpen(true);
      return;
    }
    const completed = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!completed) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  const closeTour = useCallback(() => {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    setIsOpen(false);
    setCurrentCard(0);
    onClose?.();
  }, [onClose]);

  const goNext = useCallback(() => {
    if (currentCard < TOUR_CARDS.length - 1) {
      setDirection('next');
      setCurrentCard((c) => c + 1);
    } else {
      closeTour();
    }
  }, [currentCard, closeTour]);

  const goPrev = useCallback(() => {
    if (currentCard > 0) {
      setDirection('prev');
      setCurrentCard((c) => c - 1);
    }
  }, [currentCard]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') closeTour();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, goNext, goPrev, closeTour]);

  if (!isOpen) return null;

  const card = TOUR_CARDS[currentCard];
  const isFirst = currentCard === 0;
  const isLast = currentCard === TOUR_CARDS.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Welcome tour">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeTour} />

      {/* Card */}
      <div
        key={card.id}
        className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close button */}
        <button
          onClick={closeTour}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Close tour"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="p-6">
          {/* Welcome card has special layout */}
          {card.isWelcome ? (
            <div className="flex flex-col items-center text-center">
              {/* Hero product screenshot */}
              <WelcomeHeroIllustration />

              {/* Step badge */}
              <div className="text-[10px] font-medium tracking-wider uppercase text-primary mb-2 mt-5">
                Getting Started
              </div>

              <h2 className="text-xl font-bold mb-3">{card.headline}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-4">
                {card.body}
              </p>

              {/* Two pillars */}
              <div className="flex gap-3 mb-5 w-full max-w-sm">
                <div className="flex-1 rounded-lg px-3 py-2.5 border text-center" style={{ borderColor: '#632CA620', backgroundColor: '#632CA608' }}>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#632CA6' }}>Win the Deal</div>
                  <div className="text-[10px] text-muted-foreground">Battlecards, TCO, Head-to-Head</div>
                </div>
                <div className="flex-1 rounded-lg px-3 py-2.5 border text-center" style={{ borderColor: '#1a8dff20', backgroundColor: '#1a8dff08' }}>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#1a8dff' }}>Know the Market</div>
                  <div className="text-[10px] text-muted-foreground">Competitor Intel, Event Stream</div>
                </div>
              </div>

              {/* Signed with headshot */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/30 shadow-sm shrink-0">
                  <img
                    src="/daria-headshot.jpg"
                    alt="Daria Zhao"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="text-xs font-medium">Daria Zhao</div>
                  <div className="text-[10px] text-muted-foreground/70">Director of AI PMM at Yext</div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Group badge + step indicator */}
              <div className="flex items-center gap-2 mb-3">
                {card.group && GROUP_LABELS[card.group] && (
                  <span
                    className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${GROUP_LABELS[card.group].color}15`,
                      color: GROUP_LABELS[card.group].color,
                    }}
                  >
                    {GROUP_LABELS[card.group].label}
                  </span>
                )}
                <span className="text-[10px] font-medium tracking-wider uppercase text-muted-foreground">
                  {currentCard} of {TOUR_CARDS.length - 1}
                </span>
              </div>

              {/* Illustration */}
              <div className="mb-4">{card.illustration}</div>

              {/* Copy */}
              <h2 className="text-lg font-bold mb-2">{card.headline}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.body}
              </p>
            </>
          )}
        </div>

        {/* Footer: dots + navigation */}
        <div className="px-6 pb-5 flex items-center justify-between">
          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {TOUR_CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentCard ? 'next' : 'prev');
                  setCurrentCard(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === currentCard
                    ? 'w-6 bg-primary'
                    : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                onClick={goPrev}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-accent"
              >
                Back
              </button>
            )}
            {isFirst && (
              <button
                onClick={closeTour}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-accent"
              >
                Skip tour
              </button>
            )}
            <button
              onClick={goNext}
              className="text-xs font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors px-4 py-1.5 rounded-md"
            >
              {isLast ? "Let's go!" : isFirst ? 'Take the tour' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
