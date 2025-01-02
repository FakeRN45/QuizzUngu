import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import "../style/Room.css";

const Room = () => {
  const { resetQuiz, leaderboard } = useContext(QuizContext);
  const [categories, setCategories] = useState([
    "Cyber Security",
    "Artificial Intelligence",
    "Data Science",
    "Cloud Computing",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    resetQuiz();
  }, [resetQuiz]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handlePlay = () => {
    if (selectedCategory) {
      navigate(`/quiz/${selectedCategory.toLowerCase().replace(/ /g, "-")}`);
    } else {
      alert("Please select a quiz category first.");
    }
  };

  return (
    <div className="room-container">
      <div className="quiz-container">
        <h2>Select a Quiz</h2>
        <div className="categories">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-btn ${
                selectedCategory === category ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button className="play-btn" onClick={handlePlay}>
          Play
        </button>
      </div>

      <div className="leaderboard">
        <h3>Leaderboard</h3>
        <ul>
          {leaderboard.map((entry, index) => (
            <li key={index}>
              {entry.player}: {entry.score} points
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Room;