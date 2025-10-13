import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; 
import { login as loginAPI } from '../../services/authAPI';
import './loginFaculty.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Eye icons


export default function LoginFaculty() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const auth = useAuth(); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI('faculty', formData);
      auth.login(response.data, 'faculty'); 
      navigate('/dashboard/faculty');
    } catch (error) {
      alert("Login failed! Check your credentials.");
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-page2">
      <div className="login-card">
        <h2>Placement Coordinator Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
        <button className="register-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
