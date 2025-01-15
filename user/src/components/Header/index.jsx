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
            <div className="col1 w-1/5">
              <Link to={"/home"}>
                <img src={Logo} />
              </Link>
            </div>

            <div className="col2 w-3/5 flex items-center justify-center">
              <Search />
            </div>

            <div className="col3 carTab w-1/5 flex items-center">
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
                      <FaUserCircle className="h-6 w-6" />
                      <span className="ml-2 whitespace-nowrap">Tài khoản</span>
                    </div>
                    <div className="profile-menu ">
                      <Link
                        to="/Account"
                        className="block px-4 py-2 text-sm text-black-700 hover:bg-gray-100 flex items-center gap-x-2 rounded-md"
                      >
                        <MdOutlineManageAccounts className="text-lg" /> Tài
                        khoản
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
                className="cart ml-3 flex items-center"
                onClick={() => context.setOpenCartPanel(true)}
              >
                <Button className="circle ml-2 ">
                  <FiShoppingCart className="mr-2 h-10 w-10 " />
                  <span className="ml-2 whitespace-nowrap">Giỏ hàng</span>
                  <span
                    className="count d-flex align-items-center justify-content-center"
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
