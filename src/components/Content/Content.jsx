import React from "react";
import { Box } from "@mui/material";

function Content({ isSidebarOpen, children }) {
  return (
    <Box
      sx={{
        marginTop: { xs: "56px", sm: "64px" }, 
        marginLeft: isSidebarOpen ? "270px" : "0px", 
        transition: "margin-left 0.3s ease", 
        padding: "16px", 
        backgroundColor: "var(--light-gray)", 
        minHeight: "calc(100vh - 64px)", 
      }}
    >
      {children}
    </Box>
  );
}

export default Content;
