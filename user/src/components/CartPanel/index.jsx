import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { MdDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import SummaryApi, { baseURL } from "../../common/SummaryApi";

const CartPanel = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API khi component được render
    const newtoken = localStorage.getItem("token"); // Đảm bảo lấy token đúng cách từ localStorage
    const token = newtoken ? newtoken.split(" ")[1] : null; // Lấy phần sau "Bearer "

    if (!token) {
      console.error("Token không tồn tại. Vui lòng đăng nhập.");
      window.location.href = "/signIn"; // Chuyển hướng đến trang đăng nhập
      return; // Nếu không có token, không tiếp tục gửi yêu cầu
    }

    axios
      .get(`${baseURL}${SummaryApi.cart_item.url}`, {
        headers: {
          // Thêm header Authorization với token lấy từ localStorage
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.message === "success") {
          setCartItems(response.data.data); // Lưu dữ liệu vào state
        }
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="scroll w-full max-h-[35em] overflow-y-scroll overflow-x-hidden py-3 px-4">
        {Object.keys(cartItems).map((cartId) =>
          cartItems[cartId].map((product) => (
            <div
              key={product.product_id}
              className="cartItem w-full flex items-center border-b border-[rgba(0,0,0,0.1)] pb-4"
            >
              <div className="img w-[30%] overflow-hidden h-[6.25em] rounded-md">
                <Link
                  to={`/product_detials/${product.product_id}`}
                  state={product}
                  className="block group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full group-hover:scale-105"
                  />
                </Link>
              </div>
              <div className="ml-4 w-[70%] pr-5 relative">
                <Link
                  to={`/product_detials/${product.product_id}`}
                  state={product}
                  className=""
                >
                  <h4 className="text-[1em] font-[500] hover:text-blue-500">
                    {product.name}
                  </h4>
                </Link>
                <p className="flex items-center gap-28 mt-2 mb-2">
                  <span>
                    SL: <span>2</span>
                  </span>
                  <span className="text-red-500 font-bold text-right">
                    {product.price.toLocaleString()}đ
                  </span>
                </p>
                <MdDeleteOutline className="absolute top-[0.1em] right-[0em] cursor-pointer text-[1.5em] transition-all hover:text-blue-500" />
              </div>
            </div>
          ))
        )}
      </div>

      <br />

      <div className="bottomSec absolute bottom-[0.625em] left-[0.625em] w-full overflow-hidden pr-5">
        <div className="bottomInfo py-3 px-4 flex items-center justify-between w-full flex-col border-t border-[rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between w-full">
            <span>Tổng sản phẩm: </span>
            <span className="text-red-600 font-bold">{cartItems.length}</span>
          </div>
          <div className="flex items-center justify-between w-full py-3">
            <span>Tổng tiền</span>
            <span className="text-red-600 font-bold">5.200.000đ</span>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPanel;
