import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        // Remove access / refresh tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Redirect to landing page
        navigate('/');
    };

    return (
        <button onClick={handleLogOut} style={styles.button}>
            Logout
        </button>
    );
};


const styles = {
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        borderRadius: '0.5rem',
        border: '2px solid black',
        backgroundColor: 'rgb(185, 0, 0)',
        color: 'black',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },

};

export default LogOut