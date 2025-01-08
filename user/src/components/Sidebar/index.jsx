import { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./style.css";
import { useParams } from "react-router-dom";

const Sidebar = () => {
  const [value, setValue] = useState([10000, 500000]);
  const [subcategories, setSubcategories] = useState([]);
  const { categoryName } = useParams(); // Lấy category từ URL

  // Hàm format tiền tệ
  const formatCurrency = (num) => num.toLocaleString("vi-VN") + "đ";

  useEffect(() => {
    // Fetch dữ liệu subcategories theo categoryName
    fetch("/API/categories.json") // Gọi API từ file JSON
      .then((response) => response.json())
      .then((data) => {
        const category = data.find((item) => item.name === categoryName); // Tìm kiếm category tương ứng
        if (category) {
          setSubcategories(category.subcategories); // Cập nhật subcategories
        } else {
          console.error("Category not found");
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [categoryName]);

  return (
    <div className="col1 bg-white p-2 shadow rounded-lg sideBar">
      {/* Hiển thị danh mục */}
      <div className="mb-8">
        <h6 className="font-medium text-xl mb-2">
          {categoryName || "Danh mục"}
        </h6>
        <div className="pl-5 max-h-44 overflow-y-auto">
          <ul className="space-y-2">
            {subcategories.map((sub, idx) => (
              <li key={idx}>
                <label className="flex items-center space-x-2">
                  <Checkbox />
                  <span className="text-sm">{sub}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Lọc theo giá */}
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
    </div>
  );
};

export default Sidebar;
