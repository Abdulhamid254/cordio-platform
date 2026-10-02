import { AlertTriangle, Inbox } from 'lucide-react';

export function ErrorState({ message }: { message: string }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-panel border border-coral/30 bg-coral-100 p-5 text-coral">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <div>
        <p className="font-medium">We could not load this data</p>
        <p className="mt-1 text-sm">{message}</p>
      </div>
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="flex flex-col items-center rounded-panel border border-dashed border-lagoon-100 bg-white px-6 py-14 text-center">
      <Inbox className="h-8 w-8 text-lagoon" aria-hidden />
      <p className="mt-3 font-medium text-abyss">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{hint}</p>
    </div>
  );
}
