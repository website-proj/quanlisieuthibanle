import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import './HeaderCard.css'; 

function HeaderCard({ title, breadcrumbs }) {
  return (
    <Box className="headerCard">
      <Typography variant="h6" component="h1" className="headerTitle">
        {title}
      </Typography>

      <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumbs">
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
