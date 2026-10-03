import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format';
import type { Project, ProjectStatus } from '@/types/api';

const STATUS_TONE: Record<ProjectStatus, 'neutral' | 'success' | 'warning'> = {
  active: 'success',
  planned: 'neutral',
  completed: 'neutral',
  archived: 'warning',
};

export function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <div className="overflow-x-auto rounded-panel border border-lagoon-100 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">CORDIO projects</caption>
        <thead className="bg-lagoon-50 text-ink-muted">
          <tr>
            <th scope="col" className="px-5 py-3 font-medium">Project</th>
            <th scope="col" className="px-5 py-3 font-medium">Country</th>
            <th scope="col" className="px-5 py-3 font-medium">Funder</th>
            <th scope="col" className="px-5 py-3 font-medium">Started</th>
            <th scope="col" className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-lagoon-100">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-lagoon-50/60">
              <th scope="row" className="px-5 py-3.5 font-medium text-abyss">
                {p.name}
                <span className="block text-xs font-normal text-ink-muted">{p.code}</span>
              </th>
              <td className="px-5 py-3.5">{p.country ?? 'Not set'}</td>
              <td className="px-5 py-3.5">{p.funder ?? 'Not set'}</td>
              <td className="px-5 py-3.5 tabular-nums">{formatDate(p.startDate)}</td>
              <td className="px-5 py-3.5">
                <Badge tone={STATUS_TONE[p.status]}>{p.status[0].toUpperCase() + p.status.slice(1)}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
