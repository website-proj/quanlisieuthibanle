import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../App";
import Logo from "../../assets/footer/Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios"; // Đảm bảo bạn đã cài đặt axios

const ResetPassword = () => {
  const context = useContext(MyContext);
  const location = useLocation(); // Lấy thông tin từ state

  const { email, code } = location.state || {}; // Email và mã OTP từ trang trước

  // Kiểm tra đầu vào mật khẩu
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Trạng thái ẩn/hiện mật khẩu mới
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Trạng thái ẩn/hiện mật khẩu xác nhận
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Thông báo
  const [snackbarSeverity, setSnackbarSeverity] = useState(""); // Mức độ thông báo (success, error)

  // Hàm kiểm tra mật khẩu
  const validatePassword = () => {
    let isValid = true;
    // Kiểm tra mật khẩu có đủ 8 ký tự hay không
    if (password.length < 8) {
      setPasswordError("Mật khẩu phải có ít nhất 8 ký tự.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Kiểm tra 2 mật khẩu có giống nhau không
    if (password !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu xác nhận không khớp.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  // Hàm thay đổi trạng thái ẩn/hiện mật khẩu
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Hàm thay đổi trạng thái ẩn/hiện mật khẩu xác nhận
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Hàm xử lý khi nhấn đổi mật khẩu
  const navigate = useNavigate(); // useNavigate được gọi trong Function Component
  // Tự động ẩn thông báo sau 5 giây
  useEffect(() => {
    if (snackbarMessage) {
      const timer = setTimeout(() => {
        setSnackbarMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [snackbarMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngừng gửi form

    // Lấy thông tin từ input và state
    const password = document.getElementById("password").value;
    const { email, code: otp } = location.state || {};

    if (!email || !otp || !password) {
      console.error("Email, OTP hoặc mật khẩu không hợp lệ");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/resetPassword`,
        {},
        {
          params: {
            email,
            code: otp,
            password,
          },
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.message === "reset_password success") {
        navigate("/signIn"); // Chuyển hướng tới trang đăng nhập
      } else {
        console.error("Đổi mật khẩu thất bại.");
      }
    } catch (error) {
      console.error("API Error:", error.message);
    }
  };

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);

  return (
    <>
      <section className="section signInPage forgot mt-[-5em]">
        <div className="shape-bottom">
          <svg
            fill="#fff"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 1921 819.8"
            style={{ enableBackground: "new 0 0 1921 819.8" }}
          >
            <path
              className="st0"
              d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
            ></path>
          </svg>
        </div>
        <div className="flex justify-center h-screen">
          <div className="!h-[25em] box card p-3 shadow">
            <div className="text-center">
              <img className=" flex justify-center items-center " src={Logo} />
            </div>

            <form className="mt-3 !p-0" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-[600] text-left">
                Đặt lại mật khẩu
              </h2>

              {/* Mật khẩu với chức năng ẩn/hiện */}
              <div className="form-group relative">
                <TextField
                  id="password"
                  label="Mật khẩu mới"
                  type={showPassword ? "text" : "password"} // Thay đổi type giữa text và password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant="standard"
                  className="w-full text-left"
                />
                <button
                  type="button"
                  onClick={handleTogglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
                )}
              </div>

              {/* Xác nhận mật khẩu */}
              <div className="form-group relative">
                <TextField
                  id="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type={showConfirmPassword ? "text" : "password"} // Thay đổi type giữa text và password
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  variant="standard"
                  className="w-full text-left"
                />
                <button
                  type="button"
                  onClick={handleToggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
                {confirmPasswordError && (
                  <p className="text-red-500">{confirmPasswordError}</p>
                )}
              </div>

              <div className="flex space-x-6 mt-3 mb-1">
                <div className="flex-1">
                  <Button
                    className="w-full !rounded-[0.625em]"
                    variant="contained"
                    type="submit"
                  >
                    Đổi mật khẩu
                  </Button>
                </div>
              </div>
            </form>

            {/* Hiển thị thông báo */}
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
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
