import type { Repo } from '@/entities/repo/api/repo.schema';

export type RepoTotals = {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
};

export function calculateTotals(repos: readonly Repo[]): RepoTotals {
  return {
    totalRepos: repos.length,
    totalStars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
    totalForks: repos.reduce((sum, r) => sum + r.forks_count, 0),
    totalWatchers: repos.reduce((sum, r) => sum + r.watchers_count, 0),
  };
}
