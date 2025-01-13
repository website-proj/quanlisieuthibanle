import React from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";

export default function CategorySelect({ categories, selectedCategory, handleCategoryChange }) {
  const validCategories = Array.isArray(categories) ? categories : [];

  return (
    <FormControl fullWidth>
      <TextField
        select
        label="Chọn danh mục"
        value={selectedCategory}
        onChange={handleCategoryChange}
        sx={{ borderRadius: "10px" }}
      >
        <MenuItem value="" disabled>
          Chọn danh mục
        </MenuItem>
        {validCategories.map((item) => (
          <MenuItem key={item.category} value={item.category}>
            {item.category}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}
