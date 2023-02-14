import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth';

// Basicamente es solo un HOC que revisa si el AuthContext tiene un valor en true. Wow!
export const PrivateRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);
  return (logged) ? children : <Navigate to="/login" />;
};
