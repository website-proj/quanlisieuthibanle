// import { FaAngleDown, FaAngleRight } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { BiMessage } from "react-icons/bi";
// import { LuHeadphones } from "react-icons/lu";
// import { FaListUl } from "react-icons/fa";
// import "./style.css";
// import Button from "@mui/material/Button";

// const Navigation = () => {
//   const [isopenSidebarVal, setisopenSidebarVal] = useState(false);

//   return (
//     <nav>
//       <div className="container mx-auto">
//         <div className="flex items-center">
//           {/* Part 1 */}
//           <div className="w-1/3 navPart1">
//             <div className="relative mt-1">
//               <Button
//                 // Căn margin trái/phải ra khoảng 10%

//                 onClick={() => setisopenSidebarVal(!isopenSidebarVal)}
//               >
//                 <span className="mr-2">
//                   <FaListUl />
//                 </span>
//                 <span className="font-semibold">Danh mục sản phẩm</span>
//                 <span className="ml-2 text-sm">
//                   {isopenSidebarVal ? <FaAngleDown /> : <FaAngleRight />}
//                 </span>
//               </Button>
//               <div
//                 className={`absolute top-[119%] left-[10%] w-[60%] bg-white p-2 border border-gray-200 transition-all duration-200 z-10 ${
//                   isopenSidebarVal
//                     ? "opacity-100 visible"
//                     : "opacity-0 invisible"
//                 }`}
//               >
//                 <ul>
//                   {/* Category List */}
//                   {[
//                     "Thực phẩm",
//                     "Đồ uống",
//                     "Bánh kẹo & Đồ ăn nhẹ",
//                     "Hóa mỹ phẩm",
//                     "Gia dụng & Đồ dùng nhà bếp",
//                     "Gia vị",
//                     "Chăm sóc bé",
//                     "Sách và văn phòng phẩm",
//                     "Sản phẩm vệ sinh nhà cửa",
//                   ].map((category, index) => (
//                     <li key={index} className="group mb-2 relative">
//                       <Link to="/products">
//                         <Button className="w-full flex items-center justify-between">
//                           <span className="text-left">{category}</span>
//                           <FaAngleRight className="ml-auto mr-[8%]" />
//                         </Button>
//                       </Link>
//                       <div className="absolute left-full top-0 w-[250px] bg-white p-3 border-0 border-gray-200 opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible">
//                         {/* Submenu items */}
//                         {category === "Thực phẩm" && (
//                           <>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Rau củ quả
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Thịt & Hải sản
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Đồ đông lạnh
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Thực phẩm khô
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Đồ hộp
//                               </Button>
//                             </Link>
//                           </>
//                         )}
//                         {category === "Đồ uống" && (
//                           <>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Nước giải khát
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Sữa & các sản phẩm từ sữa
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Đồ uống có cồn
//                               </Button>
//                             </Link>
//                           </>
//                         )}
//                         {/* Add more submenu categories here */}
//                         {category === "Bánh kẹo & Đồ ăn nhẹ" && (
//                           <>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Bánh kẹo
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Đồ ăn nhẹ
//                               </Button>
//                             </Link>
//                           </>
//                         )}
//                         {category === "Hóa mỹ phẩm" && (
//                           <>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Chăm sóc cá nhân
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Chăm sóc da
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Chăm sóc tóc
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Trang điểm
//                               </Button>
//                             </Link>
//                           </>
//                         )}
//                         {category === "Gia dụng & Đồ dùng nhà bếp" && (
//                           <>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Đồ dùng nhà bếp
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Thiết bị điện gia dụng
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Đồ dùng dọn dẹp
//                               </Button>
//                             </Link>
//                           </>
//                         )}
//                         {category === "Gia vị" && (
//                           <>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Dầu ăn
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Nước chấm và nước mắm
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Nước tương (xì dầu)
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Hạt nêm
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Tương các loại
//                               </Button>
//                             </Link>
//                           </>
//                         )}
//                         {category === "Chăm sóc bé" && (
//                           <>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Sản phẩm cho bé
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Đồ chơi trẻ em
//                               </Button>
//                             </Link>
//                           </>
//                         )}
//                         {category === "Sách và văn phòng phẩm" && (
//                           <>
//                             <Link to="/products">
//                               <Button className="w-full text-left">Sách</Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Văn phòng phẩm
//                               </Button>
//                             </Link>
//                           </>
//                         )}
//                         {category === "Sản phẩm vệ sinh nhà cửa" && (
//                           <>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Chất tẩy rửa
//                               </Button>
//                             </Link>
//                             <Link to="/products">
//                               <Button className="w-full text-left">
//                                 Dụng cụ vệ sinh
//                               </Button>
//                             </Link>
//                           </>
//                         )}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="w-5/12"></div>

