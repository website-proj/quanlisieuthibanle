import React, { useState, useEffect } from "react";
import LazyLoadingTable from '/src/components/LazyLoading/Table';
import './Table.css';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  IconButton,
  Alert,
  Backdrop,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import CategorySelect from "./CategorySelect"; 
import SearchField from "./SearchField"; 
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";
import ProductDetails from "/src/pages/Products/List/Products/ViewProducts.jsx";
import ConfirmDeleteDialog from "/src/components/ConfirmDeleteDialog/ConfirmDeleteDialog.jsx";
import Edit from '/src/pages/Products/List/Products/EditProduct.jsx';

function BestSellingProductsTable() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [openBackdropView, setOpenBackdropView] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null); 
  const [productToDelete, setProductToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [parentCategories, setParentCategories] = useState([]); 
  const [openBackdropEdit, setOpenBackdropEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const handleEditProduct = (product) => {
    // Get the complete product data from products array
    const productToEdit = products.find(p => p.product.product_id === product.product.product_id);
    if (productToEdit) {
      setSelectedProduct(productToEdit.product);  // Pass the complete product object
      setOpenBackdropEdit(true);
    }
  };

  const jwtToken = localStorage.getItem("jwtToken")
  useEffect(() => {
    fetch(`${BASE_URL}${ENDPOINTS.products.bestSellerProducts}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`, 
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (
          data &&
          data.message === "products best seller" &&
          Array.isArray(data.data)
        ) {
          setProducts(data.data);
          setFilteredProducts(data.data);

          const uniqueParentCategories = [
            ...new Set(data.data.map((product) => product["Parent Category of Product"].category_name)),
          ];
          setParentCategories(uniqueParentCategories);
        } else {
          console.error("Unexpected API response structure:", data);
          throw new Error("Unexpected API response structure");
        }
      })
      .catch((error) => {
        console.error("Error fetching best selling products:", error.message);
      });
  }, []);
  

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    filterData(value, category);
  };

  const handleProductUpdate = (updatedProduct) => {
    setProducts(prevProducts => 
      prevProducts.map(prod => 
        prod.product.product_id === selectedProduct.product_id 
          ? { ...prod, product: { ...prod.product, ...updatedProduct } }
          : prod
      )
    );
    setFilteredProducts(prevFiltered => 
      prevFiltered.map(prod => 
        prod.product.product_id === selectedProduct.product_id 
          ? { ...prod, product: { ...prod.product, ...updatedProduct } }
          : prod
      )
    );
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    filterData(search, value);
  };

  const filterData = (searchValue, categoryValue) => {
    let filtered = products;

    if (categoryValue) {
      filtered = filtered.filter(
        (product) => product["Parent Category of Product"].category_name === categoryValue
      );
    }

    if (searchValue) {
      filtered = filtered.filter((product) => {
        const nameMatch = product.product.name.toLowerCase().includes(searchValue);
        const categoryMatch = product["Category of product"].category_name.toLowerCase().includes(searchValue);
        const expirationDateMatch = formatDate(product.product.expiration_date).toLowerCase().includes(searchValue);
        const priceMatch = product.product.price.toString().replace(/\./g, ",").includes(searchValue);
        const soldMatch = product.sold.toString().includes(searchValue);

        return nameMatch || categoryMatch || expirationDateMatch || priceMatch || soldMatch;
      });
    }

    setFilteredProducts(filtered);
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    const direction = isAsc ? "desc" : "asc";
    setOrderDirection(direction);
    setOrderBy(property);
  
    const sorted = [...filteredProducts].sort((a, b) => {
      const valueA = a.product[property];
      const valueB = b.product[property];
  
      if (property === "expiration_date") {
        const dateA = valueA ? new Date(valueA.split('/').reverse().join('-')) : new Date();
        const dateB = valueB ? new Date(valueB.split('/').reverse().join('-')) : new Date();
        return isAsc ? dateA - dateB : dateB - dateA;
      }
  
      if (property === "category") {
        const categoryA = a["Category of product"].category_name.toLowerCase();
        const categoryB = b["Category of product"].category_name.toLowerCase();
        return isAsc ? categoryA.localeCompare(categoryB) : categoryB.localeCompare(categoryA);
      }

      if (property === "sold") {
        const soldA = a.sold;
        const soldB = b.sold;
        return isAsc ? soldA - soldB : soldB - soldA;
      }
  
      if (typeof valueA === "number" && typeof valueB === "number") {
        return isAsc ? valueA - valueB : valueB - valueA;
      }
  
      if (valueA && valueB) {
        return isAsc
          ? valueA.toString().localeCompare(valueB.toString())
          : valueB.toString().localeCompare(valueA.toString());
      }
  
      return 0;
    });
  
    setFilteredProducts(sorted);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const uniqueCategories = [
    ...new Set(products.map((product) => product["Category of product"].category_name)),
  ];

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleViewDetails = (productId) => {
    setCurrentProductId(productId);
    setOpenBackdropView(true);
  };

  const handleCloseDetails = () => {
    setCurrentProductId(null);
    setOpenBackdropView(false);
  };

  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      const jwtToken = localStorage.getItem("jwtToken");
      fetch(`${BASE_URL}${ENDPOINTS.products.deleteProduct}${productToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.product.product_id !== productToDelete)
          );
          setFilteredProducts((prevFiltered) =>
            prevFiltered.filter((product) => product.product.product_id !== productToDelete)
          );
          setOpenDeleteDialog(false);
          setProductToDelete(null);
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm:", error.message);
        });
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Sản phẩm bán chạy nhất
      </Typography>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <CategorySelect
          category={category}
          onCategoryChange={handleCategoryChange}
          uniqueCategories={parentCategories}
        />
        <SearchField search={search} onSearchChange={handleSearch} />
      </Box>

      {filteredProducts.length === 0 && search ? (
        <Alert severity="warning" sx={{ borderRadius: "10px" }}>
          Không tồn tại sản phẩm "{search}".
        </Alert>
      ) : (
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
                <TableCell sx={{ textAlign: "center" }}>Hình ảnh</TableCell>
                {[{ label: "Tên sản phẩm", key: "name" }, { label: "Danh mục con", key: "category" }, { label: "Hết hạn", key: "expiration_date" }, { label: "Giá", key: "price" }, { label: "Đã bán", key: "sold" }].map((column) => (
                  column.key !== "image" && column.key !== "functions" ? (
                    <TableCell key={column.key} sx={{ textAlign: "center" }}>
                      <TableSortLabel
                        active={orderBy === column.key}
                        direction={orderDirection}
                        onClick={() => handleSort(column.key)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ) : (
                    <TableCell key={column.key} sx={{ textAlign: "center" }}>
                      {column.label}
                    </TableCell>
                  )
                ))}
                <TableCell sx={{ textAlign: "center" }}>Chức năng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell sx={{ textAlign: "center", width: "100px" }}>
                    <img src={product.product.image} alt={product.product.name} style={{ width: "50px", height: "50px", borderRadius: "10px" }} />
                  </TableCell>
                  <TableCell sx={{}}>{product.product.name}</TableCell>
                  <TableCell sx={{}}>{product["Category of product"].category_name}</TableCell>
                  <TableCell sx={{}}>{formatDate(product.product.expiration_date)}</TableCell>
                  <TableCell sx={{ textAlign: "center"}}>{product.product.price.toString().replace(/\./g, ",")}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{product.sold}</TableCell>
                  <TableCell sx={{ textAlign: "center", width: "200px" }}>
                    <IconButton color="info" onClick={() => handleViewDetails(product.product.product_id)}>
                      <AiOutlineEye />
                    </IconButton>
                    <IconButton sx={{ color: "green" }} onClick={() => handleEditProduct(product)}>
                      <AiOutlineEdit />
                    </IconButton>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => handleDeleteProduct(product.product.product_id)} 
                    >
                      <AiOutlineDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0px" }}>
        <Typography>Tổng số sản phẩm: {filteredProducts.length}</Typography>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
        />
      </Box>

      <ProductDetails productId={currentProductId} onClose={handleCloseDetails} />
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
    </Box>
  );
}

export default BestSellingProductsTable;
