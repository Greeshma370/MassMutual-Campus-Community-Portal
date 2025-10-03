import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; 
import { login as loginAPI } from '../../services/authAPI';
import './loginStudent.css';

export default function LoginFaculty() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  // Get the entire auth context object
  const auth = useAuth(); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI('faculty', formData);
      
      // Call the login method from the context object
      auth.login(response.data, 'faculty'); 
      
      navigate('/dashboard/faculty');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Faculty Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}