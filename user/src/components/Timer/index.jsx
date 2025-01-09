import React, { useState, useEffect } from "react";

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
    <div className="flex justify-between items-center bg-gradient-to-br from-blue-800 to-blue-300 text-white py-2 px-4 rounded-lg">
      <div className="text-xl font-extrabold animate-pulse">
        Duy nhất hôm nay
      </div>
      <div className="flex items-center gap-2 animate-pulse">
        <span>Kết thúc trong</span>
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-blue-500 text-white w-12 h-12 rounded-lg">
            {hours}
          </div>
          <div className="flex justify-center items-center bg-blue-500 text-white w-12 h-12 rounded-lg">
            {minutes}
          </div>
          <div className="flex justify-center items-center bg-blue-500 text-white w-12 h-12 rounded-lg">
            {seconds}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
