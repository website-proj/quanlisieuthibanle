import React from "react";
import "./style.css";
import InvoiceForm from "../../components/InvoiceForm";

const Payment = () => {
  return (
    <>
      <section className="mt-0 mb-2">
        <div className="container mx-auto flex flex-col items-center">
          {/* Tiêu đề */}
          <h1 className="text-3xl font-[600] text-center mb-6">Thanh toán</h1>

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
        <div className="shadow-lg p-6 rounded-lg ml-[5%] mr-[5%] mx-auto mt-5 bg-white">
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
                Họ tên người nhận *
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
                Số điện thoại *
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
                Tỉnh / Thành phố *
              </label>
              <select
                id="city"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Chọn Tỉnh / Thành phố</option>
                <option value="">Hưng Yên </option>
                <option value="">Hải Dương </option>
                <option value="">Hải Phòng </option>
                <option value="">Quảng Ninh </option>
                <option value="">Nam Định </option>
                <option value="">Thái Bình </option>
                <option value="">Ninh Bình</option>
                <option value="">Hòa Bình </option>

                {/* Thêm các tùy chọn tại đây */}
              </select>
            </div>

            {/* Quận / Huyện */}
            <div className="flex items-center">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-left w-1/4"
              >
                Quận / Huyện *
              </label>
              <select
                id="district"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Chọn Quận / Huyện</option>
                <option value="">Hà Đông</option>
                <option value="">Thanh Xuân </option>
                <option value="">Ba Đình</option>

                {/* Thêm các tùy chọn tại đây */}
              </select>
            </div>

            {/* Phường / Xã */}
            <div className="flex items-center">
              <label
                htmlFor="ward"
                className="block text-sm font-medium text-left w-1/4"
              >
                Phường / Xã *
              </label>
              <select
                id="ward"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Chọn Phường / Xã</option>
                {/* Thêm các tùy chọn tại đây */}
              </select>
            </div>

            {/* Số nhà */}
            <div className="flex items-center">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-left w-1/4"
              >
                Số nhà *
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
        </div>
      </section>
    </>
  );
};
export default Payment;
