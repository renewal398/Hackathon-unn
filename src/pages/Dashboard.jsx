// src/pages/Dashboard.jsx
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-content">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="content">
          {/* Header */}
          <header className="dashboard-header">
            <h1>Welcome back, kinfi</h1>
            <p className="subtitle">Continue your sustainability journey and make a positive impact on our planet.</p>
          </header>

          <div className="dashboard-grid">
            {/* Learning Progress Section */}
            <section className="dashboard-card learning-progress">
              <h2>Learning Progress</h2>
              <p className="card-subtitle">Your journey through sustainability reduction</p>
              
              <div className="progress-section">
                <h3>Overall Progress</h3>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: '25%' }}></div>
                </div>
                <p className="progress-text"><strong>25% complete</strong> - Keep going</p>
              </div>
            </section>

            {/* Quick Actions Section */}
            <section className="dashboard-card quick-actions">
              <h2>Quick Actions</h2>
              <ul className="actions-list">
                <li>
                  <button className="action-button">Browse Lessons</button>
                </li>
                <li>
                  <button className="action-button">View My NFTs</button>
                </li>
                <li>
                  <button className="action-button">Manage Wallet</button>
                </li>
              </ul>
            </section>

            {/* Continue Learning Section */}
            <section className="dashboard-card continue-learning">
              <h2>Continue Learning</h2>
              <p className="card-subtitle">Pick up where you left off.</p>
              
              <div className="lesson-card">
                <h3>Renewable Energy Basics</h3>
                <p>Learn about water, wind, and other renewable energy sources.</p>
                <div className="lesson-meta">
                  <span className="badge new">New</span>
                  <span className="duration">20 min</span>
                </div>
              </div>
              
              <div className="lesson-card">
                <h3>Sustainable Transportation</h3>
                <p>Explore eco-friendly ways to get around.</p>
                <div className="lesson-meta">
                  <span className="badge new">New</span>
                  <span className="duration">18 min</span>
                  <button className="start-button">Start Lesson</button>
                </div>
              </div>
            </section>

            {/* Recent Activity Section */}
            <section className="dashboard-card recent-activity">
              <h2>Recent Activity</h2>
              
              <div className="activity-item">
                <h3>Completed "Climate Change 101" lesson</h3>
                <ul className="activity-times">
                  <li>2 days ago</li>
                </ul>
              </div>
              
              <div className="activity-item">
                <h3>Earned "Climate Campaign" NFT</h3>
                <ul className="activity-times">
                  <li>a day ago</li>
                </ul>
              </div>
              
              <div className="activity-item">
                <h3>Joined GreenChain platform</h3>
                <ul className="activity-times">
                  <li>1 week ago</li>
                  
                </ul>
              </div>
            </section>

            {/* Latest Achievement Section */}
            <section className="dashboard-card achievement">
              <h2>Latest Achievement</h2>
              
              <div className="achievement-card">
                <h3>Climate Champion</h3>
                <p>Completed the Climate Change fundamentals course</p>
                <div className="achievement-meta">
                  <span className="points">+50 Green Points</span>
                  <button className="view-button">View All Achievements</button>
                </div>
              </div>
            </section>

            {/* Community Section */}
            <section className="dashboard-card community">
              <h2>Community</h2>
              
              <div className="community-stats">
                <div className="stat-item">
                  <h3>Active Learners</h3>
                  <p className="stat-value">10,247</p>
                </div>
                
                <div className="stat-item">
                  <h3>New This Week</h3>
                  <p className="stat-value">2,891</p>
                </div>
                
                <div className="stat-item">
                  <h3>Your Rank</h3>
                  <p className="stat-value">#1,254</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;