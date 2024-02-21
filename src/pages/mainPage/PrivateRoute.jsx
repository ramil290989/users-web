import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('usersToken');
  const location = useLocation();

  return (
    token ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
