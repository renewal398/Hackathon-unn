import React from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ toggleSidebar }) => {
  // Mock user data - replace with actual auth context
  const user = {
    name: 'Guest',
    greenPoints: 1250
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className="logo-container">
          <div className="logo-icon">
            <div className="recycle-icon">♻</div>
          </div>
          <div className="logo-text">
            <h1 className="logo-title">GreenChain</h1>
            <span className="logo-subtitle">Sustainability Platform</span>
          </div>
        </div>
      </div>
      
      <div className="navbar-right">
        <div className="green-points">
          <span className="points-value">{user.greenPoints}</span>
          <span className="points-label">Green Points</span>
        </div>
        <div className="user-info">
          <span className="username">{user?.name || 'Guest'}</span>
          <div className="user-avatar">
            <FaUser />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;