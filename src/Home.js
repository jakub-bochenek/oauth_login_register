import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const containerStyle = {
        textAlign: 'center',
        marginTop: '20px',
    };

    const headingStyle = {
        marginBottom: '20px',
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

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>System</h2>
            {isLoggedIn ? (
                <>
                    <button style={buttonStyle} onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link to="/register" style={buttonStyle}>
                        Rejestracja
                    </Link>
                    <Link to="/login" style={buttonStyle}>
                        Logowanie
                    </Link>
                </>
            )}
        </div>
    );
};

export default Home;