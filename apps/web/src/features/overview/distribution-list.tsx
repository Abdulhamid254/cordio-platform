import { Panel } from '@/components/ui/panel';
import { formatNumber } from '@/lib/format';

interface Props {
  title: string;
  rows: { label: string; count: number }[];
}

export function DistributionList({ title, rows }: Props) {
  const max = Math.max(1, ...rows.map((r) => r.count));

  return (
    <Panel title={title}>
      {rows.length === 0 ? (
        <p className="text-sm text-ink-muted">Nothing to show yet.</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => (
            <li key={row.label}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-ink">{row.label}</span>
                <span className="tabular-nums text-ink-muted">{formatNumber(row.count)}</span>
              </div>
              <div className="h-2 rounded-full bg-shoal" aria-hidden>
                <div className="h-2 rounded-full bg-lagoon" style={{ width: `${(row.count / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
