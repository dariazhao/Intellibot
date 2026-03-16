import { getCompetitors } from '@/lib/dal';
import { CompareView } from './compare-view';

export default async function ComparePage() {
  const competitors = await getCompetitors();

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Competitor Comparison</h1>
        <p className="text-muted-foreground mt-1">
          Side-by-side feature matrix, strengths, and trend analysis
        </p>
      </div>
      <CompareView competitors={competitors} />
    </div>
  );
}
