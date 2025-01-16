import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import { decodeJwt } from 'jose'; 
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";
import {toast} from 'react-toastify'

function LogIn({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("grant_type", "password");
      formData.append("username", username);
      formData.append("password", password);
      formData.append("scope", "");
      formData.append("client_id", "string");
      formData.append("client_secret", "string");

      const response = await fetch(`${BASE_URL}${ENDPOINTS.login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("jwtToken", data.access_token);

        const decodedToken = decodeJwt(data.access_token);
        console.log(decodedToken)
        if (!decodedToken || !decodedToken.role) {
          setError("Dữ liệu token không hợp lệ.");
          return;
        }

        const currentTime = Math.floor(Date.now() / 1000); 
        if (decodedToken.exp < currentTime) {
          setError("Token đã hết hạn.");
          return;
        }

        const userRole = decodedToken.role;

        if (userRole === "SuperAdmin" || userRole === "Admin") {
          onLogin();
          navigate("/dashboard");
          toast.success('Bạn đã đăng nhập thành công', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          setError("Bạn không có quyền admin.");
        }
      } else {
        setError("Sai tên đăng nhập hoặc mật khẩu.");
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
          padding: "20px",
          backgroundColor: "#f4f4f4",
          borderRadius: "15px",
          boxShadow: 1,
          marginTop: "20px",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
          Admin Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography variant="body2" color="error" sx={{ marginTop: "8px" }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "16px", borderRadius: "15px" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default LogIn;
