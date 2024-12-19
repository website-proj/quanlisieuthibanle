import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Header/Logo.png";
import Search from "../Search";
import "./style.css";
import { Button } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Navigation from "./Navigation";
import { MdOutlineManageAccounts } from "react-icons/md";
import { TbFileSpreadsheet } from "react-icons/tb";
import { CgLogIn } from "react-icons/cg";
import { MyContext } from "../../App";

const Header = () => {
  const context = useContext(MyContext);
  return (
    <>
      <header>
        <div className="header ">
          <div className="container flex items-center justify-between">
            <div className="col1 w-1/5">
              <Link to={"/"}>
                <img src={Logo} />
              </Link>
            </div>

            <div className="col2 w-3/5">
              <Search />
            </div>

            <div className="col3 carTab w-1/5 flex items-center">
              {/* Profile dropdown */}
              <div className="user">
                {context.isLogin !== true ? (
                  <Link to={"/signIn"}>
                    <Button className="mr-3 whitespace-nowrap">
                      Đăng nhập
                    </Button>
                  </Link>
                ) : (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex items-center rounded-full  text-white p-2 focus:outline-none">
                        <FaUserCircle className="h-6 w-6" />
                        <span className="ml-2 whitespace-nowrap">
                          Tài khoản
                        </span>
                      </MenuButton>
                    </div>
                    <MenuItems className="absolute right-0 z-10  w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 profile ">
                      <MenuItem>
                        <Link
                          to="/Account"
                          className="block px-4 py-2 text-sm text-black-700 hover:bg-gray-100 flex items-center gap-x-2 rounded-md"
                        >
                          <MdOutlineManageAccounts className="text-lg" /> Tài
                          khoản
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="#"
                          className="block px-4 py-2 text-sm text-black-700 hover:bg-gray-100 flex items-center gap-x-2 rounded-md "
                        >
                          <TbFileSpreadsheet className="text-lg" /> Quản lý đơn
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="/signIn"
                          className="block px-4 py-2 text-sm text-black-700 hover:bg-gray-100 flex items-center gap-x-2 rounded-md"
                        >
                          <CgLogIn className="text-lg" /> Đăng xuất
                        </Link>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                )}
              </div>

              {/* Shopping cart */}
              <div className="cart ml-3 flex items-center">
                <Button className="circle ml-2">
                  <LuShoppingCart className="mr-2 h-10 w-10" />
                  <span className="ml-2 whitespace-nowrap">Giỏ hàng</span>
                  <span
                    className="count d-flex align-items-center justify-content-center"
                    style={{ marginLeft: "50%" }}
                  >
                    0
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Navigation />
    </>
  );
};

export default Header;
