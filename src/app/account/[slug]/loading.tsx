import { CardShimmer } from '@/components/shared/loading-shimmer';

export default function Loading() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="shimmer h-32 rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="shimmer h-80 rounded-xl" />
        <div className="lg:col-span-2 shimmer h-80 rounded-xl" />
      </div>
    </div>
  );
}
