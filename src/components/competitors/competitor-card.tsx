'use client';

import { motion } from 'motion/react';
import { ThreatBadge } from '@/components/shared/threat-badge';
import { Sparkline } from '@/components/shared/sparkline';
import type { Competitor } from '@/lib/schemas';

interface CompetitorCardProps {
  competitor: Competitor;
  index: number;
  onClick: () => void;
}

export function CompetitorCard({ competitor, index, onClick }: CompetitorCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="w-full text-left rounded-xl border border-border bg-card p-5 space-y-4 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-lg font-semibold">{competitor.name}</div>
          <div className="text-xs text-muted-foreground">{competitor.shortName}</div>
        </div>
        <ThreatBadge level={competitor.threatLevel} />
      </div>

      <p className="text-sm text-muted-foreground">{competitor.positioning}</p>

      <div className="flex items-center justify-between">
        <Sparkline
          data={competitor.trendData}
          isUp={competitor.trendData[11] > competitor.trendData[0]}
        />
        <div className="text-xs text-muted-foreground">
          {competitor.strengths.length} strengths · {competitor.weaknesses.length} weaknesses
        </div>
      </div>

      {competitor.recentNews.length > 0 && (
        <div className="pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground line-clamp-1">
            Latest: {competitor.recentNews[0].title}
          </div>
        </div>
      )}
    </motion.button>
  );
}
