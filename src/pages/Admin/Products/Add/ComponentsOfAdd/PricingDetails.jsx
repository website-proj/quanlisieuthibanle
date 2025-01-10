import React from 'react';
import { Box, Typography, TextField, FormControl, Select, MenuItem } from '@mui/material';

const PricingDetails = ({ formData, errors, handleInputChange }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', paddingTop: '20px' }}>
      <Box>
        <Typography variant="h6" className="add-products-list">Giá nhập</Typography>
        <TextField
          fullWidth
          type="number"
          placeholder="Nhập giá nhập"
          value={formData.price}
          onChange={(e) => handleInputChange('price', Math.max(0, e.target.value))}
          error={!!errors.price}
          helperText={errors.price}
        />
      </Box>

      <Box>
        <Typography variant="h6" className="add-products-list">Giá bán</Typography>
        <TextField
          fullWidth
          type="number"
          placeholder="Nhập giá bán"
          value={formData.secondaryPrice}
          onChange={(e) => handleInputChange('secondaryPrice', Math.max(0, e.target.value))}
          error={!!errors.secondaryPrice}
          helperText={errors.secondaryPrice}
        />
      </Box>

      <Box>
        <Typography variant="h6" className="add-products-list">Giảm giá (%)</Typography>
        <TextField
          fullWidth
          type="number"
          placeholder="Nhập giảm giá"
          value={formData.discount}
          onChange={(e) => handleInputChange('discount', Math.min(100, Math.max(0, e.target.value)))}
          error={!!errors.discount}
          helperText={errors.discount}
        />
      </Box>

      <Box>
        <Typography variant="h6" className="add-products-list">Sản phẩm nổi bật</Typography>
        <FormControl fullWidth>
          <Select
            value={formData.featuredProduct}
            onChange={(e) => handleInputChange('featuredProduct', e.target.value)}
          >
            <MenuItem value="Không">Không</MenuItem>
            <MenuItem value="Có">Có</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default PricingDetails;