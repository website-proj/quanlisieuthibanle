import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const TimeFrameSelector = ({ timeFrame, setTimeFrame, handleMenuClick, anchorEl, handleMenuClose }) => {
  const buttonWidth = anchorEl?.offsetWidth || 150;

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleMenuClick}
        sx={{
          height: 30,
          borderRadius: "10px",
          textTransform: "none",
          boxShadow: "none",
          minWidth: 150,
        }}
      >
        {timeFrame === "14days" ? "14 ngày gần nhất" : timeFrame === "12months" ? "12 tháng gần nhất" : "3 năm gần nhất"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "10px",
            boxShadow: 2,
            minWidth: buttonWidth,
          },
          "& .MuiMenuItem-root": {
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            borderRadius: "8px",
            transition: "background-color 0.2s",
            "&:hover": {
              backgroundColor: "#cce5ff",
            },
          },
        }}
      >
        <MenuItem onClick={() => { setTimeFrame("14days"); handleMenuClose(); }}>14 ngày gần nhất</MenuItem>
        <MenuItem onClick={() => { setTimeFrame("12months"); handleMenuClose(); }}>12 tháng gần nhất</MenuItem>
        <MenuItem onClick={() => { setTimeFrame("3years"); handleMenuClose(); }}>3 năm gần nhất</MenuItem>
      </Menu>
    </div>
  );
};

export default TimeFrameSelector;
