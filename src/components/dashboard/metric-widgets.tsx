'use client';

import { motion } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import type { Account, Competitor } from '@/lib/schemas';

interface MetricWidgetsProps {
  accounts: Account[];
  competitors: Competitor[];
}

export function MetricWidgets({ accounts, competitors }: MetricWidgetsProps) {
  const avgHealth = Math.round(accounts.reduce((s, a) => s + a.healthScore, 0) / accounts.length);
  const highThreats = competitors.filter(c => c.threatLevel === 'high').length;
  const totalARR = accounts.reduce((s, a) => s + a.arr, 0);
  const atRiskAccounts = accounts.filter(a => a.healthScore < 50).length;

  // Fake trend data for the mini area charts
  const healthTrend = [68, 70, 69, 72, 71, 74, 73, 75, avgHealth].map((v, i) => ({ v, i }));
  const arrTrend = [9.2, 9.8, 10.1, 10.5, 11.0, 11.4, 11.9, 12.2, totalARR / 1_000_000].map((v, i) => ({ v, i }));
  const signalTrend = [8, 12, 9, 15, 11, 14, 10, 13, 14].map((v, i) => ({ v, i }));
  const battlecardTrend = [22, 28, 31, 35, 38, 41, 44, 45, 47].map((v, i) => ({ v, i }));

  const widgets = [
    {
      label: 'Avg Health Score',
      value: avgHealth.toString(),
      delta: '+3.2%',
      deltaUp: true,
      color: '#2ca66c',
      accent: 'widget-green',
      data: healthTrend,
    },
    {
      label: 'Total ARR',
      value: `$${(totalARR / 1_000_000).toFixed(1)}M`,
      delta: '+8.1%',
      deltaUp: true,
      color: '#632CA6',
      accent: 'widget-purple',
      data: arrTrend,
    },
    {
      label: 'Active Signals',
      value: '14',
      delta: '+2',
      deltaUp: true,
      color: '#1a8dff',
      accent: 'widget-blue',
      data: signalTrend,
    },
    {
      label: 'High Threats',
      value: highThreats.toString(),
      delta: highThreats > 1 ? 'Active' : 'Low',
      deltaUp: false,
      color: '#da545b',
      accent: 'widget-red',
      data: signalTrend,
    },
    {
      label: 'At-Risk Accounts',
      value: atRiskAccounts.toString(),
      delta: atRiskAccounts > 0 ? 'Needs attention' : 'Clear',
      deltaUp: false,
      color: '#e5a00d',
      accent: 'widget-yellow',
      data: healthTrend,
    },
    {
      label: 'Battlecards Generated',
      value: '47',
      delta: '+12 this week',
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
              <span className="text-2xl font-bold leading-none">{w.value}</span>
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
