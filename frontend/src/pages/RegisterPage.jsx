import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/apiService';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentNumber: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getStrength = (pass) => {
    if (!pass) return '';
    if (pass.length < 6) return 'strength-weak';
    if (pass.length < 10) return 'strength-medium';
    return 'strength-strong';
  };

  const strengthClass = getStrength(formData.password);
  const strengthLabel = {
    'strength-weak': 'Weak',
    'strength-medium': 'Medium',
    'strength-strong': 'Strong',
    '': ''
  }[strengthClass];

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.email.endsWith('@itu.edu.tr')) {
      alert("Please use a valid ITU email address (@itu.edu.tr)");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const apiData = {
        fullName: formData.fullName,
        email: formData.email,
        studentNumber: formData.studentNumber,
        password: formData.password,
        passwordConfirmation: formData.confirmPassword,
        phoneNumber: formData.phoneNumber
      };

      await authService.register(apiData);
      alert("Registration successful! Check email for verification.");
      navigate('/login');
    } catch (err) {
      console.error("Register Error:", err);
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-container dark">
      {/* Return to Home Button */}
      <button className="btn-return-home" onClick={() => navigate('/')}>
        <span className="material-symbols-outlined">arrow_back</span>
        <span>Return to Home</span>
      </button>

      <div className="register-wrapper">
        <div className="register-header">
          <h1 className="register-title">Create Your Account</h1>
          <p className="register-subtitle">Register for İTÜ Study Space Finder</p>
        </div>

        <div className="register-card">
          <form onSubmit={handleRegister} className="register-form">
            <label className="form-label-group">
              <span className="form-label">Full Name</span>
              <input 
                name="fullName"
                type="text" 
                className="form-input" 
                placeholder="Enter your full name" 
                value={formData.fullName}
                onChange={handleChange}
                required 
              />
            </label>

            <div className="form-label-group">
              <label>
                <span className="form-label">İTÜ Email</span>
                <input 
                  name="email"
                  type="email" 
                  className="form-input" 
                  placeholder="user@itu.edu.tr" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </label>
              <p className="helper-text">Please use your official İTÜ email address.</p>
            </div>

            <div className="form-grid-row">
              <label className="form-label-group">
                <span className="form-label">Student Number</span>
                <input 
                  name="studentNumber"
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 123456789" 
                  value={formData.studentNumber}
                  onChange={handleChange}
                  required 
                />
              </label>
              
              <label className="form-label-group">
                <span className="form-label">Phone Number <span className="label-optional">(Optional)</span></span>
                <input 
                  name="phoneNumber"
                  type="tel" 
                  className="form-input" 
                  placeholder="+90 555 555 5555" 
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-label-group">
              <span className="form-label">Password</span>
              <div className="password-wrapper">
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  className="form-input" 
                  placeholder="Enter your password" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  <span className="material-symbols-outlined">{showPassword ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>
              <div className={`strength-container ${strengthClass}`}>
                <div className="strength-bar-bg">
                  <div className="strength-bar-fill"></div>
                </div>
                <span className="strength-text">{strengthLabel}</span>
              </div>
            </div>

            <div className="form-label-group">
              <span className="form-label">Confirm Password</span>
              <div className="password-wrapper">
                <input 
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"} 
                  className={`form-input ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'error' : ''}`}
                  placeholder="Re-enter your password" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                />
                <button type="button" className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                  <span className="material-symbols-outlined">{showConfirm ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="error-text">Passwords do not match.</p>
              )}
            </div>

            <button type="submit" className="submit-btn">Register</button>
          </form>
        </div>

        <p className="register-footer">
          Already have an account? <span className="login-link" onClick={() => navigate('/login')}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;