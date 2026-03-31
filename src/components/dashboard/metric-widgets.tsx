'use client';

import { motion } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { useTimeRange, type TimeRange } from '@/lib/time-range-context';
import type { Account, Competitor } from '@/lib/schemas';

interface MetricWidgetsProps {
  accounts: Account[];
  competitors: Competitor[];
}

// Seed-based pseudo-random for consistent fake data per range
function fakeTrend(base: number[], scale: number, points: number): { v: number; i: number }[] {
  const out: { v: number; i: number }[] = [];
  for (let i = 0; i < points; i++) {
    const idx = Math.min(i, base.length - 1);
    const jitter = ((i * 7 + 3) % 5 - 2) * scale * 0.05;
    out.push({ v: Math.round((base[idx] * scale + jitter) * 10) / 10, i });
  }
  return out;
}

const RANGE_CONFIG: Record<TimeRange, {
  healthMultiplier: number; healthDelta: string;
  signalCount: number; signalDelta: string;
  battlecardCount: number; battlecardDelta: string;
  trendPoints: number;
}> = {
  '24h': { healthMultiplier: 1, healthDelta: '+3.2%', signalCount: 14, signalDelta: '+2', battlecardCount: 47, battlecardDelta: '+12 this week', trendPoints: 9 },
  '7d':  { healthMultiplier: 0.98, healthDelta: '+1.8%', signalCount: 38, signalDelta: '+11', battlecardCount: 112, battlecardDelta: '+47 this week', trendPoints: 14 },
  '30d': { healthMultiplier: 0.95, healthDelta: '+5.4%', signalCount: 156, signalDelta: '+42', battlecardCount: 384, battlecardDelta: '+89 this month', trendPoints: 20 },
  '90d': { healthMultiplier: 0.91, healthDelta: '+12.1%', signalCount: 467, signalDelta: '+134', battlecardCount: 1024, battlecardDelta: '+312 this quarter', trendPoints: 24 },
};

export function MetricWidgets({ accounts, competitors }: MetricWidgetsProps) {
  const { range } = useTimeRange();
  const cfg = RANGE_CONFIG[range];

  const avgHealth = Math.round(accounts.reduce((s, a) => s + a.healthScore, 0) / accounts.length * cfg.healthMultiplier);
  const highThreats = competitors.filter(c => c.threatLevel === 'high').length;
  const totalARR = accounts.reduce((s, a) => s + a.arr, 0);
  const atRiskAccounts = accounts.filter(a => a.healthScore < 50).length + (range === '90d' ? 1 : 0);

  const healthBase = [58, 62, 60, 65, 63, 68, 66, 70, 69, 72, 71, 74, 73, 75, 74, 76, 75, 77, 76, 78, 77, 79, 78, avgHealth];
  const arrBase = [8.1, 8.5, 8.8, 9.2, 9.5, 9.8, 10.1, 10.5, 10.8, 11.0, 11.3, 11.4, 11.7, 11.9, 12.0, 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, totalARR / 1_000_000];
  const signalBase = [4, 8, 6, 12, 9, 15, 11, 14, 10, 13, 12, 14, 11, 16, 13, 15, 12, 17, 14, 16, 13, 18, 15, cfg.signalCount];
  const battlecardBase = [12, 18, 22, 28, 31, 35, 38, 41, 44, 45, 47, 52, 58, 64, 70, 76, 82, 88, 94, 100, 106, 112, 118, cfg.battlecardCount];

  const n = cfg.trendPoints;
  const healthTrend = fakeTrend(healthBase.slice(-n), 1, n);
  const arrTrend = fakeTrend(arrBase.slice(-n), 1, n);
  const signalTrend = fakeTrend(signalBase.slice(-n), 1, n);
  const battlecardTrend = fakeTrend(battlecardBase.slice(-n), 1, n);

  const widgets = [
    {
      label: 'Avg Health Score',
      numericValue: avgHealth, prefix: '', suffix: '', decimals: 0,
      delta: cfg.healthDelta,
      deltaUp: true,
      color: '#2ca66c',
      accent: 'widget-green',
      data: healthTrend,
    },
    {
      label: 'Total ARR',
      numericValue: totalARR / 1_000_000, prefix: '$', suffix: 'M', decimals: 1,
      delta: range === '24h' ? '+8.1%' : range === '7d' ? '+2.3%' : range === '30d' ? '+8.1%' : '+24.6%',
      deltaUp: true,
      color: '#632CA6',
      accent: 'widget-purple',
      data: arrTrend,
    },
    {
      label: 'Active Signals',
      numericValue: cfg.signalCount, prefix: '', suffix: '', decimals: 0,
      delta: cfg.signalDelta,
      deltaUp: true,
      color: '#1a8dff',
      accent: 'widget-blue',
      data: signalTrend,
    },
    {
      label: 'High Threats',
      numericValue: highThreats + (range === '90d' ? 1 : 0), prefix: '', suffix: '', decimals: 0,
      delta: highThreats > 1 ? 'Active' : 'Low',
      deltaUp: false,
      color: '#da545b',
      accent: 'widget-red',
      data: signalTrend,
    },
    {
      label: 'At-Risk Accounts',
      numericValue: atRiskAccounts, prefix: '', suffix: '', decimals: 0,
      delta: atRiskAccounts > 0 ? 'Needs attention' : 'Clear',
      deltaUp: false,
      color: '#e5a00d',
      accent: 'widget-yellow',
      data: healthTrend,
    },
    {
      label: 'Battlecards Generated',
      numericValue: cfg.battlecardCount, prefix: '', suffix: '', decimals: 0,
      delta: cfg.battlecardDelta,
      deltaUp: true,
      color: '#17b8be',
      accent: 'widget-teal',
      data: battlecardTrend,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {widgets.map((w, i) => (
        <motion.div
          key={w.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          className={`widget-card ${w.accent} overflow-hidden`}
        >
          <div className="px-3 pt-3 pb-0">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {w.label}
            </div>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold leading-none">
                <AnimatedCounter target={w.numericValue} prefix={w.prefix} suffix={w.suffix} decimals={w.decimals} />
              </span>
              <span
                className={`text-[11px] font-medium leading-none mb-0.5 ${
                  w.deltaUp ? 'text-[#2ca66c]' : 'text-muted-foreground'
                }`}
              >
                {w.delta}
              </span>
            </div>
          </div>
          <div className="h-10 mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={w.data}>
                <defs>
                  <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={w.color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={w.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={w.color}
                  strokeWidth={1.5}
                  fill={`url(#grad-${i})`}
                  dot={false}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
