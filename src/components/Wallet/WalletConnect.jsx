// src/components/Wallet/WalletConnect.jsx
import './WalletConnect.css';

const WalletConnect = ({ onConnect, loading }) => {
  return (
    <div className="wallet-connect">
      <h2>Connect Your Wallet</h2>
      <p>To view your GreenChain NFTs and tokens, connect your wallet</p>
      
      <button 
        className="connect-button" 
        onClick={onConnect}
        disabled={loading}
      >
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </button>
      
      <div className="wallet-options">
        <div className="wallet-option">
          <img src="/wallets/metamask.png" alt="MetaMask" />
          <span>MetaMask</span>
        </div>
        <div className="wallet-option">
          <img src="/wallets/walletconnect.png" alt="WalletConnect" />
          <span>WalletConnect</span>
        </div>
        <div className="wallet-option">
          <img src="/wallets/coinbase.png" alt="Coinbase Wallet" />
          <span>Coinbase</span>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;