//           {/* Part 2 */}
//           <div className=" w-1/4 flex justify-end items-center mx-[6%]">
//             <ul className="flex space-x-10">
//               <li>
//                 <div className="flex items-center">
//                   <Link to="/">
//                     <BiMessage className="text-xl" />
//                   </Link>
//                   <span className="ml-2">Tin tức</span>
//                 </div>
//               </li>
//               <li>
//                 <div className="flex items-center">
//                   <Link to="#">
//                     <LuHeadphones className="text-xl" />
//                   </Link>
//                   <span className="ml-2">Chăm sóc khách hàng</span>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* <div className="w-full h-1 bg-[#2bbef9] my-0 mx-auto"></div> */}
//     </nav>
//   );
// };

// export default Navigation;

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
  const [isopenSidebarVal, setisopenSidebarVal] = useState(false);
  const sidebarRef = useRef(null); // Tạo một ref để tham chiếu tới sidebar
  const buttonRef = useRef(null); // Tạo một ref để tham chiếu tới button

  // Hàm xử lý khi chọn một mục
  const handleCategoryClick = () => {
    setisopenSidebarVal(false); // Ẩn danh mục khi chọn mục
  };

  // Hàm xử lý sự kiện click bên ngoài để đóng sidebar
  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setisopenSidebarVal(false); // Đóng danh mục khi click ngoài
    }
  };

  // Đăng ký sự kiện click khi component mount và cleanup khi component unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div className="container mx-auto">
        <div className="flex items-center">
          {/* Part 1 */}
          <div className="w-1/3 navPart1">
            <div className="relative mt-1">
              <Button
                ref={buttonRef} // Thêm ref cho button
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
                ref={sidebarRef} // Thêm ref cho div chứa sidebar
                className={`absolute top-[119%] left-[14%] w-[60%] bg-white p-2 border border-gray-200 transition-all duration-200 z-10 ${
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
                      <Link to="/products" onClick={handleCategoryClick}>
                        <Button className="w-full flex items-center justify-between navigationMenu">
                          <span className="text-left">{category}</span>
                          <FaAngleRight className="ml-auto" />
                        </Button>
                      </Link>
                      <div className="absolute left-[102%] top-0 w-[250px] bg-white p-3 border-0 border-gray-200 opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible ">
                        {/* Submenu items */}
                        {category === "Thực phẩm" && (
                          <>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Rau củ quả
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Thịt & Hải sản
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Đồ đông lạnh
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Thực phẩm khô
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Đồ hộp
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Đồ uống" && (
                          <>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Nước giải khát
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Sữa & các sản phẩm từ sữa
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Đồ uống có cồn
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Bánh kẹo & Đồ ăn nhẹ" && (
                          <>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Bánh kẹo
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Đồ ăn nhẹ
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Hóa mỹ phẩm" && (
                          <>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Chăm sóc cá nhân
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Chăm sóc da
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Chăm sóc tóc
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Trang điểm
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Gia dụng & Đồ dùng nhà bếp" && (
                          <>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Đồ dùng nhà bếp
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Thiết bị điện gia dụng
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Đồ dùng dọn dẹp
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Gia vị" && (
                          <>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Dầu ăn
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Nước chấm và nước mắm
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Nước tương (xì dầu)
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Hạt nêm
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Tương các loại
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Chăm sóc bé" && (
                          <>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Sản phẩm cho bé
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Đồ chơi trẻ em
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Sách và văn phòng phẩm" && (
                          <>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Sách
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Văn phòng phẩm
                              </Button>
                            </Link>
                          </>
                        )}
                        {category === "Sản phẩm vệ sinh nhà cửa" && (
                          <>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Dụng cụ vệ sinh
                              </Button>
                            </Link>
                            <Link to="/products" onClick={handleCategoryClick}>
                              <Button className="w-full text-left nav_menu">
                                Hóa chất tẩy rửa
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
                      <Button className="flex items-center gap-2 whitespace-nowrap">
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
