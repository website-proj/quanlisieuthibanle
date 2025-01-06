import React from "react";
import { TextField } from "@mui/material";
import './CategorySelect.css';

function CategorySelect({ category, onCategoryChange, uniqueCategories }) {
  return (
    <TextField
      select
      SelectProps={{
        native: true,
      }}
      variant="outlined"
      value={category}
      onChange={onCategoryChange}
      defaultValue=""
      className="category-select"
    >
      <option value="" className="sub-select">Tất cả</option>
      {uniqueCategories.map((cat, index) => (
        <option key={index} value={cat} className="sub-select">
          {cat}
        </option>
      ))}
    </TextField>
  );
}

export default CategorySelect;
