import { useState } from "react";
import { Checkbox } from "@mui/material";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./style.css";

const Sidebar = () => {
  const [value, setValue] = useState([10000, 500000]);

  // Hàm format tiền tệ
  const formatCurrency = (num) => {
    return num.toLocaleString("vi-VN") + "đ";
  };

  return (
    <>
      <div className=" col1 bg-gray-100 rounded-lg sideBar">
        {/* Filter Box - Sữa các loại */}
        <div className="mb-8">
          <h6 className="font-medium text-xl mb-2">SỮA CÁC LOẠI</h6>
          <div className="pl-5 max-h-44 ">
            <ul className="space-y-2">
              {["Sữa tươi", "Sữa bột", "Sữa đặc", "Sữa chua"].map(
                (item, index) => (
                  <li key={index}>
                    <label className="flex items-center space-x-2">
                      <Checkbox />
                      <span className="text-sm">{item}</span>
                    </label>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Filter Box - Lọc theo giá */}
        <div className="mb-8">
          <h6 className="font-medium text-xl mb-2">LỌC THEO GIÁ</h6>
          <RangeSlider
            value={value}
            onInput={setValue}
            min={10000}
            max={500000}
            step={10000}
          />
          <div className="flex justify-between text-sm pt-2">
            <span>
              Từ:{" "}
              <strong className="text-black">{formatCurrency(value[0])}</strong>
            </span>
            <span>
              Đến:{" "}
              <strong className="text-black">{formatCurrency(value[1])}</strong>
            </span>
          </div>
        </div>

        {/* Filter Box - Thương hiệu */}
      </div>
    </>
  );
};

export default Sidebar;
