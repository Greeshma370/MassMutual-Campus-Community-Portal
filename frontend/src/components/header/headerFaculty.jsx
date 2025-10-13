import React, { useState, useEffect } from 'react';
import collegeLogo from "../../images/VCE-LOGO.png";
import { Link, useLocation } from 'react-router-dom';
import './header.css';

export default function HeaderFaculty() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header>
      <div className="logo-container">
        <img src={collegeLogo} alt="College Logo" />
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

      <nav className={menuOpen ? 'open' : ''}>
        <ul>
          <li><Link className={isActive("/dashboard/faculty") ? "active" : ""} to="/dashboard/faculty">Home</Link></li>
          <li><Link className={isActive("/faculty/jobs") ? "active" : ""} to="/faculty/jobs">Jobs</Link></li>
          <li><Link className={isActive("/faculty/applications") ? "active" : ""} to="/faculty/applications">Applications</Link></li>
          <li><Link className={isActive("/faculty/Analysis") ? "active" : ""} to="/faculty/Analysis">Analysis</Link></li>
          <li><Link className={isActive("/faculty/students") ? "active" : ""} to="/faculty/students">Students</Link></li>
          <li><Link className={isActive("/faculty/profile") ? "active" : ""} to="/faculty/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
}
