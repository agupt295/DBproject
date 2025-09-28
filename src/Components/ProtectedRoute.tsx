import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if user is authenticated by looking for token in localStorage
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // Return true if both token and user exist
    return token && user;
  };

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  // If user is authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;