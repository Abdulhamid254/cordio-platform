import { FilterBar } from '@/components/ui/filter-bar';
import { PageHeader } from '@/components/ui/page-header';
import { Pagination } from '@/components/ui/pagination';
import { EmptyState, ErrorState } from '@/components/ui/state-messages';
import { ProjectsTable } from '@/features/projects/projects-table';
import { ApiError, apiGet } from '@/lib/api';
import type { Paginated, Project } from '@/types/api';

export const metadata = { title: 'Projects' };

const STATUS_OPTIONS = ['planned', 'active', 'completed', 'archived'].map((s) => ({
  value: s,
  label: s[0].toUpperCase() + s.slice(1),
}));

interface Props {
  searchParams: { q?: string; status?: string; page?: string };
}

export default async function ProjectsPage({ searchParams }: Props) {
  const { q, status } = searchParams;
  const page = Math.max(1, Number(searchParams.page) || 1);

  let result: Paginated<Project>;
  try {
    result = await apiGet<Paginated<Project>>('/projects', { q, status, page, limit: 15 });
  } catch (err) {
    return (
      <>
        <PageHeader title="Projects" />
        <ErrorState message={err instanceof ApiError ? err.message : 'Something went wrong.'} />
      </>
    );
  }

  return (
    <>
      <PageHeader title="Projects" description="Research and conservation programmes across the region." />
      <FilterBar
        action="/projects"
        searchPlaceholder="Search by name or code"
        q={q}
        select={{ name: 'status', label: 'All statuses', value: status, options: STATUS_OPTIONS }}
      />
      {result.data.length === 0 ? (
        <EmptyState title="No projects match these filters" hint="Clear the search or choose a different status." />
      ) : (
        <>
          <ProjectsTable projects={result.data} />
          <Pagination
            basePath="/projects"
            page={result.meta.page}
            totalPages={result.meta.totalPages}
            total={result.meta.total}
            params={{ q, status }}
          />
        </>
      )}
    </>
  );
}
