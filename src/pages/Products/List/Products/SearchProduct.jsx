import React from "react";
import { TextField } from "@mui/material";

export default function SearchProduct({ searchTerm, setSearchTerm }) {
  return (
    <TextField
      label="Tìm kiếm sản phẩm"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
