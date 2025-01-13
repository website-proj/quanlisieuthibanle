import React, { useState, useContext, useEffect } from "react";
import Logo from "../../assets/footer/Logo.png";
import { MyContext } from "../../App";
import { Button, TextField } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Thêm useLocation và useNavigate
import axios from "axios";
import { baseURL } from "../../common/SummaryApi";
import SummaryApi from "../../common/SummaryApi";
import { Alert } from "@mui/material"; // Thêm Alert để thông báo

const Verify = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation(); // Lấy state từ location (email đã được chuyển từ SignUp)

  const [otp, setOtp] = useState(""); // Lưu giá trị OTP
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Thông báo
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Loại thông báo
  const email = location?.state?.email; // Lấy email từ state của react-router

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);

  const handleOtpChange = (e) => {
    setOtp(e.target.value); // Cập nhật giá trị OTP khi người dùng nhập
  };

  const verifyOTP = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu người dùng chưa nhập mã OTP
    if (!otp) {
      setSnackbarMessage("Vui lòng nhập mã OTP");
      setSnackbarSeverity("error");
      return;
    }

    try {
      // Log tham số để kiểm tra giá trị của email và OTP
      console.log("email:", email);
      console.log("otp:", otp);

      // Log URL được tạo ra để kiểm tra
      console.log(
        `Sending request to: ${baseURL}/api/users/register/check_code`
      );

      // Gửi yêu cầu xác thực OTP tới API, truyền tham số trong query string
      const response = await axios.get(
        `${baseURL}/api/users/register/check_code`,
        {
          params: {
            email: email, // Truyền email dưới dạng query parameter
            code: otp, // Truyền mã OTP dưới dạng query parameter
          },
        }
      );

      // Nếu thành công, hiển thị thông báo và điều hướng người dùng
      setSnackbarMessage("Xác thực thành công!");
      setSnackbarSeverity("success");

      // Điều hướng đến trang đăng nhập hoặc trang tiếp theo
      navigate("/resetPassword", { state: { code } });
    } catch (error) {
      if (error.response) {
        // Nếu có lỗi từ server, hiển thị thông báo lỗi
        setSnackbarMessage(
          `Lỗi: ${error.response.data.detail || "Xác thực thất bại."}`
        );
        setSnackbarSeverity("error");
      } else {
        // Nếu lỗi mạng hoặc server không phản hồi
        setSnackbarMessage("Lỗi mạng hoặc máy chủ không phản hồi.");
        setSnackbarSeverity("error");
      }
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
              <div className="text-center">
                <img className="flex justify-center items-center" src={Logo} />
              </div>
            </div>

            <form className="!p-0" onSubmit={verifyOTP}>
              <h3 className="text-left text-[1.3em] text-black mt-4 font-bold">
                Xác nhận email
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
                  value={otp}
                  onChange={handleOtpChange} // Cập nhật giá trị OTP
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

export default Verify;
