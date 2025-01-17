import React, { useState, useEffect } from 'react';
import { Backdrop, Button, Snackbar, Alert, Typography, TextField, MenuItem } from '@mui/material';
import { decodeJwt } from 'jose';
import { BASE_URL, ENDPOINTS } from '/src/api/apiEndpoints.jsx';
import ChangePassword from './ChangePassword';

function Account() {
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [backdropOpen, setBackdropOpen] = useState(false);  // State to control backdrop visibility
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const handleOpenChangePassword = () => setChangePasswordOpen(true);
  const handleCloseChangePassword = () => setChangePasswordOpen(false);


  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const decodedToken = decodeJwt(jwtToken);
        const userEmail = decodedToken.email;
  
        const response = await fetch(`${BASE_URL}${ENDPOINTS.users.detailsUser}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
  
        const result = await response.json();
  
        if (!response.ok) throw new Error(result.message || "Không thể lấy thông tin người dùng");
  
        const user = result.data.find(user => user.email === userEmail);
  
        if (user) {
          setUserInfo(user);
          setFormData({
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            address: user.address,
            gender: user.gender,
            membership_status: user.membership_status,
          });
  
          console.log("User info fetched:", user);
        } else {
          throw new Error("Email không khớp với thông tin trong JWT Token");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setSnackbarMessage(error.message || "Có lỗi xảy ra khi lấy dữ liệu người dùng");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };
  
    fetchUserData();
  }, [jwtToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const requestBody = {
        user_id: formData.user_id,
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
        gender: formData.gender,
        membership_status: formData.membership_status,
      };
  
      console.log("Request body:", requestBody);
  
      const response = await fetch(`${BASE_URL}${ENDPOINTS.users.editUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Cập nhật thông tin không thành công");
      } else {}
      setSnackbarMessage("Cập nhật thông tin người dùng thành công!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
  
      setTimeout(() => {
        setBackdropOpen(false);  // Close backdrop after successful submit
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Error updating user:", error);
      setSnackbarMessage(error.message || "Có lỗi xảy ra khi cập nhật thông tin");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleEditProfile = () => {
    setBackdropOpen(true);  // Open backdrop when edit profile button is clicked
  };

  if (!userInfo) {
    return <Typography>Đang tải thông tin người dùng...</Typography>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', paddingBottom: '0.5em' }} align="left">
        Tài khoản
      </Typography>

      <div>
        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1"><strong>Tên người dùng:</strong></Typography>
          <Typography variant="body2" style={{ marginLeft: '8px' }}>
            {userInfo.username || "Không có thông tin"}
          </Typography>
        </div>

        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1"><strong>Email:</strong></Typography>
          <Typography variant="body2" style={{ marginLeft: '8px' }}>
            {userInfo.email || "Không có thông tin"}
          </Typography>
        </div>
        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1"><strong>Giới tính:</strong></Typography>
            <Typography variant="body2" style={{ marginLeft: '8px' }}>
              {userInfo.gender === "Male"
                ? "Nam"
                : userInfo.gender === "Female"
                ? "Nữ"
                : "Không có thông tin"}
            </Typography>
          </div>


        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1"><strong>Số điện thoại:</strong></Typography>
          <Typography variant="body2" style={{ marginLeft: '8px' }}>
            {userInfo.phone_number || "Không có thông tin"}
          </Typography>
        </div>

        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1"><strong>Địa chỉ:</strong></Typography>
          <Typography variant="body2" style={{ marginLeft: '8px' }}>
            {userInfo.address || "Không có thông tin"}
          </Typography>
        </div>

        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1"><strong>Trạng thái thành viên:</strong></Typography>
          <Typography variant="body2" style={{ marginLeft: '8px' }}>
            {userInfo.membership_status === "Silver"
              ? "Bạc"
              : userInfo.membership_status === "Gold"
              ? "Vàng"
              : userInfo.membership_status === "Diamond"
              ? "Kim cương"
              : "Không có thông tin"}
          </Typography>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1em'}}>
        <Button onClick={handleEditProfile} variant="contained" color="primary" sx={{ marginTop: '16px', boxShadow: 'none', borderRadius: '10px', textTransform: 'none' }} >
          Chỉnh sửa hồ sơ
        </Button>
        <Button 
        onClick={handleOpenChangePassword}
        variant="contained" 
        color="secondary" 
        sx={{ marginTop: '16px', boxShadow: 'none', borderRadius: '10px', textTransform: 'none' }} >
          Đổi mật khẩu
        </Button>
      </div>

      {formData && (
        <Backdrop open={backdropOpen} onClick={() => setBackdropOpen(false)} sx={{ zIndex: 1300 }}>
          <div
            style={{
              width: '50%',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '15px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '95vh',
              overflowY: 'auto', scrollbarColor: '#ccc transparent',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h6" align="center" sx={{ marginBottom: '16px' }}>
              Chỉnh sửa hồ sơ
            </Typography>
            <TextField
              name="username"
              label="Tên người dùng"
              value={formData.username || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              value={formData.email || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="phone_number"
              label="Số điện thoại"
              value={formData.phone_number || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="address"
              label="Địa chỉ"
              value={formData.address || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Trạng thái thành viên"
              name="membership_status"
              value={formData.membership_status || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Silver">Bạc</MenuItem>
              <MenuItem value="Gold">Vàng</MenuItem>
              <MenuItem value="Diamond">Kim cương</MenuItem>
            </TextField>
            <TextField
              select
              label="Giới tính"
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Male">Nam</MenuItem>
              <MenuItem value="Female">Nữ</MenuItem>
              <MenuItem value="Other">Khác</MenuItem>
            </TextField>

            <Button variant="contained" onClick={handleSubmit} fullWidth sx={{fontSize:'1em', marginTop: '16px', boxShadow: 'none', borderRadius: '15px', textTransform: 'none' }}>
              Lưu thay đổi
            </Button>
          </div>
        </Backdrop>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <ChangePassword open={changePasswordOpen} onClose={handleCloseChangePassword} />

    </div>
  );
}

export default Account;
