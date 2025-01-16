import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";

const ChangePassword = ({ open, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async () => {
    if (newPassword !== confirmNewPassword) {
      console.log("Passwords do not match.");
      setSnackbarMessage("Mật khẩu xác nhận không khớp.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    try {
      console.log("Sending request to change password...");
      const response = await axios.put(
        `${BASE_URL}${ENDPOINTS.users.changePassword}`,
        {
          old_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
  
      console.log("Response received:", response);
  
      if (response.status === 200) {
        setSnackbarMessage("Đổi mật khẩu thành công.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
  
        // Close the Backdrop after a short delay to allow Snackbar to show
        setTimeout(() => {
          onClose(); // Close the Backdrop
          window.location.reload(); // Reload the page
        }, 1500);
      } else {
        console.log("Unexpected response status:", response.status);
        setSnackbarMessage("Đổi mật khẩu thất bại.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.log("Error during password change request:", error);
      setSnackbarMessage("Lỗi hệ thống. Vui lòng thử lại sau.");
      setSnackbarSeverity("error");
    }
  
    setSnackbarOpen(true);
  };
  
  

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    
  };

  return (
    <Backdrop open={open} onClick={onClose} sx={{ color: "#fff", zIndex: 1300 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "15px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ marginBottom: "16px",}}>Đổi mật khẩu</h2>
        <TextField
          label="Mật khẩu hiện tại"
          type={showCurrentPassword ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  edge="end"
                >
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Mật khẩu mới"
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Xác nhận mật khẩu mới"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{ marginTop: "16px", borderRadius: '15px', boxShadow: 'none', textTransform: 'none', fontSize: '0.9em'  }}
        >
          Đổi mật khẩu
        </Button>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Backdrop>
  );
};

export default ChangePassword;
