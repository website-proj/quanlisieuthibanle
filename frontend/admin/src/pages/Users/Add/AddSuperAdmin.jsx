import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Backdrop, CircularProgress, Paper, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '/src/api/apiEndpoints';

export default function AddSuperAdmin() {
  const [adminData, setAdminData] = useState({
    admin_name: '',
    password: '',
  });

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Move state outside of postAdminData

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!adminData.admin_name) newErrors.admin_name = 'Vui lòng nhập tên tài khoản.';
    if (!adminData.password) newErrors.password = 'Vui lòng nhập mật khẩu.';
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      postAdminData();
    }
  };

  const postAdminData = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      console.log('Token không có trong localStorage');
      return;
    }

    setOpenBackdrop(true);

    axios
      .post(
        `${BASE_URL}${ENDPOINTS.users.addSuperAdmin}`,
        null,
        {
          params: {
            admin_name: adminData.admin_name,
            password: adminData.password,
          },
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setOpenBackdrop(false);
        console.log('Super Admin added:', response.data);
        setSnackbarMessage('Tạo tài khoản thành công!');
        
        // Set the snackbar severity to 'success'
        setSnackbarSeverity('success');
        
        setOpenSnackbar(true);
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        setOpenBackdrop(false);
        console.error('Error adding Super Admin:', error);
      
        if (error.response && error.response.data.detail === 'name already registered') {
          setSnackbarMessage('Tài khoản đã tồn tại');
          setSnackbarSeverity('error');  // Set to 'error' severity if account already exists
        } else {
          setSnackbarMessage('Tài khoản đã tồn tại.');
          setSnackbarSeverity('error');  // Set to 'error' severity for general errors
        }
      
        setOpenSnackbar(true);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ padding: '2em', display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} style={{ padding: '1em', maxWidth: '600px', width: '100%', boxShadow: 'none' }}>
        <Typography variant="h5" align="center" style={{ fontWeight: 'bold', marginBottom: '1.5em' }}>
          Thêm tài khoản Admin
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: '1.1em', fontWeight: '500' }}>Tên tài khoản</Typography>

            <TextField
              name="admin_name"
              value={adminData.admin_name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
              error={Boolean(errors.admin_name)}
              helperText={errors.admin_name}
              style={{ marginTop: '0.5em' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: '1.1em', fontWeight: '500' }}>Mật khẩu</Typography>

            <TextField
              name="password"
              value={adminData.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              required
              error={Boolean(errors.password)}
              helperText={errors.password}
              style={{ marginTop: '0.5em' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '1em' }}
              onClick={handleSubmit}
              sx={{ textTransform: 'none', fontSize: '1.1em', borderRadius: '15px', boxShadow: 'none' }}
            >
              Thêm Admin
            </Button>
          </Grid>
        </Grid>

        <Backdrop open={openBackdrop} style={{ zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>

      {/* Snackbar for error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
