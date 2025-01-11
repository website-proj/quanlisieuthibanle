import React, { useContext, useEffect, useState } from "react";

import "./style.css";
import { MyContext } from "../../App";
import Logo from "../../assets/footer/Logo.png";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import mắt xem

const ForgotPassword = () => {
  const context = useContext(MyContext);
  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);
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
      <section className="section signInPage forgot mt-[-5em]">
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
          <div className="box card p-3 shadow ">
            <div className="text-center">
              <img className=" flex justify-center items-center " src={Logo} />
            </div>

            <form className="mt-6 !p-0">
              <h2 className="text-2xl font-[600] text-left">Quên mật khẩu</h2>

              {/* Mật khẩu với chức năng ẩn/hiện */}
              <div className="form-group relative">
                <TextField
                  id="email"
                  label="Email"
                  type={showPassword ? "text" : "password"} // Thay đổi type giữa text và password
                  required
                  variant="standard"
                  className="w-full text-left"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl"
                ></button>
              </div>

              <div className="flex space-x-6 mt-6 mb-1">
                <div className="flex-1">
                  <Link to={"/verify"} className="w-full">
                    <Button
                      className="w-full !rounded-[0.625em]"
                      variant="contained"
                    >
                      Gửi mã OTP
                    </Button>
                  </Link>
                </div>
              </div>
              <p className="text-left mt-5 text-lg">
                Đã có tài khoản?{" "}
                <Link
                  to={"/signIn"}
                  className="font-semibold text-blue-600 hover:text-blue-800"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default ForgotPassword;
