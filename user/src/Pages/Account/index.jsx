import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import "./style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbFileSpreadsheet } from "react-icons/tb";
import { Link } from "react-router-dom";
import axios from "axios";
import SummaryApi, { baseURL } from "../../common/SummaryApi";

import { Alert } from "@mui/material";

const Account = () => {
  const [activePage, setActivePage] = useState("profile");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [loading, setLoading] = useState(false);

  // State để lưu dữ liệu form
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Hàm điều khiển form thay đổi mật khẩu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setSnackbarMessage("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      setSnackbarSeverity("error");
      return;
    }

    setLoading(true);
    setSnackbarMessage("");
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setSnackbarMessage("Không tìm thấy token, vui lòng đăng nhập lại.");
        setSnackbarSeverity("error");
        return;
      }

      console.log("Sending request with token:", token); // Debugging line

      const response = await axios.put(
        `${baseURL}${SummaryApi.changePassword.url}`,
        {
          old_password: formData.oldPassword,
          new_password: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSnackbarMessage("Thay đổi mật khẩu thành công!");
        setSnackbarSeverity("success");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error) {
      console.error("Error details:", error); // Debugging line
      setSnackbarMessage(
        error.response?.data?.detail || "Đã xảy ra lỗi. Vui lòng thử lại."
      );
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {snackbarMessage && (
        <Alert
          onClose={() => setSnackbarMessage("")}
          severity={snackbarSeverity}
          sx={{
            width: "auto",
            borderRadius: "20px",
            position: "fixed",
            top: "10em",
            right: "20px",
            zIndex: 9999,
          }}
        >
          {snackbarMessage}
        </Alert>
      )}

      <div className="min-h-screen flex mt-36 mb-4">
        <aside className="w-1/5 setting ">
          <ul className="space-y-4 bg-white shadow p-4 rounded-2xl mr-9">
            <li className="flex items-center text-black-800 font-[1.5em]">
              <FaRegUser className="mr-2 text-white bg-blue-500 rounded-full p-2 text-[2em]" />
              Tài khoản
            </li>
            <li>
              <a
                href="#"
                className={`block text-left ml-10 ${
                  activePage === "profile" ? "text-blue-600" : "text-gray-600"
                } hover:text-blue-600`}
                onClick={() => handlePageChange("profile")}
              >
                Hồ sơ
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block text-left ml-10 ${
                  activePage === "changePassword"
                    ? "text-blue-600"
                    : "text-gray-600"
                } hover:text-blue-600`}
                onClick={() => handlePageChange("changePassword")}
              >
                Đổi mật khẩu
              </a>
            </li>
            <li>
              <Link
                to="/order"
                className="flex items-center text-black-800 font-[1.5em] "
              >
                <TbFileSpreadsheet className="mr-2 text-white bg-blue-500 rounded-full p-2 text-[2em]" />
                Quản lý đơn hàng
              </Link>
            </li>
          </ul>
        </aside>

        <div className="w-4/5 mr-[5%]">
          {activePage === "profile" && (
            <div className="mx-auto bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-left">
                Thông tin tài khoản
              </h2>
              <p className="text-sm text-gray-600 mb-6 text-left">
                Quản lý thông tin hồ sơ để bảo mật tài khoản
              </p>
              <div className="border-b border-gray-300 mb-6 "></div>

              <form className="space-y-4">
                {/* Tên đăng nhập */}
                <div className="flex items-center mb-4">
                  <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                    Tên đăng nhập <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    className="w-3/4 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ml-12"
                    required
                  />
                </div>

                {/* Số điện thoại */}
                <div className="flex items-center mb-4">
                  <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại"
                    className="w-3/4 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ml-12"
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex items-center mb-4">
                  <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Nhập email"
                    className="w-3/4 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ml-12"
                    required
                  />
                </div>

                {/* Giới tính */}
                <div className="flex items-center mb-4">
                  <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                    Giới tính <span className="text-red-500">*</span>
                  </label>
                  <div className="w-3/4 flex items-center space-x-4 ml-12">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="mr-2 peer"
                        required
                      />
                      Nam
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="mr-2"
                        required
                      />
                      Nữ
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        className="mr-2"
                      />
                      Khác
                    </label>
                  </div>
                </div>

                {/* Địa chỉ */}
                <div className="flex items-center mb-4">
                  <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                    Số nhà <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Địa chỉ"
                    className="w-3/4 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ml-12"
                    required
                  />
                </div>

                {/* Nút lưu */}
                <div className="flex items-center mb-4">
                  <div className="w-1/4 text-sm font-medium text-gray-700 text-left"></div>
                  <div className="w-3/4 text-left py-2 ml-12">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {activePage === "changePassword" && (
            <div className="mx-auto bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-left">
                Đổi mật khẩu
              </h2>
              <p className="text-sm text-gray-600 mb-6 text-left">
                Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người
                khác.
              </p>
              <div className="border-b border-gray-300 mb-6 "></div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center mb-4">
                  <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                    Mật khẩu cũ <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-3/4 ml-12">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      name="oldPassword"
                      placeholder="Nhập mật khẩu cũ"
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                    >
                      {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                    Mật khẩu mới <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-3/4 ml-12">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="Nhập mật khẩu mới"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                    Xác nhận mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-3/4 ml-12">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Xác nhận mật khẩu mới"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="w-1/4"></div>
                  <div className="w-3/4 text-left py-2 ml-12">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                    >
                      {loading ? "Đang xử lý..." : "Xác nhận"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
