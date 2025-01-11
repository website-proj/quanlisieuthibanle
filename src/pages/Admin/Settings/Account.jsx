import React, { useState } from 'react';
import { Backdrop, DialogActions, DialogContent, IconButton, TextField, Snackbar, Alert, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import userInfoData from './Account.json';
import passwordData from './Password.json';

function Account() {
  const [userInfo, setUserInfo] = useState(userInfoData);
  const [editedInfo, setEditedInfo] = useState({ ...userInfoData });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [currentPassword] = useState(passwordData.currentPassword);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChangeProfile = (e) => {
    setEditedInfo({
      ...editedInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = () => {
    setUserInfo(editedInfo);
    setSnackbarMessage('Thông tin tài khoản đã được lưu');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (passwords.oldPassword === currentPassword) {
      if (passwords.newPassword === passwords.confirmPassword) {
        setSnackbarMessage('Mật khẩu đã được thay đổi');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setIsChangingPassword(false);
        setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setSnackbarMessage('Mật khẩu mới không khớp');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage('Mật khẩu cũ không đúng');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const closeBackdrop = () => {
    setIsEditing(false);
    setIsChangingPassword(false);
    setEditedInfo({ ...userInfo });
    setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h5" sx={{fontWeight: 'bold', paddingBottom: '0.5em'}} align="left">Tài khoản</Typography>
      
      <div>
        {['name', 'gender', 'phone', 'email', 'address'].map((field) => (
          <div key={field} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">
              <strong>{field === 'name' ? 'Tên người dùng' : field === 'gender' ? 'Giới tính' : field === 'phone' ? 'Số điện thoại' : field === 'email' ? 'Email' : 'Địa chỉ'}:</strong>
            </Typography>
            <Typography variant="body2" style={{ marginLeft: '8px' }}>
              {userInfo[field]}
            </Typography>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'left', marginTop: '16px' }}>
        <Button
          onClick={() => setIsEditing(true)}
          variant="contained"
          color="primary"
          style={{ boxShadow: 'none', padding: '4px 12px', borderRadius: '12px', fontSize: '0.9em', textTransform: 'none' }}
        >
          Chỉnh sửa hồ sơ
        </Button>
        <Button
          onClick={() => setIsChangingPassword(true)}
          variant="outlined"
          color="secondary"
          style={{ boxShadow: 'none', padding: '4px 12px', borderRadius: '12px', fontSize: '0.9em', textTransform: 'none' }}
        >
          Thay đổi mật khẩu
        </Button>
      </div>

      {/* Backdrop for Editing Profile */}
      <Backdrop open={isEditing} onClick={closeBackdrop} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <div style={{ background: 'white', color: 'black', padding: '16px', borderRadius: '16px', maxWidth: '500px', minWidth: '40%' }} onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Typography variant="h6" sx={{ marginBottom: '5px', textAlign:'center'}}>Chỉnh sửa hồ sơ</Typography>
            {Object.entries(editedInfo).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Typography variant="body1">{key === 'name' ? 'Tên người dùng' : key === 'gender' ? 'Giới tính' : key === 'phone' ? 'Số điện thoại' : key === 'email' ? 'Email' : 'Địa chỉ'}</Typography>
                <TextField
                  type={key === 'email' ? 'email' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleChangeProfile}
                  fullWidth
                  variant="outlined"
                  // margin="normal"
                  size="small"
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}>
            <Button onClick={closeBackdrop} variant="outlined" color="default" style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '0.9em', textTransform: 'none', boxShadow: 'none' }}>
              Hủy
            </Button>
            <Button onClick={handleSaveProfile} variant="contained" color="primary" style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '0.9em', textTransform: 'none', boxShadow: 'none' }}>
              Lưu thông tin
            </Button>
          </div>
        </div>
      </Backdrop>

      {/* Backdrop for Changing Password */}
      <Backdrop open={isChangingPassword} onClick={closeBackdrop} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <div style={{ background: 'white', color: 'black', padding: '16px', borderRadius: '16px', maxWidth: '500px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
          <Typography variant="h6" sx={{ marginBottom: '5px', textAlign:'center'}}>Thay đổi mật khẩu</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {['oldPassword', 'newPassword', 'confirmPassword'].map((field) => (
              <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Typography variant="body1">{field === 'oldPassword' ? 'Mật khẩu cũ' : field === 'newPassword' ? 'Mật khẩu mới' : 'Nhập lại mật khẩu mới'}</Typography>
                <TextField
                  type="password"
                  value={passwords[field]}
                  onChange={(e) => setPasswords({
                    ...passwords,
                    [field]: e.target.value
                  })}
                  fullWidth
                  variant="outlined"
                  // margin="normal"
                  size="small"
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}>
            <Button onClick={closeBackdrop} variant="outlined" color="default" style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '0.9em', textTransform: 'none', boxShadow: 'none' }}>
              Hủy
            </Button>
            <Button onClick={handleChangePassword} variant="contained" color="primary" style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '0.9em', textTransform: 'none', boxShadow: 'none' }}>
              Lưu mật khẩu
            </Button>
          </div>
        </div>
      </Backdrop>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ position: 'absolute', top: 16, right: 16 }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%', borderRadius: '20px'}}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Account;
