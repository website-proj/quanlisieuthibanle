import React, { useState, useEffect, useRef } from "react";
import "./Table.css";

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
import AddCategories from '/src/pages/Categories/AddSubcategories/Add.jsx';
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";
import EditSubcategory from "./EditSubcategory.jsx";
import ConfirmDeleteDialog from "/src/components/ConfirmDeleteDialog/ConfirmDeleteDialog.jsx";
import axios from "axios";

export default function SubcategoryTable() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const selectRef = useRef(null);
  const [selectedSubcategoryDetails, setSelectedSubcategoryDetails] = useState(null);
  const [detailsBackdrop, setDetailsBackdrop] = useState(false);
  const [editBackdrop, setEditBackdrop] = useState(false);
  const [selectedSubcategoryEdit, setSelectedSubcategoryEdit] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  
  const handleDeleteSubcategory = (subcategory) => {
    setSubcategoryToDelete(subcategory);
    setOpenDeleteDialog(true);
  };
  
  const handleEditSubcategory = (sub) => {
    setSelectedSubcategoryEdit(sub);
    setEditBackdrop(true);
  };
  const handleCloseEditBackdrop = () => {
    setEditBackdrop(false);
  };
  const handleSaveEditedSubcategory = (updatedSubcategory) => {
    setSubcategories((prev) =>
      prev.map((sub) => (sub.id === updatedSubcategory.id ? updatedSubcategory : sub))
    );
  };


    useEffect(() => {
        const fetchCategories = async () => {
          const jwtToken = localStorage.getItem("jwtToken");
          if (!jwtToken) {
            console.error("Không tìm thấy JWT token ở localStorage.");
            return;
          }

          try {
            const response = await fetch(`${BASE_URL}${ENDPOINTS.char.revenueCategories}`, {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            });

            if (!response.ok) {
              throw new Error(`Không tìm thấy dữ li: ${response.statusText}`);
            }

            const data = await response.json();

        if (data.message === "success") {
          const formattedCategories = Object.entries(data.data).map(([key, value]) => ({
            id: key,
            category: value.parent_category_name,
            subcategories: Object.entries(value.child_categories).map(([subKey, subValue]) => ({
              id: subKey,
              name: subValue.category_name,
              amount: subValue.category_amount,
            })),
          }));
          setCategories(formattedCategories);
        } else {
          console.error("Error: Unexpected response format", data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
    const category = categories.find((cat) => cat.category === selected);
    setSubcategories(category ? category.subcategories : []);
  };

  const calculateMenuHeight = () => {
    const selectElement = selectRef.current;
    if (selectElement) {
      const selectRect = selectElement.getBoundingClientRect();
      const availableSpace = window.innerHeight - selectRect.bottom;
      return availableSpace < 200 ? 200 : availableSpace;
    }
    return 300;
  };

  const filteredSubcategories = subcategories.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSubcategories = filteredSubcategories.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const handleAddSubcategory = () => {
    setOpenBackdrop(true);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const paginatedSubcategories = sortedSubcategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalSubcategories = filteredSubcategories.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleViewSubcategory = (sub) => {
    setSelectedSubcategoryDetails({
      id: sub.id,
      name: sub.name,
      category: selectedCategory,
      amount: sub.amount,
    });
    setDetailsBackdrop(true);
  };
  
  const handleCloseDetailsBackdrop = () => {
    setDetailsBackdrop(false);
  };
  const jwtToken = localStorage.getItem("jwtToken");
  const confirmDelete = () => {
    if (subcategoryToDelete) {
      const subcategoryId = subcategoryToDelete.id; 
  
      axios
        .delete(`${BASE_URL}${ENDPOINTS.categories.deleteSubcategory}${subcategoryId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then(() => {
          fetchCategories(); 
          setOpenDeleteDialog(false);
          setSubcategoryToDelete(null);
        })
        .catch((error) => {
          console.error("Lỗi xóa danh mục con: ", error);
        });
    }
  };
  

  return (
    <Box display="flex" sx={{ gap: 3 }}>
      {/* Left Panel */}
      <Box sx={{ width: "40%", minWidth: "200px" }}>
        <Typography variant="h6" gutterBottom>
          Danh mục
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <FormControl fullWidth>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              sx={{
                borderRadius: "10px",
              }}
              displayEmpty
              ref={selectRef}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: calculateMenuHeight(),
                    overflowY: "auto",
                  },
                },
              }}
            >
              <MenuItem value="" disabled>
                Chọn danh mục
              </MenuItem>
              {categories.map((item) => (
                <MenuItem key={item.id} value={item.category}>
                  {item.category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Typography variant="h6" sx={{ marginBottom: "-10px", marginTop: "15px" }}>
          Tìm kiếm
        </Typography>
        <TextField
          label="Tìm kiếm trong danh mục con"
          variant="outlined"
          fullWidth
          sx={{ marginTop: 2 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: "1em",
            borderRadius: "10px",
            marginTop: 2,
            textTransform: "none",
            boxShadow: "none",
            minWidth: "100%",
          }}
          onClick={handleAddSubcategory}
        >
          Thêm danh mục con
        </Button>
      </Box>

      <Box flex={1}>
        <Typography variant="h6" gutterBottom>
          Danh sách danh mục con
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "500", textAlign: "center", cursor: "pointer" }}
                  onClick={toggleSortOrder}
                >
                  <TableSortLabel active={true} direction={sortOrder}>
                    Danh mục con
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: "500", textAlign: "center" }}>
                  Chức năng
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedCategory === "" ? (
                <TableRow>
                  <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                    <Alert severity="info" sx={{ borderRadius: "10px" }}>
                      Bạn chưa chọn danh mục.
                    </Alert>
                  </TableCell>
                </TableRow>
              ) : filteredSubcategories.length === 0 && searchTerm !== "" ? (
                <TableRow>
                  <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                    <Alert severity="warning" sx={{ borderRadius: "10px" }}>
                      Không tồn tại danh mục con "{searchTerm}".
                    </Alert>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedSubcategories.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell sx={{width: "500px", paddingLeft: "4em" }}>{sub.name}</TableCell>
                    <TableCell sx={{width: "50%", textAlign: "center" }}>
                    <IconButton color="info" onClick={() => handleViewSubcategory(sub)}>
                        <AiOutlineEye />
                      </IconButton>
                      <IconButton
                        sx={{ color: "green" }}
                        onClick={() => handleEditSubcategory(sub)}
                      >
                        <AiOutlineEdit />
                      </IconButton>
                      <IconButton sx={{ color: "red" }} onClick={() => handleDeleteSubcategory(sub)}>
                        <AiOutlineDelete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedCategory !== "" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <Typography variant="subtitle2">Tổng: {totalSubcategories}</Typography>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={totalSubcategories}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Danh mục con mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
            />
          </Box>
        )}
      </Box>

      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: "blur(3px)" }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "40%",
            maxWidth: "1000px",
            paddingTop: "0",
            backgroundColor: "#fff",
            borderRadius: "15px",
          }}
        >
          <AddCategories />
        </div>
      </Backdrop>

      <Backdrop 
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: "blur(3px)" }}
        open={detailsBackdrop} 
        onClick={handleCloseDetailsBackdrop}>
      <div
          onClick={(e) => e.stopPropagation()}
          style={{ width: "30%", background: "#fff", padding: "20px", borderRadius: '20px' }}
        >
          <Typography variant="h6" gutterBottom fontSize="1.3em" fontWeight="bold" textAlign="center">
            Chi tiết danh mục con
          </Typography>
          {selectedSubcategoryDetails && (
              <>
                <Typography variant="body1" fontSize="1em" paddingBottom="0.5em">
                <strong>Mã danh mục con:</strong> {selectedSubcategoryDetails.id}
                </Typography>
                <Typography variant="body1" fontSize="1em" paddingBottom="0.5em">
                  <strong>Tên danh mục con:</strong> {selectedSubcategoryDetails.name}
                </Typography>
                <Typography variant="body1" fontSize="1em" paddingBottom="0.5em">
                  <strong>Danh mục cha:</strong> {selectedSubcategoryDetails.category}
                </Typography>
                <Typography variant="body1" fontSize="1em" paddingBottom="0.5em">
                <strong>Tổng doanh thu:</strong> {selectedSubcategoryDetails.amount.toLocaleString('vi-VN')} VNĐ
                </Typography>
              </>
            )}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "1.2em", borderRadius: "15px", width: '100%', textTransform: 'none', boxShadow: 'none'}}
            onClick={handleCloseDetailsBackdrop}
          >
            Đóng
          </Button>
        </div>
      </Backdrop>

      <EditSubcategory
          open={editBackdrop}
          onClose={handleCloseEditBackdrop}
          subcategoryDetails={selectedSubcategoryEdit}
          onSave={handleSaveEditedSubcategory}
        />

        <ConfirmDeleteDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={confirmDelete}
                itemName={subcategoryToDelete ? subcategoryToDelete.name : ""}
              />
    </Box>
  );
}
