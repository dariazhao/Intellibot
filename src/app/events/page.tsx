import { getRecentActivities } from '@/lib/dal';
import { EventsView } from './events-view';

export default async function EventsPage() {
  const activities = await getRecentActivities(50);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Event Stream</h1>
        <p className="text-muted-foreground mt-1">
          Real-time competitive intelligence, customer signals, and prospect activity
        </p>
      </div>

      <EventsView activities={activities} />
    </div>
  );
}
