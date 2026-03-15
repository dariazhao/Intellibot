import { getCompetitors, getRecentActivities, getAccounts } from '@/lib/dal';
import { CompetitivePulse } from '@/components/dashboard/competitive-pulse';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { AccountsTable } from '@/components/dashboard/accounts-table';
import { MetricWidgets } from '@/components/dashboard/metric-widgets';

export default async function DashboardPage() {
  const [competitors, activities, accounts] = await Promise.all([
    getCompetitors(),
    getRecentActivities(15),
    getAccounts(),
  ]);

  return (
    <div className="p-4 space-y-4">
      {/* Top metric widgets row */}
      <MetricWidgets accounts={accounts} competitors={competitors} />

      {/* Middle row: competitive pulse + accounts table */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-5">
          <CompetitivePulse competitors={competitors} />
        </div>
        <div className="xl:col-span-7">
          <AccountsTable accounts={accounts} />
        </div>
      </div>

      {/* Bottom row: activity event stream */}
      <ActivityFeed activities={activities} />
    </div>
  );
}
