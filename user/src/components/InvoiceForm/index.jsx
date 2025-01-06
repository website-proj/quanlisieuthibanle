import React, { useState } from "react";

function InvoiceForm() {
  const [showForm, setShowForm] = useState(false);

  const handleCheckboxChange = (e) => {
    setShowForm(e.target.checked);
  };

  return (
    <div className="mt-3 rounded-md mx-auto">
      {/* Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="requestInvoice"
          className="mr-2"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="requestInvoice" className="text-sm font-medium">
          Yêu cầu xuất hóa đơn
        </label>
      </div>

      {/* Nội dung ẩn/hiện */}
      {showForm && (
        <div className="mt-4 bg-white rounded-md ">
          {/* Tên công ty */}
          <div className="flex items-center mb-4">
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-left w-1/4"
            >
              Tên công ty <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              className="w-3/4 border border-gray-300 rounded-md p-2"
              placeholder="Nhập tên công ty"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-left w-1/4"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-3/4 border border-gray-300 rounded-md p-2"
              placeholder="Nhập email"
              required
            />
          </div>

          {/* Mã số thuế */}
          <div className="flex items-center mb-4">
            <label
              htmlFor="taxCode"
              className="block text-sm font-medium text-left w-1/4"
            >
              Mã số thuế <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="taxCode"
              className="w-3/4 border border-gray-300 rounded-md p-2"
              placeholder="Nhập mã số thuế"
              required
            />
          </div>

          {/* Địa chỉ công ty */}
          <div className="flex items-center">
            <label
              htmlFor="companyAddress"
              className="block text-sm font-medium text-left w-1/4"
            >
              Địa chỉ công ty <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyAddress"
              className="w-3/4 border border-gray-300 rounded-md p-2"
              placeholder="Nhập địa chỉ công ty"
              required
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceForm;
