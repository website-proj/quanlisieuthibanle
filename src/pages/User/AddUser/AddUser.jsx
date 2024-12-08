import React from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import './AddUser.css';

function AddUser() {
  return (
    <div className="add-user">
      <div className="header-container">
        <Typography className="header-title">Thêm người dùng</Typography>
        <div className="header-content">
          <Typography className="header-breadcrumb">Trang chủ / Người dùng / Thêm người dùng</Typography>
        </div>
      </div>

      <div className="add-user-container">
        {/* Form */}
        <Box component="form" className="add-user-form">
          {/* Tên người dùng */}
          <Typography className="form-label">Tên người dùng *</Typography>
          <TextField
            fullWidth
            required
            className="form-field"
            margin="normal"
            variant="outlined"
          />

          {/* Email */}
          <Typography className="form-label">Email *</Typography>
          <TextField
            fullWidth
            required
            className="form-field"
            margin="normal"
            type="email"
            variant="outlined"
          />

          {/* Số điện thoại */}
          <Typography className="form-label">Số điện thoại *</Typography>
          <TextField
            fullWidth
            required
            className="form-field"
            margin="normal"
            type="tel"
            variant="outlined"
          />

          {/* Mật khẩu */}
          <Typography className="form-label">Mật khẩu *</Typography>
          <TextField
            fullWidth
            required
            className="form-field"
            margin="normal"
            type="password"
            variant="outlined"
          />

          {/* Nút Lưu */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="submit-button"
          >
            Lưu
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default AddUser;
