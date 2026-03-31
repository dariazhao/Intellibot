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
      {/* Metric row */}
      <div className="flex gap-2">
        {[
          { label: 'Accounts', value: '24', color: 'bg-[#6c5ce7]' },
          { label: 'Threats', value: '7', color: 'bg-[#da545b]' },
          { label: 'Score', value: '82%', color: 'bg-[#2ca66c]' },
        ].map((m) => (
          <div key={m.label} className="flex-1 bg-card rounded-md p-2 border border-border">
            <div className="text-[9px] text-muted-foreground">{m.label}</div>
            <div className="text-sm font-bold">{m.value}</div>
            <div className={`h-1 w-3/4 rounded-full mt-1 ${m.color} opacity-60`} />
          </div>
        ))}
      </div>
      {/* Chart area */}
      <div className="flex-1 bg-card rounded-md border border-border p-2 flex items-end gap-1">
        {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 68].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-[#6c5ce7]/40"
            style={{ height: `${h}%` }}
          />
        ))}
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

/* ─── Card data ─── */

interface TourCard {
  id: string;
  headline: string;
  body: string;
  illustration: React.ReactNode;
  isWelcome?: boolean;
}

const TOUR_CARDS: TourCard[] = [
  {
    id: 'welcome',
    headline: 'Welcome to Intellibot!',
    body: "This is an external demo for a PMM workshop ft. Claude Code I ran in San Francisco in March 2026. Don't worry — everything you see is dummy data, and no selections will be saved. So please, play around!",
    illustration: null, // Custom welcome layout
    isWelcome: true,
  },
  {
    id: 'dashboard',
    headline: 'Your Command Center',
    body: 'The dashboard gives you a real-time pulse on your competitive landscape — account health scores, threat levels, and recent activity, all at a glance.',
    illustration: <DashboardIllustration />,
  },
  {
    id: 'competitors',
    headline: 'Know Your Rivals',
    body: 'Browse your full competitor directory with threat assessments, market positioning, and win/loss trends. Click any competitor to dive deep into their profile.',
    illustration: <CompetitorIllustration />,
  },
  {
    id: 'battlecards',
    headline: 'Magic Battlecards, On Demand',
    body: 'Generate AI-powered battlecards tailored to any account. Get talk tracks, objection handlers, and competitive differentiators — ready for your next call.',
    illustration: <BattlecardIllustration />,
  },
  {
    id: 'compare',
    headline: 'Side-by-Side Comparison',
    body: 'Stack competitors head-to-head with feature matrices, strength/weakness breakdowns, and trend analysis to sharpen your positioning.',
    illustration: <CompareIllustration />,
  },
  {
    id: 'events',
    headline: 'Never Miss a Signal',
    body: 'The Event Stream surfaces real-time competitive intelligence — pricing changes, G2 reviews, deal mentions, and market moves — as they happen.',
    illustration: <EventStreamIllustration />,
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
              {/* Headshot */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg mb-4">
                <img
                  src="/daria-headshot.jpg"
                  alt="Daria Zhao"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Step badge */}
              <div className="text-[10px] font-medium tracking-wider uppercase text-primary mb-2">
                Getting Started
              </div>

              <h2 className="text-xl font-bold mb-3">{card.headline}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-4">
                {card.body}
              </p>

              <div className="text-xs text-muted-foreground/70 italic">
                — Daria Zhao
              </div>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="text-[10px] font-medium tracking-wider uppercase text-primary mb-3">
                {currentCard} of {TOUR_CARDS.length - 1}
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
