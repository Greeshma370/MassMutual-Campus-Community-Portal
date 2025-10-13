import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; 
import { login as loginAPI } from '../../services/authAPI';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './loginStudent.css';

export default function LoginStudent() {
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
      const response = await loginAPI('student', formData);
      auth.login(response.data, 'student'); 
      navigate('/dashboard/student');
    } catch (error) {
      alert('Login failed! Please check your credentials.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-page1">
      <div className="login-card">
        <h2>Student Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
        <button
          className="register-btn"
          onClick={() => navigate('/register/student')}
        >
          Register as Student
        </button>
      </div>
    </div>
  );
}
