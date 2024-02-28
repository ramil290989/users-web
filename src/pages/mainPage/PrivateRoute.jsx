import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import TokenContext from '../../context/TokenContext.jsx';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(TokenContext);
  return (
    token ? children : <Navigate to="/login" />
  );
};

export default PrivateRoute;
