import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const TimeFrameSelector = ({ timeFrame, setTimeFrame, handleMenuClick, anchorEl, handleMenuClose }) => {
  const buttonWidth = anchorEl?.offsetWidth || 150;
  const isMobile = window.innerWidth <= 768;  // Kiểm tra nếu là mobile

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleMenuClick}
        sx={{
          height: '100%',
          borderRadius: "1em",
          textTransform: "none",
          boxShadow: "none",
          minWidth: '100%',
        }}
      >
        {isMobile
          ? timeFrame === "14days"
            ? "14 ngày"
            : timeFrame === "12months"
            ? "12 tháng"
            : "3 năm "
          : timeFrame === "14days"
          ? "14 ngày"
          : timeFrame === "12months"
          ? "12 tháng"
          : "3 năm "
        }
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
        <MenuItem onClick={() => { setTimeFrame("14days"); handleMenuClose(); }}>14 ngày</MenuItem>
        <MenuItem onClick={() => { setTimeFrame("12months"); handleMenuClose(); }}>12 tháng</MenuItem>
        <MenuItem onClick={() => { setTimeFrame("3years"); handleMenuClose(); }}>3 năm</MenuItem>
      </Menu>
    </div>
  );
};

export default TimeFrameSelector;
