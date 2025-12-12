import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/apiService';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await authService.login({ email, password });
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'Administrator' || user.role === 'Space_Manager') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.error?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="login-container dark">
      {/* Return to Home Button */}
      <button className="btn-return-home" onClick={() => navigate('/')}>
        <span className="material-symbols-outlined">arrow_back</span>
        <span>Return to Home</span>
      </button>

      <div className="login-wrapper">
        <div className="login-header">
          <h1 className="login-title">Login to your account</h1>
        </div>

        <main className="login-card">
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label className="input-wrapper">
                <p className="form-label">İTÜ Email</p>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="user@itu.edu.tr" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </label>
              <p className="helper-text">Only @itu.edu.tr accounts are permitted.</p>
            </div>

            <div className="form-group">
              <div className="form-label">
                <span>Password</span>
                <a className="forgot-link" href="#">Forgot Password?</a>
              </div>
              <div className="password-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-input" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <span 
                  className="material-symbols-outlined password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </div>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>
        </main>

        <footer className="login-footer">
          <p>
            Don't have an account?
            <span className="signup-link" onClick={() => navigate('/register')}>Sign Up</span>
          </p>
          
          <div className="divider-container">
            <div className="divider-line" aria-hidden="true"></div>
            <div className="divider-text-wrapper">
              <span className="divider-text">Or</span>
            </div>
          </div>

          <span className="guest-link" onClick={() => navigate('/')}>Continue as Guest</span>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;