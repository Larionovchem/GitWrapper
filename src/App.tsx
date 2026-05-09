import { useGitHubUser } from '@/entities/user/api/useGitHubUser';

function App() {
  const { data, isError, isLoading } = useGitHubUser('gaearon');
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
