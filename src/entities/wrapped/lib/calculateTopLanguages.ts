import type { Repo } from '@/entities/repo/api/repo.schema';

export type TopLanguage = { language: string; count: number };

export function calculateTopLanguages(repos: readonly Repo[]): TopLanguage[] {
  const languagesCount = new Map<string, number>();
  repos.forEach((repo) => {
    if (!repo.language) return;
    languagesCount.set(repo.language, (languagesCount.get(repo.language) ?? 0) + 1);
  });
  return Array.from(languagesCount, ([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}
