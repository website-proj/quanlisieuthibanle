import React from 'react';
import { Box, Typography, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';

const CategorySelection = ({ formData, errors, handleInputChange, categoriesData, subcategoryOptions }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <Box sx={{ width: '48%' }}>
        <Typography variant="h6" className="add-products-list">Danh mục</Typography>
        <FormControl fullWidth error={!!errors.category}>
          <Select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
          >
            <MenuItem value="" disabled>Chọn danh mục</MenuItem>
            {categoriesData.map((item, index) => (
              <MenuItem key={index} value={item.category}>
                {item.category}
              </MenuItem>
            ))}
          </Select>
          {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
        </FormControl>
      </Box>

      <Box sx={{ width: '48%' }}>
        <Typography variant="h6" className="add-products-list">Danh mục con</Typography>
        <FormControl fullWidth error={!!errors.subcategory}>
          <Select
            value={formData.subcategory}
            onChange={(e) => handleInputChange('subcategory', e.target.value)}
          >
            <MenuItem value="" disabled>Chọn danh mục con</MenuItem>
            {subcategoryOptions.map((sub, index) => (
              <MenuItem key={index} value={sub.name}>
                {sub.name}
              </MenuItem>
            ))}
          </Select>
          {errors.subcategory && <FormHelperText>{errors.subcategory}</FormHelperText>}
        </FormControl>
      </Box>
    </Box>
  );
};

export default CategorySelection;