import { notFound } from 'next/navigation';
import { getAccountBySlug, getCompetitorsForAccount } from '@/lib/dal';
import { BattlecardGenerator } from './battlecard-generator';

export default async function BattlecardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const account = await getAccountBySlug(slug);
  if (!account) notFound();

  const competitors = await getCompetitorsForAccount(account.id);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Generate Battlecard</h1>
        <p className="text-muted-foreground mt-1">
          {account.name} &middot; AI-powered competitive slides and talk tracks
        </p>
      </div>

      <BattlecardGenerator account={account} competitors={competitors} />
    </div>
  );
}
