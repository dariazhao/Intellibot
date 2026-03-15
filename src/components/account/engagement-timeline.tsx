'use client';

import { motion } from 'motion/react';
import { ActivityIcon } from '@/components/shared/activity-icon';
import type { Activity, MarketoEvent } from '@/lib/schemas';

interface EngagementTimelineProps {
  activities: Activity[];
  marketoEvents: MarketoEvent[];
}

export function EngagementTimeline({ activities, marketoEvents }: EngagementTimelineProps) {
  // Combine and sort by date
  const combined = [
    ...activities.map(a => ({
      id: a.id, type: a.type, title: a.title,
      description: a.description, date: a.date, source: 'activity' as const
    })),
    ...marketoEvents.map(e => ({
      id: e.id, type: 'marketo_email' as const, title: e.title,
      description: `Score: ${e.score} · ${e.type.replace(/_/g, ' ')}`, date: e.date, source: 'marketo' as const
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-1">
      <div className="relative pl-8">
        {/* Timeline line */}
        <div className="absolute left-3.5 top-0 bottom-0 w-px bg-border" />

        {combined.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="relative pb-4"
          >
            <div className="absolute -left-8 top-0">
              <ActivityIcon type={item.type} />
            </div>
            <div className="rounded-lg border border-border bg-card/50 p-3 ml-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.title}</span>
                <time className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
