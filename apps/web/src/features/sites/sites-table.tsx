import { Badge } from '@/components/ui/badge';
import { formatCoordinates, formatHabitat } from '@/lib/format';
import type { Site } from '@/types/api';

const VISIBILITY_LABEL = { public: 'Public', partner: 'Partners', internal: 'Internal' } as const;

export function SitesTable({ sites }: { sites: Site[] }) {
  return (
    <div className="overflow-x-auto rounded-panel border border-lagoon-100 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">Monitoring sites</caption>
        <thead className="bg-lagoon-50 text-ink-muted">
          <tr>
            <th scope="col" className="px-5 py-3 font-medium">Site</th>
            <th scope="col" className="px-5 py-3 font-medium">Country</th>
            <th scope="col" className="px-5 py-3 font-medium">Habitat</th>
            <th scope="col" className="px-5 py-3 font-medium">Location</th>
            <th scope="col" className="px-5 py-3 font-medium">Visible to</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-lagoon-100">
          {sites.map((s) => (
            <tr key={s.id} className="hover:bg-lagoon-50/60">
              <th scope="row" className="px-5 py-3.5 font-medium text-abyss">{s.name}</th>
              <td className="px-5 py-3.5">{s.country}</td>
              <td className="px-5 py-3.5">{formatHabitat(s.habitat)}</td>
              <td className="px-5 py-3.5 tabular-nums">{formatCoordinates(s.location.coordinates)}</td>
              <td className="px-5 py-3.5">
                <Badge tone={s.visibility === 'public' ? 'success' : 'neutral'}>{VISIBILITY_LABEL[s.visibility]}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
