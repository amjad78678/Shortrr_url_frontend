import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedPage = () => {
  const { uLoggedIn } = useSelector((state: RootState) => state.auth);
  return uLoggedIn ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedPage;
