import { jwtVerify } from 'jose';
import React, { useState } from 'react';
import { Backdrop, DialogActions, DialogContent, IconButton, TextField, Snackbar, Alert, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  // Function to verify the email in JWT
  const getEmailFromJWT = async (jwtToken) => {
    try {
      const { payload } = await jwtVerify(jwtToken, new TextEncoder().encode('your-secret-key')); // Replace with your secret key if you have one
      return payload.email; // Assuming the email is stored in the payload of the JWT
    } catch (error) {
      console.error("JWT verification failed", error);
      return null;
    }
  };

  // Handle form submission (editing user details)
  const handleSubmit = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        throw new Error("No JWT token found");
      }

      // Get the email from the JWT
      const emailFromJWT = await getEmailFromJWT(jwtToken);

      // Compare the email in JWT with the one in the user data
      if (emailFromJWT !== userInfo.email) {
        throw new Error("Email mismatch: Cannot update profile");
      }

      const requestBody = {
        user_id: editedInfo.id,
        username: editedInfo.username,
        email: editedInfo.email,
        phone_number: editedInfo.phone,
        address: editedInfo.address,
        gender: editedInfo.gender,
        membership_status: editedInfo.membership_status
      };

      console.log('Sending request with body:', requestBody);

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

      setSnackbarMessage("Cập nhật thông tin người dùng thành công!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        closeBackdrop();
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error updating user:', error);
      setSnackbarMessage(error.message || "Có lỗi xảy ra khi cập nhật thông tin");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h5" sx={{fontWeight: 'bold', paddingBottom: '0.5em'}} align="left">Tài khoản</Typography>
      {/* Other JSX components for displaying and editing the account */}
      
      {/* Button for handling profile submit */}
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Lưu thông tin
      </Button>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ position: 'absolute', top: 16, right: 16 }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%', borderRadius: '20px' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Account;
