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
        marginTop: '20px',
      }}
    >
      <Box
        sx={{
          flex: 2,
          minWidth: "300px",
          padding: "20px",          
          backgroundColor: "#fff",
          borderRadius: "15px",
          marginTop: "0px",
          boxShadow: 0, 
          gridColumn: 'span 1', 
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default CustomContent;
