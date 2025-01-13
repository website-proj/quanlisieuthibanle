import React from "react";
import { Box, Typography, Button, Backdrop } from "@mui/material";

function ViewUser({ open, onClose, user }) {
  if (!user) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const translateRole = (role) => {
    if (role === "Customer") return "Khách hàng";
    if (role === "Admin") return "Quản trị viên";
    return role;
  };

  const translateMembership = (membership) => {
    if (membership === "Silver") return "Bạc";
    if (membership === "Gold") return "Vàng";
    if (membership === "Platinum") return "Platinum";
    return membership;
  };

  return (
    <Backdrop open={open} onClick={onClose} sx={{ zIndex: 1300, color: "#fff" }}>
      <Box
        sx={{
          width: "auto",
          backgroundColor: "white",
          padding: 4,
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", color: "black", marginBottom: 2, marginTop: "-0.2em" }}>
          Thông tin người dùng
        </Typography>
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 0, rowGap: '0.5em' }}>
          <Typography variant="body1" sx={{ color: "black" }}>
            <strong>Tên người dùng:</strong> {user.username}
          </Typography>
          <Typography variant="body1" sx={{ color: "black" }}>
            <strong>Số điện thoại:</strong> {user.phone_number}
          </Typography>
          <Typography variant="body1" sx={{ color: "black" }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" sx={{ color: "black" }}>
            <strong>Địa chỉ:</strong> {user.address}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 0, rowGap: '0.5em' }}>
          <Typography variant="body1" sx={{ color: "black" }}>
            <strong>Giới tính:</strong> {user.gender === "Male" ? "Nam" : user.gender === "Female" ? "Nữ" : "Khác"}
          </Typography>
          <Typography variant="body1" sx={{ color: "black" }}>
            <strong>ID người dùng:</strong> {user.id}
          </Typography>
          <Typography variant="body1" sx={{ color: "black" }}>
            <strong>Ngày tạo tài khoản:</strong> {formatDate(user.created_at)}
          </Typography>
          <Typography variant="body1" sx={{ color: "black" }}>
            <strong>Hạng thành viên:</strong> {translateMembership(user.membership_status)}
          </Typography>
        </Box>
    </Box>
        <Box sx={{ marginTop: 2.5, marginBottom: '-1em', textAlign: "center" }}>
          <Button
                            variant="contained"
                            onClick={onClose}
                            fullWidth
                            sx={{
                              marginBottom: "0.5em",
                              borderRadius: "15px",
                              textTransform: 'none',
                              boxShadow: 'none',
                              fontSize: '1em',
                              padding: '0.2em'
                            }}
                          >
                            Đóng
                          </Button>
        </Box>
      </Box>
    </Backdrop>
  );
}

export default ViewUser;
