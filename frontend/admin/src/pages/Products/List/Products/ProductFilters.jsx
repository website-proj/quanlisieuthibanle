import React from 'react';
import { Box, FormControl, Select, MenuItem, TextField, InputLabel } from "@mui/material";

const ProductFilters = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  searchTerm,
  handleCategoryChange,
  handleSubcategoryChange,
  setSearchTerm
}) => {
  return (
    <Box display="flex" gap={2} sx={{ marginBottom: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Danh mục</InputLabel>
        <Select
          select
          label="Chọn danh mục"
          value={selectedCategory}
          onChange={handleCategoryChange}
          sx={{ borderRadius: "10px" }}
          MenuProps={{
            PaperProps: {
              style: { 
                maxHeight: 200, 
                overflowY: 'auto',
              },
            },
          }}
        >
          <MenuItem value="" disabled >
            Chọn danh mục
          </MenuItem>
          {Object.keys(categories).map((category) => (
            <MenuItem key={category} value={category} >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Danh mục con</InputLabel>
        <Select
          select
          label="Chọn danh mục con"
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
          sx={{ borderRadius: "10px" }}
          disabled={!selectedCategory}
          MenuProps={{
            PaperProps: {
              style: { 
                maxHeight: 200, 
                overflowY: 'auto',
              },
            },
          }}
        >
          <MenuItem value="" disabled>
            Chọn danh mục con
          </MenuItem>
          {selectedCategory &&
            Object.keys(categories[selectedCategory] || {}).map((subcategory) => (
              <MenuItem key={subcategory} value={subcategory}>
                {subcategory}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <TextField
        label="Tìm kiếm sản phẩm"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  );
};

export default ProductFilters;