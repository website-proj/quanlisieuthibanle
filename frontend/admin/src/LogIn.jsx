import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { decodeJwt } from 'jose';
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";
import { toast } from 'react-toastify';
import './LogIn.css'
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
        console.log(decodedToken);
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
    <Box
    sx={{
      position: "relative",
      minHeight: "1f00vh",
      "&::before": {
        position: "absolute",
        content: '""',
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        backgroundImage: `linear-gradient(135deg, #1a37e8 0%, #b08bec 50%, #ffffff 100%), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIHZlcnNpb249IjEu1m0gIjEwMDAgMCA1MDAgMSIgdmlld0NvbnRyb2wiOmlzZGVmPSJodHRwczovL3cL2MgbG9uIHMiL3ggP0cttGAhxcmcuYnByI3hwMW5hPCgUBtex*/')`,
        opacity: 0.9,
        zIndex: -1,
      },
    }}
  >
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "20px",
          position: "relative", // Ensuring the content is above the background
          zIndex: 1, // Keeping content above the background
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "30px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            component="img"
            src="/src/assets/logo.png"
            alt="Admin Logo"
            sx={{
              width: "17em",
              height: "auto",
              display: "block",
              margin: "0 auto 20px",
            }}
          />
          <Typography variant="h6" sx={{ marginBottom: '-0.5em' }}>Tài khoản</Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          />
          <Typography variant="h6" sx={{marginTop: '0.5em', marginBottom: '-0.5em' }}>Mật khẩu</Typography>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          />
          {error && (
            <Box
              sx={{
                color: "error.main",
                marginTop: "8px",
                textAlign: "center",
                fontSize: "0.875rem",
              }}
            >
              {error}
            </Box>
          )}
<Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: "30px",
                borderRadius: "15px",
                padding: "12px",
                boxShadow: 'none',
                textTransform: 'none',
                fontSize: '1em'
              }}
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>

        </Box>
      </Box>
    </Container>
  </Box>
  
  );
}

export default LogIn;