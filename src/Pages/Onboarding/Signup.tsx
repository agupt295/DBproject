import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/auth.css';

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  education: string;
  current_role: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    education: '',
    current_role: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignupData | 'confirmPassword' | 'terms', string>>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof SignupData | 'confirmPassword' | 'terms', string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof SignupData | 'confirmPassword' | 'terms', string>> = {};

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.education.trim()) {
      newErrors.education = 'Education is required';
    }

    if (!formData.current_role.trim()) {
      newErrors.current_role = 'Current role is required';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep2()) {
      // Mock signup for demo
      console.log('Signup:', formData);

      // Store mock user data
      const mockUser = { id: 1, email: formData.email };
      const mockToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Navigate to main page
      navigate('/main');
    }
  };

  const handleInputChange = (field: keyof SignupData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card signup-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="#00D4AA"/>
                <path d="M15 20L18 23L25 16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">Jobright</span>
          </div>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Start your journey to finding the perfect job</p>
          
          {/* Progress indicator */}
          <div className="progress-indicator">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="progress-circle">1</div>
              <span>Account</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="progress-circle">2</div>
              <span>Profile</span>
            </div>
          </div>
        </div>

        {currentStep === 1 ? (
          <form className="auth-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full name
              </label>
              <input
                type="text"
                id="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm password
              </label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                  }}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <button type="button" onClick={handleNext} className="submit-button">
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone number
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <input
                  type="tel"
                  id="phone"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <input
                  type="text"
                  id="location"
                  className={`form-input ${errors.location ? 'error' : ''}`}
                  placeholder="San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="education" className="form-label">
                Education
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
                <input
                  type="text"
                  id="education"
                  className={`form-input ${errors.education ? 'error' : ''}`}
                  placeholder="B.S. Computer Science - Stanford University"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                />
              </div>
              {errors.education && <span className="error-message">{errors.education}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="current_role" className="form-label">
                Current role
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                <input
                  type="text"
                  id="current_role"
                  className={`form-input ${errors.current_role ? 'error' : ''}`}
                  placeholder="Software Engineer at Google"
                  value={formData.current_role}
                  onChange={(e) => handleInputChange('current_role', e.target.value)}
                />
              </div>
              {errors.current_role && <span className="error-message">{errors.current_role}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => {
                    setAgreeToTerms(e.target.checked);
                    if (errors.terms) setErrors({ ...errors, terms: undefined });
                  }}
                />
                <span className="checkbox-custom"></span>
                <span>
                  I agree to the{' '}
                  <a href="#" className="text-link">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-link">Privacy Policy</a>
                </span>
              </label>
              {errors.terms && <span className="error-message">{errors.terms}</span>}
            </div>

            <div className="button-group">
              <button type="button" onClick={handleBack} className="back-button">
                Back
              </button>
              <button type="submit" className="submit-button">
                Create account
              </button>
            </div>
          </form>
        )}

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <button onClick={() => navigate('/')} className="switch-link">
              Sign in
            </button>
          </p>
        </div>
      </div>

      <div className="auth-background">
        <div className="background-shape shape-1"></div>
        <div className="background-shape shape-2"></div>
        <div className="background-shape shape-3"></div>
      </div>
    </div>
  );
};

export default Signup;