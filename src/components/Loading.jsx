// src/components/Loading.jsx
import { motion } from 'framer-motion';
import './Loading.css';

const Loading = () => {
  const leafVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 2,
          ease: "linear"
        }
      }
    }
  };

  return (
    <div className="loading-container">
      <motion.div 
        className="loading-leaf"
        variants={leafVariants}
        animate="animate"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" fill="#4CAF50"/>
        </svg>
      </motion.div>
      <p>Loading GreenChain...</p>
    </div>
  );
};

export default Loading;