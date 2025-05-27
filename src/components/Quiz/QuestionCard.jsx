// src/components/Quiz/QuestionCard.jsx
import './QuestionCard.css';

const QuestionCard = ({ 
  question, 
  options, 
  selectedOption, 
  onSelect, 
  questionNumber,
  totalQuestions
}) => {
  return (
    <div className="question-card">
      <div className="question-progress">
        Question {questionNumber} of {totalQuestions}
      </div>
      <h3 className="question-text">{question}</h3>
      <div className="options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`option ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => onSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;