import React, { useState, useEffect } from "react";
import "./UserManagement.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai"; // Thay đổi icon tại đây
import { useNavigate } from "react-router-dom"; // Import useNavigate

function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Khởi tạo navigate để chuyển hướng

  // Fetch data from JSON file
  useEffect(() => {
    fetch("/src/pages/User/UserManagement/users.json")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error loading user data:", error));
  }, []);

  // Hàm xử lý sự kiện khi nhấn nút "Thêm người dùng"
  const handleAddUser = () => {
    navigate("/add-user"); // Chuyển hướng đến trang AddUser
  };

  return (
    <div className="user-management">
      <div className="header-container">
        <Typography className="header-title">Quản lí người dùng</Typography>
        <div className="header-content">
          <Typography className="header-breadcrumb">Trang chủ / Người dùng / Quản lí người dùng</Typography>
          <Button variant="contained" className="add-user-btn" onClick={handleAddUser}>
            Thêm người dùng
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên người dùng</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="view">
                    <AiOutlineEye /> {/* Đổi icon cho nút Xem */}
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete">
                    <AiOutlineDelete /> {/* Đổi icon cho nút Xóa */}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserManagement;
