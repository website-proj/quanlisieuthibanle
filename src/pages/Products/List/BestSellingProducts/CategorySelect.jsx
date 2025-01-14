import React from "react";
import { TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import './CategorySelect.css';

function CategorySelect({ category, onCategoryChange, uniqueCategories }) {
  return (
    <FormControl variant="outlined" fullWidth sx={{ width: '300px' }}>
      <InputLabel>Danh mục</InputLabel>
      <Select
        value={category}
        onChange={onCategoryChange}
        label="Danh mục"
        className="category-select"
        MenuProps={{
          PaperProps: {
            style: { 
              maxHeight: 200, 
              overflowY: 'auto',
            },
          },
        }}
      >
        <MenuItem value="" className="sub-select">
          Tất cả
        </MenuItem>
        {uniqueCategories.map((cat, index) => (
          <MenuItem key={index} value={cat} className="sub-select">
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CategorySelect;
