import React, { useState } from 'react';
import './Add.css';
import {
  TextField,
  Select,
  MenuItem,
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
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '/src/api/apiEndpoints';

export default function Add() {
  const [showPassword, setShowPassword] = useState(false);
  const [addedUserData, setAddedUserData] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSuccessBackdrop, setOpenSuccessBackdrop] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  const [userData, setUserData] = useState({
    username: '',
    gender: '',
    phone_number: '',
    email: '',
    address: '',
    password: '',
  });

  const userInfo = [
    { label: "Tên người dùng", value: addedUserData?.username },
    { label: "Giới tính", value: addedUserData?.gender === "Male" ? "Nam" : addedUserData?.gender === "Female" ? "Nữ" : "Khác" },
    { label: "Số điện thoại", value: addedUserData?.phone_number },
    { label: "Email", value: addedUserData?.email },
    { label: "Địa chỉ", value: addedUserData?.address },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const postapi = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      console.log("Token không có trong localStorage");
      return;
    }
  
    setOpenBackdrop(true);
  
    axios
      .post(`${BASE_URL}${ENDPOINTS.users.addUser}`, userData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      })
      .then(response => {
        console.log("User added:", response.data);
        
        setOpenBackdrop(false);
        
        setAddedUserData({
          username: userData.username,
          gender: userData.gender,
          phone_number: userData.phone_number,
          email: userData.email,
          address: userData.address,
          password: userData.password,
        });
  
        setOpenSuccessBackdrop(true);
        setSuccessMessage('Bạn đã thêm một người dùng!');
      })
      .catch(error => {
        console.error("Error adding user:", error.response);
        
        setOpenBackdrop(false);
  
        if (error.response && error.response.data && error.response.data.message === 'Email đã tồn tại') {
          setErrors(prevErrors => ({
            ...prevErrors,
            email: 'Email này đã được sử dụng.'
          }));
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            email: 'Email này đã được sử dụng.'
          }));
        }
      });
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!userData.username) newErrors.username = 'Vui lòng nhập tên người dùng.';
    if (!userData.gender) newErrors.gender = 'Vui lòng chọn giới tính.';
    if (!userData.phone_number) newErrors.phone_number = 'Vui lòng nhập số điện thoại.';
    if (!userData.email) newErrors.email = 'Vui lòng nhập email.';
    if (!userData.address) newErrors.address = 'Vui lòng nhập địa chỉ.';
    if (!userData.password) newErrors.password = 'Vui lòng nhập mật khẩu.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      postapi();
    }
  };

  const handleCloseSuccessBackdrop = () => {
    setOpenSuccessBackdrop(false);
    window.location.reload();
    setUserData({
      username: '',
      gender: '',
      phone_number: '',
      email: '',
      address: '',
      password: '',
    });
  };

  return (
    <div>
      <ContentCard>
        <Grid container spacing={2}>
          {/* Row 1 */}
          <Grid item xs={7}>
            <Typography variant="h6" className='title-add-categories' style={{ fontWeight: 'bold' }}>
              Tên người dùng
            </Typography>
            <TextField
              name="username"
              value={userData.username}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              error={Boolean(errors.username)}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" className='title-add-categories' style={{ fontWeight: 'bold' }}>
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
                <MenuItem value="Male">Nam</MenuItem>
                <MenuItem value="Female">Nữ</MenuItem>
                <MenuItem value="Other">Khác</MenuItem>
              </Select>
              {errors.gender && <Typography color="error">{errors.gender}</Typography>}
            </FormControl>
          </Grid>

          {/* Row 2 */}
          <Grid item xs={7}>
            <Typography variant="h6" className='title-add-categories' style={{ fontWeight: 'bold' }}>
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
            <Typography variant="h6" className='title-add-categories' style={{ fontWeight: 'bold' }}>
              Số điện thoại
            </Typography>
            <TextField
              name="phone_number"
              value={userData.phone_number}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              type="tel"
              inputProps={{ pattern: "[0-9]*" }}
              error={Boolean(errors.phone_number)}
              helperText={errors.phone_number}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className='title-add-categories' style={{ fontWeight: 'bold' }}>
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
          <Grid item xs={12}>
            <Typography variant="h6" className='title-add-categories' style={{ fontWeight: 'bold' }}>
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
          sx={{ textTransform: 'none', fontSize: '1.1em', borderRadius: '15px', boxShadow: 'none' }}
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
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h5" style={{ textAlign: 'center', fontSize: '1.5em', fontWeight: "bold" }}>
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
