import { Search } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
}

interface Props {
  action: string;
  searchPlaceholder: string;
  q?: string;
  select?: { name: string; label: string; value?: string; options: FilterOption[] };
}

/** Plain GET form: filters live in the URL, so views are shareable and need no client JavaScript. */
export function FilterBar({ action, searchPlaceholder, q, select }: Props) {
  const field =
    'h-10 rounded-lg border border-lagoon-100 bg-white px-3 text-sm text-ink placeholder:text-ink-muted/70';

  return (
    <form action={action} method="get" className="mb-5 flex flex-wrap gap-3">
      <label className="relative min-w-60 flex-1">
        <span className="sr-only">Search</span>
        <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-ink-muted" aria-hidden />
        <input name="q" defaultValue={q} placeholder={searchPlaceholder} className={`${field} w-full pl-9`} />
      </label>
      {select && (
        <label>
          <span className="sr-only">{select.label}</span>
          <select name={select.name} defaultValue={select.value ?? ''} className={field}>
            <option value="">{select.label}</option>
            {select.options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>
      )}
      <button type="submit" className="h-10 rounded-lg bg-lagoon px-4 text-sm font-medium text-white hover:bg-lagoon-600">
        Apply filters
      </button>
    </form>
  );
}
