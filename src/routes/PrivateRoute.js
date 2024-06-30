import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ permissionLevel }) => {
  // const user = useSelector((state) => state.user.user);
  // const isAuthenticated = user?.role === 'customer' || user?.role === 'admin';

  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
