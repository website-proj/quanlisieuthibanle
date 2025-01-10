import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { BiMessage } from "react-icons/bi";
import { LuHeadphones } from "react-icons/lu";
import { FaListUl } from "react-icons/fa";
import "./style.css";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const Navigation = () => {
  const [activeCategory, setActiveCategory] = useState(null); // Trạng thái danh mục đang mở
  const [isHovered, setIsHovered] = useState(false); // Trạng thái hover tổng thể
  const [categories, setCategories] = useState([]); // Trạng thái danh mục sản phẩm từ API
  const handleCategoryClick = () => {
    setActiveCategory(null); // Đặt trạng thái danh mục đang mở về null
    setIsHovered(false); // Tắt trạng thái hover
  };

  // Gọi API lấy danh mục sản phẩm
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/API/categories.json"); // Thay thế bằng URL API của bạn
        const data = await response.json();
        setCategories(data); // Cập nhật danh mục sản phẩm
      } catch (error) {
        console.error("Lỗi khi tìm danh mục:", error);
      }
    };

    fetchCategories(); // Gọi API khi component được render
  }, []);

  const handleMouseEnter = (category) => {
    setActiveCategory(category); // Hiển thị submenu khi hover
  };

  const handleMouseLeave = () => {
    setActiveCategory(null); // Ẩn submenu khi rời chuột
  };

  return (
    <nav>
      <div className="container mx-auto">
        <div className="flex items-center">
          {/* Part 1 */}
          <div className="container mx-auto relative">
            <div className="flex items-center">
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-2/3 navPart1"
              >
                <div className="relative mt-1">
                  <Button className="!text-black">
                    <span className="mr-2">
                      <FaListUl />
                    </span>
                    <span className="font-[500] text-[1.1em]">
                      Danh mục sản phẩm
                    </span>
                    <span className="ml-2 text-sm">
                      {isHovered ? <FaAngleDown /> : <FaAngleRight />}
                    </span>
                  </Button>

                  {/* Dropdown menu */}
                  <div
                    className={`absolute top-[2.65em] left-16 w-68 bg-white rounded-lg shadow-lg p-2 border border-gray-200 transition-all duration-300 ${
                      isHovered ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  >
                    <ul>
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          className="relative group mb-2"
                          onMouseEnter={() => handleMouseEnter(category.name)}
                          onMouseLeave={handleMouseLeave}
                          onClick={handleCategoryClick} // Ẩn hộp thoại khi nhấp
                        >
                          <Link to={`/products/${category.name}`}>
                            <Button className="w-full !text-black flex items-center navigationMenu group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                              <span className="text-left flex-1 group-hover:text-white">
                                {category.name}
                              </span>
                              <FaAngleRight className="ml-2 group-hover:text-white" />
                            </Button>
                          </Link>
                          {/* Sub-submenu */}
                          <div
                            className={`absolute left-[102.5%] top-0 w-64 bg-white shadow rounded-lg p-2 border border-gray-200 transition-all duration-300 ${
                              activeCategory === category.name
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                            }`}
                          >
                            <ul>
                              {category.subcategories.map((sub, idx) => (
                                <li key={idx} className="mb-2">
                                  <Link to={`/products/${category.name}`}>
                                    <Button className="w-full !text-black text-left nav_menu">
                                      {sub}
                                    </Button>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="5/12"></div> */}

          {/* Part 2 */}
          <div className="w-2/3 flex justify-end items-center mx-[6%]">
            <ul className="flex space-x-10">
              <li>
                <div className="flex items-center h-full">
                  <Link to="/" className="flex items-center gap-2">
                    <BiMessage className="text-xl" />
                    <span className="text-base">Tin tức</span>
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <Link to="#">
                    <Tooltip title="123456789" arrow>
                      <Button className="flex !text-black items-center gap-2 whitespace-nowrap">
                        <LuHeadphones className="text-xl" />
                        <span>Chăm sóc khách hàng</span>
                      </Button>
                    </Tooltip>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
