import React from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";

export default function SubcategorySelect({ subcategories, selectedSubcategory, handleSubcategoryChange, selectedCategory }) {
  // Check if subcategories is an array before calling map
  const validSubcategories = Array.isArray(subcategories) ? subcategories : [];

  return (
    <FormControl fullWidth>
      <TextField
        select
        label="Chọn danh mục con"
        value={selectedSubcategory}
        onChange={handleSubcategoryChange}
        sx={{ borderRadius: "10px" }}
        disabled={!selectedCategory}  
      >
        <MenuItem value="" disabled>
          Chọn danh mục con
        </MenuItem>
        {validSubcategories.map((item) => (
          <MenuItem key={item.subcategory} value={item.subcategory}>
            {item.subcategory}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}
