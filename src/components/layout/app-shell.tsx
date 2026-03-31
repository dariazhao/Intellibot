'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GlobalSearch } from './global-search';
import { NotificationBell } from './notification-bell';
import { WelcomeTour } from '@/components/onboarding/welcome-tour';
import { TimeRangeProvider, useTimeRange, TIME_RANGE_LABELS, type TimeRange } from '@/lib/time-range-context';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: 'home' },
  { href: '/competitors', label: 'Competitors', icon: 'sword' },
  { href: '/compare', label: 'Compare', icon: 'compare' },
  { href: '/battlecards', label: 'Battlecards', icon: 'bolt' },
  { href: '/events', label: 'Event Stream', icon: 'stream' },
  { href: '/settings', label: 'Settings', icon: 'gear' },
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
  '/': 'Dashboards',
  '/competitors': 'Competitors',
  '/compare': 'Compare',
  '/battlecards': 'Battlecards',
  '/events': 'Event Stream',
  '/settings': 'Settings',
};

function Breadcrumbs() {
  const pathname = usePathname();
  const { range } = useTimeRange();

  if (pathname === '/') {
    return (
      <div className="flex items-center gap-2 text-[13px]">
        <span className="font-semibold text-foreground">Competitive Intel Overview</span>
        <span className="text-muted-foreground hidden sm:inline">—</span>
        <span className="text-muted-foreground text-xs hidden sm:inline">{TIME_RANGE_LABELS[range]}</span>
      </div>
    );
  }

  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = PAGE_TITLES[href] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { label, href: index < segments.length - 1 ? href : undefined };
  });

  return (
    <div className="flex items-center gap-1.5 text-[13px]">
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
          {NAV_ITEMS.map((item) => (
            <IconNavLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
          ))}
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
            <RetakeTourButton onClick={openTour} />
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
              Made with ♥️ by Daria Zhao for the SF PMM community.
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
              .
              <br />
              © 2026. All rights reserved.
            </div>
          </footer>
        </main>
      </div>
    </div>
    </TimeRangeProvider>
  );
}

function RetakeTourButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title="Retake Welcome Tour"
      className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-accent border border-transparent hover:border-border"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.174 6.812a1 1 0 00-3.986-3.987L3.842 16.174a2 2 0 00-.5.83l-1.321 4.352a.5.5 0 00.623.622l4.353-1.32a2 2 0 00.83-.497z" />
        <path d="M15 5l4 4" />
      </svg>
      <span className="hidden lg:inline">Retake Tour</span>
    </button>
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
        <span className="hidden sm:inline">Generate Battlecard</span>
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
