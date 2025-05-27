// src/pages/Rewards.jsx
import { useState } from 'react';
import NFTBadge from '../components/Rewards/NFTBadge';
import './Rewards.css';

const badgesData = [
  {
    id: 1,
    name: 'Green Beginner',
    description: 'Awarded for completing your first lesson',
    image: '/badges/green-beginner.png',
    dateEarned: '2023-05-15',
    rarity: 'Common'
  },
  {
    id: 2,
    name: 'Climate Champion',
    description: 'Awarded for scoring 100% on a climate quiz',
    image: '/badges/climate-champion.png',
    dateEarned: '2023-06-02',
    rarity: 'Rare'
  },
  {
    id: 3,
    name: 'Eco Warrior',
    description: 'Awarded for completing 5 lessons',
    image: '/badges/eco-warrior.png',
    dateEarned: '2023-06-10',
    rarity: 'Epic'
  },
  {
    id: 4,
    name: 'Sustainability Master',
    description: 'Awarded for completing all lessons',
    image: '/badges/sustainability-master.png',
    dateEarned: null,
    rarity: 'Legendary'
  }
];

const Rewards = () => {
  const [badges] = useState(badgesData);

  return (
    <div className="rewards-container">
      <h1>Your Green Badges</h1>
      <p className="subtitle">NFT rewards earned through learning about sustainability</p>
      
      <div className="badges-grid">
        {badges.map(badge => (
          <NFTBadge 
            key={badge.id}
            name={badge.name}
            description={badge.description}
            image={badge.image}
            dateEarned={badge.dateEarned}
            rarity={badge.rarity}
          />
        ))}
      </div>
      
      <div className="rewards-info">
        <h2>How to Earn More Badges</h2>
        <ul>
          <li>Complete lessons on sustainability topics</li>
          <li>Score 100% on quizzes</li>
          <li>Complete all lessons in a category</li>
          <li>Refer friends to GreenChain</li>
        </ul>
      </div>
    </div>
  );
};

export default Rewards;