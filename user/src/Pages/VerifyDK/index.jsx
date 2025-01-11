import React, { useState, useContext, useEffect } from "react";
import Logo from "../../assets/footer/Logo.png";

import { MyContext } from "../../App";

import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const VerifyDK = () => {
  const context = useContext(MyContext);

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);

  // State để lưu giá trị OTP
  const [otp, setOtp] = useState("");

  // Xử lý khi OTP thay đổi
  const handleOtpChange = (e) => {
    setOtp(e.target.value); // Cập nhật giá trị OTP
  };

  // Hàm xử lý khi nhấn "Xác thực OTP"
  const verifyOTP = (e) => {
    e.preventDefault();
    alert(`OTP nhập vào: ${otp}`);
  };

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
        <div className="flex justify-center h-32">
          <div className="box card p-3 shadow">
            <div className="text-center ">
              <div className="text-center">
                <img
                  className=" flex justify-center items-center "
                  src={Logo}
                />
              </div>
            </div>

            <form className="!p-0">
              <h3 className="text-left text-[1.3em] text-black mt-4 font-bold">
                Mã OTP
              </h3>
              <p className="text-left text-[1em] text-black mb-2 mt-4">
                Mã OTP đã được gửi đến email của bạn
              </p>

              {/* Trường nhập mã OTP */}
              <div className="form-group">
                <TextField
                  id="otp"
                  label="Nhập mã OTP"
                  type="text"
                  variant="standard"
                  className="w-full text-left"
                />
              </div>

              <div className="flex space-x-6 mt-6 mb-1">
                <div className="flex-1">
                  <Link to={"/signIn"} className="w-full mt-4">
                    <Button
                      className="w-full !rounded-[0.625em]"
                      variant="contained"
                    >
                      Xác thực OTP
                    </Button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifyDK;
