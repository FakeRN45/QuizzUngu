import React from "react";
import "../style/PlayButton.css";

const PlayButton = () => {
  const handlePlay = () => {
    alert("Redirecting to the quiz room...");
  };

  return (
    <button className="play-button" onClick={handlePlay}>
      Play
    </button>
  );
};

export default PlayButton;