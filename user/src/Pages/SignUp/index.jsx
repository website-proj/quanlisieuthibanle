import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import { MyContext } from "../../App";
import Logo from "../../assets/footer/Logo.png";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { TextField } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import mắt xem
import axios from "axios"; // Import axios
import { baseURL } from "../../common/SummaryApi"; // Import base URL từ SummaryApi
import SummaryApi from "../../common/SummaryApi"; // Import SummaryApi

const SignUp = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate(); // Khởi tạo hook useNavigate

  // State để kiểm soát mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  // State để lưu trữ giá trị người dùng nhập vào
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);

  // Hàm để thay đổi trạng thái hiển thị/ẩn mật khẩu
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Hàm xử lý đăng ký
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: SummaryApi.register.method,
        url: baseURL + SummaryApi.register.url,
        data: {
          username,
          email,
          password,
        },
      });

      // Nếu đăng ký thành công, chuyển hướng sang trang OTP
      console.log(response.data); // Bạn có thể thay đổi xử lý ở đây, ví dụ như điều hướng trang hoặc thông báo thành công
      navigate("/otp", { state: { email: email } });
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <>
      <section className="section signInPage signUpPage mt-[-5em]">
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
          <div className="box card p-3 shadow">
            <div className="text-center">
              <img className="flex justify-center items-center" src={Logo} />
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
                  onChange={(e) => setUsername(e.target.value)} // Cập nhật giá trị tên đăng nhập
                />
              </div>

              <div className="form-group">
                <TextField
                  id="standard-basic"
                  label="Email"
                  type="email"
                  required
                  variant="standard"
                  className="w-full text-left"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị email
                />
              </div>

              {/* Mật khẩu với chức năng ẩn/hiện */}
              <div className="form-group relative">
                <TextField
                  id="password"
                  label="Mật khẩu"
                  type={showPassword ? "text" : "password"} // Thay đổi type giữa text và password
                  required
                  variant="standard"
                  className="w-full text-left"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Cập nhật giá trị mật khẩu
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
export default SignUp;
