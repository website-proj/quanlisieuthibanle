import React from 'react';
import { Box } from '@mui/material';

function ContentCard({ children }) {
  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "15px",
        marginTop: "20px",
      }}
    >
      {children}
    </Box>
  );
}

export default ContentCard;
