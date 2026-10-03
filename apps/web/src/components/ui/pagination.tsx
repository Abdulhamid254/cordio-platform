import Link from 'next/link';

interface Props {
  basePath: string;
  page: number;
  totalPages: number;
  total: number;
  params: Record<string, string | undefined>;
}

export function Pagination({ basePath, page, totalPages, total, params }: Props) {
  const href = (target: number) => {
    const search = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v) search.set(k, v);
    search.set('page', String(target));
    return `${basePath}?${search.toString()}`;
  };
  const linkClass =
    'rounded-lg border border-lagoon-100 bg-white px-3 py-1.5 text-sm font-medium text-abyss hover:bg-lagoon-50';
  const disabledClass =
    'rounded-lg border border-lagoon-100 px-3 py-1.5 text-sm text-ink-muted/60 cursor-not-allowed';

  return (
    <nav aria-label="Pagination" className="mt-4 flex items-center justify-between">
      <p className="text-sm text-ink-muted">
        Page {page} of {totalPages} ({total} {total === 1 ? 'result' : 'results'})
      </p>
      <div className="flex gap-2">
        {page > 1 ? <Link href={href(page - 1)} className={linkClass}>Previous</Link> : <span className={disabledClass}>Previous</span>}
        {page < totalPages ? <Link href={href(page + 1)} className={linkClass}>Next</Link> : <span className={disabledClass}>Next</span>}
      </div>
    </nav>
  );
}
