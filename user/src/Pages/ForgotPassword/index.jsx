import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { MyContext } from "../../App";
import Logo from "../../assets/footer/Logo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import SummaryApi, { baseURL } from "../../common/SummaryApi";

const ForgotPassword = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // Email nhập từ người dùng
  const [errorMessage, setErrorMessage] = useState(null); // Lưu lỗi nếu có
  const [successMessage, setSuccessMessage] = useState(null); // Lưu thông báo thành công

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);

  // Hàm xử lý gửi mã OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

    try {
      // Gọi API gửi mã OTP
      const decodedEmail = decodeURIComponent(email);

      // Gọi API gửi mã OTP
      const response = await axios.put(
        `${baseURL}${SummaryApi.forgot_password.url}`,
        null, // Không có body, chỉ gửi query param
        {
          params: { email: decodedEmail }, // Truyền email đã giải mã qua query param
        }
      );

      // Hiển thị thông báo thành công
      setSuccessMessage("Mã OTP đã được gửi đến email của bạn.");
      setErrorMessage(null);

      // Điều hướng người dùng tới trang xác minh (nếu cần)
      navigate("/verify", { state: { email } });
    } catch (error) {
      if (error.response) {
        // Hiển thị lỗi từ server
        setErrorMessage(error.response.data.detail || "Gửi mã OTP thất bại.");
        setSuccessMessage(null);
      } else {
        // Hiển thị lỗi mạng
        setErrorMessage("Lỗi mạng hoặc máy chủ không phản hồi.");
        setSuccessMessage(null);
      }
    }
  };

  return (
    <>
      <section className="section signInPage forgot mt-[-5em]">
        <div className="flex justify-center h-screen">
          <div className="box card p-3 shadow">
            <div className="text-center">
              <img
                className="flex justify-center items-center"
                src={Logo}
                alt="Logo"
              />
            </div>

            <form className="mt-6 !p-0" onSubmit={handleSendOTP}>
              <h2 className="text-2xl font-[600] text-left">Quên mật khẩu</h2>

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-green-500 text-sm">{successMessage}</p>
              )}

              <div className="form-group relative">
                <TextField
                  id="email"
                  label="Email"
                  type="email" // Email input
                  required
                  variant="standard"
                  className="w-full text-left"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Cập nhật email state
                />
              </div>

              <div className="flex space-x-6 mt-6 mb-1">
                <div className="flex-1">
                  <Button
                    type="submit"
                    className="w-full !rounded-[0.625em]"
                    variant="contained"
                  >
                    Gửi mã OTP
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
