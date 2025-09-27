import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../header/header.css';

export default function LoginButton() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <button className="login-btn" onClick={handleLoginClick}>
      Login
    </button>
  );
}