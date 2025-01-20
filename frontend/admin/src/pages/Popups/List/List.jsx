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
  Modal,
  Backdrop 
} from "@mui/material";
import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import ContentCard from "/src/components/ContentCard/ContentCard";
import BackdropComponent from "./Backdrop.jsx";
import Add from "/src/pages/Popups/Add/Add.jsx";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints.jsx";
import EditPopup from './EditPopup.jsx'
import ConfirmDeleteDialog from "/src/components/ConfirmDeleteDialog/ConfirmDeleteDialog.jsx";
import axios from "axios";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function List() {
  const breadcrumbs = [
    { label: "Tổng quan", link: "/dashboard" },
    { label: "Popup", link: "popups-list" },
    { label: "Danh sách popup", link: "popups-list", active: true },
  ];
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [selectedPopup, setSelectedPopup] = useState(null); 
  const [openEditBackdrop, setOpenEditBackdrop] = useState(false); 
  const [selectedPopupForEdit, setSelectedPopupForEdit] = useState(null); 
  
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [popupToDelete, setpopupToDelete] = useState(null);
  const handleDeletepopup = (popup) => {
    setpopupToDelete(popup);
    setOpenDeleteDialog(true);
  };
  const confirmDelete = () => {
    if (popupToDelete) {
      const jwtToken = localStorage.getItem("jwtToken");
      axios
        .delete(`${BASE_URL}${ENDPOINTS.popups.deletepopup}?popup_id=${popupToDelete.popup_id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then(() => {
          setpopups(popups.filter(popup => popup.popup_id !== popupToDelete.popup_id));
          setFilteredpopups(filteredpopups.filter(popup => popup.popup_id !== popupToDelete.popup_id));
          setOpenDeleteDialog(false);
          setpopupToDelete(null);
        })
        .catch((error) => {
          console.error("Lỗi xóa popup: ", error);
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


  
  const handleEditPopup = (popup) => {
    setSelectedPopupForEdit(popup);
    setOpenEditBackdrop(true);
  };
  
  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken'); // Get the JWT token from local storage
        const response = await fetch(`${BASE_URL}${ENDPOINTS.popups.allPopups}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json', // Ensure the response is in JSON format
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch popups data');
        }

        const data = await response.json();
        setPopups(data.data); // Assuming the API response contains a 'data' field
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
    if (orderBy === "id") {
      return order === "desc"
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
    } else if (orderBy === "start_date" || orderBy === "end_date") {
      return order === "desc"
        ? (a, b) => new Date(b[orderBy].split("/").reverse().join("-")) - new Date(a[orderBy].split("/").reverse().join("-"))
        : (a, b) => new Date(a[orderBy].split("/").reverse().join("-")) - new Date(b[orderBy].split("/").reverse().join("-"));
    } else {
      return order === "desc"
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  const filteredPopups = popups.filter((popup) =>
    popup.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    popup.start_date?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    popup.end_date?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    popup.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open the backdrop with popup details
  const handleViewPopup = (popup) => {
    setSelectedPopup(popup); // Set the selected popup
    setOpenBackdrop(true); // Open the backdrop
  };

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
                  {/* <TableCell sx={{ textAlign: "center" }}>
                    <TableSortLabel
                      active={orderBy === "id"}
                      direction={orderBy === "id" ? order : "asc"}
                      onClick={() => handleRequestSort("id")}
                    >
                      Mã popup
                    </TableSortLabel>
                  </TableCell> */}
                  <TableCell sx={{ textAlign: "center" }}>Hình ảnh</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <TableSortLabel
                      active={orderBy === "start_date"}
                      direction={orderBy === "start_date" ? order : "asc"}
                      onClick={() => handleRequestSort("start_date")}
                    >
                      Ngày bắt đầu
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <TableSortLabel
                      active={orderBy === "end_date"}
                      direction={orderBy === "end_date" ? order : "asc"}
                      onClick={() => handleRequestSort("end_date")}
                    >
                      Ngày kết thúc
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
                      {/* <TableCell sx={{ textAlign: "center" }}>{popup.id}</TableCell> */}
                      <TableCell sx={{ textAlign: "center" }}>
                        <img
                          src={popup.image}
                          alt="Ảnh popup"
                          style={{ width: "100px", height: "auto", borderRadius: "10px" }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {formatDate(popup.start_date)}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {formatDate(popup.end_date)}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Chip
                          label={popup.status === "Active" ? "Hoạt động" : "Không hoạt động"}
                          color={popup.status === "Active" ? "success" : "error"}
                          variant="filled"
                          sx={{
                            color: popup.status === "Active" ? "green" : "red",
                            backgroundColor:
                              popup.status === "Active"
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
                          <IconButton color="info" onClick={() => handleViewPopup(popup)}>
                            <AiOutlineEye />
                          </IconButton>
                          <IconButton sx={{ color: "green" }}>
                            <AiOutlineEdit onClick={() => handleEditPopup(popup)}/>
                          </IconButton>
                          <IconButton sx={{ color: "red" }} onClick={() => handleDeletepopup(popup)}>
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
<Modal
  open={openEditBackdrop}
  onClose={() => setOpenEditBackdrop(false)}
  sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
>
  <Box
    sx={{
      backgroundColor: "white",
      padding: 2,
      borderRadius: "15px",
      width: "80%",
      maxWidth: "500px", 
    }}
  >
    {selectedPopupForEdit && (
      <>
        <EditPopup
          open={openEditBackdrop}
          onClose={() => setOpenEditBackdrop(false)}
          popupData={selectedPopupForEdit}
        />
      </>
    )}
  </Box>
</Modal>

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

      <Modal
  open={openBackdrop}
  onClose={() => setOpenBackdrop(false)}
  sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
>
  <Box
    sx={{
      backgroundColor: "white",
      padding: 2,
      borderRadius: "15px",
      width: "80%",
      maxWidth: "500px",  
      // textAlign: "center",
    }}
  >
    {selectedPopup && (
      <>
              <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '0.5em' }}>
                Chi tiết popup
              </Typography>
        <Typography  sx={{ marginBottom: 2 }}>
         <strong> Mã popup:</strong> {selectedPopup.popup_id}
        </Typography>        <Typography  sx={{ marginBottom: 2 }}>
         <strong> Hình ảnh:</strong> 
        </Typography>
        
        <Typography sx={{textAlign: 'center'}}>

        <img
          src={selectedPopup.image}
          alt="Popup image"
          style={{
            width: "60%",
            height: "auto",
            borderRadius: "10px",
            marginBottom: "15px", 
            textAlign: 'center'
          }}
        />
        </Typography>
        
        <Typography sx={{ marginBottom: 1 }}>
          <strong>Ngày bắt đầu:</strong> {formatDate(selectedPopup.start_date)}
        </Typography>
        
        <Typography sx={{ marginBottom: 2 }}>
          <strong>Ngày kết thúc:</strong> {formatDate(selectedPopup.end_date)}
        </Typography>
        
        <Button
          onClick={() => setOpenBackdrop(false)}
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
      </>
    )}
  </Box>
</Modal>

<Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(3px)',
        }}
        open={openAdd}
        onClick={handleCloseAdd}
      >
        <div onClick={(e) => e.stopPropagation()} style={{ width: '40%', maxWidth: '1000px', paddingTop: '0', backgroundColor: '#fff', borderRadius: '15px' }}>
          <Add />
      </div>
      </Backdrop>

<ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
      />

    </div>
    
  );
}

export default List;
