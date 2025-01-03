import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    const [hoveredButton, setHoveredButton] = useState(null); // Track which button is hovered

    // Handlers for hover logic
    const handleMouseEnter = (button) => setHoveredButton(button);
    const handleMouseLeave = () => setHoveredButton(null);

    const getButtonStyle = (button) => ({
        ...styles.button,
        backgroundColor: hoveredButton === button ? 'rgb(72, 91, 114)' : 'transparent',
        boxShadow: hoveredButton === button ? '0px 2px 15px rgba(0, 0, 0, 0.3)' : 'none',
    });

    return (
        <main style={styles.main}>
            <div className="container" style={styles.box}>
                <h1 style={{ ...styles.title, ...styles.text }}>Welcome to CarLinkSaver</h1>
                <div style={styles.buttonContainer}>
                    <button
                        style={getButtonStyle('login')}
                        onMouseEnter={() => handleMouseEnter('login')}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </button>
                    <button
                        style={getButtonStyle('register')}
                        onMouseEnter={() => handleMouseEnter('register')}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </button>
                </div>
            </div>

        </main>
    );
};

const styles = {

    text: {
        fontFamily: '"Space Mono", serif',
        fontWeight: 700,
        fontStyle: 'normal',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'rgb(26, 39, 67)',

        // background: 'linear-gradient(to bottom right, rgb(113, 0, 165), rgb(239, 137, 255))',
    },
    title: {
        color: 'white',
        fontSize: '2rem',
        marginBottom: '15vh',
    },
    buttonContainer: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
    },
    button: {
        fontFamily: '"Space Mono", serif',
        fontWeight: 400,
        fontStyle: 'normal',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        cursor: 'pointer',
        borderRadius: '0.5rem',
        border: '2px solid black',
        color: 'white',
        transition: 'background-color 0.3s ease',
    },
};

export default Landing;
