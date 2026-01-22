export default function SkeletonCard() {
  return (
    <div className="rounded-xl border p-4 animate-pulse space-y-3">
      <div className="h-3 w-24 bg-gray-200 rounded" />
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
      <div className="h-3 w-full bg-gray-200 rounded" />
      <div className="h-3 w-5/6 bg-gray-200 rounded" />
    </div>
  );
}
