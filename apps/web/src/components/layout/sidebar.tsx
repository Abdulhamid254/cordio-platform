'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from './nav-items';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col bg-gradient-to-b from-lagoon-600 via-abyss-700 to-abyss text-white md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0">
      <div className="px-6 pb-6 pt-7">
        <p className="font-display text-xl font-semibold leading-none">CORDIO</p>
        <p className="mt-1.5 text-sm text-white/70">Data platform</p>
      </div>

      <nav aria-label="Main" className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white',
              )}
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>

      <p className="mt-auto hidden px-6 pb-6 text-xs leading-relaxed text-white/55 md:block">
        Coastal Oceans Research and Development in the Indian Ocean
      </p>
    </aside>
  );
}
