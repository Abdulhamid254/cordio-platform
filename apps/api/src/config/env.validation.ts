export function validateEnv(env: Record<string, unknown>) {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required');
  }
  return env;
}
