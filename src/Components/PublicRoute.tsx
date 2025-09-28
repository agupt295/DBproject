import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  // Check if user is already authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // Return true if both token and user exist
    return token && user;
  };

  // If user is already authenticated, redirect to home page
  if (isAuthenticated()) {
    return <Navigate to="/home" replace />;
  }

  // If user is not authenticated, render the public component (login/signup)
  return <>{children}</>;
};

export default PublicRoute;