import { duration } from "@mui/material";
import React, { useState, useEffect } from "react";

const Timer = ({ duration }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    setTimeout(() => {
      setTime(time - 1000);
    }, 1000);
  }, [time]);

  return (
    <>
      <div>{time}</div>
    </>
  );
};

export default Timer;
