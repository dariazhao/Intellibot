'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useTimeRange } from '@/lib/time-range-context';
import type { Competitor } from '@/lib/schemas';

interface DealAssistProps {
  competitors: Competitor[];
  accountCount: number;
}

interface ActionItem {
  href: string;
  label: string;
  desc: string;
  stat: string;
  color: string;
  icon: React.ReactNode;
}

export function DealAssist({ competitors, accountCount }: DealAssistProps) {
  const { range } = useTimeRange();

  const battlecardCount = range === '24h' ? 47 : range === '7d' ? 112 : range === '30d' ? 384 : 1024;
  const tcoAnalyses = range === '24h' ? 8 : range === '7d' ? 23 : range === '30d' ? 61 : 142;
  const highThreats = competitors.filter(c => c.threatLevel === 'high').length;

  const winActions: ActionItem[] = [
    {
      href: '/battlecards',
      label: 'Battlecards',
      desc: 'AI-generated talking points for your next call',
      stat: `${battlecardCount} generated`,
      color: '#632CA6',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    },
    {
      href: '/tco',
      label: 'TCO Analysis',
      desc: 'Quantify your cost advantage',
      stat: `${tcoAnalyses} analyses`,
      color: '#17b8be',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="12" y2="10" /><line x1="8" y1="14" x2="16" y2="14" /></svg>,
    },
    {
      href: '/compare',
      label: 'Head-to-Head',
      desc: 'Feature matrix against top rivals',
      stat: `${highThreats} high-threat`,
      color: '#1a8dff',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="8" height="18" rx="1" /><rect x="13" y="3" width="8" height="18" rx="1" /></svg>,
    },
  ];

  const intelActions: ActionItem[] = [
    {
      href: '/competitors',
      label: 'Competitor Intel',
      desc: 'Profiles, threats, and positioning',
      stat: `${competitors.length} tracked`,
      color: '#e5a00d',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
    },
    {
      href: '/events',
      label: 'Event Stream',
      desc: 'Real-time market intelligence',
      stat: 'Live feed',
      color: '#da545b',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4" /><path d="M18 12h4" /><path d="M6 8v8" /><path d="M10 5v14" /><path d="M14 7v10" /><path d="M18 10v4" /></svg>,
    },
  ];

  return (
    <div className="widget-card widget-teal">
      <div className="widget-card-header">
        <span>Quick Actions</span>
      </div>
      <div className="p-2.5 space-y-1">
        {/* Win the Deal group */}
        <div className="px-3 pt-1.5 pb-0.5">
          <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#632CA6' }}>Win the Deal</span>
        </div>
        {winActions.map((action, i) => (
          <ActionRow key={action.href} action={action} delay={i * 0.05} />
        ))}

        {/* Divider */}
        <div className="px-3 py-1"><div className="h-px bg-border" /></div>

        {/* Know the Market group */}
        <div className="px-3 pt-0.5 pb-0.5">
          <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#1a8dff' }}>Know the Market</span>
        </div>
        {intelActions.map((action, i) => (
          <ActionRow key={action.href} action={action} delay={(i + 3) * 0.05} />
        ))}
      </div>
    </div>
  );
}

function ActionRow({ action, delay }: { action: ActionItem; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.25 }}
    >
      <Link
        href={action.href}
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-transparent hover:border-border hover:bg-accent/50 transition-all group"
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${action.color}15`, color: action.color }}
        >
          {action.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold group-hover:text-foreground transition-colors">{action.label}</span>
            <span className="text-[10px] text-muted-foreground font-medium">{action.stat}</span>
          </div>
          <div className="text-[11px] text-muted-foreground truncate">{action.desc}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </Link>
    </motion.div>
  );
}
