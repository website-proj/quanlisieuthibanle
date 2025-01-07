import React, { useState, useEffect } from "react";
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
  TablePagination,
  TextField,
  Typography,
  TableSortLabel,
  Alert,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function ProductTable() {
  const [categories, setCategories] = useState({});
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // Tải dữ liệu từ file Categories.json
    fetch("/src/pages/Admin/Categories/CategoriesList/Category.json")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
        setFilteredCategories(data.categories);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu từ Categories.json:", error);
      });
  }, []);

  // Xử lý tìm kiếm
  useEffect(() => {
    const filtered = Object.keys(categories)
      .filter((key) => key.toLowerCase().includes(search.toLowerCase()))
      .reduce((acc, key) => {
        acc[key] = categories[key];
        return acc;
      }, {});
    setFilteredCategories(filtered);
    setPage(0); // Reset về trang đầu khi tìm kiếm
  }, [search, categories]);

  // Xử lý sắp xếp
  const handleSort = () => {
    const sortedCategories = Object.keys(filteredCategories)
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.localeCompare(b);
        } else {
          return b.localeCompare(a);
        }
      })
      .reduce((acc, key) => {
        acc[key] = filteredCategories[key];
        return acc;
      }, {});
    setFilteredCategories(sortedCategories);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Xử lý thay đổi số hàng mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalCategories = Object.keys(filteredCategories).length;
  const paginatedCategories = Object.keys(filteredCategories).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Danh mục sản phẩm
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "300px" }}
        />
      </Box>

      {totalCategories === 0 ? (
        <Alert severity="warning" sx={{ borderRadius: "10px", mb: 2 }}>
          Không tồn tại danh mục "{search}".
        </Alert>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "15px",
            boxShadow: "none",
            fontFamily: "Roboto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell sx={{ textAlign: "center" }}>Hình ảnh</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <TableSortLabel
                    active={true}
                    direction={sortOrder}
                    onClick={handleSort}
                  >
                    Danh mục
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>Chức năng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {paginatedCategories.map((category, index) => (
              <TableRow key={index} className="table-row">
                <TableCell sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={filteredCategories[category].img}
                      alt={category}
                      style={{
                        width: "10em",
                        height: "5em",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{category}</TableCell>
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Typography variant="subtitle2">
          Tổng số danh mục: {totalCategories}
        </Typography>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={totalCategories}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số danh mục mỗi trang:"
        />
      </Box>
    </Box>
  );
}

export default ProductTable;
