import React, { useState } from 'react';
import collegeLogo from "../../images/VCE-LOGO.png";
import { Link, useLocation } from 'react-router-dom';
import './header.css';

export default function HeaderStudent() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <div className="logo-container">
        <img src={collegeLogo} alt="College Logo" />
        <h1>Community Portal</h1>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
      </div>
    </header>
  );
}
