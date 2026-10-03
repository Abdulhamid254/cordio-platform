export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="space-y-4">
      <span className="sr-only">Loading data</span>
      <div className="h-9 w-56 animate-pulse rounded-lg bg-shoal" />
      <div className="h-28 animate-pulse rounded-panel bg-shoal" />
      <div className="h-64 animate-pulse rounded-panel bg-shoal" />
    </div>
  );
}
