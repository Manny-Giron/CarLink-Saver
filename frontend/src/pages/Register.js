import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Register = () => {
    const navigate = useNavigate();
    const [hoveredButton, setHoveredButton] = useState(null); // Track which button is hovered
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [csrfToken, setCsrfToken] = useState('');


    // Handlers for hover logic
    const handleMouseEnter = (button) => setHoveredButton(button);
    const handleMouseLeave = () => setHoveredButton(null);

    const getButtonStyle = (button) => ({
        ...styles.button,
        backgroundColor: hoveredButton === button ? 'black' : 'white',
        color: hoveredButton === button ? 'white' : 'black',
        boxShadow: hoveredButton === button ? '0px 2px 15px rgba(0, 0, 0, 0.9)' : 'none',
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, // Dynamically update based on input name
        });
    };

    // Fetch the CSRF token when the component mounts
    useEffect(() => {
        const fetchCsrfToken = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/accounts/csrf/', {
                credentials: 'include',
            });
            const data = await response.json();
            setCsrfToken(data.csrfToken);
        };

        fetchCsrfToken();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://127.0.0.1:8000/api/accounts/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Include the CSRF token
                },
                credentials: 'include', // Include cookies for CSRF
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setFormData({ name: '', email: '', password: '' });

                // Delay before navigating to the login page
                setTimeout(() => {
                    navigate('/login');
                }, 4000); // 4 second delay

            } else {
                const errorData = await response.json();
                setError(JSON.stringify(errorData));
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <main style={{ ...styles.main, ...styles.text }}>
            <div className="container" style={styles.container}>
                <h1 style={styles.title}>Create an Account</h1>
                <div style={styles.formBox}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form style={styles.formBox} onSubmit={handleSubmit}>
                        <input
                            style={styles.input}
                            type="text"
                            name="name"
                            placeholder="First Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
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
                            style={getButtonStyle('register')}
                            onMouseEnter={() => handleMouseEnter('register')}
                            onMouseLeave={handleMouseLeave}
                        >
                            Register
                        </button>
                    </form>
                    <div style={{ color: 'rgb(255,255,255, 0.7)' }}>
                        <span>Have an Account?</span>
                        <span
                            onClick={() => navigate('/login')}
                            style={{
                                cursor: 'pointer',
                                color: 'rgb(255,255,255, .9)',
                            }}
                        >
                            {' '}
                            Log In
                        </span>
                        {message && <p style={{ color: 'green' }}>{message}</p>}
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
        fontFamily: '"Space Mono", serif',
        fontWeight: 400,
        fontStyle: 'normal',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        cursor: 'pointer',
        borderRadius: '0.25rem',
        border: '2px solid transparent',
        color: 'white',
        transition: 'background-color 0.3s ease',
    },
};

export default Register;
