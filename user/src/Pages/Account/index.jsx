import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import "./style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Account = () => {
  // State để điều khiển hiển thị form
  const [activePage, setActivePage] = useState("account");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Danh sách tỉnh/thành phố
  const provinces = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
  ];

  // Danh sách quận/huyện (mặc định không phụ thuộc tỉnh)
  const districts = [
    "Quận Ba Đình",
    "Quận Hoàn Kiếm",
    "Quận 1",
    "Quận 2",
    "Quận 3",
  ];

  // Danh sách xã/phường
  const wards = ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5"];

  // Hàm xử lý khi nhấn vào "Hồ sơ"
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-1/5 setting ">
        <ul className="space-y-4">
          <li>
            <a
              href="/Account"
              className={`flex items-center text-black-800 font-[1.5em] ${
                activePage === "account" ? "text-blue-600" : ""
              }`}
              onClick={() => handlePageChange("account")}
            >
              <FaRegUser className="mr-2 text-white bg-blue-500 rounded-full p-2 text-[2em]" />
              Tài khoản
            </a>
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
        </ul>
      </aside>

      {/* Main Content */}

      <div className="w-4/5">
        {activePage === "profile" && (
          <div className="mx-auto bg-white shadow-md rounded-lg p-6 mr-[6%]">
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
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  className="w-3/4 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ml-12"
                />
              </div>

              {/* Số điện thoại */}
              <div className="flex items-center mb-4">
                <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  className="w-3/4 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ml-12"
                />
              </div>

              {/* Email */}
              <div className="flex items-center mb-4">
                <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Nhập email"
                  className="w-3/4 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ml-12"
                />
              </div>

              {/* Giới tính */}
              <div className="flex items-center mb-4">
                <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                  Giới tính
                </label>
                <div className="w-3/4 flex items-center space-x-4 ml-12">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="mr-2 peer"
                    />
                    Nam
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="mr-2"
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

              {/* Tỉnh/Thành phố */}
              <div className="flex items-center mb-4">
                <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                  Tỉnh/Thành phố
                </label>
                <select className="w-3/4 text-left border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ml-12">
                  <option>Chọn tỉnh/thành phố</option>
                  {provinces.map((province, index) => (
                    <option key={index}>{province}</option>
                  ))}
                </select>
              </div>

              {/* Quận/Huyện */}
              <div className="flex items-center mb-4">
                <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                  Quận/Huyện
                </label>
                <select className="w-3/4 text-left border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ml-12">
                  <option>Chọn quận/huyện</option>
                  {districts.map((district, index) => (
                    <option key={index}>{district}</option>
                  ))}
                </select>
              </div>

              {/* Phường/Xã */}
              <div className="flex items-center mb-4">
                <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                  Phường/Xã
                </label>
                <select className="w-3/4 text-left border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ml-12">
                  <option>Chọn phường/xã</option>
                  {wards.map((ward, index) => (
                    <option key={index}>{ward}</option>
                  ))}
                </select>
              </div>

              {/* Số nhà */}
              <div className="flex items-center mb-4">
                <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                  Số nhà
                </label>
                <input
                  type="text"
                  placeholder="Nhập số nhà"
                  className="w-3/4 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ml-12"
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
          <div className="mx-auto bg-white shadow-md rounded-lg p-6 mr-[6%]">
            <h2 className="text-xl font-semibold mb-4 text-left">
              Thêm mật khẩu
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-left">
              Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người
              khác
            </p>
            <div className="border-b border-gray-300 mb-6 "></div>
            <form className="space-y-4">
              {/* Mật khẩu cũ */}
              <div className="flex items-center mb-4">
                <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                  Mật khẩu cũ
                </label>
                <div className="relative w-3/4 ml-12">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu cũ"
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

              {/* Mật khẩu mới */}
              <div className="flex items-center mb-4">
                <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                  Mật khẩu mới
                </label>
                <div className="relative w-3/4 ml-12">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu mới"
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

              {/* Xác nhận mật khẩu */}
              <div className="flex items-center mb-4">
                <label className="w-1/4 text-sm font-medium text-gray-700 text-left">
                  Xác nhận mật khẩu
                </label>
                <div className="relative w-3/4 ml-12">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Xác nhận mật khẩu mới"
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Nút lưu */}
              <div className="flex items-center mb-4">
                <div className="w-1/4 text-sm font-medium text-gray-700 text-left"></div>
                <div className="w-3/4 text-left py-2 ml-12">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
