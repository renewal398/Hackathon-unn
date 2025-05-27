import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>GreenChain</h1>
        <p className="tagline">Learn sustainability, earn rewards, and make a difference for our planet.</p>
        
        <div className="benefits">
          <div className="benefit-item">
            <span className="benefit-icon">📚</span>
            <div>
              <h3>Learn</h3>
              <p>Interactive lessons</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🏆</span>
            <div>
              <h3>Earn</h3>
              <p>NFT Rewards</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🌱</span>
            <div>
              <h3>Impact</h3>
              <p>Make a difference</p>
            </div>
          </div>
        </div>
      </div>

      <div className="login-form-container">
        <div className="login-form">
          <h2>Welcome Back</h2>
          <p className="subheading">Sign in to continue your journey</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            Need an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;