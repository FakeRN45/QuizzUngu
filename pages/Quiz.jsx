import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import Timer from '../components/Timer';
import '../style/Quiz.css';

const QuizPage = () => {
  const {
    questions,
    currentCategory,
    setCurrentCategory,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
    setScore,
    updateLeaderboard,
  } = useContext(QuizContext);

  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      const formattedCategory = category.replace(/-/g, '_').toLowerCase();
      if (questions[formattedCategory]) {
        setCurrentCategory(formattedCategory);
      } else {
        alert('Invalid category');
        navigate('/room');
      }
    }
  }, [category, questions, setCurrentCategory, navigate]);

  if (!currentCategory || !questions[currentCategory]) {
    return <div>No questions available for this category.</div>;
  }

  const currentQuestion = questions[currentCategory][currentQuestionIndex];

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex + 1 < questions[currentCategory].length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      const finalScore = score + (isCorrect ? 1 : 0);
      updateLeaderboard('Player', finalScore);
      alert(`Quiz finished! Your score: ${finalScore}`);
      navigate('/room');
    }
  };

  const handleTimeOut = () => {
    if (currentQuestionIndex + 1 < questions[currentCategory].length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      updateLeaderboard('Player', score);
      alert(`Quiz finished! Your score: ${score}`);
      navigate('/room');
    }
  };

  return (
    <div className="quiz-page">
      <Timer initialTime={30} onTimeOut={handleTimeOut} />
      <h2>{`Category: ${category.replace(/-/g, ' ')}`}</h2>
      <div className="question-container">
        <h3>{currentQuestion.question}</h3>
        <div className="answers">
          {currentQuestion.answers.map((answer, index) => (
            <button key={index} onClick={() => handleAnswer(answer.isCorrect)}>
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;