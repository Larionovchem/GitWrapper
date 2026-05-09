import { reposSchema } from './repo.schema';
import { apiFetch } from '@/shared/api/githubApi';
import { useQuery } from '@tanstack/react-query';

export function useGitHubRepos(username: string) {
  return useQuery({
    queryKey: ['user', username, 'repos'],
    queryFn: () => apiFetch(`/users/${username}/repos?per_page=100&sort=updated`, reposSchema),
    enabled: username.trim().length > 0,
  });
}
