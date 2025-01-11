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
  Button,
  TableSortLabel,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import BackdropWrapper from "/src/components/Admin/Backdrop/Backdrop.jsx";
import AddUserForm from "/src/pages/Admin/Users/Add/Add.jsx";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("username");
  const [role, setRole] = useState("Customer");
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);

  useEffect(() => {
    fetch("/src/pages/Admin/Users/Management/Users.json")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu từ Users.json:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        (role === "All" || user.account_type === role) &&
        Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(0);
  }, [search, users, role]);

  const handleSort = (column) => {
    const newSortOrder = sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortOrder(newSortOrder);
  };

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortBy === "username") {
      return a.username.localeCompare(b.username, "vi-VN", { sensitivity: "base" }) * (sortOrder === "asc" ? 1 : -1);
    }

    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const totalUsers = filteredUsers.length;
  const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" gutterBottom>
          Quản lý người dùng
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        marginBottom="10px"
        marginTop="-15px"
      >
        <Box display="flex" alignItems="center" flexGrow={1}>
          <FormControl sx={{ minWidth: 120, scale: "0.95" }}>
            <InputLabel>Vai trò</InputLabel>
            <Select value={role} onChange={handleRoleChange} label="Vai trò">
              <MenuItem value="Customer">Khách hàng</MenuItem>
              <MenuItem value="Admin">Quản trị viên</MenuItem>
              <MenuItem value="All">Tất cả</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          label="Tìm kiếm"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "300px", marginRight: "10px" }}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: "0.95em",
            textTransform: "none",
            borderRadius: "15px",
            boxShadow: "none",
          }}
          onClick={() => setIsBackdropOpen(true)}
        >
          Thêm người dùng
        </Button>
      </Box>

      {totalUsers === 0 ? (
        <Alert severity="warning" sx={{ borderRadius: "10px", mb: 2 }}>
          Không tồn tại người dùng chứa "{search}".
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
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>
                  <TableSortLabel
                    active={sortBy === "username"}
                    direction={sortOrder}
                    onClick={() => handleSort("username")}
                  >
                    Tên người dùng
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <TableSortLabel
                    active={sortBy === "gender"}
                    direction={sortOrder}
                    onClick={() => handleSort("gender")}
                  >
                    Giới tính
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <TableSortLabel
                    active={sortBy === "phone_number"}
                    direction={sortOrder}
                    onClick={() => handleSort("phone_number")}
                  >
                    Số điện thoại
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <TableSortLabel
                    active={sortBy === "email"}
                    direction={sortOrder}
                    onClick={() => handleSort("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>Chức năng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center" }}>{user.username}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.gender === "Male"
                      ? "Nam"
                      : user.gender === "Female"
                      ? "Nữ"
                      : "Khác"}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{user.phone_number}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{user.email}</TableCell>
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
        <Typography variant="subtitle2">Tổng số người dùng: {totalUsers}</Typography>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số người dùng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} trên ${count}`
          }
        />
      </Box>

      <BackdropWrapper open={isBackdropOpen} onClose={() => setIsBackdropOpen(false)}>
        <AddUserForm />
      </BackdropWrapper>
    </Box>
  );
}

export default UserTable;
