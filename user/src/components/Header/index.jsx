import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Header/Logo.png";
import Search from "../Search";
import "./style.css";
import { Button } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Navigation from "./Navigation";

const Header = () => {
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
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex items-center rounded-full  text-white p-2 focus:outline-none">
                      <FaUserCircle className="h-6 w-6" />
                      <span className="ml-2">Tài khoản</span>
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute right-0 z-10  w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 profile">
                    <MenuItem>
                      <Link
                        to="/Account"
                        className="block px-4 py-2 text-sm text-black-700 hover:bg-gray-100"
                      >
                        Hồ sơ
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-black-700 hover:bg-gray-100"
                      >
                        Cài đặt
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-black-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>

              {/* Shopping cart */}
              <div className="user ml-3">
                <Button className="circle ml-2">
                  <LuShoppingCart />
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
