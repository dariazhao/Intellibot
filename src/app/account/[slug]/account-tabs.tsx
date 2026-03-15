'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompetitiveLandscape } from '@/components/account/competitive-landscape';
import { EngagementTimeline } from '@/components/account/engagement-timeline';
import { GoalsGaps } from '@/components/account/goals-gaps';
import type { Competitor, CompetitorSignal, Activity, MarketoEvent, GongTranscript } from '@/lib/schemas';

interface AccountTabsProps {
  competitors: Competitor[];
  signals: CompetitorSignal[];
  activities: Activity[];
  marketoEvents: MarketoEvent[];
  transcripts: GongTranscript[];
}

export function AccountTabs({ competitors, signals, activities, marketoEvents, transcripts }: AccountTabsProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <Tabs defaultValue="competitive" className="w-full">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="competitive">Competitive Landscape</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Timeline</TabsTrigger>
          <TabsTrigger value="goals">Goals & Gaps</TabsTrigger>
        </TabsList>
        <TabsContent value="competitive" className="mt-4">
          <CompetitiveLandscape competitors={competitors} signals={signals} />
        </TabsContent>
        <TabsContent value="engagement" className="mt-4">
          <EngagementTimeline activities={activities} marketoEvents={marketoEvents} />
        </TabsContent>
        <TabsContent value="goals" className="mt-4">
          <GoalsGaps transcripts={transcripts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
