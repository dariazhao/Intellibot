'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useTimeRange } from '@/lib/time-range-context';
import type { Activity } from '@/lib/schemas';

interface ActivityFeedProps {
  activities: Activity[];
}

const SOURCE_CONFIG: Record<string, { color: string; label: string }> = {
  gong_call: { color: '#632CA6', label: 'GONG' },
  marketo_email: { color: '#1a8dff', label: 'MARKETO' },
  salesforce_meeting: { color: '#2ca66c', label: 'SFDC' },
  salesforce_note: { color: '#e5a00d', label: 'SFDC' },
  competitor_alert: { color: '#da545b', label: 'ALERT' },
  competitor_news: { color: '#f2762e', label: 'NEWS' },
};

const ENTITY_CONFIG: Record<string, { color: string; label: string }> = {
  customer: { color: '#2ca66c', label: 'CUSTOMER' },
  prospect: { color: '#1a8dff', label: 'PROSPECT' },
  competitor: { color: '#da545b', label: 'COMPETITOR' },
};

function getEntityType(activity: Activity): string {
  if (activity.type === 'competitor_alert' || activity.type === 'competitor_news') return 'competitor';
  if (activity.metadata?.entity) return activity.metadata.entity;
  return 'customer';
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const { range } = useTimeRange();

  const visibleCount = range === '24h' ? 5 : range === '7d' ? 6 : range === '30d' ? 7 : 8;
  const totalCount = range === '24h' ? 8 : range === '7d' ? 12 : range === '30d' ? 20 : activities.length;
  const visibleActivities = activities.slice(0, visibleCount);

  return (
    <div className="widget-card widget-blue">
      <div className="widget-card-header">
        <span>Event Stream</span>
        <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground">
          {totalCount} events
        </span>
      </div>
      <div className="divide-y divide-border">
        {visibleActivities.map((activity, i) => {
          const source = SOURCE_CONFIG[activity.type] || { color: '#8c86a5', label: 'EVENT' };
          const entityType = getEntityType(activity);
          const entity = ENTITY_CONFIG[entityType] || ENTITY_CONFIG.customer;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03, duration: 0.2 }}
              className="flex items-start gap-2.5 px-3 py-2.5 hover:bg-accent/50 transition-colors"
            >
              {/* Entity tag (CUSTOMER / PROSPECT / COMPETITOR) */}
              <span
                className="shrink-0 mt-0.5 text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${entity.color}18`,
                  color: entity.color,
                }}
              >
                {entity.label}
              </span>

              {/* Source tag */}
              <span
                className="shrink-0 mt-0.5 text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${source.color}18`,
                  color: source.color,
                }}
              >
                {source.label}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-[13px]">
                  <span className="font-medium">{activity.title}</span>
                  {activity.metadata?.newsSource && (
                    <span className="text-[11px] text-muted-foreground ml-1.5">
                      via {activity.metadata.newsSource}
                    </span>
                  )}
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
      {totalCount > visibleCount && (
        <Link
          href="/events"
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium text-primary hover:text-primary/80 hover:bg-accent/50 transition-colors border-t border-border"
        >
          View all {totalCount} events
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      )}
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
