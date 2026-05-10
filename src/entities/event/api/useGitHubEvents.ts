import { eventsSchema } from './event.schema';
import { apiFetch } from '@/shared/api/githubApi';
import { useQuery } from '@tanstack/react-query';

export function useGitHubEvents(username: string) {
  return useQuery({
    queryKey: ['user', username, 'events'],
    queryFn: () => apiFetch(`/users/${username}/events/public?per_page=200`, eventsSchema),
    enabled: username.trim().length > 0,
  });
}
