import { FilterBar } from '@/components/ui/filter-bar';
import { PageHeader } from '@/components/ui/page-header';
import { Pagination } from '@/components/ui/pagination';
import { EmptyState, ErrorState } from '@/components/ui/state-messages';
import { SitesTable } from '@/features/sites/sites-table';
import { ApiError, apiGet } from '@/lib/api';
import { formatHabitat } from '@/lib/format';
import type { HabitatType, Paginated, Site } from '@/types/api';

export const metadata = { title: 'Sites' };

const HABITATS: HabitatType[] = [
  'coral_reef', 'seagrass', 'mangrove', 'estuary', 'rocky_shore', 'open_water', 'other',
];

interface Props {
  searchParams: { q?: string; habitat?: string; page?: string };
}

export default async function SitesPage({ searchParams }: Props) {
  const { q, habitat } = searchParams;
  const page = Math.max(1, Number(searchParams.page) || 1);

  let result: Paginated<Site>;
  try {
    result = await apiGet<Paginated<Site>>('/sites', { q, habitat, page, limit: 15 });
  } catch (err) {
    return (
      <>
        <PageHeader title="Sites" />
        <ErrorState message={err instanceof ApiError ? err.message : 'Something went wrong.'} />
      </>
    );
  }

  return (
    <>
      <PageHeader title="Sites" description="Monitoring locations with their habitat and coordinates." />
      <FilterBar
        action="/sites"
        searchPlaceholder="Search by site name"
        q={q}
        select={{
          name: 'habitat',
          label: 'All habitats',
          value: habitat,
          options: HABITATS.map((h) => ({ value: h, label: formatHabitat(h) })),
        }}
      />
      {result.data.length === 0 ? (
        <EmptyState title="No sites match these filters" hint="Clear the search or choose a different habitat." />
      ) : (
        <>
          <SitesTable sites={result.data} />
          <Pagination
            basePath="/sites"
            page={result.meta.page}
            totalPages={result.meta.totalPages}
            total={result.meta.total}
            params={{ q, habitat }}
          />
        </>
      )}
    </>
  );
}
