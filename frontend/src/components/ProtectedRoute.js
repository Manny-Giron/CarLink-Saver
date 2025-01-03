import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check for access token in localStorage
    const token = localStorage.getItem('accessToken');

    // If no token, redirect user to login page 
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
