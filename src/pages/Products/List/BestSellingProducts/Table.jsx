import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import CategorySelect from "./CategorySelect"; 
import SearchField from "./SearchField"; 

function BestSellingProductsTable() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  useEffect(() => {
    fetch("/src/pages/Products/List/BestSellingProducts/Products.json") 
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    filterData(value, category);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    filterData(search, value);
  };

  const filterData = (searchValue, categoryValue) => {
    let filtered = products;

    if (categoryValue) {
      filtered = filtered.filter((product) => product.category === categoryValue);
    }

    if (searchValue) {
      filtered = filtered.filter((product) =>
        Object.entries(product).some(
          ([key, val]) =>
            key !== "image" &&
            key !== "functions" &&
            val.toString().toLowerCase().includes(searchValue)
        )
      );
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
      if (property === "date") {
        const dateA = new Date(a[property].split('/').reverse().join('-'));
        const dateB = new Date(b[property].split('/').reverse().join('-'));
        return isAsc ? dateA - dateB : dateB - dateA;
      }
      if (typeof a[property] === "number") {
        return isAsc ? a[property] - b[property] : b[property] - a[property];
      }
      return isAsc
        ? a[property].toString().localeCompare(b[property])
        : b[property].toString().localeCompare(a[property]);
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
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Sản phẩm bán chạy nhất
      </Typography>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <CategorySelect
          category={category}
          onCategoryChange={handleCategoryChange}
          uniqueCategories={uniqueCategories}
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
                {[{ label: "Tên sản phẩm", key: "name" }, { label: "Danh mục", key: "category" }, { label: "Ngày hết hạn", key: "date" }, { label: "Giá", key: "price" }].map((column) => (
                  <TableCell key={column.key} sx={{ textAlign: "center" }}>
                    <TableSortLabel
                      active={orderBy === column.key}
                      direction={orderDirection}
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell sx={{ textAlign: "center" }}>Chức năng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell sx={{ textAlign: "center"}}>
                    <img src={product.image} alt={product.name} style={{ width: "50px", height: "50px", borderRadius: "10px" }} />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell sx={{textAlign: "center"}}>{product.date}</TableCell>
                  <TableCell >{product.price.toString().replace(/\./g, ",")}</TableCell>
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
    </Box>
  );
}

export default BestSellingProductsTable;
