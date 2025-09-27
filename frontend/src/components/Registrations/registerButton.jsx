import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../header/header.css';

export default function RegisterButton() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegisterClick = () => {
    navigate('/register/student'); // Navigate to the registration page
  };

  return (
    <div className="register-btn-container">
      {/* Attach the click handler directly to the button */}
      <button className="register-btn" onClick={handleRegisterClick}>
        Register
      </button>
    </div>
  );
}