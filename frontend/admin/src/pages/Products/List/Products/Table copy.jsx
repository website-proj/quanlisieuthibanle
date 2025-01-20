import React, { useState, useEffect } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, FormControl, Select, MenuItem, TextField, Button, TableSortLabel, TablePagination, Alert, Backdrop, InputLabel  } from "@mui/material";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";
import axios from "axios";
import ProductDetails from "./ViewProducts.jsx";
import AddProducts from '/src/pages/Products/Add/Add.jsx';
import ConfirmDeleteDialog from "/src/components/ConfirmDeleteDialog/ConfirmDeleteDialog.jsx";
import Edit from './EditProduct.jsx'

export default function ProductTable() {
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openBackdropView, setOpenBackdropView] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null); 
  const jwtToken = localStorage.getItem("jwtToken");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [noProducts, setNoProducts] = useState(false); 
  const [openBackdropEdit, setOpenBackdropEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.products.allProducts}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (response.data.message === "success query") {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchProducts();
  }, [jwtToken]);

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
    setSelectedSubcategory("");
    setProducts([]);
    setNoProducts(false);
  };

  const handleSubcategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedSubcategory(selected);
    if (categories[selectedCategory] && selected) {
      const productsForSubcategory = categories[selectedCategory][selected] || [];
      setProducts(productsForSubcategory);
      setNoProducts(productsForSubcategory.length === 0); 
    }
  };
  

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const handleViewDetails = (productId) => {
    setCurrentProductId(productId);
    setOpenBackdropView(true);
  };

  const handleCloseDetails = () => {
    setCurrentProductId(null);
    setOpenBackdropView(false);
  };

  const filteredProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prod.name_brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prod.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "price") {
      aValue = parseFloat(a.price);
      bValue = parseFloat(b.price);
    } else if (sortField === "expiration_date") {
      aValue = new Date(a.expiration_date);
      bValue = new Date(b.expiration_date);
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedProducts = sortedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleDeleteProduct = (productId) => {
      setProductToDelete(productId);
      setOpenDeleteDialog(true);
    };
  
    const confirmDelete = async () => {
      if (productToDelete) {
        try {
          const response = await axios.delete(
            `${BASE_URL}${ENDPOINTS.products.deleteProduct}${productToDelete}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
    
          if (response.status === 200) {
            setProducts((prevProducts) =>
              prevProducts.filter((prod) => prod.product_id !== productToDelete)
            );
            setOpenDeleteDialog(false);
            setProductToDelete(null);
          }
        } catch (error) {
          console.error("Lỗi khi xóa sản phẩm:", error.message);
        }
      }
    };
    const handleEditProduct = (product) => {
      setSelectedProduct(product);
      setOpenBackdropEdit(true);
    };
    const handleProductUpdate = (updatedProduct) => {
      setProducts(prevProducts => 
        prevProducts.map(prod => 
          prod.product_id === selectedProduct.product_id 
            ? { ...prod, ...updatedProduct }
            : prod
        )
      );
    };
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 3 }}
      >
        <Typography variant="h6">Danh sách sản phẩm</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: "1em",
            textTransform: "none",
            borderRadius: "10px",
            minWidth: "20%",
            boxShadow: "none",
          }}
          onClick={() => setOpenBackdrop(true)}
        >
          Thêm sản phẩm
        </Button>
      </Box>

      <Box display="flex" gap={2} sx={{ marginBottom: 3 }}>
        <FormControl fullWidth>
        <InputLabel>Danh mục</InputLabel>
          <Select
            select
            label="Chọn danh mục"
            value={selectedCategory}
            onChange={handleCategoryChange}
            sx={{ borderRadius: "10px" }}
            MenuProps={{
              PaperProps: {
                style: { 
                  maxHeight: 200, 
                  overflowY: 'auto',
                },
              },
            }}
          >
            <MenuItem value="" disabled >
              Chọn danh mục
            </MenuItem>
            {Object.keys(categories).map((category) => (
              <MenuItem key={category} value={category} >
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel >Danh mục con</InputLabel>
          <Select
            select
            label="Chọn danh mục con"
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            sx={{ borderRadius: "10px" }}
            disabled={!selectedCategory}
            MenuProps={{
              PaperProps: {
                style: { 
                  maxHeight: 200, 
                  overflowY: 'auto',
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              Chọn danh mục con
            </MenuItem>
            {selectedCategory &&
              Object.keys(categories[selectedCategory] || {}).map((subcategory) => (
                <MenuItem key={subcategory} value={subcategory}>
                  {subcategory}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          label="Tìm kiếm sản phẩm"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

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
              <TableCell sx={{textAlign: "center" }}>Hình ảnh</TableCell>
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
                <TableCell colspan={6} sx={{textAlign: "center"}}>
                  <Alert severity="info" sx={{borderRadius: "10px"}}>
                    Không có sản phẩm cho danh mục và danh mục con đã chọn.
                  </Alert>
                </TableCell>
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

      <Backdrop
        open={openBackdrop}
        onClick={() => setOpenBackdrop(false)}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(3px)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflowY: "auto",
          borderRadius: 2,
        }}
      >
        <Paper
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: 'fixed',
            padding: 2,
            width: "60%",
            height: "90%",
            margin: "auto",
            borderRadius: 5,
            boxShadow: 0,
            overflowY: "auto",
            scrollbarWidth: 'thin',
            scrollbarColor: '#ccc transparent'
          }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '-1.1em' }}>
            Thông tin sản phẩm
          </Typography>
          <AddProducts onClose={() => setOpenBackdrop(false)} />
        </Paper>
      </Backdrop>

      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
      />

        <Backdrop
        open={openBackdropEdit}
        onClick={() => setOpenBackdropEdit(false)}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(3px)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflowY: "auto",
          borderRadius: 2,
        }}
      >
        <Paper
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: 'fixed',
            padding: 2,
            width: "60%",
            height: "90%",
            margin: "auto",
            borderRadius: 5,
            boxShadow: 0,
            overflowY: "auto",
            scrollbarWidth: 'thin',
            scrollbarColor: '#ccc transparent'
          }}
        >
          <Edit 
            product={selectedProduct}
            onClose={() => setOpenBackdropEdit(false)}
            onUpdate={handleProductUpdate}
          />
        </Paper>
      </Backdrop>
        <ProductDetails productId={currentProductId} onClose={handleCloseDetails} />
    </Box>
  );
}