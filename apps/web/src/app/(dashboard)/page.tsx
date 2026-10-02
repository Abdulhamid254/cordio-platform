import { ErrorState } from '@/components/ui/state-messages';
import { PageHeader } from '@/components/ui/page-header';
import { DistributionList } from '@/features/overview/distribution-list';
import { IndicatorStrip } from '@/features/overview/indicator-strip';
import { SurveyEffortChart } from '@/features/overview/survey-effort-chart';
import { ApiError, apiGet } from '@/lib/api';
import { formatHabitat } from '@/lib/format';
import type { OverviewStats } from '@/types/api';

export const metadata = { title: 'Overview' };

export default async function OverviewPage() {
  let stats: OverviewStats;
  try {
    stats = await apiGet<OverviewStats>('/dashboard/overview');
  } catch (err) {
    const message = err instanceof ApiError ? err.message : 'Something went wrong.';
    return (
      <>
        <PageHeader title="Overview" />
        <ErrorState message={message} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Overview"
        description="Research and conservation records collected across the Western Indian Ocean."
      />
      <div className="space-y-6">
        <IndicatorStrip totals={stats.totals} />
        <SurveyEffortChart data={stats.surveysPerYear} />
        <div className="grid gap-6 md:grid-cols-2">
          <DistributionList
            title="Sites by habitat"
            rows={stats.sitesByHabitat.map((h) => ({ label: formatHabitat(h.habitat), count: h.count }))}
          />
          <DistributionList
            title="Sites by country"
            rows={stats.sitesByCountry.map((c) => ({ label: c.country, count: c.count }))}
          />
        </div>
      </div>
    </>
  );
}
