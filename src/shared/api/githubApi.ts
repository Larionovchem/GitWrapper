import type { z } from 'zod';

const BASE_URL = 'https://api.github.com';
export async function apiFetch<T extends z.ZodObject>(
  path: string,
  schema: T,
): Promise<z.infer<T>> {
  const response = await fetch(`${BASE_URL}/${path}`);
  if (!response.ok) {
    throw new Error('HTTPS PROBLEM');
  }
  const data = await response.json();
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error('Validation error:', result.error.format());
    throw new Error('Invalid response format');
  }

  return result.data;
}
