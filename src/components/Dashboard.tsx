import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Filter } from 'lucide-react';
import CreateLink from './CreateLink';
import { useQuery } from '@tanstack/react-query';
import { fetchTotalClicks } from '@/api/server';
import LinkCard from './LinkCard';

const Dashboard = ({ urls, refetch, isPending }) => {
  const [search, setSearch] = useState('');

  const filteredUrls = urls?.data?.data.filter((url) => {
    return url.title.toLowerCase().includes(search.toLowerCase());
  });

  const {
    isPending: isPendingClicks,
    data: clicksData,
    refetch: refetchClicks,
  } = useQuery({
    queryKey: ['linksClicksDataInDashboard'],
    queryFn: fetchTotalClicks,
  });

  useEffect(() => {
    console.log('Dashboard urls:', urls);
  }, [urls]);

  return (
    <div className="flex flex-col gap-8">
      {(isPendingClicks || isPending) && <BarLoader width={'100%'} color="#36d7b7" />}
      <div className="grid sm:grid-cols-12 gap-4">
        <Card className="col-span-8">
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.data.data.length}</p>
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Shortrr Clicks (Global) </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicksData?.data.data}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>

      <div className="relative">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Filter links..."
        />
        <Filter className="absolute top-2 right-2" />
      </div>
      {Array.isArray(filteredUrls) ? (
        filteredUrls.map((url) => (
          <LinkCard key={url._id} url={url} refetchUrls={refetch} refetchClicks={refetchClicks} />
        ))
      ) : (
        <p>No URLs found</p>
      )}
    </div>
  );
};

export default Dashboard;
