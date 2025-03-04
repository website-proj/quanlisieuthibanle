import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Nhận dữ liệu từ location.state
  const {
    products = [],
    paymentMethod = "Không xác định",
    totalAmount = 0,
  } = location.state || {};

  // Lấy ngày hiện tại
  const date = new Date().toLocaleDateString("vi-VN");

  return (
    <>
      <section className="mt-36 mb-8">
        <div className="container mx-auto flex flex-col items-center">
          <h1 className="text-3xl font-[600] text-center mb-6 shadow-text">
            Hoàn thành!
          </h1>
          {/* Thanh tiến trình */}
          <div className="flex items-center justify-between w-full max-w-4xl">
            <div className="flex items-center w-full">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-red-300 text-white font-bold">
                  ✓
                </div>
              </div>
              <div className="flex-grow border-t-4 border-red-300 mx-2"></div>
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-red-300 text-white font-bold">
                  ✓
                </div>
              </div>
              <div className="flex-grow border-t-4 border-red-300 mx-2"></div>
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-500 text-white font-bold">
                  3
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-3 shadow-lg max-w-4xl bg-white p-4 py-5 rounded-xl mx-auto flex flex-col justify-center items-center gap-5">
            <h1 className="text-2xl font-bold text-center text-cyan-500">
              🎉 Đặt hàng thành công!
            </h1>
            <h2 className="text-xl font-medium text-center">
              Đơn hàng của bạn đã được ghi nhận
            </h2>
            <div className="border rounded-md shadow p-4 mb-6 w-full">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 mr-3"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm !text-left text-gray-500">
                        Số lượng: {product.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p>
                      {(product.price * product.quantity).toLocaleString()}đ
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full max-w-md mx-auto rounded-md p-6 mb-2">
              <div className="flex justify-between items-center pb-2 mb-4">
                <span className="text-base font-medium text-gray-600">
                  Ngày
                </span>
                <span className="text-base font-medium">{date}</span>
              </div>
              <div className="flex justify-between items-center pb-2 mb-4">
                <span className="text-base font-medium text-gray-600">
                  Tổng thanh toán
                </span>
                <span className="text-lg font-bold text-red-500">
                  {totalAmount.toLocaleString()}đ
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-600">
                  Phương pháp thanh toán
                </span>
                <span className="text-base font-medium">{paymentMethod}</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/order")}
              className="w-1/3 bg-blue-500 !rounded-xl text-white py-3 rounded-md text-center font-medium"
            >
              Lịch sử mua hàng
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Success;
