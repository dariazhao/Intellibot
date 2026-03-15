export default function Loading() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="widget-card h-24 shimmer" />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-5 widget-card h-80 shimmer" />
        <div className="xl:col-span-7 widget-card h-80 shimmer" />
      </div>
      <div className="widget-card h-64 shimmer" />
    </div>
  );
}
