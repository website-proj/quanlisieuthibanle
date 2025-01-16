import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, Paper, IconButton, Alert } from "@mui/material";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const ProductList = ({
  selectedCategory,
  selectedSubcategory,
  filteredProducts,
  searchTerm,
  noProducts,
  paginatedProducts,
  sortField,
  sortOrder,
  handleSort,
  handleViewDetails,
  handleEditProduct,
  handleDeleteProduct
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "15px",
        boxShadow: "none",
        fontFamily: "Roboto",
        minHeight: "400px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow className="table-header">
            <TableCell sx={{textAlign: "center"}}>Hình ảnh</TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <TableSortLabel
                active={sortField === "name"}
                direction={sortOrder}
                onClick={() => handleSort("name")}
              >
                Tên sản phẩm
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <TableSortLabel
                active={sortField === "expiration_date"}
                direction={sortOrder}
                onClick={() => handleSort("expiration_date")}
              >
                Ngày hết hạn
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <TableSortLabel
                active={sortField === "price"}
                direction={sortOrder}
                onClick={() => handleSort("price")}
              >
                Giá bán
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <TableSortLabel
                active={sortField === "stock_quantity"}
                direction={sortOrder}
                onClick={() => handleSort("stock_quantity")}
              >
                Số lượng
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>Chức năng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedCategory === "" || selectedSubcategory === "" ? (
            <TableRow>
              <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                <Alert severity="info" sx={{ borderRadius: "10px" }}>
                  Vui lòng chọn danh mục và danh mục con.
                </Alert>
              </TableCell>
            </TableRow>
          ) : filteredProducts.length === 0 && searchTerm !== "" ? (
            <TableRow>
              <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                <Alert severity="warning" sx={{ borderRadius: "10px" }}>
                  Không tồn tại sản phẩm "{searchTerm}".
                </Alert>
              </TableCell>
            </TableRow>
          ) : noProducts ? (
            <TableRow>
              <TableCell colSpan={6} sx={{textAlign: "center"}}>
                <Alert severity="info" sx={{borderRadius: "10px"}}>
                  Không có sản phẩm cho danh mục và danh mục con đã chọn.
                </Alert>
              </TableCell>
            </TableRow>
          ) : (
            paginatedProducts.map((prod) => (
              <TableRow key={prod.product_id}>
                <TableCell sx={{width: '100px', textAlign: "center" }}>
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
                <TableCell sx={{width: '200px', textAlign: "center" }}>{prod.name}</TableCell>
                <TableCell sx={{width: '150px', textAlign: "center" }}>
                  {formatDate(prod.expiration_date)}
                </TableCell>
                <TableCell sx={{width: '150px', textAlign: "center" }}>
                  {prod.price}
                </TableCell>
                <TableCell sx={{width: '100px', textAlign: "center" }}>
                  {prod.stock_quantity}
                </TableCell>
                <TableCell sx={{width: '200px', textAlign: "center" }}>
                  <IconButton color="info" onClick={() => handleViewDetails(prod.product_id)}>
                    <AiOutlineEye />
                  </IconButton>
                  <IconButton 
                    sx={{ color: "green" }} 
                    onClick={() => handleEditProduct(prod)}
                  >
                    <AiOutlineEdit />
                  </IconButton>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDeleteProduct(prod.product_id)} 
                  >
                    <AiOutlineDelete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;