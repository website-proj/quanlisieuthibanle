import { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./style.css";
import { useParams, useSearchParams } from "react-router-dom";
import SummaryApi, { baseURL } from "../../common/SummaryApi";

const Sidebar = () => {
  const [value, setValue] = useState([10000, 500000]);
  const [subcategories, setSubcategories] = useState([]);
  const { categoryName } = useParams(); // Lấy category từ URL
  const [searchParams] = useSearchParams(); // Lấy các tham số query từ URL
  const parentId = searchParams.get("parentId");
  const categoryId = searchParams.get("categoryId");

  // Hàm format tiền tệ
  const formatCurrency = (num) => num.toLocaleString("vi-VN") + "đ";

  // Gọi API lấy danh mục sản phẩm
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`${baseURL}${SummaryApi.categories.url}`);
        const data = await response.json();

        // Tìm danh mục cha theo `parentId`
        const parentCategory = Object.keys(data)
          .map((parentName) => ({
            name: parentName,
            subcategories: data[parentName],
          }))
          .find((cat) =>
            cat.subcategories.some((sub) => sub.parent_category_id === parentId)
          );

        if (parentCategory) {
          // Lọc danh mục con nếu có `categoryId`
          const filteredSubcategories = categoryId
            ? parentCategory.subcategories.filter(
                (sub) => sub.category_id === categoryId
              )
            : parentCategory.subcategories;

          setSubcategories(filteredSubcategories);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh mục con:", error);
      }
    };

    fetchSubcategories();
  }, [parentId, categoryId]); // Gọi lại khi `parentId` hoặc `categoryId` thay đổi

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
                  <Checkbox checked={sub.category_id === categoryId} />
                  <span className="text-sm">{sub.category_name}</span>
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
