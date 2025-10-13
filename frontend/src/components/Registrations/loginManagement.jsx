import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; 
import { login as loginAPI } from '../../services/authAPI';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './loginManagement.css';

export default function LoginManagement() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth(); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI('management', formData);
      auth.login(response.data, 'management');
      navigate('/dashboard/management');
    } catch (error) {
      alert('Login failed! Please check your credentials.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-page3">
      <div className="login-card">
        <h2>Admin Login</h2>
       
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        {/* Back to Home Button */}
        <button
          className="register-btn"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
