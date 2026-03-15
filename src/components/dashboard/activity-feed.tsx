'use client';

import { motion } from 'motion/react';
import type { Activity } from '@/lib/schemas';

interface ActivityFeedProps {
  activities: Activity[];
}

const TYPE_CONFIG: Record<string, { color: string; label: string }> = {
  gong_call: { color: '#632CA6', label: 'GONG' },
  marketo_email: { color: '#1a8dff', label: 'MARKETO' },
  salesforce_meeting: { color: '#2ca66c', label: 'SFDC' },
  salesforce_note: { color: '#e5a00d', label: 'SFDC' },
  competitor_alert: { color: '#da545b', label: 'ALERT' },
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="widget-card widget-blue">
      <div className="widget-card-header">
        <span>Event Stream</span>
        <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground">
          {activities.length} events
        </span>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity, i) => {
          const config = TYPE_CONFIG[activity.type] || { color: '#8c86a5', label: 'EVENT' };
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03, duration: 0.2 }}
              className="flex items-start gap-3 px-3 py-2.5 hover:bg-accent/50 transition-colors"
            >
              {/* Source tag */}
              <span
                className="shrink-0 mt-0.5 text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${config.color}18`,
                  color: config.color,
                }}
              >
                {config.label}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-[13px]">
                  <span className="font-medium">{activity.title}</span>
                </div>
                <div className="text-[11px] text-muted-foreground truncate mt-0.5">
                  {activity.description}
                </div>
              </div>

              {/* Timestamp */}
              <time className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0 mt-0.5">
                {formatTimestamp(activity.date)}
              </time>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function formatTimestamp(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
