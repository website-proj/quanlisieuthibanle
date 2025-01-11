import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import { MyContext } from "../../App";
import Logo from "../../assets/footer/Logo.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { TextField } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import mắt xem

const SignUp = () => {
  const context = useContext(MyContext);

  // State để kiểm soát mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);

  // Hàm để thay đổi trạng thái hiển thị/ẩn mật khẩu
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

            <form className="mt-3">
              <h2 className="text-2xl font-[600] text-left">Đăng ký</h2>

              <div className="flex space-x-6 mt-1 mb-1">
                <div className="flex-1">
                  <div className="form-group">
                    <TextField
                      label="Tên đăng nhập"
                      type="text"
                      required
                      variant="standard"
                      className="w-full text-left"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="form-group">
                    <TextField
                      label="Số điện thoại"
                      type="text"
                      required
                      variant="standard"
                      className="w-full text-left"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <TextField
                  id="standard-basic"
                  label="Email"
                  type="email"
                  required
                  variant="standard"
                  className="w-full text-left"
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
                  <Link to={"/otp"}>
                    <Button className="w-full" variant="contained">
                      Đăng ký
                    </Button>
                  </Link>
                </div>

                <div className="flex-1">
                  <Link to={"/signIn"} className="w-full block">
                    <Button
                      className="w-full"
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

              <h3 className="mt-2 mb-3 text-center font-weight-bold">
                Tiếp tục với Google
              </h3>

              <Button className="loginWithGoogle" variant="outlined">
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
