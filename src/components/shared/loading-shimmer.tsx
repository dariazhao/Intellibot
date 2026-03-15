export function LoadingShimmer({ className = '' }: { className?: string }) {
  return <div className={`shimmer rounded-lg ${className}`} />;
}

export function CardShimmer() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <LoadingShimmer className="h-4 w-2/3" />
      <LoadingShimmer className="h-3 w-full" />
      <LoadingShimmer className="h-3 w-4/5" />
      <div className="flex gap-2 pt-2">
        <LoadingShimmer className="h-6 w-16 rounded-full" />
        <LoadingShimmer className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function SlideShimmer() {
  return (
    <div className="slide-16-9 rounded-xl border border-border bg-card p-8 space-y-6">
      <LoadingShimmer className="h-6 w-1/2" />
      <div className="space-y-3">
        <LoadingShimmer className="h-4 w-full" />
        <LoadingShimmer className="h-4 w-5/6" />
        <LoadingShimmer className="h-4 w-4/5" />
        <LoadingShimmer className="h-4 w-3/4" />
      </div>
    </div>
  );
}
