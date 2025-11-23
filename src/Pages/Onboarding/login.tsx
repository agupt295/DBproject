import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '../../Components/Textfield';
import "../CSS/login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Simulate login process
    setTimeout(() => {
      // Mock validation
      if (!email || !password) {
        setError('Please enter email and password');
        setIsLoading(false);
        return;
      }

      // Mock successful login
      setSuccess('Login successful!');
      const mockUser = { id: 1, email: email };
      const mockToken = 'mock-jwt-token-' + Date.now();

      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      console.log('Login successful:', mockUser);

      // Navigate to home page after successful login
      setTimeout(() => {
        navigate('/main');
      }, 1000);

      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          <TextField
            type="email"
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <TextField
            type="password"
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="signup-link">
            Don't have an account? <span onClick={() => navigate('/signup')} style={{color: '#007bff', cursor: 'pointer', textDecoration: 'underline'}}>Sign Up</span>
          </p>
        </form>

        <div className="login-footer">
          <a href="#forgot-password">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;