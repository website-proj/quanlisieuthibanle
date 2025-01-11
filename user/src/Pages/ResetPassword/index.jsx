import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../App";
import Logo from "../../assets/footer/Logo.png";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import mắt xem

const ResetPassword = () => {
  const context = useContext(MyContext);

  // Kiểm tra đầu vào mật khẩu
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Trạng thái ẩn/hiện mật khẩu mới
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Trạng thái ẩn/hiện mật khẩu xác nhận

  // Hàm kiểm tra mật khẩu
  const validatePassword = () => {
    let isValid = true;
    // Kiểm tra mật khẩu có đủ 8 ký tự hay không
    if (password.length < 8) {
      setPasswordError("Mật khẩu phải có ít nhất 8 ký tự.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Kiểm tra 2 mật khẩu có giống nhau không
    if (password !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu xác nhận không khớp.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  // Hàm thay đổi trạng thái ẩn/hiện mật khẩu
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Hàm thay đổi trạng thái ẩn/hiện mật khẩu xác nhận
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Hàm xử lý khi nhấn đổi mật khẩu
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngừng gửi form

    if (validatePassword()) {
      // Nếu mật khẩu hợp lệ, thực hiện hành động đổi mật khẩu
      console.log("Mật khẩu hợp lệ, thực hiện đổi mật khẩu");
    }
  };

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);

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
              class="st0"
              d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
            ></path>
          </svg>
        </div>
        <div className="flex justify-center h-screen">
          <div className="!h-[25em] box card p-3 shadow">
            <div className="text-center">
              <img className=" flex justify-center items-center " src={Logo} />
            </div>

            <form className="mt-3 !p-0" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-[600] text-left">Đổi mật khẩu</h2>

              {/* Mật khẩu với chức năng ẩn/hiện */}
              <div className="form-group relative">
                <TextField
                  id="password"
                  label="Mật khẩu mới"
                  type={showPassword ? "text" : "password"} // Thay đổi type giữa text và password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
                )}
              </div>

              {/* Xác nhận mật khẩu */}
              <div className="form-group relative">
                <TextField
                  id="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type={showConfirmPassword ? "text" : "password"} // Thay đổi type giữa text và password
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  variant="standard"
                  className="w-full text-left"
                />
                <button
                  type="button"
                  onClick={handleToggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
                {confirmPasswordError && (
                  <p className="text-red-500">{confirmPasswordError}</p>
                )}
              </div>

              <div className="flex space-x-6 mt-3 mb-1">
                <div className="flex-1">
                  <Link to={"/signIn"}>
                    <Button
                      className="w-full"
                      variant="contained"
                      type="submit"
                    >
                      Đổi mật khẩu
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

export default ResetPassword;
