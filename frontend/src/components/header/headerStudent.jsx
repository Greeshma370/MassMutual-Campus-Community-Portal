import React, { useState, useEffect } from 'react';
import collegeLogo from "../../images/VCE-LOGO.png";
import { Link, useLocation } from 'react-router-dom';
import './header.css';

export default function HeaderStudent() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Prevent page scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="logo-container">
        <img src={collegeLogo} alt="College Logo" className="logo" />
        <h1>Community Portal</h1>
      </div>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link className={isActive("/dashboard/student") ? "active" : ""} to="/dashboard/student">Home</Link></li>
          <li><Link className={isActive("/student/jobsforyou") ? "active" : ""} to="/student/jobsforyou">Jobs For You</Link></li>
          <li><Link className={isActive("/student/jobsall") ? "active" : ""} to="/student/jobsall">All Jobs</Link></li>
          <li><Link className={isActive("/student/applications") ? "active" : ""} to="/student/applications">Your Applications</Link></li>
          <li><Link className={isActive("/student/profile") ? "active" : ""} to="/student/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
}