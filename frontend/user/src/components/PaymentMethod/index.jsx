import React, { useState } from "react";

const PaymentMethod = ({ selectedMethod, setSelectedMethod }) => {
  const handleChange = (event) => {
    // Lấy giá trị của phương thức thanh toán
    const value = event.target.value;

    // Chỉ cập nhật nếu giá trị là 'Cash', 'Debit Card' hoặc 'Credit Card'
    if (["Cash", "Debit Card", "Credit Card"].includes(value)) {
      setSelectedMethod(value);
    }
  };

  return (
    <div className="bg-white rounded-md mx-auto">
      <h2 className="text-lg font-[600] mt-4 mb-4 text-left">
        Phương thức thanh toán
      </h2>
      <div className="flex space-x-4">
        {/* Lựa chọn phương thức thanh toán */}
        <div className="flex flex-col space-y-3 w-1/2">
          <label className="flex items-center cursor-pointer border rounded-lg p-3 hover:border-black transition duration-200 ease-in-out">
            <input
              type="radio"
              value="Cash"
              name="paymentMethod"
              checked={selectedMethod === "Cash"}
              onChange={handleChange}
              className="form-radio text-black h-5 w-5 mr-3"
            />
            <span className="text-sm font-medium text-gray-500">
              Tiền mặt (Cash)
            </span>
          </label>

          <label className="flex items-center cursor-pointer border rounded-lg p-3 hover:border-black transition duration-200 ease-in-out">
            <input
              type="radio"
              value="Debit Card"
              name="paymentMethod"
              checked={selectedMethod === "Debit Card"}
              onChange={handleChange}
              className="form-radio text-black h-5 w-5 mr-3"
            />
            <span className="text-sm font-medium text-gray-500">
              Thẻ ghi nợ (Debit Card)
            </span>
          </label>

          <label className="flex items-center cursor-pointer border rounded-lg p-3 hover:border-black transition duration-200 ease-in-out">
            <input
              type="radio"
              value="Credit Card"
              name="paymentMethod"
              checked={selectedMethod === "Credit Card"}
              onChange={handleChange}
              className="form-radio text-black h-5 w-5 mr-3"
            />
            <span className="text-sm font-medium text-gray-500">
              Thẻ tín dụng (Credit Card)
            </span>
          </label>
        </div>

        {/* Ghi chú */}
        <div className="w-1/2">
          <textarea
            placeholder="Ghi chú (Nếu có)"
            className="w-full h-full border border-gray-300 rounded-md p-3 resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
