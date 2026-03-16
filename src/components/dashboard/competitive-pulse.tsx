'use client';

import { motion } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import type { Competitor } from '@/lib/schemas';

interface CompetitivePulseProps {
  competitors: Competitor[];
}

const THREAT_COLORS: Record<string, string> = {
  high: '#da545b',
  medium: '#e5a00d',
  low: '#2ca66c',
};

export function CompetitivePulse({ competitors }: CompetitivePulseProps) {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sorted = [...competitors].sort((a, b) => priorityOrder[a.threatLevel] - priorityOrder[b.threatLevel]);

  return (
    <div className="widget-card widget-red">
      <div className="widget-card-header">
        <span>Competitive Pulse</span>
        <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground">
          12-month trend
        </span>
      </div>
      <div className="divide-y divide-border">
        {sorted.map((comp, i) => {
          const chartData = comp.trendData.map((v, idx) => ({ v, idx }));
          const color = THREAT_COLORS[comp.threatLevel];
          const delta = comp.trendData[11] - comp.trendData[0];
          const deltaStr = delta > 0 ? `+${delta}` : `${delta}`;
          const isUp = delta > 0;

          return (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-accent/50 transition-colors"
            >
              {/* Threat dot */}
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: color }}
              />

              {/* Name + positioning */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium">{comp.shortName}</span>
                  <span className="text-[11px] px-1.5 py-0 rounded font-medium" style={{
                    backgroundColor: `${color}20`,
                    color,
                  }}>
                    {comp.threatLevel}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground truncate">{comp.positioning}</div>
              </div>

              {/* Mini area chart */}
              <div className="w-20 h-7 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id={`pulse-${comp.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.[0]) return null;
                        return (
                          <div className="rounded bg-popover border border-border px-2 py-1 text-xs text-popover-foreground shadow-md">
                            <span className="font-mono font-medium">{payload[0].value}</span>
                          </div>
                        );
                      }}
                      cursor={false}
                      allowEscapeViewBox={{ x: true, y: true }}
                    />
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={color}
                      strokeWidth={1.5}
                      fill={`url(#pulse-${comp.id})`}
                      dot={false}
                      activeDot={{ r: 3, strokeWidth: 0, fill: color }}
                      animationDuration={800}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Delta */}
              <div className="text-right shrink-0 w-10">
                <div className="text-[13px] font-mono font-medium">{comp.trendData[11]}</div>
                <div className={`text-[10px] font-medium ${isUp ? 'text-[#da545b]' : 'text-[#2ca66c]'}`}>
                  {deltaStr}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
