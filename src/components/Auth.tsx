import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from './Login';
import Signup from './Signup';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');
  const { uLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (uLoggedIn) {
      longLink ? navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`) : navigate('/');
    }
  }, [uLoggedIn]);

  return (
    <div className="my-34 flex flex-col items-center gap-5 ">
      <h1 className="text-4xl font-bold">
        {searchParams.get('createNew') ? 'Hold up! Lets login first' : 'Login / Signup'}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid grid-cols-2 w-full ">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
