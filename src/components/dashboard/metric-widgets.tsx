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
  trendPoints: number;
  winRate: number; winDelta: string;
}> = {
  '24h': { healthMultiplier: 1, healthDelta: '+3.2%', signalCount: 14, signalDelta: '+2', trendPoints: 9, winRate: 68, winDelta: '+4%' },
  '7d':  { healthMultiplier: 0.98, healthDelta: '+1.8%', signalCount: 38, signalDelta: '+11', trendPoints: 14, winRate: 66, winDelta: '+2%' },
  '30d': { healthMultiplier: 0.95, healthDelta: '+5.4%', signalCount: 156, signalDelta: '+42', trendPoints: 20, winRate: 64, winDelta: '+6%' },
  '90d': { healthMultiplier: 0.91, healthDelta: '+12.1%', signalCount: 467, signalDelta: '+134', trendPoints: 24, winRate: 61, winDelta: '+9%' },
};

export function MetricWidgets({ accounts, competitors }: MetricWidgetsProps) {
  const { range } = useTimeRange();
  const cfg = RANGE_CONFIG[range];

  const avgHealth = Math.round(accounts.reduce((s, a) => s + a.healthScore, 0) / accounts.length * cfg.healthMultiplier);
  const totalARR = accounts.reduce((s, a) => s + a.arr, 0);
  const activeThreats = competitors.filter(c => c.threatLevel === 'high').length + (range === '90d' ? 1 : 0);
  const atRisk = accounts.filter(a => a.healthScore < 50).length + (range === '90d' ? 1 : 0);

  const healthBase = [58, 62, 60, 65, 63, 68, 66, 70, 69, 72, 71, 74, 73, 75, 74, 76, 75, 77, 76, 78, 77, 79, 78, avgHealth];
  const arrBase = [8.1, 8.5, 8.8, 9.2, 9.5, 9.8, 10.1, 10.5, 10.8, 11.0, 11.3, 11.4, 11.7, 11.9, 12.0, 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, totalARR / 1_000_000];
  const signalBase = [4, 8, 6, 12, 9, 15, 11, 14, 10, 13, 12, 14, 11, 16, 13, 15, 12, 17, 14, 16, 13, 18, 15, cfg.signalCount];
  const winBase = [52, 54, 55, 57, 58, 56, 59, 60, 58, 61, 62, 60, 63, 62, 64, 63, 65, 64, 66, 65, 67, 66, 68, cfg.winRate];

  const n = cfg.trendPoints;

  const widgets = [
    {
      label: 'Portfolio Health',
      numericValue: avgHealth, prefix: '', suffix: '', decimals: 0,
      delta: atRisk > 0 ? `${atRisk} at risk` : 'All clear',
      deltaUp: atRisk === 0,
      color: '#2ca66c',
      accent: 'widget-green',
      data: fakeTrend(healthBase.slice(-n), 1, n),
    },
    {
      label: 'Total ARR',
      numericValue: totalARR / 1_000_000, prefix: '$', suffix: 'M', decimals: 1,
      delta: range === '24h' ? '+8.1%' : range === '7d' ? '+2.3%' : range === '30d' ? '+8.1%' : '+24.6%',
      deltaUp: true,
      color: '#632CA6',
      accent: 'widget-purple',
      data: fakeTrend(arrBase.slice(-n), 1, n),
    },
    {
      label: 'Active Threats',
      numericValue: activeThreats, prefix: '', suffix: '', decimals: 0,
      delta: `${cfg.signalCount} signals`,
      deltaUp: false,
      color: '#da545b',
      accent: 'widget-red',
      data: fakeTrend(signalBase.slice(-n), 1, n),
    },
    {
      label: 'Win Rate',
      numericValue: cfg.winRate, prefix: '', suffix: '%', decimals: 0,
      delta: cfg.winDelta,
      deltaUp: true,
      color: '#1a8dff',
      accent: 'widget-blue',
      data: fakeTrend(winBase.slice(-n), 1, n),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
