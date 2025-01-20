import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Backdrop, Paper } from "@mui/material";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";
import axios from "axios";
import ProductDetails from "./ViewProducts.jsx";
import AddProducts from '/src/pages/Products/Add/Add.jsx';
import ConfirmDeleteDialog from "/src/components/ConfirmDeleteDialog/ConfirmDeleteDialog.jsx";
import Edit from './EditProduct.jsx';
import ProductFilters from './ProductFilters.jsx';
import ProductList from './ProductList';
import ProductPagination from './ProductPagination';

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

      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        searchTerm={searchTerm}
        handleCategoryChange={handleCategoryChange}
        handleSubcategoryChange={handleSubcategoryChange}
        setSearchTerm={setSearchTerm}
      />

      <ProductList
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        filteredProducts={filteredProducts}
        searchTerm={searchTerm}
        noProducts={noProducts}
        paginatedProducts={paginatedProducts}
        sortField={sortField}
        sortOrder={sortOrder}
        handleSort={handleSort}
        handleViewDetails={handleViewDetails}
        handleEditProduct={handleEditProduct}
        handleDeleteProduct={handleDeleteProduct}
      />

      <ProductPagination
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        filteredProducts={filteredProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

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
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" }, // Màu nền mờ
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