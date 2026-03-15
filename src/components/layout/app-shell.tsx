'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GlobalSearch } from './global-search';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: 'home' },
  { href: '/competitors', label: 'Competitors', icon: 'sword' },
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
          ? 'bg-[#632CA6]/20 text-[#a78bfa]'
          : 'text-[#8c86a5] hover:text-[#cdc8e0] hover:bg-[#2a2548]'
      }`}
    >
      {isActive && (
        <div className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-[#632CA6]" />
      )}
      <NavIcon icon={icon} />
      <div className="absolute left-full ml-2 px-2 py-1 rounded bg-[#2a2548] text-xs text-[#e2dff0] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-[#3a3460]">
        {label}
      </div>
    </Link>
  );
}

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboards',
  '/competitors': 'Competitors',
  '/settings': 'Settings',
};

function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === '/') {
    return (
      <div className="flex items-center gap-2 text-[13px]">
        <span className="font-semibold text-foreground">Competitive Intel Overview</span>
        <span className="text-muted-foreground">—</span>
        <span className="text-muted-foreground text-xs">Last 24 hours</span>
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
  return (
    <div className="flex h-screen bg-background">
      {/* Slim icon sidebar */}
      <aside className="w-[52px] border-r border-sidebar-border flex flex-col items-center bg-sidebar shrink-0">
        {/* Logo */}
        <div className="py-3 border-b border-sidebar-border w-full flex justify-center">
          <Link href="/" className="flex items-center justify-center w-8 h-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" fill="#632CA6" />
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-11 border-b border-border flex items-center justify-between px-4 bg-[#1e1a36]">
          <Breadcrumbs />
          <div className="flex items-center gap-2">
            <TimeRangeSelector />
            <GlobalSearch />
            <BattlecardButton />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
          <footer className="border-t border-border py-5 px-4 text-center">
            <div className="flex justify-center mb-2">
              <svg width="48" height="48" viewBox="0 0 100 100" fill="none" className="text-muted-foreground/40">
                <ellipse cx="50" cy="88" rx="22" ry="4" fill="currentColor" opacity="0.3" />
                <path d="M30 75 L30 55 Q30 45 35 40 L35 25 Q35 20 38 20 L38 30 Q40 35 42 35 L42 30 Q42 22 45 18 Q48 15 50 15 Q52 15 55 18 Q58 22 58 30 L58 35 Q60 35 62 30 L62 20 Q65 20 65 25 L65 40 Q70 45 70 55 L70 75 Q70 82 60 83 L40 83 Q30 82 30 75Z" fill="currentColor" />
                <circle cx="42" cy="38" r="3" fill="#231f3e" />
                <circle cx="58" cy="38" r="3" fill="#231f3e" />
                <ellipse cx="50" cy="48" rx="4" ry="2.5" fill="#231f3e" opacity="0.5" />
                <path d="M44 52 Q50 56 56 52" stroke="#231f3e" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
                <path d="M25 70 L20 65 M75 70 L80 65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M40 83 L38 92 M45 83 L44 92 M55 83 L56 92 M60 83 L62 92" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-[11px] text-muted-foreground/60">
              All data is simulated for illustrative purposes only. Made with &lt;3 by Daria for Snacks &amp; Hacks &mdash; 2026.
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

function TimeRangeSelector() {
  return (
    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border hover:border-[#632CA6]/50 bg-secondary/50">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      Past 24h
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
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
        className="flex items-center gap-1.5 text-[12px] font-medium text-[#a78bfa] hover:text-white transition-colors px-2 py-1 rounded bg-[#632CA6]/20 hover:bg-[#632CA6]/30 border border-[#632CA6]/30"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        Battlecard
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative w-full max-w-sm bg-[#231f3e] border border-[#3a3460] rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-2 border-b border-[#3a3460] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
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
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] hover:bg-[#32294f] transition-colors text-left"
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
