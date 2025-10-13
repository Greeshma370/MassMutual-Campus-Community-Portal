import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelectorPage.css';

export default function RoleSelectorPage() {
  const navigate = useNavigate();

  return (
    <div className="role-selector-container">
      <div className="role-card">
        <h2>Select Your Role</h2>
        <p className="role-subtitle">Choose your login type to access the portal</p>
        <div className="role-buttons">
          <button className="role-btn student" onClick={() => navigate('/login/student')}>Student</button>
          <button className="role-btn faculty" onClick={() => navigate('/login/faculty')}>Placement Coordinator</button>
          <button className="role-btn management" onClick={() => navigate('/login/management')}>Admin</button>
        </div>
      </div>
    </div>
  );
}
