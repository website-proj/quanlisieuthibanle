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

const SignIn = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // Email nhập từ người dùng
  const [password, setPassword] = useState(""); // Mật khẩu nhập từ người dùng
  const [showPassword, setShowPassword] = useState(false); // Ẩn/hiện mật khẩu
  const [errorMessage, setErrorMessage] = useState(null); // Lưu lỗi nếu có

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);

  // Hàm để thay đổi trạng thái hiển thị/ẩn mật khẩu
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Hàm xử lý đăng nhập
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu đăng nhập tới API
      const response = await axios.post(
        `${baseURL}${SummaryApi.signIn.url}`,
        new URLSearchParams({
          username: email, // Truyền email vào username (theo yêu cầu backend)
          password: password, // Truyền mật khẩu
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Xử lý thành công
      const { access_token, token_type } = response.data;

      // Lưu token vào localStorage hoặc context để sử dụng cho các API tiếp theo
      localStorage.setItem("token", `${token_type} ${access_token}`);

      // Chuyển hướng người dùng tới trang home
      navigate("/home");
    } catch (error) {
      if (error.response) {
        // Hiển thị lỗi từ server
        setErrorMessage(error.response.data.detail || "Đăng nhập thất bại.");
      } else {
        // Hiển thị lỗi mạng
        setErrorMessage("Lỗi mạng hoặc máy chủ không phản hồi.");
      }
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
              >
                <FcGoogle className="text-[1.5em] mr-[0.5em]" /> Đăng nhập bằng
                Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
