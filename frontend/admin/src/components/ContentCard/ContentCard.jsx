import React from 'react';
import { Box } from '@mui/material';

function ContentCard({ children }) {
  return (
    <Box
      sx={{
        padding: {
          xs: '10px', // Mobile
          sm: '15px', // Tablet
          md: '20px', // Desktop
        },
        backgroundColor: "#fff",
        borderRadius: {
          xs: '10px', // Mobile
          sm: '12px', // Tablet
          md: '15px', // Desktop
        },
        marginTop: {
          xs: '10px', // Mobile
          sm: '15px', // Tablet
          md: '20px', // Desktop
        },
      }}
    >
      {children}
    </Box>
  );
}

export default ContentCard;
