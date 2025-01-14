import React from 'react';
import { Box, Typography, TextField, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';

const PricingDetails = ({ formData, errors, handleInputChange }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', paddingTop: '20px' }}>
      <Box>
        <Typography variant="h6" className="add-products-list">Giá bán</Typography>
        <TextField
          fullWidth
          type="number"
          placeholder="Nhập giá bán"
          value={formData.sellPrice || 0}
          onChange={(e) => handleInputChange('sellPrice', Math.max(0, e.target.value))}
          error={!!errors.sellPrice}
          helperText={errors.sellPrice}
          inputProps={{ step: 1000 }} // Tăng/giảm theo 1000
        />
      </Box>

      <Box>
        <Typography variant="h6" className="add-products-list">Giá gốc</Typography>
        <TextField
          fullWidth
          type="number"
          placeholder="Nhập giá gốc"
          value={formData.oldPrice || 0}
          onChange={(e) => handleInputChange('oldPrice', Math.max(0, e.target.value))}
          error={!!errors.oldPrice}
          helperText={errors.oldPrice}
          inputProps={{ step: 1000 }} // Tăng/giảm theo 1000
        />
      </Box>

      <Box>
        <Typography variant="h6" className="add-products-list">Giảm giá (%)</Typography>
        <TextField
          fullWidth
          type="number"
          placeholder="Nhập giảm giá"
          value={formData.discount || 0}
          onChange={(e) => handleInputChange('discount', Math.max(0, e.target.value))}
          error={!!errors.discount}
          helperText={errors.discount}
        />
      </Box>

      <Box>
        <Typography variant="h6" className="add-products-list">Sản phẩm nổi bật</Typography>
        <FormControl fullWidth error={Boolean(errors.featuredProduct)}>
          <Select
            value={formData.featuredProduct || 'false'}
            onChange={(e) => handleInputChange('featuredProduct', e.target.value)}
          >
            <MenuItem value="false">Không</MenuItem>
            <MenuItem value="true">Có</MenuItem>
          </Select>
          <FormHelperText>{errors.featuredProduct}</FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
};

export default PricingDetails;
