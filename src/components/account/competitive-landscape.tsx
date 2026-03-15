'use client';

import { motion } from 'motion/react';
import { ThreatBadge } from '@/components/shared/threat-badge';
import { Sparkline } from '@/components/shared/sparkline';
import type { Competitor, CompetitorSignal } from '@/lib/schemas';

interface CompetitiveLandscapeProps {
  competitors: Competitor[];
  signals: CompetitorSignal[];
}

export function CompetitiveLandscape({ competitors, signals }: CompetitiveLandscapeProps) {
  return (
    <div className="space-y-4">
      {competitors.length === 0 ? (
        <p className="text-sm text-muted-foreground">No competitors detected for this account.</p>
      ) : (
        <div className="space-y-3">
          {competitors.map((comp, i) => {
            const compSignals = signals.filter(s => s.competitorId === comp.id);
            return (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-border bg-card/50 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{comp.name}</span>
                    <span className="text-xs text-muted-foreground">({comp.shortName})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkline data={comp.trendData} isUp={comp.trendData[11] > comp.trendData[0]} />
                    <ThreatBadge level={comp.threatLevel} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{comp.positioning}</p>
                {compSignals.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Recent Signals</span>
                    {compSignals.slice(0, 3).map(signal => (
                      <div key={signal.id} className="flex items-center gap-2 text-xs">
                        <SignalDot level={signal.threatLevel} />
                        <span className="text-muted-foreground">{signal.detail}</span>
                        <span className="ml-auto text-muted-foreground/60">{signal.date}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SignalDot({ level }: { level: string }) {
  const colors: Record<string, string> = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };
  return <div className={`w-1.5 h-1.5 rounded-full ${colors[level] || 'bg-gray-500'}`} />;
}
