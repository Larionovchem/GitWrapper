import { useWrappedStats } from './features/useWrappedStats';

function App() {
  const { data, isError, isLoading, error } = useWrappedStats('torvalds');

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    return (
      <pre style={{ color: 'red' }}>
        {error?.message ?? 'Непонятки'}
        {'\n\n'}
        {error instanceof Error && error.stack}
      </pre>
    );
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
export default App;
