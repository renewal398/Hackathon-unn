// src/components/Rewards/NFTBadge.jsx
import './NFTBadge.css';

const NFTBadge = ({ name, description, image, dateEarned, rarity }) => {
  return (
    <div className={`nft-badge ${rarity.toLowerCase()}`}>
      <div className="badge-image">
        <img src={image} alt={name} />
        <span className="rarity-tag">{rarity}</span>
      </div>
      <div className="badge-info">
        <h3>{name}</h3>
        <p>{description}</p>
        {dateEarned ? (
          <div className="earned-date">Earned: {new Date(dateEarned).toLocaleDateString()}</div>
        ) : (
          <div className="not-earned">Not yet earned</div>
        )}
      </div>
    </div>
  );
};

export default NFTBadge;