import React, { useState, useEffect } from 'react';
import collegeLogo from "../../images/VCE-LOGO.png";
import { Link, useLocation } from 'react-router-dom';
import './header.css';

export default function HeaderManagement() {
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
          <li><Link className={isActive("/dashboard/management") ? "active" : ""} to="/dashboard/management">Home</Link></li>
          <li><Link className={isActive("/management/jobs") ? "active" : ""} to="/management/jobs">Jobs</Link></li>
          <li><Link className={isActive("/management/applications") ? "active" : ""} to="/management/applications">Applications</Link></li>
          <li><Link className={isActive("/management/analysis") ? "active" : ""} to="/management/analysis">Analysis</Link></li>
          <li><Link className={isActive("/management/faculty") ? "active" : ""} to="/management/faculty">Placement Coordinators</Link></li>
          <li><Link className={isActive("/management/students") ? "active" : ""} to="/management/students">Students</Link></li>
          <li><Link className={isActive("/management/all") ? "active" : ""} to="/management/all">Admin</Link></li>
          <li><Link className={isActive("/management/registerfaculty") ? "active" : ""} to="/management/registerfaculty">Add Placement Coordinator</Link></li>
          <li><Link className={isActive("/management/registermanagement") ? "active" : ""} to="/management/registermanagement">Add Management</Link></li>
          <li><Link className={isActive("/management/profile") ? "active" : ""} to="/management/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
}
