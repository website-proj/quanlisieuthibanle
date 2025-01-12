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
  DialogTitle
} from "@mui/material";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import AddCategories from '/src/pages/Categories/AddCategories/Add.jsx';
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";
import ConfirmDeleteDialog from "/src/components/ConfirmDeleteDialog/ConfirmDeleteDialog.jsx"; 

function ProductTable() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [openBackdrop, setOpenBackdrop] = useState(false); 
  const [openAddCategoryBackdrop, setOpenAddCategoryBackdrop] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
  const [categoryToDelete, setCategoryToDelete] = useState(null); 

  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    axios
      .get(`${BASE_URL}${ENDPOINTS.categories.getParentCategories}`, {
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
  }, [jwtToken]);

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

  const totalCategories = filteredCategories.length;
  const paginatedCategories = filteredCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setOpenDeleteDialog(true); 
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      axios
        .delete(`${BASE_URL}${ENDPOINTS.categories.deleteCategory}?parent_category_id=${categoryToDelete.category_id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((response) => {
          setCategories(categories.filter((category) => category.category_id !== categoryToDelete.category_id));
          setFilteredCategories(filteredCategories.filter((category) => category.category_id !== categoryToDelete.category_id));
          setOpenDeleteDialog(false);
          setCategoryToDelete(null);
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    }
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
                  <TableCell sx={{ textAlign: "center" }}>{category.category_name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton color="info" onClick={() => handleOpenCategoryBackdrop(category)}>
                      <AiOutlineEye />
                    </IconButton>
                    <IconButton sx={{ color: "green" }}>
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

      {/* Backdrop for showing category details */}
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
              <Typography variant="h5" sx={{ textAlign: 'center', paddingTop: '1em', fontWeight: 'bold' }}>Chi tiết danh mục</Typography>
              <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <img
                    src={selectedCategory.image}
                    alt={selectedCategory.category_name}
                    style={{ width: "80%", height: "50vh", objectFit: "cover", borderRadius: "20px" }}
                  />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Mã danh mục: {selectedCategory.category_id}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Tên danh mục: {selectedCategory.category_name}
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCloseBackdrop}
                  style={{ marginBottom: '1em', borderRadius: "15px", minWidth: '100%', boxShadow: 'none' }}
                >
                  Đóng
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      </Backdrop>

      {/* Backdrop for adding category */}
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(3px)',
        }}
        open={openAddCategoryBackdrop}
        onClick={handleCloseAddCategoryBackdrop}
      >
        <div onClick={(e) => e.stopPropagation()} style={{ width: '40%', maxWidth: '1000px', paddingTop: '0', backgroundColor: '#fff', borderRadius: '15px' }}>
          <AddCategories />
        </div>
      </Backdrop>

      {/* Confirm delete dialog */}
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
