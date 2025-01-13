import React from "react";
import { Box, TablePagination, Typography } from "@mui/material";

export default function Pagination({ totalProducts, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
      <Typography variant="subtitle2">Tổng số sản phẩm: {totalProducts}</Typography>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số sản phẩm mỗi trang:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
      />
    </Box>
  );
}
