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
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai"; 
import { useNavigate } from "react-router-dom"; 
import {Breadcrumbs, Link } from '@mui/material';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("/src/pages/User/UserManagement/users.json")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error loading user data:", error));
  }, []);

  const handleAddUser = () => {
    navigate("/add-user"); 
  };

  return (
    <div className="user-management">
      <Box
          sx={{
            padding: '10px 20px',
            backgroundColor: 'var(--white)',
            borderRadius: '15px',
            boxShadow: 0,
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold' }}>
            Quản lý người dùng
          </Typography>

          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Tổng quan
            </Link>
            <Link underline="hover" color="inherit" href="/add-user">
              Người dùng
            </Link>
            <Typography color="text.primary">Quản lý người dùng</Typography>
          </Breadcrumbs>
        </Box>

      <Box sx={{ padding: "20px", backgroundColor: "var(--white)", borderRadius: "20px", boxShadow: 0, marginTop: "20px" }}>
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
      </Box>
    </div>
  );
}

export default UserManagement;
