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
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import AddCategories from '/src/pages/Admin/Categories/AddCategories/Add.jsx';

function ProductTable() {
  const [categories, setCategories] = useState({});
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [openBackdrop, setOpenBackdrop] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    const filtered = Object.keys(categories)
      .filter((key) => key.toLowerCase().includes(search.toLowerCase()))
      .reduce((acc, key) => {
        acc[key] = categories[key];
        return acc;
      }, {});
    setFilteredCategories(filtered);
    setPage(0); 
  }, [search, categories]);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalCategories = Object.keys(filteredCategories).length;
  const paginatedCategories = Object.keys(filteredCategories).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
  <Typography variant="h6" gutterBottom>
    Danh mục sản phẩm
  </Typography>
  <Box display="flex" alignItems="center">
    <TextField
      label="Tìm kiếm"
      variant="outlined"
      size="small"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ width: "300px" }}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={handleOpenBackdrop}
      sx={{fontSize: '0.95em', 
        marginLeft: "10px", 
        textTransform: "none",
        borderRadius: '15px',
        boxShadow: 'none' }} 
    >
      Thêm sản phẩm
    </Button>
  </Box>
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
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
        />
      </Box>

      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(3px)',
        }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <div onClick={(e) => e.stopPropagation()} style={{ width: '40%', maxWidth: '1000px', paddingTop: '0', backgroundColor: '#fff', borderRadius: '15px' }}>
          <AddCategories />
        </div>
      </Backdrop>
    </Box>
  );
}

export default ProductTable;
