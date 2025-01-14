import React, { useEffect, useState } from "react";
import "./style.css";
import InvoiceForm from "../../components/InvoiceForm";
import PaymentMethod from "../../components/PaymentMethod";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";

const Payment = () => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    // Gọi API danh sách tỉnh/thành phố
    axios.get("https://provinces.open-api.vn/api/").then((response) => {
      setCities(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      // Gọi API danh sách quận/huyện
      axios
        .get(`https://provinces.open-api.vn/api/d/`, {
          params: { province_code: selectedCity },
        })
        .then((response) => {
          setDistricts(response.data);
          setWards([]); // Xóa danh sách phường/xã khi chọn tỉnh/thành phố mới
        });
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      // Gọi API danh sách phường/xã
      axios
        .get(`https://provinces.open-api.vn/api/w/`, {
          params: { district_code: selectedDistrict },
        })
        .then((response) => {
          setWards(response.data);
        });
    }
  }, [selectedDistrict]);

  return (
    <>
      <Header />
      <section className="mt-36 mb-2">
        <div className="container mx-auto flex flex-col items-center">
          {/* Tiêu đề */}
          <h1 className="text-3xl font-[600] text-center mb-6 shadow-text">
            Thanh toán
          </h1>

          {/* Thanh tiến trình */}
          <div className="flex items-center justify-between w-full max-w-4xl">
            {/* Bước 1 */}
            <div className="flex items-center w-full">
              {/* Nút 1: Dấu tích và màu đỏ nhạt */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-red-300 text-white font-bold">
                  ✓
                </div>
              </div>
              {/* Đường tiến trình từ 1 đến 2: Màu đỏ nhạt */}
              <div className="flex-grow border-t-4 border-red-300 mx-2"></div>

              {/* Nút 2: Màu xanh */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-500 text-white font-bold">
                  2
                </div>
              </div>
              {/* Đường tiến trình từ 2 đến 3: Màu xanh */}
              <div className="flex-grow border-t-4 border-blue-500 mx-2"></div>

              {/* Nút 3: Màu xanh */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-400 text-white font-bold">
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-lg p-6 rounded-lg ml-[5%] mr-[5%] mx-auto mt-5 mb-5 bg-white">
          <h2 className="text-lg font-[600] mb-6 text-left">
            Thông tin đặt hàng
          </h2>
          <form className="space-y-4">
            {/* Họ tên người nhận */}
            <div className="flex items-center">
              <label
                htmlFor="recipientName"
                className="block text-sm font-medium text-left w-1/4"
              >
                Họ tên người nhận <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="recipientName"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                placeholder="Nhập họ tên người nhận"
                required
              />
            </div>

            {/* Số điện thoại */}
            <div className="flex items-center">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-left w-1/4"
              >
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            {/* Tỉnh / Thành phố */}
            <div className="flex items-center">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-left w-1/4"
              >
                Tỉnh / Thành phố <span className="text-red-500">*</span>
              </label>
              <select
                id="city"
                className="w-3/4  border border-gray-300 rounded-md p-2"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                required
              >
                <option value="">Chọn Tỉnh / Thành phố</option>
                {cities.map((city) => (
                  <option key={city.code} value={city.code}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quận / Huyện */}
            <div className="flex items-center">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-left w-1/4"
              >
                Quận / Huyện <span className="text-red-500">*</span>
              </label>
              <select
                id="district"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                required
                disabled={!selectedCity}
              >
                <option value="">Chọn Quận / Huyện</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Phường / Xã */}
            <div className="flex items-center">
              <label
                htmlFor="ward"
                className="block text-sm font-medium text-left w-1/4"
              >
                Phường / Xã <span className="text-red-500">*</span>
              </label>
              <select
                id="ward"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                required
                disabled={!selectedDistrict}
              >
                <option value="">Chọn Phường / Xã</option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Số nhà */}
            <div className="flex items-center">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-left w-1/4"
              >
                Số nhà <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                placeholder="Nhập số nhà"
                required
              />
            </div>
          </form>
          <InvoiceForm />
          <PaymentMethod />

          {/* Tổng tiền và nút Đặt hàng */}
          <div className="mt-8 p-6  rounded-lg bg-white flex flex-col items-end">
            <div className="w-full">
              <table className="w-full text-right mb-6 border-separate border-spacing-y-2">
                <tbody>
                  <tr>
                    <td className="w-[60%]"></td>
                    <td className="text-base text-black text-left w-[20%]">
                      Tổng tiền hàng
                    </td>
                    <td className="text-base font-semibold w-[20%]">
                      400.000đ
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[60%]"></td>
                    <td className="text-base text-black text-left w-[20%]">
                      Phí vận chuyển
                    </td>
                    <td className="text-base font-semibold w-[20%]">0đ</td>
                  </tr>
                  <tr>
                    <td className="w-[60%]"></td>
                    <td className="text-base text-black text-left w-[20%]">
                      Khuyến mại
                    </td>
                    <td className="text-base font-semibold text-red-500 w-[20%]">
                      0đ
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[60%]"></td>
                    <td className="text-lg font-semibold text-left w-[20%]">
                      Tổng thanh toán
                    </td>
                    <td className="text-lg font-semibold text-red-500 w-[20%]">
                      400.000đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Link to={"/success"}>
              <button className="bg-blue-500 text-white w-full px-8 py-3 rounded-lg text-base font-medium">
                Đặt hàng
              </button>
            </Link>
            <p className="text-gray-500 text-sm mt-4 text-left">
              Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân thủ theo điều
              khoản của chúng tôi.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
