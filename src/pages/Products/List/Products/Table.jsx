import React, { useState, useEffect, useRef } from "react";
import './Table.css'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Backdrop,
  Alert,
  CircularProgress,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import AddProducts from "/src/pages/Products/Add/Add.jsx";

export default function ProductTable() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const categoryRef = useRef(null);

  useEffect(() => {
    fetch("/src/pages/Products/List/Products/Products.json")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
    const category = categories.find((cat) => cat.category === selected);
    setSubcategories(category ? category.subcategories : []);
    setSelectedSubcategory("");
    setProducts([]);
  };

  const handleSubcategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedSubcategory(selected);
    const category = categories.find((cat) => cat.category === selectedCategory);
    const subcategory = category?.subcategories.find(
      (sub) => sub.subcategory === selected
    );
    setProducts(subcategory ? subcategory.products : []);
  };

  const filteredProducts = products.filter((prod) =>
    Object.values(prod).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortField === "price" || sortField === "quantity") {
      return sortOrder === "asc"
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    } else {
      return sortOrder === "asc"
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    }
  });

  const handleAddProduct = () => {
    setOpenBackdrop(true);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const paginatedProducts = sortedProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalProducts = filteredProducts.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          onClick={handleAddProduct}
        >
          Thêm sản phẩm
        </Button>
      </Box>

      <Box display="flex" gap={2} sx={{ marginBottom: 3 }}>
        <FormControl fullWidth>
          <TextField
            select
            label="Chọn danh mục"
            value={selectedCategory}
            onChange={handleCategoryChange}
            sx={{ borderRadius: "10px" }}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          >
            <MenuItem value="" disabled>
              Chọn danh mục
            </MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.category} value={item.category}>
                {item.category}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            select
            label="Chọn danh mục con"
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            sx={{ borderRadius: "10px" }}
            // InputLabelProps={{
            //   shrink: true,
            // }}
            disabled={!selectedCategory}
          >
            <MenuItem value="" disabled>
              Chọn danh mục con
            </MenuItem>
            {subcategories.map((item) => (
              <MenuItem key={item.subcategory} value={item.subcategory}>
                {item.subcategory}
              </MenuItem>
            ))}
          </TextField>
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
              <TableCell  sx={{textAlign: "center"}}>Hình ảnh</TableCell>
              <TableCell sx={{textAlign: "center"}}>
                <TableSortLabel
                  active={sortField === "name"}
                  direction={sortOrder}
                  onClick={() => handleSort("name")}
                >
                  Tên sản phẩm
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{textAlign: "center"}}>
                <TableSortLabel
                  active={sortField === "expiryDate"}
                  direction={sortOrder}
                  onClick={() => handleSort("expiryDate")}
                >
                  Ngày hết hạn
                </TableSortLabel>
              </TableCell>
              <TableCell  sx={{textAlign: "center"}}>
                <TableSortLabel
                  active={sortField === "price"}
                  direction={sortOrder}
                  onClick={() => handleSort("price")}
                >
                  Giá bán
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{textAlign: "center"}}>
                <TableSortLabel
                  active={sortField === "quantity"}
                  direction={sortOrder}
                  onClick={() => handleSort("quantity")}
                >
                  Số lượng
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{textAlign: "center"}}>Chức năng</TableCell>
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
            ) : (
              paginatedProducts.map((prod, index) => (
                <TableRow key={index}>
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
      padding: 2,
      maxWidth: '60%',
      width: "90%",
      margin: "auto",
      borderRadius: 2,
      boxShadow: 3,
      maxHeight: "90%", 
      overflowY: "auto", 
    }}
  >
  <Typography variant="h6" sx={{textAlign: 'center', marginBottom: '-1.1em'}}>Thông tin sản phẩm</Typography>
    <AddProducts onClose={() => setOpenBackdrop(false)} />
  </Paper>
</Backdrop>

    </Box>
  );
};