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
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import AddCategories from '/src/pages/Categories/AddCategories/Add.jsx';
import EditCategory from './EditCategory';
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";
import ConfirmDeleteDialog from "/src/components/ConfirmDeleteDialog/ConfirmDeleteDialog.jsx";
import './Table.css';

function ProductTable() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openAddCategoryBackdrop, setOpenAddCategoryBackdrop] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchCategories();
  }, [jwtToken]);

  const fetchCategories = () => {
    axios
      .get(`${BASE_URL}${ENDPOINTS.categories.getParentCategories}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setCategories(data);
        setFilteredCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.category_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCategories(filtered);
    setPage(0);
  }, [search, categories]);

  const handleSort = () => {
    const sortedCategories = [...filteredCategories].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.category_name.localeCompare(b.category_name);
      } else {
        return b.category_name.localeCompare(a.category_name);
      }
    });
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

  const handleOpenCategoryBackdrop = (category) => {
    setSelectedCategory(category);
    setOpenBackdrop(true);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
    setSelectedCategory(null);
  };

  const handleOpenAddCategoryBackdrop = () => {
    setOpenAddCategoryBackdrop(true);
  };

  const handleCloseAddCategoryBackdrop = () => {
    setOpenAddCategoryBackdrop(false);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setOpenEditCategory(true);
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      axios
        .delete(`${BASE_URL}${ENDPOINTS.categories.deleteCategory}?parent_category_id=${categoryToDelete.category_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then(() => {
          fetchCategories();
          setOpenDeleteDialog(false);
          setCategoryToDelete(null);
        })
        .catch((error) => {
          console.error("Lỗi xóa danh mục: ", error);
        });
    }
  };

  const totalCategories = filteredCategories.length;
  const paginatedCategories = filteredCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
            onClick={handleOpenAddCategoryBackdrop}
            sx={{
              fontSize: '0.95em',
              marginLeft: "10px",
              textTransform: "none",
              borderRadius: '15px',
              boxShadow: 'none',
            }}
          >
            Thêm danh mục
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
              {paginatedCategories.map((category) => (
                <TableRow key={category.category_id} className="table-row">
                  <TableCell sx={{ textAlign: "center", width: "100px"}}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={category.image}
                        alt={category.category_name}
                        style={{
                          width: "10em",
                          height: "5em",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell sx={{width: "150px"}}>{category.category_name}</TableCell>
                  <TableCell sx={{ textAlign: "center", width: "150px"}}>
                    <IconButton color="info" onClick={() => handleOpenCategoryBackdrop(category)}>
                      <AiOutlineEye />
                    </IconButton>
                    <IconButton sx={{ color: "green" }} onClick={() => handleEditCategory(category)}>
                      <AiOutlineEdit />
                    </IconButton>
                    <IconButton sx={{ color: "red" }} onClick={() => handleDeleteCategory(category)}>
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

      {/* View Category Backdrop */}
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(3px)',
        }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <div onClick={(e) => e.stopPropagation()} style={{ width: '40%', maxWidth: '1000px', paddingTop: '0', backgroundColor: '#fff', borderRadius: '15px' }}>
          {selectedCategory && (
            <Dialog open={openBackdrop} onClose={handleCloseBackdrop}>
              <Typography variant="h6" gutterBottom fontSize="1.3em" fontWeight="bold" textAlign="center" paddingTop="1em" marginBottom="-0.5em">
                Chi tiết danh mục
              </Typography>
              <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <img
                    src={selectedCategory.image}
                    alt={selectedCategory.category_name}
                    style={{ width: "100%", height: "50vh", objectFit: "cover", borderRadius: "20px" }}
                  />
                  <Typography variant="body1" fontSize="1em" paddingBottom="0.5em" paddingTop="1em">
                    <strong>Mã danh mục:</strong> {selectedCategory.category_id}
                  </Typography>
                  <Typography variant="body1" fontSize="1em" paddingBottom="0.5em">
                    <strong>Tên danh mục:</strong> {selectedCategory.category_name}
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={handleCloseBackdrop}
                  fullWidth
                  sx={{
                    marginBottom: "0.5em",
                    borderRadius: "15px",
                    textTransform: 'none',
                    boxShadow: 'none',
                    fontSize: '1em'
                  }}
                >
                  Đóng
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      </Backdrop>

      {/* Add Category Backdrop */}
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(3px)',
        }}
        open={openAddCategoryBackdrop}
        onClick={handleCloseAddCategoryBackdrop}
      >
        <div onClick={(e) => e.stopPropagation()} style={{ width: '40%', maxWidth: '1000px', paddingTop: '0', backgroundColor: '#fff', borderRadius: '15px' }}>
          <AddCategories onSuccess={fetchCategories} />
        </div>
      </Backdrop>

      {/* Edit Category Component */}
      <EditCategory
        open={openEditCategory}
        category={selectedCategory}
        onClose={() => {
          setOpenEditCategory(false);
          setSelectedCategory(null);
        }}
        onUpdate={fetchCategories}
        jwtToken={jwtToken}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
        itemName={categoryToDelete ? categoryToDelete.category_name : ""}
      />
    </Box>
  );
}

export default ProductTable;