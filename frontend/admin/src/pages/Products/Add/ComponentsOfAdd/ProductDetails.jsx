import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
const ProductDetails = ({ formData, errors, handleInputChange }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
      <Box>
        <Typography variant="h6" className="add-products-list">Nhãn hàng</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Nhập nhãn hàng"
          value={formData.brand}
          onChange={(e) => handleInputChange('brand', e.target.value)}
          error={!!errors.brand}
          helperText={errors.brand}
        />
      </Box>
      <Box>
        <Typography variant="h6" className="add-products-list">Ngày hết hạn</Typography>
        <TextField
          fullWidth
          type="date"
          value={formData.expiryDate}
          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
          error={!!errors.expiryDate}
          helperText={errors.expiryDate}
        />
      </Box>
      <Box>
        <Typography variant="h6" className="add-products-list">Đơn vị</Typography>
        <TextField
          fullWidth
          type="string"
          variant="outlined"
          placeholder="Nhập đơn vị"
          value={formData.unit}
          onChange={(e) => handleInputChange('unit', e.target.value)}
          error={!!errors.unit}
          helperText={errors.unit}
        />
      </Box>
      <Box>
        <Typography variant="h6" className="add-products-list">Số lượng</Typography>
        <TextField
          fullWidth
          type="number"
          placeholder="Nhập số lượng"
          value={formData.quantity}
          onChange={(e) => handleInputChange('quantity', Math.max(1, e.target.value))}
          error={!!errors.quantity}
          helperText={errors.quantity}
        />
      </Box>
    </Box>
  );
};

export default ProductDetails;