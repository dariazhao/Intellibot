import { SlideShimmer } from '@/components/shared/loading-shimmer';

export default function Loading() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="shimmer h-8 w-64 rounded-lg mb-2" />
      <div className="shimmer h-5 w-96 rounded-lg mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 shimmer h-[500px] rounded-xl" />
        <div className="lg:col-span-8 space-y-6">
          <SlideShimmer />
          <SlideShimmer />
        </div>
      </div>
    </div>
  );
}
