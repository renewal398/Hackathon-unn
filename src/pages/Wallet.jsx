import React from 'react';
import './Wallet.css';

const Wallet = () => {
  return (
    <div className="wallet-container">
      <header className="wallet-header">
        <h1>Wallet Management</h1>
      </header>

      <section className="wallet-status">
        <h2>Wallet Status</h2>
        <div className="status-card">
          <p className="connected-status">
            <span className="status-indicator"></span>
            <strong>Wallet Connected</strong>
          </p>
          <p className="status-note">You can add a ready for tutorials to #1 research.</p>
        </div>
      </section>

      <div className="wallet-grid">
        <section className="wallet-info">
          <h3>Connected Wallet</h3>
          <p>Your wallet obtains our business information.</p>

          <div className="address-section">
            <h4>Wallet Address</h4>
            <p className="wallet-address">RAPS/SEEDCASES/SCSS/SEEDCASES/SEEDCASES/SEEDCASES</p>
          </div>

          <div className="wallet-stats">
            <table>
              <tbody>
                <tr>
                  <td>N°</td>
                  <td>1250</td>
                  <td>0.05</td>
                  <td>$1,250</td>
                </tr>
                <tr>
                  <td>N°</td>
                  <td>1 Owned</td>
                  <td>Owner Points</td>
                  <td>$115 Balance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="nft-portfolio">
          <h3>NFT Portfolio</h3>
          <p>Your sustainability environment for its customers is:</p>

          <div className="nft-cards">
            <div className="nft-card green-pioneer">
              <h4>Green Pioneer</h4>
              <p>Welcome to the GreenTech community!</p>
              <p>Your journey goes academically across time.</p>
            </div>

            <div className="nft-card climate-champion">
              <h4>Climate Champion</h4>
              <p>Complete the Climate Change fundamentals course.</p>
            </div>

            <button className="view-button">View</button>
          </div>
        </section>
      </div>

      <section className="wallet-actions">
        <h3>Wallet Actions</h3>
        <p>Manage your wallet and transactions.</p>

        <div className="action-buttons">
          <button className="action-button">
            <span className="button-icon">🔍</span>
            View on Explorer
            <span className="button-description">Create transactions.</span>
          </button>

          <button className="action-button">
            <span className="button-icon">⚙️</span>
            Network Settings
            <span className="button-description">Manage networks.</span>
          </button>

          <button className="action-button">
            <span className="button-icon">❌</span>
            Electrored
            <span className="button-description">Remove connections.</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Wallet;