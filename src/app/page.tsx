import { getCompetitors, getRecentActivities, getAccounts } from '@/lib/dal';
import { CompetitivePulse } from '@/components/dashboard/competitive-pulse';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { AccountsTable } from '@/components/dashboard/accounts-table';
import { MetricWidgets } from '@/components/dashboard/metric-widgets';
import { DealAssist } from '@/components/dashboard/deal-assist';

export default async function DashboardPage() {
  const [competitors, activities, accounts] = await Promise.all([
    getCompetitors(),
    getRecentActivities(15),
    getAccounts(),
  ]);

  return (
    <div className="p-4 space-y-4">
      {/* Top: 4 metric widgets */}
      <MetricWidgets accounts={accounts} competitors={competitors} />

      {/* Middle: Deal Assist + Account Portfolio */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-4">
          <DealAssist competitors={competitors} accountCount={accounts.length} />
        </div>
        <div className="xl:col-span-8">
          <AccountsTable accounts={accounts} />
        </div>
      </div>

      {/* Bottom: Competitive Pulse + Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-5">
          <CompetitivePulse competitors={competitors} />
        </div>
        <div className="xl:col-span-7">
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
}
