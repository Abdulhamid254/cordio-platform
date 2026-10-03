'use client';

import { ErrorState } from '@/components/ui/state-messages';

export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="space-y-4">
      <ErrorState message="An unexpected error occurred while rendering this page." />
      <button
        onClick={reset}
        className="h-10 rounded-lg bg-lagoon px-4 text-sm font-medium text-white hover:bg-lagoon-600"
      >
        Try again
      </button>
    </div>
  );
}
