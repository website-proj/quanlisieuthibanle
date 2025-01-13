import React, { useState } from 'react';
import './Add.css';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
  Typography,
  Button,
  Grid,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import ContentCard from "/src/components/ContentCard/ContentCard";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { use } from 'react';

export default function Add() {
  const [showPassword, setShowPassword] = useState(false);
  const [addedUserData, setAddedUserData] = useState(null);

  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    // role: '',
  });
  const userInfo = [
    { label: "Tên người dùng", value: addedUserData?.name },
    { label: "Giới tính", value: addedUserData?.gender },
    { label: "Số điện thoại", value: addedUserData?.phone },
    { label: "Email", value: addedUserData?.email },
    { label: "Địa chỉ", value: addedUserData?.address },
    // { label: "Vai trò", value: addedUserData?.role },
  ];
  
  userInfo.map((item, index) => (
    <Typography key={index} variant="h6" style={{ marginTop: '10px', fontWeight: '500' }}>
      <strong>{item.label}:</strong> {item.value}
    </Typography>
  ));
  
  
  userInfo.map((item, index) => (
    <Typography key={index} variant="h6" style={{ marginTop: '10px', fontWeight: '500' }}>
      <strong>{item.label}:</strong> {item.value}
    </Typography>
  ));
  
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSuccessBackdrop, setOpenSuccessBackdrop] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = () => {
    const newErrors = {};

    if (!userData.name) newErrors.name = 'Vui lòng nhập tên người dùng.';
    if (!userData.gender) newErrors.gender = 'Vui lòng chọn giới tính.';
    if (!userData.phone) newErrors.phone = 'Vui lòng nhập số điện thoại.';
    if (!userData.email) newErrors.email = 'Vui lòng nhập email.';
    if (!userData.address) newErrors.address = 'Vui lòng nhập địa chỉ.';
    // if (!userData.role) newErrors.role = 'Vui lòng chọn vai trò.';
    if (!userData.password) newErrors.password = 'Vui lòng nhập mật khẩu.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setOpenBackdrop(true);
      setTimeout(() => {
        setAddedUserData({ name: userData.name, gender: userData.gender, phone: userData.phone, email: userData.email, address: userData.address, role: userData.role, password: userData.password }); 
        setOpenBackdrop(false); 
        setOpenSuccessBackdrop(true); 
        setSuccessMessage('Bạn đã thêm một người dùng!');
      }, 2000);
    }
  };

  const handleCloseSuccessBackdrop = () => {
    setOpenSuccessBackdrop(false);
    setUserData({
      name: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      password: '',
      role: '',
    }); 
  };

  return (
    <div>
      <ContentCard>
        <Grid container spacing={2}>
          {/* Row 1 */}
          <Grid item xs={7}>
            <Typography variant="h6" className='title-add-categories'>
              Tên người dùng
            </Typography>
            <TextField
              name="name"
              value={userData.name}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" className='title-add-categories'>
              Giới tính
            </Typography>
            <FormControl fullWidth variant="outlined">
              <Select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                required
                error={Boolean(errors.gender)}
              >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                <MenuItem value="Khác">Khác</MenuItem>
              </Select>
              {errors.gender && <Typography color="error">{errors.gender}</Typography>}
            </FormControl>
          </Grid>

          {/* Row 2 */}
          <Grid item xs={7}>
            <Typography variant="h6" className='title-add-categories'>
              Email
            </Typography>
            <TextField
              name="email"
              value={userData.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              type="email"
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={5}>
            <Typography variant="h6" className='title-add-categories'>
              Số điện thoại
            </Typography>
            <TextField
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              type="tel"
              inputProps={{ pattern: "[0-9]*" }}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className='title-add-categories'>
              Địa chỉ
            </Typography>
            <TextField
              name="address"
              value={userData.address}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={Boolean(errors.address)}
              helperText={errors.address}
            />
          </Grid>

          {/* Row 3 */}
          {/* <Grid item xs={6}>
            <Typography variant="h6" className='title-add-categories'>
              Vai trò
            </Typography>
            <FormControl fullWidth variant="outlined" required>
              <Select
                name="role"
                value={userData.role}
                onChange={handleChange}
                error={Boolean(errors.role)}
              >
                <MenuItem value="Khách hàng">Khách hàng</MenuItem>
                <MenuItem value="Quản trị viên">Quản trị viên</MenuItem>
              </Select>
              {errors.role && <Typography color="error">{errors.role}</Typography>}
            </FormControl>
          </Grid> */}
          <Grid item xs={12}>
            <Typography variant="h6" className='title-add-categories'>
              Mật khẩu
            </Typography>
            <TextField
              name="password"
              value={userData.password}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '1em' }}
          onClick={handleSubmit}
          sx={{textTransform: 'none', fontSize: '1.1em', borderRadius: '15px', boxShadow: 'none'}}
        >
          Thêm người dùng
        </Button>

        <Backdrop open={openBackdrop} style={{ zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Backdrop
          open={openSuccessBackdrop}
          style={{ zIndex: 9999, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={handleCloseSuccessBackdrop}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              // alignItems: "left",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h5" style={{textAlign:'center', fontSize: '1.5em', fontWeight: "bold" }}>
              {successMessage}
            </Typography>
            {userInfo.map((item, index) => (
              <Typography key={index} variant="body2" style={{ marginTop: '10px', fontWeight: '0', fontSize: '1.2em' }}>
                <strong>{item.label}:</strong> {item.value || 'N/A'}
              </Typography>
            ))}

            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseSuccessBackdrop}
              style={{ marginTop: "1em", borderRadius: "15px", boxShadow: 'none' }}
            >
              Đóng
            </Button>
          </div>
        </Backdrop>
      </ContentCard>
    </div>
  );
}
