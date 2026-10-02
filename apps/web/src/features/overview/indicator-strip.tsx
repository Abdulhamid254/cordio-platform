import { formatNumber } from '@/lib/format';
import type { OverviewStats } from '@/types/api';

export function IndicatorStrip({ totals }: { totals: OverviewStats['totals'] }) {
  const span =
    totals.firstSurveyYear && totals.latestSurveyYear
      ? `${totals.firstSurveyYear} to ${totals.latestSurveyYear}`
      : 'No surveys yet';

  const items = [
    { label: 'Projects', value: formatNumber(totals.projects) },
    { label: 'Monitoring sites', value: formatNumber(totals.sites), note: `in ${totals.countries} countries` },
    { label: 'Survey events', value: formatNumber(totals.surveyEvents), note: span },
    { label: 'Observations', value: formatNumber(totals.observations) },
  ];

  return (
    <dl className="grid grid-cols-2 divide-lagoon-100 overflow-hidden rounded-panel border border-lagoon-100 bg-white md:grid-cols-4 md:divide-x">
      {items.map((item) => (
        <div key={item.label} className="border-b border-lagoon-100 p-5 md:border-b-0">
          <dt className="text-sm text-ink-muted">{item.label}</dt>
          <dd className="mt-1 font-display text-3xl font-semibold text-abyss">{item.value}</dd>
          {item.note && <p className="mt-0.5 text-sm text-ink-muted">{item.note}</p>}
        </div>
      ))}
    </dl>
  );
}
