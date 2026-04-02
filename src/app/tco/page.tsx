import Link from 'next/link';
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

      <div className="text-center pt-2">
        <Link
          href="/tco/philosophy"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          How TCO Analysis works
        </Link>
      </div>
    </div>
  );
}
