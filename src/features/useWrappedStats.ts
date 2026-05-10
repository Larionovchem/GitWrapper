import { useGitHubRepos } from '@/entities/repo/api/useGitHubRepo';
import { useGitHubEvents } from '@/entities/event/api/useGitHubEvents';
import { useGitHubUser } from '@/entities/user/api/useGitHubUser';
import { useMemo } from 'react';

import { calculateActivityByHour } from '@/entities/wrapped/lib/calculateActivityByHour';
import { calculateActivityByMonth } from '@/entities/wrapped/lib/calculateBestMonth';
import { calculateActivityByWeekday } from '@/entities/wrapped/lib/calculateActivitiyByWeekday';
import { calculateTopLanguages } from '@/entities/wrapped/lib/calculateTopLanguages';
import { calculateTotals } from '@/entities/wrapped/lib/calculateTotals';

export function useWrappedStats(username: string) {
  const events = useGitHubEvents(username);
  const user = useGitHubUser(username);
  const repos = useGitHubRepos(username);

  const isLoading = events.isLoading || user.isLoading || repos.isLoading;
  const error = events.error ?? user.error ?? repos.error ?? null;
  const isError = events.isError || user.isError || repos.isError;

  const activityByHour = useMemo(() => calculateActivityByHour(events.data ?? []), [events.data]);
  const activityByMonth = useMemo(() => calculateActivityByMonth(events.data ?? []), [events.data]);
  const activityByWeekdays = useMemo(
    () => calculateActivityByWeekday(events.data ?? []),
    [events.data],
  );
  const topLanguage = useMemo(() => calculateTopLanguages(repos.data ?? []), [repos.data]);
  const totals = useMemo(() => calculateTotals(repos.data ?? []), [repos.data]);

  const data = useMemo(
    () => ({
      activityByHour,
      activityByMonth,
      activityByWeekdays,
      topLanguage,
      totals,
    }),
    [activityByHour, activityByMonth, activityByWeekdays, topLanguage, totals],
  );

  return { data, isLoading, isError, error };
}
