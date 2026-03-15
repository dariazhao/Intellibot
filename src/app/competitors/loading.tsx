import { CardShimmer } from '@/components/shared/loading-shimmer';

export default function Loading() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="shimmer h-8 w-64 rounded-lg" />
      <div className="shimmer h-5 w-96 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => <CardShimmer key={i} />)}
      </div>
    </div>
  );
}
