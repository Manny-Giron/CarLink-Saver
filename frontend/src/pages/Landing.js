import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/buttonStyling.css';

const Landing = () => {
    const navigate = useNavigate();
    const [hoveredButton, setHoveredButton] = useState(null); // Track which button is hovered

    // Handlers for hover logic
    const handleMouseEnter = (button) => setHoveredButton(button);
    const handleMouseLeave = () => setHoveredButton(null);

    const getButtonStyle = (button) => ({
        ...styles.button,
        backgroundColor: hoveredButton === button ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
        color: hoveredButton === button ? 'white' : 'black',
        boxShadow: hoveredButton === button ? '0px 3px 10px rgba(0, 0, 0, 0.9)' : 'none',
    });

    return (
        <main style={styles.main}>
            <div className="container">
                <h1 style={{ ...styles.title, ...styles.text }}>Welcome to CarLinkSaver</h1>
                <div style={styles.buttonContainer}>
                    <button
                        className='Button'
                        style={getButtonStyle('login')}
                        onMouseEnter={() => handleMouseEnter('login')}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </button>
                    <button
                        className='Button'
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
        display: 'flex',
        color: 'white',
        fontSize: '2rem',
        marginBottom: '10vh',
        padding: '5vh',
        textAlign: 'center',
        textShadow: '-2px 4px 2px black',
    },
    buttonContainer: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        padding: '2vh',
    },
};

export default Landing;
