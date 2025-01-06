import React, { useState, useContext, useEffect } from "react";
import OTP from "../../assets/images/Verify.png";
import "./style.css";
import { MyContext } from "../../App";

import OtpBox from "../../components/OtpBox";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Verify = () => {
  const context = useContext(MyContext);

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);
  const [otp, setOtp] = useState("");
  const handleOtpChange = (value) => {
    setOtp(value);
  };
  const verifyOTP = (e) => {
    e.preventDefault();
    alert(otp);
  };

  return (
    <>
      <section className="section signInPage mt-[-5em]">
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
        <div className="container ">
          <div className="card shadow-md w-[25em] m-auto rounded-md bg-slate-100 p-5 px-10">
            <div className="text-center flex items-center justify-center">
              <img src={OTP} className="w-[50%] " />
            </div>
            <h3 className="text-center text-[1.3em] text-black mt-4 mb-5 font-bold">
              Mã OTP
            </h3>
            <p className="text-center text-[1em] text-black mt-4 mb-5">
              Mã OTP đã được gửi đến email của bạn
            </p>

            <form onSubmit={verifyOTP}>
              <OtpBox length={6} onChange={handleOtpChange} />

              <div className="flex items-center justify-center mt-5">
                <Link to={"/forgotPassword"} className="w-full">
                  <Button className="w-full" variant="contained">
                    Xác thực OTP
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Verify;
