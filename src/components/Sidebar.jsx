// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaHome, 
  FaGraduationCap, 
  FaBook, 
  FaTrophy, 
  FaWallet, 
  FaChartLine,
  FaUser,
  FaCog,
  FaSignOutAlt 
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {!isDesktop && isOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}
      <motion.div
        className={`sidebar ${isDesktop ? 'desktop' : ''}`}
        initial={isDesktop ? false : "closed"}
        animate={isDesktop ? false : (isOpen ? "open" : "closed")}
        variants={isDesktop ? {} : sidebarVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={isDesktop ? { position: 'sticky', transform: 'none' } : {}}
      >
        <div className="sidebar-header">
          <h2>GreenChain</h2>
          <p className="sidebar-subtitle">Sustainability Platform</p>
        </div>

        <nav className="sidebar-nav">
          {/* Navigation Section */}
          <div className="nav-section">
            <div className="nav-section-title">Navigation</div>
            <Link 
              to="/dashboard" 
              className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
            >
              <FaHome className="nav-icon" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/landing" 
              className={`nav-item ${isActive('/landing') ? 'active' : ''}`}
            >
              <FaGraduationCap className="nav-icon" />
              <span>Landing</span>
            </Link>
            <Link 
              to="/lessons" 
              className={`nav-item ${isActive('/lessons') ? 'active' : ''}`}
            >
              <FaBook className="nav-icon" />
              <span>Lessons</span>
            </Link>
            <Link 
              to="/nfts" 
              className={`nav-item ${isActive('/nfts') ? 'active' : ''}`}
            >
              <FaTrophy className="nav-icon" />
              <span>My NFTs</span>
            </Link>
            <Link 
              to="/wallet" 
              className={`nav-item ${isActive('/wallet') ? 'active' : ''}`}
            >
              <FaWallet className="nav-icon" />
              <span>Wallet</span>
            </Link>
            <Link 
              to="/analytics" 
              className={`nav-item ${isActive('/analytics') ? 'active' : ''}`}
            >
              <FaChartLine className="nav-icon" />
              <span>Analytics</span>
            </Link>
          </div>

          {/* Account Section */}
          <div className="nav-section">
            <div className="nav-section-title">Account</div>
            <Link 
              to="/profile" 
              className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
            >
              <FaUser className="nav-icon" />
              <span>Profile</span>
            </Link>
            <Link 
              to="/settings" 
              className={`nav-item ${isActive('/settings') ? 'active' : ''}`}
            >
              <FaCog className="nav-icon" />
              <span>Settings</span>
            </Link>
          </div>
        </nav>

        <div className="sidebar-footer">
          {/* Green Points Display */}
          <div className="points-display">
            <span className="points-number">1250</span>
            <span className="points-label">Green Points</span>
          </div>

          {/* Logout Button */}
          <button className="logout-button">
            <FaSignOutAlt className="nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;