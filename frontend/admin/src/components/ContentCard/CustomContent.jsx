import React from 'react';
import { Box } from '@mui/material';

function CustomContent({ children, grid }) {
  const gridTemplate = Array.isArray(grid)
    ? `repeat(${grid.length}, 1fr)`
    : grid;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: gridTemplate,
        gap: 2,
        marginTop: {
          xs: '10px', 
          sm: '15px',  
          md: '20px',  
        },
      }}
    >
      <Box
        sx={{
          flex: 2,
          minWidth: "300px",
          padding: {
            xs: "10px",  
            sm: "15px",  
            md: "20px",
          },
          backgroundColor: "#fff",
          borderRadius: {
            xs: "10px",  
            sm: "12px", 
            md: "15px", 
          },
          marginTop: "0px",
          boxShadow: "none", 
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default CustomContent;
