import { Panel } from '@/components/ui/panel';
import { formatNumber } from '@/lib/format';

interface Props {
  data: { year: number; count: number }[];
}

/** Survey events per year, drawn with plain elements so it stays light and accessible. */
export function SurveyEffortChart({ data }: Props) {
  const max = Math.max(1, ...data.map((d) => d.count));
  const summary = data.length
    ? `Survey events per year from ${data[0].year} to ${data[data.length - 1].year}. Peak of ${formatNumber(max)} events in a year.`
    : 'No survey events recorded.';

  return (
    <Panel title="Survey effort by year">
      {data.length === 0 ? (
        <p className="text-sm text-ink-muted">Survey events will appear here once data is imported.</p>
      ) : (
        <>
          <div role="img" aria-label={summary} className="flex h-48 items-end gap-1 border-b border-lagoon-100">
            {data.map((d) => (
              <div
                key={d.year}
                title={`${d.year}: ${formatNumber(d.count)} events`}
                className="flex-1 rounded-t bg-lagoon transition-colors hover:bg-abyss-600"
                style={{ height: `${Math.max(4, (d.count / max) * 100)}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-sm text-ink-muted" aria-hidden>
            <span>{data[0].year}</span>
            <span>Up to {formatNumber(max)} events in a year</span>
            <span>{data[data.length - 1].year}</span>
          </div>
        </>
      )}
    </Panel>
  );
}
