// src/pages/Landing.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Landing.css';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="landing-container">
      <div className="landing-hero">
        <h1>GreenChain</h1>
        <p className="tagline">Learn About Sustainability. Earn Rewards.</p>
        <div className="cta-buttons">
          {user ? (
            <Link to="/dashboard" className="cta-button">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="cta-button">
                Login
              </Link>
              <Link to="/register" className="cta-button secondary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Interactive Lessons</h3>
          <p>Learn about climate change, sustainability, and eco-friendly practices.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h3>Knowledge Quizzes</h3>
          <p>Test your knowledge and earn points for correct answers.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏆</div>
          <h3>NFT Rewards</h3>
          <p>Collect unique Green Badge NFTs as you complete lessons and quizzes.</p>
        </div>
      </div>

      <div className="about-section">
        <h2>What is Climate Change?</h2>
        <p>
          Climate change refers to significant, long-term changes in the global climate. 
          The global climate is the connected system of sun, earth and oceans, wind, 
          rain and snow, forests, deserts and savannas, and everything people do.
        </p>
        <p>
          Through GreenChain, you can learn how to make a difference and be rewarded
          for your environmental knowledge and actions.
        </p>
      </div>
    </div>
  );
};

export default Landing;