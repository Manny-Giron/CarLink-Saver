import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [hoveredButton, setHoveredButton] = useState(null); // Track which button is hovered
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [err, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Send login info to server
            const response = await fetch('http://127.0.0.1:8000/api/accounts/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convert formData to JSON
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.detail || "Login successful, redirecting to dashboard.");
                // Save refresh / access tokens
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
                // Redirect user to dashboard
                // Delay before navigating to the login page
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000); // 1 second delay
            } else {
                // Parse json response for error data
                const errorData = await response.json();
                setError(errorData.detail || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handlers for hover logic
    const handleMouseEnter = (button) => setHoveredButton(button);
    const handleMouseLeave = () => setHoveredButton(null);
    const getButtonStyle = (button) => ({
        ...styles.button,
        backgroundColor: hoveredButton === button ? 'black' : 'white',
        color: hoveredButton === button ? 'white' : 'black',
        boxShadow: hoveredButton === button ? '0px 2px 15px rgba(0, 0, 0, 0.9)' : 'none',
    });

    return (
        <main style={{ ...styles.main, ...styles.text }}>
            <div className="container" style={styles.container}>
                <h1 style={styles.title}>Login to Account</h1>
                {err && <p style={{ color: 'red' }}>{err}</p>}
                <div style={styles.formBox}>
                    <form style={styles.formBox} onSubmit={handleSubmit}>
                        <input
                            style={styles.input}
                            type="email"
                            name="username"
                            placeholder="Email"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <input
                            style={styles.input}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            style={getButtonStyle('login')}
                            onMouseEnter={() => handleMouseEnter('login')}
                            onMouseLeave={handleMouseLeave}
                        >
                            Log In
                        </button>
                    </form>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    <div
                        style={{
                            color: 'rgb(255,255,255, 0.7)',
                        }}
                    >
                        <span>Need an Account? </span>
                        <span
                            onClick={() => navigate('/register')}
                            style={{
                                cursor: 'pointer',
                                color: 'rgb(255,255,255, .9)',
                            }}
                        >
                            Sign Up
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
};

const styles = {
    container: {
        width: '30vw',
        border: '2px solid transparent',
        borderRadius: '0.5vw',
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
    },
    title: {
        color: 'white',
        marginBottom: '2rem',
        fontWeight: 400,
        textAlign: 'center',
    },
    formBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        color: 'white',
        padding: '0.5rem',
        fontSize: '1rem',
        backgroundColor: 'rgb(0,0,0)',
        border: '2px solid black',
        borderRadius: '0.25rem',
    },
    button: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        cursor: 'pointer',
        borderRadius: '0.25rem',
        border: '2px solid transparent',
        color: 'white',
        transition: '0.3s ease',
    },
};

export default Login;
