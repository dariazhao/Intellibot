import { getAccounts, getCompetitors, getTcoCostProfiles } from '@/lib/dal';
import { TcoWizard } from '@/components/tco/tco-wizard';

export default async function TcoPage({ searchParams }: { searchParams: Promise<{ model?: string }> }) {
  const [accounts, competitors, costProfiles, params] = await Promise.all([
    getAccounts(),
    getCompetitors(),
    getTcoCostProfiles(),
    searchParams,
  ]);

  const validModels = ['seat_based', 'usage_based', 'hybrid', 'flat_rate'] as const;
  const initialModel = validModels.includes(params.model as typeof validModels[number])
    ? (params.model as typeof validModels[number])
    : undefined;

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">TCO Analysis</h1>
        <p className="text-muted-foreground mt-1">
          Build a Total Cost of Ownership comparison to quantify our advantage and accelerate your deal.
        </p>
      </div>
      <TcoWizard
        accounts={accounts}
        competitors={competitors}
        costProfiles={costProfiles}
        initialPricingModel={initialModel}
      />
    </div>
  );
}
