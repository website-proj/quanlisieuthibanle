import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, MenuItem, Backdrop, Alert, DialogActions } from "@mui/material";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints.jsx";

function EditUser({ open, onClose, user }) {
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      
      // Construct the request body according to API requirements
      const requestBody = {
        user_id: formData.id, // Make sure this matches with your user data
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
        gender: formData.gender,
        membership_status: formData.membership_status
      };

      console.log('Sending request with body:', requestBody); // For debugging

      const response = await fetch(`${BASE_URL}${ENDPOINTS.users.editUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Cập nhật thông tin không thành công");
      }

      setSuccessMessage("Cập nhật thông tin người dùng thành công!");
      setTimeout(() => {
        onClose();
        window.location.reload(); // Refresh the page to show updated data
      }, 1500);
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMessage(error.message || "Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  if (!user) return null;

  return (
    <Backdrop open={open} onClick={onClose} sx={{ zIndex: 1300 }}>
      <Box
        sx={{
          width: "50%",
          backgroundColor: "white",
          padding: 2,
          borderRadius: "15px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "100vh",
          overflowY: "auto",
          scale: '0.95'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="h5" sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}>
          Chỉnh sửa thông tin người dùng
        </Typography>

        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

        <TextField
          label="Tên người dùng"
          name="username"
          value={formData.username || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Số điện thoại"
          name="phone_number"
          value={formData.phone_number || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Trạng thái thành viên"
          name="membership_status"
          value={formData.membership_status || ""}
          onChange={handleChange}
          fullWidth
          margin="small"
        >
          {/* <MenuItem value="Bronze">Đồng</MenuItem> */}
          <MenuItem value="Silver">Bạc</MenuItem>
          <MenuItem value="Gold">Vàng</MenuItem>
          <MenuItem value="Diamond">Kim cương</MenuItem>
        </TextField>
        <TextField
          label="Địa chỉ"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Giới tính"
          name="gender"
          value={formData.gender || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Male">Nam</MenuItem>
          <MenuItem value="Female">Nữ</MenuItem>
          <MenuItem value="Other">Khác</MenuItem>
        </TextField>

        {/* <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{textTransform: 'none', fontSize: '1em', boxShadow: 'none', borderRadius: '15px'}}>
            Lưu thay đổi
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose} sx={{textTransform: 'none', fontSize: '1em', boxShadow: 'none', borderRadius: '15px', ml: 2}}>
            Hủy
          </Button>
        </Box> */}
                      <DialogActions sx={{ p: 1, gap: 1 }}>
                        <Button
                          variant="outlined"
                          onClick={onClose}
                          fullWidth
                          sx={{textTransform: 'none', fontSize: '1em', borderRadius: '20px' }}
                        >
                          Hủy
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleSubmit}                  
                          fullWidth
                          sx={{textTransform: 'none', fontSize: '1em', borderRadius: '20px', boxShadow: 'none' }}
                        >
                          Lưu
                        </Button>
                      </DialogActions>
      </Box>
    </Backdrop>
  );
}

export default EditUser;