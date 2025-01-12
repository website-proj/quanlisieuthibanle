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

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${baseURL}/api/login`;
      setSnackbarMessage("Đang kết nối với Google...");
      setSnackbarSeverity("info");
    } catch (error) {
      setSnackbarMessage("Lỗi khi kết nối với Google.");
      setSnackbarSeverity("error");
    }
  };

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
