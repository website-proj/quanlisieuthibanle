import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../../App";
import "./style.css";
import Logo from "../../assets/footer/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { TextField } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { baseURL } from "../../common/SummaryApi";
import SummaryApi from "../../common/SummaryApi";
import { Alert } from "@mui/material";

const SignUp = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [snackbarMessage, setSnackbarMessage] = useState(""); // Thêm state này
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Thêm state này

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseURL}${SummaryApi.register.url}`,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSnackbarMessage("Đăng ký thành công!");
      setSnackbarSeverity("success");

      navigate("/otp", { state: { email } });
    } catch (error) {
      if (error.response) {
        setSnackbarMessage(
          `Lỗi: ${error.response.data.detail || "Đăng ký thất bại."}`
        );
        setSnackbarSeverity("error");
      } else {
        setSnackbarMessage("Lỗi mạng hoặc máy chủ không phản hồi.");
        setSnackbarSeverity("error");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      // Nếu đã lưu token, điều hướng người dùng đến trang Home
      window.location.href = `${baseURL}/api/login/token=${storedToken}`;
      return;
    }

    try {
      // Nếu chưa có token, thực hiện xác thực qua Google
      window.location.href = `${baseURL}/api/login/`;
      setSnackbarMessage("Đang kết nối với Google...");
      setSnackbarSeverity("info");
    } catch (error) {
      setSnackbarMessage("Lỗi khi kết nối với Google.");
      setSnackbarSeverity("error");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleResponse = urlParams.get("google_response");

    if (googleResponse) {
      // Giả sử phản hồi từ Google là token, lưu token vào localStorage
      const token = decodeURIComponent(googleResponse);

      // Lưu token vào localStorage
      localStorage.setItem("token", token);

      // Điều hướng đến trang Home
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Người dùng đã đăng nhập, điều hướng đến Home
      navigate("/home");
    } else {
      // Hiển thị giao diện đăng nhập
      context.setisHeaderFooterShow(false);
    }
  }, []);

  return (
    <>
      <section className="section signInPage signUpPage mt-[-5em]">
        <div className="shape-bottom">
          <svg
            fill="#fff"
            viewBox="0 0 1921 819.8"
            style={{ enableBackground: "new 0 0 1921 819.8" }}
          >
            <path d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"></path>
          </svg>
        </div>
        <div className="flex justify-center h-screen">
          <div className="box card p-3 shadow">
            <div className="text-center">
              <img src={Logo} />
            </div>

            <form className="mt-3" onSubmit={handleSignUp}>
              <h2 className="text-2xl font-[600] text-left mb-1">Đăng ký</h2>

              <div className="form-group">
                <TextField
                  label="Tên đăng nhập"
                  type="text"
                  required
                  variant="standard"
                  className="w-full text-left"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <TextField
                  label="Email"
                  type="email"
                  required
                  variant="standard"
                  className="w-full text-left"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group relative">
                <TextField
                  label="Mật khẩu"
                  type={showPassword ? "text" : "password"}
                  required
                  variant="standard"
                  className="w-full text-left"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleTogglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>

              <div className="flex space-x-6 mt-1 mb-1">
                <div className="flex-1">
                  <Button
                    type="submit"
                    className="w-full !rounded-[0.625em]"
                    variant="contained"
                  >
                    Đăng ký
                  </Button>
                </div>

                <div className="flex-1">
                  <Link to={"/signIn"} className="w-full block">
                    <Button
                      className="w-full !rounded-[0.625em]"
                      variant="outlined"
                      onClick={() => context.setisHeaderFooterShow(true)}
                    >
                      Hủy
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="hrLine mt-8">
                <div className="orText">Hoặc</div>
              </div>

              <h3 className="mb-3 text-center font-weight-bold">
                Tiếp tục với Google
              </h3>

              <Button
                className="loginWithGoogle !rounded-[0.625em]"
                variant="outlined"
                onClick={handleGoogleLogin}
              >
                <FcGoogle className="text-[1.5em] mr-[0.5em]" /> Đăng nhập bằng
                Google
              </Button>
            </form>
          </div>
          {snackbarMessage && (
            <Alert
              onClose={() => setSnackbarMessage("")}
              severity={snackbarSeverity}
              sx={{
                width: "auto",
                borderRadius: "20px",
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 9999,
              }}
            >
              {snackbarMessage}
            </Alert>
          )}
        </div>
      </section>
    </>
  );
};

export default SignUp;
