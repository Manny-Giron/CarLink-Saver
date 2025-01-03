import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';


const Login = () => {
    const navigate = useNavigate();
    const [hoveredButton, setHoveredButton] = useState(null); // Track which button is hovered
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handlers for hover logic
    const handleMouseEnter = (button) => setHoveredButton(button);
    const handleMouseLeave = () => setHoveredButton(null);
    const getButtonStyle = (button) => ({
        ...styles.button,
        backgroundColor: hoveredButton === button ? 'rgb(72, 91, 114)' : 'transparent',
        boxShadow: hoveredButton === button ? '0px 2px 15px rgba(0, 0, 0, 0.3)' : 'none',
    })


    return (
        <main style={{ ...styles.main, ...styles.text }}>
            <div className="container" style={styles.container}>
                <h1 style={styles.title}>Login to Account</h1>
                <div style={styles.formBox}>
                    <form style={styles.formBox}>
                        <input
                            style={styles.input}
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            style={styles.input}
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </form>
                    <button
                        type='submit'
                        style={getButtonStyle('login')}
                        onMouseEnter={() => handleMouseEnter('login')}
                        onMouseLeave={handleMouseLeave}
                    >
                        Log In
                    </button>
                    <div
                        style={{
                            color: 'rgb(255,255,255, 0.7)',
                        }}>

                        <span>Need an Account?</span>
                        {/* Upon deplyment, convert to <a> to allow accessibility*/}
                        <span
                            onClick={() => navigate('/register')}
                            style={{
                                cursor: 'pointer',
                                color: 'rgb(255,255,255, .9)',
                            }}> Sign Up</span>
                    </div>
                </div>
            </div>
        </main>

    );

};

const styles = {
    container: {
        width: '30vw',
        border: '2px solid black',
        borderRadius: '1vw',
        padding: '2rem',
        backgroundColor: 'rgb(151, 212, 255, 0.1)',
    },
    text: {
        fontFamily: '"Roboto Mono", serif',
        fontWeight: 300,
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
        marginBottom: '2rem',
        fontWeight: 400,
    },
    formBox: {
        display: 'flex',
        flexDirection: 'column', // Arrange inputs vertically
        gap: '1rem',            // Space between inputs
    },
    input: {
        color: 'white',
        padding: '0.5rem',
        fontSize: '1rem',
        backgroundColor: 'rgb(0,0,0)',
        border: '2px solid black',
        borderRadius: '0.5rem',
    },

    button: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        cursor: 'pointer',
        borderRadius: '0.5rem',
        border: '2px solid black',
        color: 'white',
        transition: 'background-color 0.3s ease',
    },

};


export default Login;