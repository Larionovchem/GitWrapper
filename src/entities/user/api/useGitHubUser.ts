import { apiFetch } from '@/shared/api/githubApi';
import { userSchema } from './user.schema';
import { useQuery } from '@tanstack/react-query';

export function useGitHubUser(username: string) {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => apiFetch(`/users/${username}`, userSchema),
  });
}
