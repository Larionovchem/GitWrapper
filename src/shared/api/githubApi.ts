import type { z } from 'zod';

const BASE_URL = 'https://api.github.com';
export class GitHubApiError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'GitHubApiError';
  }
}
export async function apiFetch<T extends z.ZodTypeAny>(
  path: string,
  schema: T,
): Promise<z.infer<T>> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    if (response.status === 404) throw new GitHubApiError('User not found', 404);
    if (response.status === 403) throw new GitHubApiError('Rate limit exceeded', 403);
    throw new GitHubApiError(`Request failed: ${response.status}`, response.status);
  }
  const data = await response.json();
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error('Validation error:', result.error.format());
    throw new Error('Invalid response format');
  }

  return result.data;
}
