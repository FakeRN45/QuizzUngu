import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions] = useState({
    cyber_security: [
      {
        question: 'What is a Firewall and why is it used?',
        answers: [
          { text: 'A Firewall is a network security system', isCorrect: true },
          { text: 'Firewall focuses on virus threats only.', isCorrect: false },
          { text: 'A web server', isCorrect: false },
        ],
      },
    ],
    artificial_intelligence: [
      {
        question: 'Which algorithm is widely used for training Artificial Neural Networks?',
        answers: [
          { text: 'Backpropagation', isCorrect: true },
          { text: 'Dijkstra’s Algorithm', isCorrect: false },
          { text: 'Quick Sort', isCorrect: false },
        ],
      },
    ],
    data_science: [
      {
        question: 'What is the purpose of data normalization in Data Science?',
        answers: [
          { text: 'To scale data values to a standard range', isCorrect: true },
          { text: 'To introduce random noise to the data', isCorrect: false },
          { text: 'To eliminate duplicate rows', isCorrect: false },
        ],
      },
    ],
    cloud_computing: [
      {
        question: 'What does "Scalability" mean in Cloud Computing?',
        answers: [
          { text: 'The ability to increase or decrease resources as needed', isCorrect: true },
          { text: 'The ability to maintain 100% uptime', isCorrect: false },
          { text: 'The ability to use cloud services offline', isCorrect: false },
        ],
      },
    ],
  });

  const [currentCategory, setCurrentCategory] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  const updateLeaderboard = (player, score) => {
    setLeaderboard((prev) =>
      [...prev, { player, score }].sort((a, b) => b.score - a.score)
    );
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentCategory,
        currentQuestionIndex,
        setScore,
        setCurrentQuestionIndex,
        setCurrentCategory,
        score,
        resetQuiz,
        leaderboard,
        updateLeaderboard,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};