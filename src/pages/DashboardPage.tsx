import { fetchUrls } from '@/api/server';
import Dashboard from '@/components/Dashboard';
import { RootState } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import Loader from '@/components/Loader';
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
const DashboardPage = () => {
  const location = useLocation();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const {
    isPending,
    data: urls,
    refetch,
  } = useQuery({
    queryKey: ['urlsDataInDashboard', userDetails._id],
    queryFn: ({ queryKey }) => fetchUrls(queryKey[1]),
  });

  useEffect(() => {
    console.log('Location changed:', location);
    refetch();
  }, [location]);

  return isPending || !urls ? (
    <Loader/>
  ) : (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Dashboard urls={urls} refetch={refetch} isPending={isPending} />
    </ErrorBoundary>
  );
};

export default DashboardPage;
