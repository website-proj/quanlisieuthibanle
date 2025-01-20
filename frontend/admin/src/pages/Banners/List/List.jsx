import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
  IconButton,
  Alert,
  TableSortLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Backdrop 
} from "@mui/material";
import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import ContentCard from "/src/components/ContentCard/ContentCard";
import BackdropComponent from "./Backdrop.jsx";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints.jsx";
import axios from "axios";
import ConfirmDeleteDialog from "/src/components/ConfirmDeleteDialog/ConfirmDeleteDialog.jsx";
import AddBanner from "/src/pages/Banners/Add/Add.jsx";

function List() {
  const breadcrumbs = [
    { label: "Tổng quan", link: "/dashboard" },
    { label: "Banner", link: "banners-list" },
    { label: "Danh sách banner", link: "banners-list", active: true },
  ];
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("priority");
  const [searchTerm, setSearchTerm] = useState("");
  const [openBackdropView, setOpenBackdropView] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const jwtToken = localStorage.getItem("jwtToken");
  const [openBackdropEdit, setOpenBackdropEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bannerToDelete, setbannerToDelete] = useState(null);
  const handleDeletebanner = (banner) => {
    setbannerToDelete(banner);
    setOpenDeleteDialog(true);
  };
  const confirmDelete = () => {
    if (bannerToDelete) {
      const jwtToken = localStorage.getItem("jwtToken");
      axios
        .delete(`${BASE_URL}${ENDPOINTS.banners.deletebanner}?banner_id=${bannerToDelete.banner_id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then(() => {
          setbanners(banners.filter(banner => banner.banner_id !== bannerToDelete.banner_id));
          setFilteredbanners(filteredbanners.filter(banner => banner.banner_id !== bannerToDelete.banner_id));
          setOpenDeleteDialog(false);
          setbannerToDelete(null);
        })
        .catch((error) => {
          console.error("Lỗi xóa banner: ", error);
        });
    }
  };
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => {
    setOpenAdd(true);
  }
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.banners.allBanners}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.data && response.data.data) {
          setBanners(response.data.data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleViewBanner = (banner) => {
    setSelectedBanner(banner);
    setOpenBackdropView(true);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdropView(false);
    setSelectedBanner(null);
  };
  
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortData = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  const filteredBanners = banners.filter((banner) =>
    banner.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    banner.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditBanner = (banner) => {
    setSelectedBanner(banner);
    setSelectedBanner({ ...banner });
    setImagePreview(banner.image);
        setOpenBackdropEdit(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateBanner = async (bannerId, position, status, priority) => {
    try {
      const updateData = new FormData();
      
      // Chỉ thêm file mới nếu người dùng đã chọn file mới
      if (selectedImage) {
        updateData.append("file", selectedImage);
      }
      
      updateData.append("banner_id", bannerId);
      updateData.append("position", position); 
      updateData.append("status", status);
      updateData.append("priority", priority);
  
      const response = await axios.put(
        `${BASE_URL}${ENDPOINTS.banners.editBanner}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );
  
      if (response.data.message === "banner update successfully") {
        setOpenBackdropEdit(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error details:", error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <div>
      <HeaderCard title="Danh sách banner" breadcrumbs={breadcrumbs} />
      <ContentCard>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <TextField
            label="Tìm kiếm banner"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: "40%" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAdd}
            sx={{
              fontSize: "0.95em",
              textTransform: "none",
              borderRadius: "15px",
              boxShadow: "none",
              height: "40px",
              width: "25%",
              marginTop: "0.5em",
            }}
          >
            Thêm banner
          </Button>
        </Box>

        {filteredBanners.length === 0 ? (
          <Alert severity="warning" sx={{ borderRadius: "10px" }}>
            Không tồn tại banner '{searchTerm}'.
          </Alert>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "none",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell sx={{ textAlign: "center" }}>
                    <TableSortLabel
                      active={orderBy === "banner_id"}
                      direction={orderBy === "banner_id" ? order : "asc"}
                      onClick={() => handleRequestSort("banner_id")}
                    >
                      Mã banner
                    </TableSortLabel>
                  </TableCell> */}
                  <TableCell sx={{ textAlign: "center" }}>Hình ảnh</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <TableSortLabel
                      active={orderBy === "position"}
                      direction={orderBy === "position" ? order : "asc"}
                      onClick={() => handleRequestSort("position")}
                    >
                      Vị trí
                    </TableSortLabel>
                  </TableCell>
                  {/* <TableCell sx={{ textAlign: "center" }}>
                    <TableSortLabel
                      active={orderBy === "priority"}
                      direction={orderBy === "priority" ? order : "asc"}
                      onClick={() => handleRequestSort("priority")}
                    >
                      Thứ tự ưu tiên
                    </TableSortLabel>
                  </TableCell> */}
                  <TableCell sx={{ textAlign: "center" }}>
                    <TableSortLabel
                      active={orderBy === "status"}
                      direction={orderBy === "status" ? order : "asc"}
                      onClick={() => handleRequestSort("status")}
                    >
                      Trạng thái
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Chức năng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortData(filteredBanners, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((banner) => (
                    <TableRow key={banner.banner_id}>
                      {/* <TableCell sx={{ textAlign: "center" }}>{banner.banner_id}</TableCell> */}
                      <TableCell sx={{ textAlign: "center" }}>
                        <img
                          src={banner.image}
                          alt="Ảnh banner"
                          style={{ width: "100px", height: "auto", borderRadius: "13px" }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{banner.position}</TableCell>
                      {/* <TableCell sx={{ textAlign: "center" }}>{banner.priority}</TableCell> */}
                      <TableCell sx={{ textAlign: "center" }}>
                        <Chip
                          label={banner.status === "Active" ? "Hoạt động" : "Không hoạt động"}
                          color={banner.status === "Active" ? "success" : "error"}
                          variant="filled"
                          sx={{
                            color: banner.status === "Active" ? "green" : "red",
                            backgroundColor: banner.status === "Active"
                              ? "rgba(0, 128, 0, 0.1)"
                              : "rgba(255, 0, 0, 0.1)",
                            fontWeight: "500",
                            borderRadius: "20px",
                            boxShadow: "none",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <IconButton color="info" onClick={() => handleViewBanner(banner)}>
                            <AiOutlineEye />
                          </IconButton>
                          <IconButton 
                            sx={{ color: "green" }} 
                            onClick={() => handleEditBanner(banner)}
                          >
                            <AiOutlineEdit />
                          </IconButton>
                          <IconButton sx={{ color: "red" }} onClick={() => handleDeletebanner(banner)}>
                            <AiOutlineDelete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
          <Typography>Tổng số banner: {filteredBanners.length}</Typography>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={filteredBanners.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số banner mỗi trang:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} trên ${count !== -1 ? count : "nhiều hơn"}`
            }
          />
        </Box>
      </ContentCard>

      <BackdropComponent open={openBackdropView} onClose={handleCloseBackdrop}>
    {selectedBanner && (
      <Box sx={{ padding: 2, backgroundColor: '#fff', borderRadius: '8px', boxShadow: 0 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '1em' }}>
          Chi tiết banner
        </Typography>
        <Box sx={{ marginBottom: "1.5em" }}>
          <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>
            <strong>Mã banner:</strong> {selectedBanner.banner_id}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>
            <strong>Hình ảnh:</strong>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <img
                src={selectedBanner.image}
                alt="Banner"
                style={{ width: "60%", height: "auto", borderRadius: "20px" }}
              />
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>
            <strong>Vị trí:</strong> {selectedBanner.position}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>
            <strong>Thứ tự ưu tiên:</strong> {selectedBanner.priority}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '1.5em' }}>
          <strong>Ngày tạo:</strong> {new Date(selectedBanner.date_created).toLocaleDateString('vi-VN')}
          </Typography>
        </Box>
        <Button
          onClick={handleCloseBackdrop}
          variant="contained"
          color="primary"
          sx={{
            width: '100%',
            textTransform: 'none',
            boxShadow: 'none',
            fontWeight: '1em',
            borderRadius: '15px'
          }}
        >
          Đóng
        </Button>
      </Box>
  )}
</BackdropComponent>

    <BackdropComponent open={openBackdropEdit} onClose={() => setOpenBackdropEdit(false)}>
  {selectedBanner && (
    <Box sx={{ 
      padding: 2, 
      backgroundColor: '#fff', 
      borderRadius: '10px', 
      boxShadow: 0,
      width: 'auto',
      maxWidth: '90vw'
    }}>
      <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '1em' }}>
        Chỉnh sửa banner
      </Typography>
      <Box sx={{ marginBottom: "1.5em" }}>
        <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>
          <strong>Mã banner:</strong> {selectedBanner.banner_id}
        </Typography>
        
        {/* Image Preview and Upload */}
        <Box sx={{ marginY: 2 }}>
          <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>
            <strong>Hình ảnh:</strong>
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "60%", height: "auto", borderRadius: "20px", alignItems: 'center',textAlign: 'center'  }}
              />
            )}
            <Button
              variant="outlined"
              component="label"
              sx={{
                textTransform: 'none',
                borderRadius: '15px',
                boxShadow: 'none',
                width: '50%',
                height: '30px'
              }}
            >
              Tải ảnh lên
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Box>
        </Box>

               {/* Position Select */}
        <FormControl fullWidth sx={{ marginY: 2 }}>
          <InputLabel>Vị trí</InputLabel>
          <Select
            value={selectedBanner.position}
            label="Vị trí"
            onChange={(e) => setSelectedBanner({...selectedBanner, position: e.target.value})}
          >
            <MenuItem value="main">Main</MenuItem>
            <MenuItem value="bottom">Bottom</MenuItem>
            <MenuItem value="sidebar">Sidebar</MenuItem>
          </Select>
        </FormControl>

        {/* Status Select */}
        <FormControl fullWidth sx={{ marginY: 2 }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            value={selectedBanner.status}
            label="Trạng thái"
            onChange={(e) => setSelectedBanner({...selectedBanner, status: e.target.value})}
          >
            <MenuItem value="Active">Hoạt động</MenuItem>
            <MenuItem value="Inactive">Không hoạt động</MenuItem>
          </Select>
        </FormControl>

        {/* Priority Input */}
        <TextField
          fullWidth
          label="Thứ tự ưu tiên"
          type="number"
          value={selectedBanner.priority}
          onChange={(e) => setSelectedBanner({...selectedBanner, priority: e.target.value})}
          sx={{ marginY: 2 }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={() => setOpenBackdropEdit(false)}
          variant="outlined"
          sx={{
            width: '50%',
            textTransform: 'none',
            borderRadius: '15px'
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={() => handleUpdateBanner(
            selectedBanner.banner_id,
            selectedBanner.position,
            selectedBanner.status,
            selectedBanner.priority
          )}
          variant="contained"
          sx={{
            width: '50%',
            textTransform: 'none',
            borderRadius: '15px',
            boxShadow: 'none',
          }}
        >
          Lưu
        </Button>
      </Box>
    </Box>
  )}
</BackdropComponent>
 <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
      />

<Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(3px)',
        }}
        open={openAdd}
        onClick={handleCloseAdd}
      >
        <div onClick={(e) => e.stopPropagation()} style={{ width: '40%', maxWidth: '1000px', paddingTop: '0', backgroundColor: '#fff', borderRadius: '15px' }}>
          <AddBanner />
        </div>
      </Backdrop>   
    </div>
  );
}

export default List;
