import React from "react";
import "../style/Leaderboard.css";

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No data available. Be the first to score!</p>
      ) : (
        <ul className="leaderboard-list">
          {leaderboard.map((entry, index) => (
            <li className="leaderboard-item" key={index}>
              <span className="rank">#{index + 1}</span>
              <span>{entry.player}</span>
              <span>{entry.score} pts</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;