'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FeatureBadge } from '@/components/shared/feature-badge';
import type { Competitor } from '@/lib/schemas';

interface CompareViewProps {
  competitors: Competitor[];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function CompareView({ competitors }: CompareViewProps) {
  const [leftId, setLeftId] = useState(competitors[0]?.id || '');
  const [rightId, setRightId] = useState(competitors[1]?.id || '');

  const left = competitors.find(c => c.id === leftId);
  const right = competitors.find(c => c.id === rightId);

  if (!left || !right) return null;

  const featureKeys = [...new Set([...Object.keys(left.features), ...Object.keys(right.features)])];
  const chartData = MONTHS.map((m, i) => ({
    month: m,
    [left.shortName]: left.trendData[i],
    [right.shortName]: right.trendData[i],
  }));

  // Our product scores (hardcoded "full" for all)
  const OUR_FEATURES: Record<string, string> = Object.fromEntries(featureKeys.map(k => [k, 'full']));

  return (
    <div className="space-y-6">
      {/* Selectors */}
      <div className="flex items-center gap-4">
        <CompetitorSelect
          value={leftId}
          onChange={setLeftId}
          competitors={competitors}
          excludeId={rightId}
          color="#6c5ce7"
        />
        <span className="text-muted-foreground font-bold text-lg">vs</span>
        <CompetitorSelect
          value={rightId}
          onChange={setRightId}
          competitors={competitors}
          excludeId={leftId}
          color="#1a8dff"
        />
      </div>

      {/* Trend comparison */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-card p-5"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Competitive Momentum (12 months)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="grad-left" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#6c5ce7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="grad-right" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a8dff" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#1a8dff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} width={30} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-lg bg-popover border border-border px-3 py-2 shadow-md text-xs">
                      <div className="font-medium text-foreground mb-1">{label}</div>
                      {payload.map((p, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                          <span className="text-muted-foreground">{p.name}:</span>
                          <span className="font-mono font-medium text-foreground">{p.value}</span>
                        </div>
                      ))}
                    </div>
                  );
                }}
              />
              <Area type="monotone" dataKey={left.shortName} stroke="#6c5ce7" strokeWidth={2} fill="url(#grad-left)" dot={{ r: 3, fill: '#6c5ce7', strokeWidth: 0 }} />
              <Area type="monotone" dataKey={right.shortName} stroke="#1a8dff" strokeWidth={2} fill="url(#grad-right)" dot={{ r: 3, fill: '#1a8dff', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Feature matrix */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border bg-card overflow-hidden"
      >
        <div className="px-5 py-3 border-b border-border">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Capability Matrix: Us vs. Them</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Feature</th>
              <th className="text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider" style={{ color: '#2ca66c' }}>Our Product</th>
              <th className="text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider" style={{ color: '#6c5ce7' }}>{left.shortName}</th>
              <th className="text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider" style={{ color: '#1a8dff' }}>{right.shortName}</th>
            </tr>
          </thead>
          <tbody>
            {featureKeys.map(feature => (
              <tr key={feature} className="border-b border-border/50 last:border-0">
                <td className="px-5 py-2.5 text-muted-foreground">{feature}</td>
                <td className="px-4 py-2.5 text-center"><FeatureBadge level={OUR_FEATURES[feature]} /></td>
                <td className="px-4 py-2.5 text-center"><FeatureBadge level={left.features[feature] || 'none'} /></td>
                <td className="px-4 py-2.5 text-center"><FeatureBadge level={right.features[feature] || 'none'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Strengths & Weaknesses side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CompetitorSWOT competitor={left} color="#6c5ce7" delay={0.2} />
        <CompetitorSWOT competitor={right} color="#1a8dff" delay={0.25} />
      </div>
    </div>
  );
}

function CompetitorSelect({ value, onChange, competitors, excludeId, color }: {
  value: string;
  onChange: (id: string) => void;
  competitors: Competitor[];
  excludeId: string;
  color: string;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="flex-1 rounded-lg border-2 bg-card px-3 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-offset-1"
      style={{ borderColor: color, focusRingColor: color } as React.CSSProperties}
    >
      {competitors.filter(c => c.id !== excludeId).map(c => (
        <option key={c.id} value={c.id}>{c.name} ({c.shortName})</option>
      ))}
    </select>
  );
}

function CompetitorSWOT({ competitor, color, delay }: { competitor: Competitor; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-xl border border-border bg-card p-5 space-y-4"
      style={{ borderTop: `3px solid ${color}` }}
    >
      <h3 className="font-semibold">{competitor.name}</h3>

      <div className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-green-500">Strengths</h4>
        <ul className="space-y-1.5">
          {competitor.strengths.map((s, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-red-500">Weaknesses</h4>
        <ul className="space-y-1.5">
          {competitor.weaknesses.map((w, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              {w}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
