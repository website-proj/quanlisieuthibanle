import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { MyContext } from "../../App";
import Logo from "../../assets/footer/Logo.png";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import SummaryApi, { baseURL } from "../../common/SummaryApi";
import Alert from "@mui/material/Alert";

const SignIn = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [snackbarMessage, setSnackbarMessage] = useState(""); // Thông báo snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Mức độ nghiêm trọng

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

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleResponse = urlParams.get("google_response");

    if (googleResponse) {
      const userData = JSON.parse(decodeURIComponent(googleResponse));

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("user_data", JSON.stringify(userData));

      // Điều hướng đến trang Home
      navigate("/home");
    }
  }, []);
  useEffect(() => {
    const userData = localStorage.getItem("user_data");

    if (userData) {
      // Người dùng đã đăng nhập, điều hướng đến Home
      navigate("/home");
    } else {
      // Hiển thị giao diện đăng nhập
      context.setisHeaderFooterShow(false);
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}${SummaryApi.signIn.url}`,
        new URLSearchParams({
          username: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // const handleForgotPassword = async () => {
      //   try {
      //     const response = await axios.put(
      //       `${baseURL}/get_code_forgotPassword`,
      //       new URLSearchParams({
      //         email: email, // email từ trường nhập
      //       }),
      //       {
      //         headers: {
      //           "Content-Type": "application/x-www-form-urlencoded",
      //         },
      //       }
      //     );

      //     setSnackbarMessage("Gửi mã xác nhận thành công!");
      //     setSnackbarSeverity("success");
      //   } catch (error) {
      //     setSnackbarMessage(
      //       error.response?.data?.detail || "Lỗi khi gửi mã xác nhận."
      //     );
      //     setSnackbarSeverity("error");
      //   }
      // };

      const { access_token, token_type } = response.data;
      localStorage.setItem("token", `${token_type} ${access_token}`);
      setSnackbarMessage("Đăng nhập thành công!");
      setSnackbarSeverity("success");
      navigate("/home");
    } catch (error) {
      if (error.response) {
        setSnackbarMessage(error.response.data.detail || "Đăng nhập thất bại.");
      } else {
        setSnackbarMessage("Lỗi mạng hoặc máy chủ không phản hồi.");
      }
      setSnackbarSeverity("error");
    }
  };

  return (
    <>
      <section className="section signInPage signUpPage mt-[-5em]">
        <div class="shape-bottom">
          {" "}
          <svg
            fill="#fff"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 1921 819.8"
            style={{ enableBackground: "new 0 0 1921 819.8" }}
          >
            {" "}
            <path
              class="st0"
              d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
            ></path>{" "}
          </svg>
        </div>
        <div className="flex justify-center h-screen">
          <div className="box card p-3">
            <div className="text-center">
              <img
                className="flex justify-center items-center"
                src={Logo}
                alt="Logo"
              />
            </div>

            <form className="mt-3" onSubmit={handleSignIn}>
              <h2 className="text-2xl font-[600] text-left">Đăng nhập</h2>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <div className="form-group">
                <TextField
                  id="email"
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
                  id="password"
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
                <Button
                  type="submit"
                  className="w-full !rounded-[0.625em] mt-2"
                  variant="contained"
                >
                  Đăng nhập
                </Button>
              </div>
              <Link
                to="/forgotPassword"
                className="border-effect cursor text-left"
              >
                Quên mật khẩu?
              </Link>

              <div className="hrLine mt-8">
                <div className="orText">Hoặc</div>
              </div>
              <Link
                to="/signUp"
                className="border-effect cursor text-left font-weight-bold"
              >
                Đăng ký
              </Link>
              <h3 className="mt-2 mb-3 text-center font-weight-bold">
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
        </div>
      </section>

      {/* Hiển thị Alert */}
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
    </>
  );
};

export default SignIn;
