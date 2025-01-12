import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

const BasicInfo = ({ formData, errors, handleInputChange }) => {
  return (
    <Box sx={{ width: '48%' }}>
      <Typography variant="h6" className="add-products-list">Tên sản phẩm</Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Nhập tên sản phẩm"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        sx={{ marginBottom: '16px' }}
      />
      <Typography variant="h6" className="add-products-list">Mô tả sản phẩm</Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Nhập mô tả sản phẩm"
        multiline
        rows={5.5}
        value={formData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
        error={!!errors.description}
        helperText={errors.description}
      />
    </Box>
  );
};

export default BasicInfo;