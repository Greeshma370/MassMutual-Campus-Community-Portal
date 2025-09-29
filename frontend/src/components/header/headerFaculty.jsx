import React from 'react';
import { Link } from 'react-router-dom';
import collegeLogo from "../../images/VCE-LOGO.png";
import './header.css';

export default function HeaderFaculty() {
  return (
    <header className="site-header">
      <img src={collegeLogo} alt="College Logo" />
      <h1>Community Portal</h1>
      <nav>
        <ul>
          <li><Link to="/dashboard/faculty">Home</Link></li>
          <li><Link to="/faculty/jobs">Jobs</Link></li>
          <li><Link to="/faculty/applications">Applications</Link></li>
          <li><Link to="/faculty/students">Students</Link></li>
          <li><Link to ="/faculty/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
}
