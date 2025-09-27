import '../header/header.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterButton() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register/student');
  };

  return (
    <div className="register-btn-container">
      <button className="register-btn" onClick={handleRegisterClick}>
        Register
      </button>
    </div>
  );
}