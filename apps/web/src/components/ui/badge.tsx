import clsx from 'clsx';

const TONES = {
  neutral: 'bg-shoal text-abyss-600',
  success: 'bg-kelp-100 text-kelp',
  warning: 'bg-coral-100 text-coral',
} as const;

export function Badge({ tone = 'neutral', children }: { tone?: keyof typeof TONES; children: React.ReactNode }) {
  return (
    <span className={clsx('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', TONES[tone])}>
      {children}
    </span>
  );
}
