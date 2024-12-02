import React, { useState, useEffect } from "react";
import "./style.css";

const Timer = ({ duration }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1000), 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  const getFormattedTime = (milliseconds) => {
    const total_seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor((total_seconds / 3600) % 24);
    const minutes = Math.floor((total_seconds / 60) % 60);
    const seconds = total_seconds % 60;

    return [hours, minutes, seconds].map((val) => String(val).padStart(2, "0"));
  };

  const [hours, minutes, seconds] = getFormattedTime(time);

  return (
    <div className="container">
      <div className="timer-container">
        <div className="title">Duy nhất hôm nay</div>
        <div className="countdown-section">
          <span>Kết thúc trong</span>
          <div className="countdown">
            <div className="time-box">{hours}</div>
            <div className="time-box">{minutes}</div>
            <div className="time-box">{seconds}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
