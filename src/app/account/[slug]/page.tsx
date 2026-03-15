import { notFound } from 'next/navigation';
import { getAccountBySlug, getCompetitorsForAccount, getActivitiesForAccount, getSignalsForAccount, getGongTranscripts, getMarketoEvents } from '@/lib/dal';
import { AccountHeader } from '@/components/account/account-header';
import { AiMaturityRadar } from '@/components/account/ai-maturity-radar';
import { GenerateCta } from '@/components/account/generate-cta';
import { AccountTabs } from './account-tabs';

// This is a Next.js 15 dynamic route
export default async function AccountPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const account = await getAccountBySlug(slug);
  if (!account) notFound();

  const [competitors, activities, signals, transcripts, marketoEvents] = await Promise.all([
    getCompetitorsForAccount(account.id),
    getActivitiesForAccount(account.id),
    getSignalsForAccount(account.id),
    getGongTranscripts(account.id),
    getMarketoEvents(account.id),
  ]);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto pb-24">
      <AccountHeader account={account} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AiMaturityRadar maturity={account.aiMaturity} />
        </div>
        <div className="lg:col-span-2">
          <AccountTabs
            competitors={competitors}
            signals={signals}
            activities={activities}
            marketoEvents={marketoEvents}
            transcripts={transcripts}
          />
        </div>
      </div>

      <GenerateCta accountSlug={account.slug} />
    </div>
  );
}
