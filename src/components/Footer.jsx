import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import '../styles/Navbar.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>©  Affiliate Insurance</p>
        <div className="footer-links">
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          <Link to="/websites" className="navbar-link">Websites</Link>
          <Link to="/insurances" className="navbar-link">Insurances</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
