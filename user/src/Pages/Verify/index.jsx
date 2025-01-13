import React, { useState, useContext, useEffect } from "react";
import Logo from "../../assets/footer/Logo.png";
import { MyContext } from "../../App";
import { Button, TextField, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../common/SummaryApi";

const Verify = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const email = location?.state?.email;

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, [context]);

  const handleOtpChange = (e) => {
    setOtp(e.target.value.trim());
  };
  // Tự động ẩn thông báo sau 5 giây
  useEffect(() => {
    if (snackbarMessage) {
      const timer = setTimeout(() => {
        setSnackbarMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [snackbarMessage]);

  const verifyOTP = async (e) => {
    e.preventDefault();

    if (!otp || !email) {
      setSnackbarMessage("Vui lòng nhập mã OTP và email.");
      setSnackbarSeverity("error");
      return;
    }

    try {
      // Truyền tham số qua query string
      const response = await axios.put(
        `http://localhost:8000/api/users/check_code?email=${encodeURIComponent(
          email
        )}&code=${encodeURIComponent(otp)}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Kiểm tra kết quả trả về
      if (response.data === true) {
        setSnackbarMessage("Xác thực thành công!");
        setSnackbarSeverity("success");

        // Lưu email và OTP vào localStorage
        localStorage.setItem("email", email);
        localStorage.setItem("otp", otp);

        navigate("/resetPassword", { state: { email, code: otp } });
      } else {
        setSnackbarMessage("Xác thực thất bại. Vui lòng kiểm tra lại.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      // Xử lý lỗi
      let errorMessage = "Lỗi mạng hoặc máy chủ không phản hồi.";

      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }

      setSnackbarMessage(`Lỗi: ${errorMessage}`);
      setSnackbarSeverity("error");
    }
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
            <path d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"></path>
          </svg>
        </div>
        <div className="flex justify-center h-32">
          <div className="box card p-3 shadow">
            <div className="text-center">
              <img
                className="flex justify-center items-center"
                src={Logo}
                alt="Logo"
              />
            </div>

            <form className="!p-0" onSubmit={verifyOTP}>
              <h3 className="text-left text-[1.3em] text-black mt-4 font-bold">
                Xác nhận email
              </h3>
              <p className="text-left text-[1em] text-black mb-2 mt-4">
                Mã OTP đã được gửi đến email của bạn
              </p>

              <div className="form-group">
                <TextField
                  id="otp"
                  label="Nhập mã OTP"
                  type="text"
                  variant="standard"
                  className="w-full text-left"
                  value={otp}
                  onChange={handleOtpChange}
                />
              </div>

              <div className="flex space-x-6 mt-6 mb-1">
                <div className="flex-1">
                  <Button type="submit" className="w-full" variant="contained">
                    Xác thực OTP
                  </Button>
                </div>
              </div>
            </form>

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

export default Verify;
