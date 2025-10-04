import React, { useState } from 'react';
import './registerFaculty.css';
import API from '../../services/api';

const FacultyRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '', // New field required for faculty
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for the current field as the user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.department.trim()) newErrors.department = 'Department is required.';

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setMessage('');

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        department: formData.department,
        role: 'faculty', // Fixed role as per schema
      };

      try {
        console.log('Posting faculty payload to /api/faculty', payload);
        const res = await API.post('/faculty', payload);

        // Backend returns { success: true, data: faculty } on success
        if (res?.data?.success) {
          setMessage('✅ Faculty user registered successfully!');
          setFormData({ name: '', email: '', password: '', confirmPassword: '', department: '' });
          setErrors({});
        } else {
          // Backend may return success=false or a generic response
          const serverMsg = res?.data?.message || 'Registration failed';
          setMessage(serverMsg);
        }
      } catch (err) {
        console.error('Error registering faculty:', err);
        const serverMsg = err?.response?.data?.message || err.message || 'Server error';
        setMessage(serverMsg);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setMessage('Please correct the errors and try again.');
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register Faculty User</h2>
        <p className="form-role-info">Role: **Faculty** (Fixed and immutable)</p>

        {message && <div className={`message ${message.startsWith('✅') ? 'success' : 'error'}`}>{message}</div>}

        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className={errors.name ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        {/* Department Field */}
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., Computer Science, Electrical"
            className={errors.department ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.department && <p className="error-text">{errors.department}</p>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter professional email"
            className={errors.email ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password (min 6 chars)</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
            className={errors.password ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className={errors.confirmPassword ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register Faculty'}
        </button>
      </form>
    </div>
  );
};

export default FacultyRegistration;