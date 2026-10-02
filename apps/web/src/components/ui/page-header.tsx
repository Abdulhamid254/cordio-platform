export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-semibold text-abyss">{title}</h1>
      {description && <p className="mt-2 max-w-prose text-ink-muted">{description}</p>}
    </header>
  );
}
