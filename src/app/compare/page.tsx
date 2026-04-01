import { getCompetitors } from '@/lib/dal';
import { CompareView } from './compare-view';

export default async function ComparePage() {
  const competitors = await getCompetitors();

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Head-to-Head</h1>
        <p className="text-muted-foreground mt-1">
          Stack our product against the competition in active deals. Feature matrix, strengths, weaknesses, and market momentum to sharpen your positioning.
        </p>
      </div>
      <CompareView competitors={competitors} />
    </div>
  );
}
