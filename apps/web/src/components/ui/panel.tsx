import clsx from 'clsx';

export function Panel({
  title, children, className,
}: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={clsx('rounded-panel border border-lagoon-100 bg-white p-5 md:p-6', className)}>
      {title && <h2 className="mb-4 text-lg font-semibold text-abyss">{title}</h2>}
      {children}
    </section>
  );
}
