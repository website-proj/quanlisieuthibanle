import React from 'react';
import { Box, Typography, FormControl, Select, MenuItem, FormHelperText, InputLabel } from '@mui/material';

const CategorySelection = ({ formData, errors, handleInputChange, categoriesData, subcategoryOptions }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <Box sx={{ width: '48%' }}>
        <Typography variant="h6" className="add-products-list">Danh mục</Typography>
        <FormControl fullWidth error={Boolean(errors.category)}>
          <Select
            labelId="category-select"
            id="category"
            value={formData.category || ''}
            onChange={(e) => handleInputChange('category', e.target.value)}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: '200px',
                  overflowY: 'auto',
                  borderRadius: '10px',
                },
              },
            }}
          >
            {categoriesData.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.category}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.category}</FormHelperText>
        </FormControl>

      </Box>

      <Box sx={{ width: '48%' }}>
        <Typography variant="h6" className="add-products-list">Danh mục con</Typography>
        <FormControl fullWidth error={Boolean(errors.subcategory)}>
            <Select
              labelId="subcategory-select"
              id="subcategory"
              value={formData.subcategory || ''}
              onChange={(e) => handleInputChange('subcategory', e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: '200px',
                    overflowY: 'auto',
                    borderRadius: '10px',
                  },
                },
              }}
            >
              {subcategoryOptions.map(sub => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.subcategory}</FormHelperText>
          </FormControl>
      </Box>
    </Box>
  );
};

export default CategorySelection;