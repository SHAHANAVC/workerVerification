import React, { useState } from "react";
import "./Login.css";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("worker"); // "worker" or "client"
const navigate =useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", {
        username: email,
        password,
        userType
      });

      // localStorage.setItem("authToken", data.token);
      // localStorage.setItem("userType", userType);
      // localStorage.setItem("user", JSON.stringify(data.user));
      
      alert("Login successful!");
      console.log(data);
      if(data.login.role=='worker'){
        localStorage.setItem("worker_logId",data.login._id)
navigate('/WorkerProfile')
      }
            if(data.login.role=='Admin'){
        
navigate('/admin')}
                 if(data.login.role=='user'){
        localStorage.setItem("userLogId",data.login._id)
        
navigate('/userhome')}
                 if(data.login.role=='police'){
        // localStorage.setItem("userLogId",data.login._id)
        
navigate('/Policehome')}  
      // window.location.href = userType === "worker" ? "/WorkerProfile" : "/ClientDashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workhub-login-container">
      {/* Header */}
      <header className="workhub-header">
        <div className="workhub-logo">
          <div className="logo-icon">🛠️</div>
          <span className="logo-text">WorkHub</span>
        </div>
        <nav className="header-nav">
        <Link to={'/workerRegistration'}>  <a >Worker</a></Link>
        
        <Link to={'/userregister'}>  <a >User</a></Link>

          
     
        </nav>
      </header>

      <div className="workhub-login-content">
        {/* Left Side - Hero Section */}
        <div className="login-hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Find Skilled <span className="highlight">Professionals</span> Near You
            </h1>
            <p className="hero-subtitle">
              Connect with verified workers across 50+ service categories. Quality work guaranteed.
            </p>
            
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Verified Workers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Service Categories</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">4.8★</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>

            <div className="service-categories">
              <div className="category-tag">👷 Construction</div>
              <div className="category-tag">🔧 Plumbing</div>
              <div className="category-tag">⚡ Electrical</div>
              <div className="category-tag">🎨 Painting</div>
              <div className="category-tag">🧹 Cleaning</div>
              <div className="category-tag">📦 Moving</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="login-form-card">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to access your account</p>
            </div>

            {/* User Type Selector */}
            <div className="user-type-selector">
              <button
                type="button"
                className={`user-type-btn ${userType === 'worker' ? 'active' : ''}`}
                onClick={() => setUserType('worker')}
              >
                👷 I'm a Worker
              </button>
              <button
                type="button"
                className={`user-type-btn ${userType === 'client' ? 'active' : ''}`}
                onClick={() => setUserType('client')}
              >
                👨‍💼 I Need a Worker
              </button>
            </div>

            <form onSubmit={handleSubmit} className="workhub-login-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-container">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="label-row">
                  <label className="form-label">Password</label>
                  <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                </div>
                <div className="input-container">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className={`submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="btn-spinner"></div>
                    Signing In...
                  </>
                ) : (
                  `Sign In as ${userType === 'worker' ? 'Worker' : 'Client'}`
                )}
              </button>
            </form>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-login-buttons">
              <button type="button" className="social-btn google-btn">
                <img src="/google-icon.svg" alt="Google" className="social-icon" />
                Google
              </button>
              <button type="button" className="social-btn facebook-btn">
                <img src="/facebook-icon.svg" alt="Facebook" className="social-icon" />
                Facebook
              </button>
            </div>

            <div className="signup-section">
              <p>
                Don't have an account?{" "}
                <a href="/signup" className="signup-link">
                  Sign up as {userType === 'worker' ? 'Worker' : 'Client'}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="workhub-footer">
        <div className="footer-content">
          <p>&copy; 2024 WorkHub. Connecting professionals with opportunities.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;