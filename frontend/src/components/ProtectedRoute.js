import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isTokenExpired = (token) => {
        try {
            // Check if the token is expired
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000; // (Current time in seconds)
            return decoded.exp < currentTime;
        } catch (err) {
            console.error("Error decoding token:", err);
            return true; // Treat as expired if decoding fails
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            let token = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (!token && !refreshToken) {
                console.warn("No tokens found. Redirecting to login.");
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            if (token && isTokenExpired(token)) {
                console.warn("Access token expired.");
                token = null;
            }

            if (!token && refreshToken) {
                console.info("Refreshing access token...");
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/accounts/token/refresh/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refresh: refreshToken }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        localStorage.setItem('accessToken', data.access);
                        token = data.access;
                    } else {
                        console.error(`Token refresh failed with status: ${response.status}`);
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                    }
                } catch (error) {
                    console.error("Error refreshing token:", error);
                }
            }

            setIsAuthenticated(!!token); // Authenticate if a valid token exists
            setIsLoading(false); // Stop loading
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Display loading screen while checking
    }

    if (!isAuthenticated) {
        console.warn("Not authenticated. Redirecting to login.");
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
