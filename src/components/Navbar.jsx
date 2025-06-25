import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import keycloak from '../keycloak';

function Navbar() {
    return (
        <div className="navbar-container">
        <nav className="navbar">
            <div className="navbar-logo">
                <span className="logo-icon">🧩</span>
                <Link to="/" className="logo-text">Microsoft</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                <Link to="/websites" className="navbar-link">Websites</Link>
                <Link to="/insurances" className="navbar-link">Insurances</Link>
                <Link to="/" className="navbar-signout" onClick={() => keycloak.logout()}>🚪 Sign out</Link>
            </div>
        </nav>
        </div>
    );
}

export default Navbar;
