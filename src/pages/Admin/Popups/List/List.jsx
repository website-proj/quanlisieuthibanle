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
} from "@mui/material";
import HeaderCard from "/src/components/Admin/HeaderCard/HeaderCard";
import ContentCard from "/src/components/Admin/ContentCard/ContentCard";
import BackdropComponent from "./Backdrop.jsx";
import Add from "/src/pages/Admin/Popups/Add/Add"; 

function List() {
  const breadcrumbs = [
    { label: "Tổng quan", link: "/dashboard" },
    { label: "Popup", link: "popups-list" },
    { label: "Danh sách popup", link: "popups-list", active: true },
  ];
  const navigate = useNavigate();

  // State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState("asc"); // asc or desc
  const [orderBy, setOrderBy] = useState("id");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [openBackdrop, setOpenBackdrop] = useState(false); 

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const response = await fetch("/src/pages/Admin/Popups/List/Popups.json");
        if (!response.ok) {
          throw new Error("Failed to fetch popups data");
        }
        const data = await response.json();
        setPopups(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopups();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const filteredPopups = popups.filter((popup) =>
    popup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    popup.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    popup.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <HeaderCard title="Danh sách popup" breadcrumbs={breadcrumbs} />
      <ContentCard>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px", 
          }}
        >
          <TextField
            label="Tìm kiếm popup"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              maxWidth: "40%",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenBackdrop(true)} 
            sx={{
              fontSize: '0.95em',
              textTransform: "none",
              borderRadius: '15px',
              boxShadow: 'none',
              height: '40px',
              width: '25%',
              marginTop: '0.5em'
            }}
          >
            Thêm popup
          </Button>
        </Box>

        {filteredPopups.length === 0 ? (
          <Alert severity="warning" sx={{ borderRadius: "10px" }}>
            Không tồn tại popup '{searchTerm}'.
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
                  <TableCell sx={{ textAlign: "center" }}>
                    <TableSortLabel
                      active={orderBy === "id"}
                      direction={orderBy === "id" ? order : "asc"}
                      onClick={() => handleRequestSort("id")}
                    >
                      Mã popup
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Hình ảnh</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={() => handleRequestSort("name")}
                    >
                      Tên popup
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <TableSortLabel
                      active={orderBy === "position"}
                      direction={orderBy === "position" ? order : "asc"}
                      onClick={() => handleRequestSort("position")}
                    >
                      Vị trí
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <TableSortLabel
                      active={orderBy === "priority"}
                      direction={orderBy === "priority" ? order : "asc"}
                      onClick={() => handleRequestSort("priority")}
                    >
                      Thứ tự ưu tiên
                    </TableSortLabel>
                  </TableCell>
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
                {sortData(filteredPopups, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((popup) => (
                    <TableRow key={popup.id}>
                      <TableCell sx={{ textAlign: "center" }}>{popup.id}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <img src={popup.image} alt={popup.name} style={{ width: "100px", height: "auto" }} />
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{popup.name}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{popup.position}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{popup.priority}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Chip
                          label={popup.status}
                          color={popup.status === "Đang hoạt động" ? "success" : "error"}
                          variant="filled" 
                          sx={{
                            color: popup.status === "Đang hoạt động" ? "green" : "red",
                            backgroundColor: popup.status === "Đang hoạt động"
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
                          <IconButton color="info">
                            <AiOutlineEye />
                          </IconButton>
                          <IconButton sx={{ color: "green" }}>
                            <AiOutlineEdit />
                          </IconButton>
                          <IconButton sx={{ color: "red" }}>
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Typography>Tổng số popup: {filteredPopups.length}</Typography>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={filteredPopups.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số popup mỗi trang:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} trên ${count !== -1 ? count : "nhiều hơn"}`
            }
          />
        </Box>
      </ContentCard>

      <BackdropComponent open={openBackdrop} onClose={() => setOpenBackdrop(false)}>
        <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 4 }}>
          <Add /> 
        </Box>
      </BackdropComponent>
    </div>
  );
}

export default List;
