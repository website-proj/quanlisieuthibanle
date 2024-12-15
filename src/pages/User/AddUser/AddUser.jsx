import React from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import {Breadcrumbs, Link } from '@mui/material';

import './AddUser.css';
function AddUser() {
  return (
    <div className="add-user">
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
            Thêm người dùng
          </Typography>

          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Tổng quan
            </Link>
            <Link underline="hover" color="inherit" href="/add-user">
              Người dùng
            </Link>
            <Typography color="text.primary">Thêm người dùng</Typography>
          </Breadcrumbs>
        </Box>

      <Box sx={{ padding: "20px", backgroundColor: "var(--white)", borderRadius: "20px", boxShadow: 0, marginTop: "20px" }}>

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
      </Box>
    </div>
  );
}

export default AddUser;
