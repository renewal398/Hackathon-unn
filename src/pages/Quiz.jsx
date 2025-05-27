// src/pages/Quiz.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const quizData = [
  {
    id: 1,
    question: 'What is the primary cause of climate change?',
    options: [
      'Deforestation',
      'Plastic pollution',
      'Carbon emissions',
      'Overfishing'
    ],
    correctAnswer: 'Carbon emissions'
  },
  {
    id: 2,
    question: 'Which of these is a renewable energy source?',
    options: [
      'Coal',
      'Natural gas',
      'Solar power',
      'Nuclear energy'
    ],
    correctAnswer: 'Solar power'
  },
  {
    id: 3,
    question: 'What percentage of the world\'s water is freshwater?',
    options: [
      '10%',
      '25%',
      '50%',
      '3%'
    ],
    correctAnswer: '3%'
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setSelectedOption('');
    
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setQuizCompleted(false);
  };

  const handleClaimReward = () => {
    navigate('/rewards');
  };

  return (
    <div className="quiz-container">
      {!quizCompleted ? (
        <>
          <div className="quiz-progress">
            Question {currentQuestion + 1} of {quizData.length}
          </div>
          <div className="quiz-question">
            <h2>{quizData[currentQuestion].question}</h2>
          </div>
          <div className="quiz-options">
            {quizData[currentQuestion].options.map((option, index) => (
              <div 
                key={index}
                className={`quiz-option ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <button 
            className="quiz-next-button"
            onClick={handleNextQuestion}
            disabled={!selectedOption}
          >
            {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </>
      ) : (
        <div className="quiz-results">
          <h2>Quiz Completed!</h2>
          <p>Your score: {score} out of {quizData.length}</p>
          {score === quizData.length ? (
            <>
              <div className="quiz-success">
                <p>Perfect score! You've earned a Green Badge NFT!</p>
                <button className="quiz-reward-button" onClick={handleClaimReward}>
                  Claim Your Reward
                </button>
              </div>
            </>
          ) : (
            <button className="quiz-restart-button" onClick={handleRestartQuiz}>
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;