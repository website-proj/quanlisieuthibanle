import React from "react";
import "./style.css";
import { MdDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const CartPanel = () => {
  return (
    <>
      <div className="scroll w-full max-h-[35em] overflow-y-scroll overflow-x-hidden py-3 px-4">
        <div className="cartItem w-full flex items-center border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[30%] overflow-hidden h-[6.25em] rounded-md ">
            <Link to={"/product/id"} className="block group">
              <img
                src="https://hcm.fstorage.vn/images/2023/03/tiger-crystal-thung-24-lon-20230307043136.jpg"
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="ml-4 w-[70%] pr-5 relative">
            <Link to={"/product/id"} className="">
              <h4 className="text-[1em] font-[500] hover:text-blue-500">
                Thùng 24 lon bia Tiger crystal lon 330ml
              </h4>
            </Link>

            <p className="flex items-center gap-28 mt-2 mb-2">
              <span>
                SL: <span>2</span>
              </span>
              <span className="text-red-500 font-bold text-right">
                300.000đ
              </span>
            </p>
            <MdDeleteOutline className="absolute top-[0.1em] right-[0em] cursor-pointer text-[1.5em] transition-all hover:text-blue-500" />
          </div>
        </div>
        <div className="cartItem w-full flex items-center border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[30%] overflow-hidden h-[6.25em] rounded-md ">
            <Link to={"/product/id"} className="block group">
              <img
                src="https://hcm.fstorage.vn/images/2023/03/tiger-crystal-thung-24-lon-20230307043136.jpg"
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="ml-4 w-[70%] pr-5 relative">
            <Link to={"/product/id"} className="">
              <h4 className="text-[1em] font-[500] hover:text-blue-500">
                Thùng 24 lon bia Tiger crystal lon 330ml
              </h4>
            </Link>

            <p className="flex items-center gap-28 mt-2 mb-2">
              <span>
                SL: <span>2</span>
              </span>
              <span className="text-red-500 font-bold text-right">
                300.000đ
              </span>
            </p>
            <MdDeleteOutline className="absolute top-[0.1em] right-[0em] cursor-pointer text-[1.5em] transition-all hover:text-blue-500" />
          </div>
        </div>
        <div className="cartItem w-full flex items-center border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[30%] overflow-hidden h-[6.25em] rounded-md ">
            <Link to={"/product/id"} className="block group">
              <img
                src="https://hcm.fstorage.vn/images/2023/03/tiger-crystal-thung-24-lon-20230307043136.jpg"
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="ml-4 w-[70%] pr-5 relative">
            <Link to={"/product/id"} className="">
              <h4 className="text-[1em] font-[500] hover:text-blue-500">
                Thùng 24 lon bia Tiger crystal lon 330ml
              </h4>
            </Link>

            <p className="flex items-center gap-28 mt-2 mb-2">
              <span>
                SL: <span>2</span>
              </span>
              <span className="text-red-500 font-bold text-right">
                300.000đ
              </span>
            </p>
            <MdDeleteOutline className="absolute top-[0.1em] right-[0em] cursor-pointer text-[1.5em] transition-all hover:text-blue-500" />
          </div>
        </div>
        <div className="cartItem w-full flex items-center border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[30%] overflow-hidden h-[6.25em] rounded-md ">
            <Link to={"/product/id"} className="block group">
              <img
                src="https://hcm.fstorage.vn/images/2023/03/tiger-crystal-thung-24-lon-20230307043136.jpg"
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="ml-4 w-[70%] pr-5 relative">
            <Link to={"/product/id"} className="">
              <h4 className="text-[1em] font-[500] hover:text-blue-500">
                Thùng 24 lon bia Tiger crystal lon 330ml
              </h4>
            </Link>

            <p className="flex items-center gap-28 mt-2 mb-2">
              <span>
                SL: <span>2</span>
              </span>
              <span className="text-red-500 font-bold text-right">
                300.000đ
              </span>
            </p>
            <MdDeleteOutline className="absolute top-[0.1em] right-[0em] cursor-pointer text-[1.5em] transition-all hover:text-blue-500" />
          </div>
        </div>
        <div className="cartItem w-full flex items-center border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[30%] overflow-hidden h-[6.25em] rounded-md ">
            <Link to={"/product/id"} className="block group">
              <img
                src="https://hcm.fstorage.vn/images/2023/03/tiger-crystal-thung-24-lon-20230307043136.jpg"
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="ml-4 w-[70%] pr-5 relative">
            <Link to={"/product/id"} className="">
              <h4 className="text-[1em] font-[500] hover:text-blue-500">
                Thùng 24 lon bia Tiger crystal lon 330ml
              </h4>
            </Link>

            <p className="flex items-center gap-28 mt-2 mb-2">
              <span>
                SL: <span>2</span>
              </span>
              <span className="text-red-500 font-bold text-right">
                300.000đ
              </span>
            </p>
            <MdDeleteOutline className="absolute top-[0.1em] right-[0em] cursor-pointer text-[1.5em] transition-all hover:text-blue-500" />
          </div>
        </div>
      </div>

      <br />

      <div className="bottomSec absolute bottom-[0.625em] left-[0.625em] w-full overflow-hidden pr-5">
        <div className="bottomInfo py-3 px-4 flex items-center justify-between w-full flex-col border-t border-[rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between w-full">
            <span>Tổng sản phẩm: </span>
            <span className="text-red-600 font-bold">4</span>
          </div>
          <div className="flex items-center justify-between w-full py-3">
            <span>Tổng tiền</span>
            <span className="text-red-600 font-bold"> 5.200.000đ</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span>Phí vận chuyển</span>
            <span className="text-red-600 font-bold">0đ</span>
          </div>

          <br />

          <div className="flex items-center viewCart justify-between">
            <Link to={"/cart"} className="w-[100%] d-block">
              <Button className=" w-full font-[2em] py-2 px-4 rounded transition-all whitespace-nowrap uppercase">
                GIỎ HÀNG
              </Button>
            </Link>
            {/* <Button className="w-[50%] font-[2em] py-2 px-4 rounded transition-all whitespace-nowrap uppercase">
              QUAY LẠI
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPanel;
