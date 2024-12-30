import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';

function HeaderCard({ title, breadcrumbs }) {
  return (
    <Box
      sx={{
        padding: "10px 20px",
        backgroundColor: "#fff",
        borderRadius: "15px",
        marginTop: "10px",
        display: "flex",
        justifyContent: "space-between", 
        alignItems: "center",
      }}
    >
      {/* Tiêu đề */}
      <Typography variant="h6" component="h1" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>

      {/* Breadcrumbs */}
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => (
          <Link
            key={index}
            href={breadcrumb.link}
            underline="hover"
            color={breadcrumb.active ? "text.primary" : "inherit"}
          >
            {breadcrumb.label}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
}

export default HeaderCard;
