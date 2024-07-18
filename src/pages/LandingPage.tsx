import { CheckingServer } from '@/api/server';
import Landing from '@/components/Landing';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';

const LandingPage = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['checking_server_api'],
    queryFn: CheckingServer,
  });

  return (
    <div>
      <Landing />
    </div>
  );
};

export default LandingPage;
