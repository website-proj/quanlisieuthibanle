import React from "react";
import { Backdrop, Box } from "@mui/material";

const BackdropWrapper = ({ open, onClose, children }) => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(3px)",
      }}
      open={open}
      onClick={onClose}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: "50%",
          maxWidth: "1000px",
          paddingTop: "0",
          backgroundColor: "#fff",
          borderRadius: "15px",
        }}
      >
        {children}
      </Box>
    </Backdrop>
  );
};

export default BackdropWrapper;
