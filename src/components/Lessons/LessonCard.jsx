// src/components/Lessons/LessonCard.jsx
import { Link } from 'react-router-dom';
import './LessonCard.css';

const LessonCard = ({ id, title, description, completed, duration, badge }) => {
  return (
    <div className={`lesson-card ${completed ? 'completed' : ''}`}>
      <div className="lesson-status">
        {completed ? (
          <span className="completed-badge">Completed</span>
        ) : (
          <span className="duration">{duration}</span>
        )}
      </div>
      <div className="lesson-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="lesson-actions">
        <Link 
          to={`/lesson/${id}`} 
          className={`lesson-button ${completed ? 'review-button' : 'start-button'}`}
        >
          {completed ? 'Review' : 'Start'}
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;