import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            let token = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            // Try refreshing the access token if it's not present or expired
            if (!token && refreshToken) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/accounts/token/refresh/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refresh: refreshToken }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        localStorage.setItem('accessToken', data.access); // Store the new access token
                        token = data.access; // Update token for further checks
                    } else {
                        console.error("Failed to refresh access token");
                    }
                } catch (error) {
                    console.error("Error refreshing token:", error);
                }
            }

            // Set authenticated if a valid token exists
            setIsAuthenticated(!!token);
        };

        checkAuth();
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
