const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

type Params = Record<string, string | number | undefined>;

/** Server-side GET helper. Data is always fresh because research records can change at any time. */
export async function apiGet<T>(path: string, params: Params = {}): Promise<T> {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') search.set(key, String(value));
  }
  const qs = search.toString();

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}${qs ? `?${qs}` : ''}`, { cache: 'no-store' });
  } catch {
    throw new ApiError(0, 'The API is not reachable. Check that the server is running.');
  }
  if (!res.ok) throw new ApiError(res.status, `Request failed with status ${res.status}.`);
  return res.json() as Promise<T>;
}
