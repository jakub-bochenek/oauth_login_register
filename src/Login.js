import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', { username, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            setRedirectToHome(true);
        } catch (error) {
            console.error(error);
            setLoginError(true);
        }
    };

    if (redirectToHome) {
        return <Navigate to="/" />;
    }

    const containerStyle = {
        textAlign: 'center',
        marginTop: '20px',
    };

    const headingStyle = {
        marginBottom: '20px',
    };

    const inputStyle = {
        margin: '10px',
        padding: '8px 16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    };

    const buttonStyle = {
        display: 'inline-block',
        margin: '10px',
        padding: '8px 16px',
        backgroundColor: '#3498db',
        color: '#fff',
        textDecoration: 'none',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const linkStyle = {
        display: 'block',
        margin: '10px',
        textDecoration: 'none',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Logowanie</h2>
            {loginError && <p>Błędny login lub hasło. Wprowadź dane jeszcze raz.</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
            />
            <button onClick={handleLogin} style={buttonStyle}>
                Zaloguj się
            </button>
            <Link to="/register" style={linkStyle}>
                Zarejestruj się
            </Link>
        </div>
    );
};

export default Login;