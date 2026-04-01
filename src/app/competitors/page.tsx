import { getCompetitors } from '@/lib/dal';
import { CompetitorGrid } from '@/components/competitors/competitor-grid';

export default async function CompetitorsPage() {
  const competitors = await getCompetitors();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Competitor Intel</h1>
        <p className="text-muted-foreground mt-1">
          Threat assessments, positioning, and market intelligence on {competitors.length} competitors
        </p>
      </div>
      <CompetitorGrid competitors={competitors} />
    </div>
  );
}
