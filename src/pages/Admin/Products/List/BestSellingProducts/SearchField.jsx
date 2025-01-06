import React from "react";
import { TextField } from "@mui/material";
import './SearchField.css';

function SearchField({ search, onSearchChange }) {
  return (
    <TextField
      variant="outlined"
      label="Tìm kiếm"
      value={search}
      onChange={onSearchChange}
      className="search-field"  
    />
  );
}

export default SearchField;
