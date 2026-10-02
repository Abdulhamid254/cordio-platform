const number = new Intl.NumberFormat('en-GB');
export const formatNumber = (n: number) => number.format(n);

export function formatDate(iso: string | null) {
  if (!iso) return 'Not set';
  return new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso));
}

export const formatHabitat = (habitat: string) =>
  habitat.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

export function formatCoordinates([lng, lat]: [number, number]) {
  return `${Math.abs(lat).toFixed(3)}°${lat < 0 ? 'S' : 'N'}, ${Math.abs(lng).toFixed(3)}°${lng < 0 ? 'W' : 'E'}`;
}
