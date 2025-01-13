import React from "react";
import { TableCell, TableRow, IconButton } from "@mui/material";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export default function ProductTableRow({ prod }) {
  return (
    <TableRow>
      <TableCell sx={{ textAlign: "center" }}>
        <img
          src={prod.image}
          alt={prod.name}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>{prod.name}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{prod.expiryDate}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{prod.price}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{prod.quantity}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <IconButton color="info">
          <AiOutlineEye />
        </IconButton>
        <IconButton sx={{ color: "green" }}>
          <AiOutlineEdit />
        </IconButton>
        <IconButton sx={{ color: "red" }}>
          <AiOutlineDelete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
