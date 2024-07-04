import { fetchLongUrl, storeClicks } from '@/api/server';
import { RootState } from '@/store/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const RedirectLinkPage = () => {
  const { id } = useParams();
  const { status, data: longUrl } = useQuery({
    queryKey: ['gettingLongUrl'],
    queryFn: () => fetchLongUrl(id as string),
  });

  const { isPending, mutate: storeClicksMutation } = useMutation({
    mutationFn: storeClicks,
  });

  console.log(longUrl);

  useEffect(() => {
    if (!isPending && longUrl) {
      storeClicksMutation({
        originalUrl: longUrl.data.urlData.original_url,
        id: longUrl.data.urlData._id,
      });
    }
  }, [isPending, longUrl]);
  return (
    <div>
      {isPending && <BarLoader width={'100%'} color="#36d7b7" />}
      <br />
      <h1>Redirecting...</h1>
    </div>
  );
};

export default RedirectLinkPage;
