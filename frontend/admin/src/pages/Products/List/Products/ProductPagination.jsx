import React from 'react';
import { Box, Typography, TablePagination } from "@mui/material";

const ProductPagination = ({
  selectedCategory,
  selectedSubcategory,
  filteredProducts,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage
}) => {
  return (
    <>
      {selectedCategory !== "" && selectedSubcategory !== "" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <Typography variant="subtitle2">
            Tổng số sản phẩm: {filteredProducts.length}
          </Typography>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={filteredProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số sản phẩm mỗi trang:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} trên ${count}`
            }
          />
        </Box>
      )}
    </>
  );
};

export default ProductPagination;