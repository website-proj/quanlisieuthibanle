import React from "react";
import { Box } from "@mui/material";
import "./Content.css"; // Import file CSS

function Content({ isSidebarOpen, children }) {
  return (
    <Box
      className="content-container"
      sx={{
        marginTop: { xs: "56px", sm: "64px" },
        marginLeft: isSidebarOpen ? "270px" : "0px",
        transition: "margin-left 0.3s ease",
        padding: "16px",
        backgroundColor: "var(--light-purple)",
        minHeight: "calc(100vh - 64px)",
        borderTopLeftRadius: "16px", 
      }}
    >
      {children}
    </Box>
  );
}

export default Content;
