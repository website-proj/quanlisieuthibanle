import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  TextField,
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
  Backdrop,
  Fade,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FiEye, FiTrash2 } from "react-icons/fi";
import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import ContentCard from "/src/components/ContentCard/ContentCard";

function BannersList() {
  const breadcrumbs = [
    { label: "Tổng quan", link: "/dashboard" },
    { label: "Banner", link: "/banners-list" },
    { label: "Danh sách banner", link: "/banners-list", active: true },
  ];
  const navigate = useNavigate();

  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  // Lấy dữ liệu từ file JSON
  useEffect(() => {
    fetch("/src/pages/Banners/BannersList/banners.json")
      .then((response) => response.json())
      .then((data) => {
        setBanners(data);
        setFilteredBanners(data);
      });
  }, []);

  // Đồng bộ filteredBanners khi banners thay đổi
  useEffect(() => {
    setFilteredBanners(banners);
  }, [banners]);

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = banners.filter((banner) =>
      Object.values(banner).some((val) =>
        val.toString().toLowerCase().includes(value)
      )
    );
    setFilteredBanners(filtered);
    setPage(0);
  };

  // Sắp xếp dữ liệu
  const handleSort = (property) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    const direction = isAsc ? "desc" : "asc";
    setOrderDirection(direction);
    setOrderBy(property);

    const sorted = [...filteredBanners].sort((a, b) => {
      if (typeof a[property] === "number") {
        return isAsc ? a[property] - b[property] : b[property] - a[property];
      }
      return isAsc
        ? a[property].toString().localeCompare(b[property])
        : b[property].toString().localeCompare(a[property]);
    });
    setFilteredBanners(sorted);
  };

  // Xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Xử lý thay đổi số hàng hiển thị
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Xử lý mở chi tiết banner
  const handleViewBanner = (banner) => {
    setSelectedBanner(banner);
  };

  // Xử lý đóng chi tiết banner
  const handleCloseDetails = () => {
    setSelectedBanner(null);
  };

  // Mở dialog xác nhận xóa
  const handleDeleteBanner = (banner) => {
    setBannerToDelete(banner);
    setOpenDeleteDialog(true);
  };

  // Xử lý xóa banner
  const confirmDeleteBanner = () => {
    const updatedBanners = banners.filter((banner) => banner.id !== bannerToDelete.id);
    setBanners(updatedBanners);
    setFilteredBanners(updatedBanners);
    setOpenDeleteDialog(false);
    setBannerToDelete(null);
  };

  // Đóng dialog xóa
  const cancelDeleteBanner = () => {
    setOpenDeleteDialog(false);
    setBannerToDelete(null);
  };

  return (
    <div className="banners-list">
      <HeaderCard title="Danh sách banner" breadcrumbs={breadcrumbs} />

      <ContentCard>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Box sx={{ flex: 3.5, marginRight: "20px" }}>
            <TextField
              label="Tìm kiếm banner"
              variant="outlined"
              value={search}
              onChange={handleSearch}
              fullWidth
              sx={{ marginBottom: "20px" }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                textTransform: "none",
                width: "100%",
                height: "3.5rem",
                marginBottom: "20px",
                boxShadow: "none",
              }}
              onClick={() => navigate("/add-banner")}
            >
              Thêm banner
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderDirection}
                    onClick={() => handleSort("id")}
                  >
                    Mã banner
                  </TableSortLabel>
                </TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderDirection}
                    onClick={() => handleSort("title")}
                  >
                    Tiêu đề
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "category"}
                    direction={orderDirection}
                    onClick={() => handleSort("category")}
                  >
                    Thuộc danh mục
                  </TableSortLabel>
                </TableCell>
                <TableCell>Chức năng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBanners
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((banner, index) => (
                  <TableRow key={index}>
                    <TableCell>{banner.id}</TableCell>
                    <TableCell>
                      <img
                        src={banner.image}
                        alt={banner.title}
                        style={{ width: "100px", height: "auto" }}
                      />
                    </TableCell>
                    <TableCell>{banner.title}</TableCell>
                    <TableCell>{banner.category}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewBanner(banner)}>
                        <FiEye />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteBanner(banner)}>
                        <FiTrash2 />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

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
            labelRowsPerPage="Số hàng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} trên ${count !== -1 ? count : "nhiều hơn"}`
            }
          />
        </Box>
      </ContentCard>

      <Backdrop
        sx={{ color: "black", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={selectedBanner !== null}
        onClick={handleCloseDetails}
      >
        <Fade in={selectedBanner !== null}>
          <Box
            sx={{
              backgroundColor: "white",
              padding: 3,
              borderRadius: 2,
              width: 400,
              boxShadow: 24,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h6">Chi tiết Banner</Typography>
            <Box sx={{ marginBottom: 2 }}>
              <img
                src={selectedBanner?.image}
                alt={selectedBanner?.title}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            </Box>
            <Typography variant="h6">Tiêu đề: {selectedBanner?.title}</Typography>
            <Typography variant="body1">Danh mục: {selectedBanner?.category}</Typography>
            <Typography variant="body2">{selectedBanner?.description}</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={handleCloseDetails}
            >
              Đóng
            </Button>
          </Box>
        </Fade>
      </Backdrop>

      <Dialog open={openDeleteDialog} onClose={cancelDeleteBanner}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn xóa banner "{bannerToDelete?.title}" không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteBanner} color="primary">
            Hủy
          </Button>
          <Button onClick={confirmDeleteBanner} color="secondary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BannersList;
