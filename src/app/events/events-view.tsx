'use client';

import { useState } from 'react';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import type { Activity } from '@/lib/schemas';

const FILTERS = ['All Events', 'Customer', 'Prospect', 'Competitor'] as const;
type Filter = (typeof FILTERS)[number];

function getEntityType(activity: Activity): string {
  if (activity.type === 'competitor_alert' || activity.type === 'competitor_news') return 'competitor';
  if (activity.metadata?.entity) return activity.metadata.entity;
  return 'customer';
}

export function EventsView({ activities }: { activities: Activity[] }) {
  const [filter, setFilter] = useState<Filter>('All Events');

  const filtered = filter === 'All Events'
    ? activities
    : activities.filter((a) => getEntityType(a) === filter.toLowerCase());

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
              filter === f
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ActivityFeed activities={filtered} />
    </>
  );
}
