import { useGitHubEvents } from './entities/event/api/useGitHubEvents';
// import { useGitHubRepos } from './entities/repo/api/useGitHubRepo';
// import { calculateTopLanguages } from './entities/wrapped/lib/calculateTopLanguages';
// import { calculateActivityByHour } from './entities/wrapped/lib/calculateActivityByHour';
// import { calculateActivityByWeekday } from './entities/wrapped/lib/calculateActivitiyByWeekday';
import { calculateActivityByMonth } from './entities/wrapped/lib/calculateBestMonth';

function App() {
  const { data, isError, isLoading, error } = useGitHubEvents('torvalds');

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    return (
      <pre style={{ color: 'red' }}>
        {error.message}
        {'\n\n'}
        {error instanceof Error && error.stack}
      </pre>
    );
  }

  return <pre>{JSON.stringify(calculateActivityByMonth(data ?? []), null, 2)}</pre>;
}
export default App;
