import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:8000/api/register', { username, password });
            setUsername('');
            setPassword('');
            setRegistered(true);
            setRegistrationError(false);
        } catch (error) {
            console.error(error);
            setRegistrationError(true);
        }
    };

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
            <h2 style={headingStyle}>Zarejestruj się</h2>
            {registered && (
                <p>
                    Zostałeś zarejestrowany! <Link to="/login" style={linkStyle}>Zaloguj się</Link>.
                </p>
            )}
            {registrationError && <p>Błąd rejestracji. Spróbuj ponownie.</p>}
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
            <button onClick={handleRegister} style={buttonStyle}>
                Zarejestruj
            </button>
            <Link to="/login" style={linkStyle}>
                Zaloguj się
            </Link>
        </div>
    );
};

export default Register;