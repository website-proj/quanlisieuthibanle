import React from "react";
import { TextField } from "@mui/material";

const Search = ({ search, onSearchChange }) => {
  return (
    <TextField
      label="Nhập nội dung tìm kiếm"
      variant="outlined"
      value={search}
      onChange={onSearchChange}
      fullWidth
      sx={{
        marginBottom: "20px",
        fontFamily: "Roboto, sans-serif",
        fontSize: "0.875rem",
        "& .MuiInputBase-root": {
          // padding: "0px 0px",
          height: "36px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          "&:hover": {
            borderColor: "#bbdefb",
          },
        },
        "& .MuiInputLabel-root": {
          fontSize: "0.875rem",
          top: "-8px",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#ccccc",
          },
          "&:hover fieldset": {
            borderColor: "#bbdefb",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#bbdefb",
          },
        },
      }}
    />
  );
};

export default Search;
