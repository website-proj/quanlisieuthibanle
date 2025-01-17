import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Header/Logo.png";
import Search from "../Search";
import "./style.css";
import { Button } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

import Navigation from "./Navigation";
import { MdOutlineManageAccounts } from "react-icons/md";
import { TbFileSpreadsheet } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { MyContext } from "../../App";
import { IoLogInOutline } from "react-icons/io5";
import { CartContext } from "../../Context/CartContext";

const Header = () => {
  const context = useContext(MyContext);
  const { cartCount } = useContext(CartContext);
  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token
    navigate("/signIn"); // Điều hướng đến trang đăng nhập
  };
  const navigate = useNavigate();
  return (
    <>
      <header>
        <div className="header ">
          <div className="container flex items-center justify-between">
            <div className="col1 xl:w-1/5 lg:w-1/6 md:w-1/6 sm:w-1/6">
              <Link to={"/home"}>
                <img
                  className="sm:h-[3.5em] md:h-[4em] lg-[5em] xl-[5em]"
                  src={Logo}
                />
              </Link>
            </div>

            <div className="col2  sm:w-1/2 md-w:1/2 lg:w-3/5 xl:w-3/5 flex items-center justify-center">
              <Search />
            </div>

            <div className="col3 carTab sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5 flex items-center">
              {/* Profile dropdown */}
              <div className="user relative">
                {context.isLogin !== false ? (
                  <Link to={"/signIn"}>
                    <Button className="mr-3 whitespace-nowrap">
                      <IoLogInOutline className="text-xl font-[600] mr-1" />
                      Đăng nhập
                    </Button>
                  </Link>
                ) : (
                  <div className="account-menu relative">
                    <div className="account-button flex items-center rounded-full text-white p-2 cursor-pointer">
                      <FaUserCircle className="xl:h-6 xl:w-6 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:h-5 lg:w-5" />
                      <span className="ml-2 whitespace-nowrap">Tài khoản</span>
                    </div>
                    <div className="profile-menu ">
                      <Link
                        to="/Account"
                        className="block px-4 py-2 text-sm text-black-700 hover:bg-gray-100 flex items-center gap-x-2 rounded-md"
                      >
                        <MdOutlineManageAccounts className="text-lg sm:text-sm md:text-md " />{" "}
                        Tài khoản
                      </Link>
                      <Link
                        to="/order"
                        className="block px-4 py-2 text-sm text-black-700 hover:bg-gray-100 flex items-center gap-x-2 rounded-md"
                      >
                        <TbFileSpreadsheet className="text-lg" /> Quản lý đơn
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block px-4 w-full py-2 text-sm text-black-700 hover:bg-gray-100 flex items-center gap-x-2 rounded-md"
                      >
                        <IoIosLogOut className="text-lg" /> Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Shopping cart */}
              <div
                id="cart-icon"
                className="cart sm:ml-0 md:ml-0 lg:ml-0 xl:ml-3 flex items-center"
                onClick={() => context.setOpenCartPanel(true)}
              >
                <Button className="circle xl:ml-2 lg:ml-2 md:ml-0 sm:ml-0 ">
                  <FiShoppingCart className="mr-1 w-16 h-16 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-12 lg:h-12 xl:w-10 xl:h-10" />
                  <span className="ml-2 whitespace-nowrap">Giỏ hàng</span>
                  <span
                    className="count   d-flex align-items-center justify-content-center"
                    style={{ marginLeft: "50%" }}
                  >
                    {cartCount}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Navigation />
      </header>
    </>
  );
};

export default Header;
