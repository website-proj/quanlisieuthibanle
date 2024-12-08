import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BiMessage } from "react-icons/bi";
import { LuHeadphones } from "react-icons/lu";
import { FaListUl } from "react-icons/fa";
import "./style.css";
import Button from "@mui/material/Button";

const Navigation = () => {
  const [isopenSidebarVal, setisopenSidebarVal] = useState(false);

  return (
    <nav>
      <div className="container mx-auto">
        <div className="flex items-center">
          {/* Part 1 */}
          <div className="w-1/3 navPart1">
            <div className="relative mt-1">
              <Button
                // Căn margin trái/phải ra khoảng 10%

                onClick={() => setisopenSidebarVal(!isopenSidebarVal)}
              >
                <span className="mr-2">
                  <FaListUl />
                </span>
                <span className="font-semibold">Danh mục sản phẩm</span>
                <span className="ml-2 text-sm">
                  {isopenSidebarVal ? <FaAngleDown /> : <FaAngleRight />}
                </span>
              </Button>
              <div
                className={`absolute top-[119%] left-[10%] w-[60%] bg-white p-2 border border-gray-200 transition-all duration-200 z-10 ${
                  isopenSidebarVal
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                <ul>
                  {/* Category List */}
                  {[
                    "Thực phẩm",
                    "Đồ uống",
                    "Bánh kẹo & Đồ ăn nhẹ",
                    "Hóa mỹ phẩm",
                    "Gia dụng & Đồ dùng nhà bếp",
                    "Gia vị",
                    "Chăm sóc bé",
                    "Sách và văn phòng phẩm",
                    "Sản phẩm vệ sinh nhà cửa",
                  ].map((category, index) => (
                    <li key={index} className="group mb-2 relative">
                      <Link to="/products">
                        <Button className="w-full flex items-center justify-between">
                          <span className="text-left">{category}</span>
                          <FaAngleRight className="ml-auto mr-[8%]" />
                        </Button>
                      </Link>
                      <div className="absolute left-full top-0 w-[250px] bg-white p-3 border-0 border-gray-200 opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible">
                        {/* Submenu items */}
                        {category === "Thực phẩm" && (
                          <>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Rau củ quả
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Thịt & Hải sản
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Đồ đông lạnh
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Thực phẩm khô
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Đồ hộp
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Đồ uống" && (
                          <>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Nước giải khát
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Sữa & các sản phẩm từ sữa
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Đồ uống có cồn
                              </Button>
                            </Link>
                          </>
                        )}
                        {/* Add more submenu categories here */}
                        {category === "Bánh kẹo & Đồ ăn nhẹ" && (
                          <>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Bánh kẹo
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Đồ ăn nhẹ
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Hóa mỹ phẩm" && (
                          <>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Chăm sóc cá nhân
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Chăm sóc da
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Chăm sóc tóc
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Trang điểm
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Gia dụng & Đồ dùng nhà bếp" && (
                          <>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Đồ dùng nhà bếp
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Thiết bị điện gia dụng
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Đồ dùng dọn dẹp
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Gia vị" && (
                          <>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Dầu ăn
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Nước chấm và nước mắm
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Nước tương (xì dầu)
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Hạt nêm
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Tương các loại
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Chăm sóc bé" && (
                          <>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Sản phẩm cho bé
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Đồ chơi trẻ em
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Sách và văn phòng phẩm" && (
                          <>
                            <Link to="/products">
                              <Button className="w-full text-left">Sách</Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Văn phòng phẩm
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Sản phẩm vệ sinh nhà cửa" && (
                          <>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Chất tẩy rửa
                              </Button>
                            </Link>
                            <Link to="/products">
                              <Button className="w-full text-left">
                                Dụng cụ vệ sinh
                              </Button>
                            </Link>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="w-5/12"></div>

          {/* Part 2 */}
          <div className=" w-1/4 flex justify-end items-center mx-[6%]">
            <ul className="flex space-x-10">
              <li>
                <div className="flex items-center">
                  <Link to="/">
                    <BiMessage className="text-xl" />
                  </Link>
                  <span className="ml-2">Tin tức</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <Link to="#">
                    <LuHeadphones className="text-xl" />
                  </Link>
                  <span className="ml-2">Chăm sóc khách hàng</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="w-full h-1 bg-[#2bbef9] my-0 mx-auto"></div> */}
    </nav>
  );
};

export default Navigation;
