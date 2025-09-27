import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelectorPage.css';

export default function RoleSelectorPage() {
  const navigate = useNavigate();

  return (
    <div className="role-selector-container">
      <h2>Select Your Role to Login</h2>
      <div className="role-buttons">
        <button onClick={() => navigate('/login/student')}>Student</button>
        <button onClick={() => navigate('/login/faculty')}>Faculty</button>
        <button onClick={() => navigate('/login/management')}>Management</button>
      </div>
    </div>
  );
}