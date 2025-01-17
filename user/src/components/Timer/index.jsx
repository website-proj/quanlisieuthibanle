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
      <div className="xl:text-xl lg:text-lg md:text-md sm:text-sm text-[0.8em] font-extrabold animate-pulse whitespace-nowrap">
        Duy nhất hôm nay
      </div>
      <div className="flex items-center gap-2 animate-pulse">
        <span className="xl:text-[1.2em] lg:text-[1em] md:text-[0.9em] sm:text-[0.7em] text-[0.6em]">
          Kết thúc trong
        </span>
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-blue-500 text-white xl:w-12 xl:h-12 lg:w-11 lg:h-11 md:w-10 md:h-10 sm:w-9 sm:h-9 w-6 h-6 rounded-lg">
            {hours}
          </div>
          <div className="flex justify-center items-center bg-blue-500 text-white xl:w-12 xl:h-12 lg:w-11 lg:h-11 md:w-10 md:h-10 sm:w-9 sm:h-9 w-6 h-6 rounded-lg">
            {minutes}
          </div>
          <div className="flex justify-center items-center bg-blue-500 text-white xl:w-12 xl:h-12 lg:w-11 lg:h-11 md:w-10 md:h-10 sm:w-9 sm:h-9 w-6 h-6 rounded-lg">
            {seconds}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
