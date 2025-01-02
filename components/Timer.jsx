import React, { useState, useEffect } from 'react';
import '../style/Timer.css';

const Timer = ({ initialTime, onTimeOut }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time === 0) {
      onTimeOut();
      return;
    }
    const timerId = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
    return () => clearInterval(timerId);
  }, [time, onTimeOut]);

  return <div className="timer">Time Left: {time}s</div>;
};

export default Timer;