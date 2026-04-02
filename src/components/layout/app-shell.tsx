'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GlobalSearch } from './global-search';
import { NotificationBell } from './notification-bell';
import { WelcomeTour } from '@/components/onboarding/welcome-tour';
import { TimeRangeProvider, useTimeRange, TIME_RANGE_LABELS, type TimeRange } from '@/lib/time-range-context';

const NAV_GROUPS: Record<string, string> = {
  win: 'Win the Deal',
  intel: 'Know the Market',
};

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/battlecards', label: 'Battlecards', icon: 'bolt', group: 'win' },
  { href: '/tco', label: 'TCO Analysis', icon: 'calculator', group: 'win' },
  { href: '/compare', label: 'Head-to-Head', icon: 'compare', group: 'win' },
  { href: '/competitors', label: 'Competitor Intel', icon: 'sword', group: 'intel' },
  { href: '/events', label: 'Signals', icon: 'stream', group: 'intel' },
  { href: '/settings', label: 'Settings', icon: 'gear', group: 'system' },
] as const;

function NavIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  switch (icon) {
    case 'home':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case 'sword':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case 'compare':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="8" height="18" rx="1" />
          <rect x="13" y="3" width="8" height="18" rx="1" />
          <path d="M7 8h0" /><path d="M7 12h0" /><path d="M7 16h0" />
          <path d="M17 8h0" /><path d="M17 12h0" /><path d="M17 16h0" />
        </svg>
      );
    case 'bolt':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'stream':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h4" /><path d="M18 12h4" />
          <path d="M6 8v8" /><path d="M10 5v14" /><path d="M14 7v10" /><path d="M18 10v4" />
        </svg>
      );
    case 'calculator':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="8.01" y2="10" />
          <line x1="12" y1="10" x2="12.01" y2="10" />
          <line x1="16" y1="10" x2="16.01" y2="10" />
          <line x1="8" y1="14" x2="8.01" y2="14" />
          <line x1="12" y1="14" x2="12.01" y2="14" />
          <line x1="16" y1="14" x2="16.01" y2="14" />
          <line x1="8" y1="18" x2="8.01" y2="18" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
          <line x1="16" y1="18" x2="16.01" y2="18" />
        </svg>
      );
    case 'gear':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      );
    default:
      return null;
  }
}

function IconNavLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Link
      href={href}
      title={label}
      className={`relative flex items-center justify-center w-10 h-10 rounded-md transition-all duration-150 group ${
        isActive
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent'
      }`}
    >
      {isActive && (
        <div className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-sidebar-primary" />
      )}
      <NavIcon icon={icon} />
      <div className="absolute left-full ml-2 px-2 py-1 rounded bg-popover text-xs text-popover-foreground whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-border shadow-lg">
        {label}
      </div>
    </Link>
  );
}

function MobileNavLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-md transition-colors ${
        isActive
          ? 'text-sidebar-accent-foreground'
          : 'text-sidebar-foreground/50'
      }`}
    >
      <NavIcon icon={icon} size={18} />
      <span className="text-[9px] leading-none">{label}</span>
    </Link>
  );
}

const PAGE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/battlecards': 'Battlecards',
  '/tco': 'TCO Analysis',
  '/compare': 'Head-to-Head',
  '/competitors': 'Competitor Intel',
  '/events': 'Signals',
  '/settings': 'Settings',
};

const PAGE_GROUPS: Record<string, string> = {
  '/battlecards': 'Win the Deal',
  '/tco': 'Win the Deal',
  '/compare': 'Win the Deal',
  '/competitors': 'Know the Market',
  '/events': 'Know the Market',
};

function Breadcrumbs() {
  const pathname = usePathname();
  const { range } = useTimeRange();

  if (pathname === '/') {
    return (
      <div className="flex items-center gap-2 text-[13px]">
        <span className="font-semibold text-foreground">Home</span>
        <span className="text-muted-foreground text-xs hidden sm:inline">{TIME_RANGE_LABELS[range]}</span>
      </div>
    );
  }

  // Find the group for the current top-level path
  const topPath = '/' + pathname.split('/').filter(Boolean)[0];
  const group = PAGE_GROUPS[topPath];

  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = PAGE_TITLES[href] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { label, href: index < segments.length - 1 ? href : undefined };
  });

  return (
    <div className="flex items-center gap-1.5 text-[13px]">
      {group && (
        <>
          <span className="text-muted-foreground/60 text-xs font-medium hidden sm:inline">{group}</span>
          <span className="text-muted-foreground/40 hidden sm:inline">/</span>
        </>
      )}
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-muted-foreground">/</span>}
          {crumb.href ? (
            <Link href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [tourOpen, setTourOpen] = useState(false);

  const openTour = useCallback(() => setTourOpen(true), []);
  const closeTour = useCallback(() => setTourOpen(false), []);

  return (
    <TimeRangeProvider>
    <div className="flex h-screen bg-background">
      <WelcomeTour forceOpen={tourOpen} onClose={closeTour} />
      {/* Slim icon sidebar — hidden on mobile */}
      <aside className="hidden md:flex w-[52px] border-r border-sidebar-border flex-col items-center bg-sidebar shrink-0">
        {/* Logo */}
        <div className="py-3 border-b border-sidebar-border w-full flex justify-center">
          <Link href="/" className="flex items-center justify-center w-9 h-9">
            <img src="/llama.png" alt="Intellibot" width={28} height={28} className="rounded-sm" />
          </Link>
        </div>

        {/* Nav icons */}
        <nav className="flex-1 flex flex-col items-center gap-1 py-3">
          {NAV_ITEMS.map((item, i) => {
            const prev = NAV_ITEMS[i - 1];
            const currentGroup = 'group' in item ? (item as { group?: string }).group : undefined;
            const prevGroup = prev && 'group' in prev ? (prev as { group?: string }).group : undefined;
            const isNewGroup = i > 0 && currentGroup && currentGroup !== prevGroup;
            const groupLabel = currentGroup && NAV_GROUPS[currentGroup];
            return (
              <div key={item.href} className="flex flex-col items-center w-full">
                {isNewGroup && (
                  <div className="flex flex-col items-center w-full my-1">
                    <div className="w-5 h-px bg-sidebar-border" />
                    {groupLabel && (
                      <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-sidebar-foreground/30 mt-1.5 mb-0.5">
                        {currentGroup === 'win' ? 'WIN' : currentGroup === 'intel' ? 'INTEL' : ''}
                      </span>
                    )}
                  </div>
                )}
                <IconNavLink href={item.href} label={item.label} icon={item.icon} />
              </div>
            );
          })}
        </nav>

        {/* Status dot */}
        <div className="pb-3 flex flex-col items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#2ca66c]" title="All systems operational" />
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-sidebar-border bg-sidebar flex items-center justify-around px-1 py-1 safe-area-bottom">
        {NAV_ITEMS.map((item) => (
          <MobileNavLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
        ))}
      </nav>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-11 border-b border-border flex items-center justify-between px-3 md:px-4 bg-card">
          <Breadcrumbs />
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="hidden sm:flex">
              <TimeRangeSelector />
            </div>
            <GlobalSearch />
            <NotificationBell />
            <LearnMoreButton onTour={openTour} />
            <TcoButton />
            <BattlecardButton />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-14 md:pb-0">
          {children}
          <footer className="border-t border-border py-5 px-4 text-center">
            <div className="flex justify-center mb-2">
              <img src="/llama.png" alt="Llama" width={56} height={56} className="opacity-60" />
            </div>
            <div className="text-[11px] text-muted-foreground/60 leading-relaxed">
              Made with ♥️ by Daria.
              <br />
              Sign up for future events{' '}
              <a
                href="https://luma.com/calendar/cal-y7Q8MCsPwKeiJ8r?period=past"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                here
              </a>
              . © 2026. All rights reserved.
            </div>
          </footer>
        </main>
      </div>
    </div>
    </TimeRangeProvider>
  );
}

function LearnMoreButton({ onTour }: { onTour: () => void }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const options = [
    {
      label: 'Take the Tour',
      desc: 'Quick walkthrough of the platform',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
      ),
      action: () => { setOpen(false); onTour(); },
    },
    {
      label: 'How Battlecards Work',
      desc: 'Why instant beats static in fast markets',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      action: () => { setOpen(false); router.push('/battlecards/philosophy'); },
    },
    {
      label: 'How TCO Analysis Works',
      desc: 'The methodology behind the numbers',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="12" y2="10" />
          <line x1="8" y1="14" x2="16" y2="14" />
        </svg>
      ),
      action: () => { setOpen(false); router.push('/tco/philosophy'); },
    },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Learn more"
        className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-accent border border-transparent hover:border-border"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span className="hidden lg:inline">Learn</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative w-full max-w-sm mx-4 bg-popover border border-border rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-2 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Explore Intellibot
            </div>
            <div className="py-1">
              {options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={opt.action}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-accent transition-colors text-left"
                >
                  <span className="text-muted-foreground">{opt.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium">{opt.label}</div>
                    <div className="text-[11px] text-muted-foreground">{opt.desc}</div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground shrink-0">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TimeRangeSelector() {
  const { range, setRange } = useTimeRange();
  const [open, setOpen] = useState(false);

  const options: TimeRange[] = ['24h', '7d', '30d', '90d'];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border hover:border-primary/50 bg-secondary/50"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        {TIME_RANGE_LABELS[range]}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 bg-popover border border-border rounded-md shadow-lg py-1 min-w-[140px]">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { setRange(opt); setOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                  opt === range
                    ? 'text-primary font-medium bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {TIME_RANGE_LABELS[opt]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function TcoButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const models = [
    { value: 'seat_based', label: 'Per-Seat', desc: 'Fixed price per user per month', icon: '👤' },
    { value: 'usage_based', label: 'Consumption', desc: 'Pay-per-use: compute, API calls, tokens', icon: '📊' },
    { value: 'hybrid', label: 'Hybrid', desc: 'Base platform fee plus variable usage', icon: '🔀' },
    { value: 'flat_rate', label: 'Flat-Rate', desc: 'Single annual fee regardless of usage', icon: '📋' },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-[12px] font-medium text-dd-teal hover:text-foreground transition-colors px-2 py-1 rounded bg-dd-teal/10 hover:bg-dd-teal/20 border border-dd-teal/30"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="12" y2="10" />
          <line x1="8" y1="14" x2="16" y2="14" />
          <line x1="8" y1="18" x2="12" y2="18" />
        </svg>
        <span className="hidden sm:inline">TCO Analysis</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative w-full max-w-sm mx-4 bg-popover border border-border rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-2 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Select pricing model
            </div>
            <div className="py-1">
              {models.map((m) => (
                <button
                  key={m.value}
                  onClick={() => {
                    setOpen(false);
                    router.push(`/tco?model=${m.value}`);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-accent transition-colors text-left"
                >
                  <span className="text-base">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium">{m.label}</div>
                    <div className="text-[11px] text-muted-foreground">{m.desc}</div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground shrink-0">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BattlecardButton() {
  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState<Array<{ slug: string; name: string; logo: string }>>([]);
  const router = useRouter();

  useEffect(() => {
    if (open && accounts.length === 0) {
      import('@/lib/dal').then(({ getAccounts }) =>
        getAccounts().then((data) =>
          setAccounts(data.map((a) => ({ slug: a.slug, name: a.name, logo: a.logo })))
        )
      );
    }
  }, [open, accounts.length]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-[12px] font-medium text-primary hover:text-primary-foreground transition-colors px-2 py-1 rounded bg-primary/15 hover:bg-primary/25 border border-primary/30"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        <span className="hidden sm:inline">Battlecard</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative w-full max-w-sm mx-4 bg-popover border border-border rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-2 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Select account
            </div>
            <div className="max-h-64 overflow-y-auto">
              {accounts.map((a) => (
                <button
                  key={a.slug}
                  onClick={() => {
                    setOpen(false);
                    router.push(`/account/${a.slug}/battlecard`);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] hover:bg-accent transition-colors text-left"
                >
                  <span>{a.logo}</span>
                  <span className="font-medium">{a.name}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-muted-foreground">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
