import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { MdDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import SummaryApi, { baseURL } from "../../common/SummaryApi";
import empty from "../../assets/images/empty_cart.webp"; // Thêm đường dẫn tới ảnh giỏ hàng trống

const CartPanel = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token")?.split(" ")[1];

    if (!token) {
      console.error("Token không tồn tại. Vui lòng đăng nhập.");
      window.location.href = "/signIn";
      return;
    }

    const fetchCartData = async () => {
      try {
        const cartItemsResponse = await axios.get(
          `${baseURL}${SummaryApi.cart_item.url}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (cartItemsResponse.data.message === "success") {
          const cartItemsList = Object.values(cartItemsResponse.data.data).map(
            (item) => ({
              ...item.product[0],
              quantity: item.quantity,
            })
          );
          setCartItems(cartItemsList);
        }

        const totalPriceResponse = await axios.get(
          `${baseURL}${SummaryApi.totalPrice.url}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (totalPriceResponse.data.message === "total price") {
          setTotalPrice(totalPriceResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const deleteCartItem = async (product_id) => {
    const token = localStorage.getItem("token")?.split(" ")[1];

    if (!token) {
      console.error("Token không tồn tại. Vui lòng đăng nhập.");
      window.location.href = "/signIn";
      return;
    }

    try {
      const response = await axios.delete(
        `${baseURL}${SummaryApi.cart_items_delete.url}?product_id=${product_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "deleted cart item") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      alert("Có lỗi xảy ra khi xóa sản phẩm!");
    }
  };

  const totalQuantity = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <>
      {cartItems.length === 0 ? (
        // Hiển thị ảnh nếu giỏ hàng trống
        <div className="empty-cart">
          <img src={empty} alt="Giỏ hàng trống" className="w-full h-auto" />
          <p className="text-center text-xl">
            Giỏ hàng của bạn hiện tại trống!
          </p>
        </div>
      ) : (
        <div>
          <div className="scroll w-full max-h-[20em] overflow-y-scroll overflow-x-hidden py-3 px-4">
            {cartItems.map((product) => (
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
                  >
                    <h4 className="text-[1em] font-[500] hover:text-blue-500">
                      {product.name}
                    </h4>
                  </Link>
                  <p className="flex items-center gap-28 mt-2 mb-2">
                    <span>
                      SL: <span>{product.quantity}</span>
                    </span>
                    <span className="text-red-500 font-bold text-right">
                      {product.price.toLocaleString()}đ
                    </span>
                  </p>
                  <MdDeleteOutline
                    onClick={() => deleteCartItem(product.product_id)}
                    className="absolute top-[0.1em] right-[0em] cursor-pointer text-[1.5em] transition-all hover:text-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="bottomSec absolute bottom-[0.625em] left-[0.625em] w-full overflow-hidden pr-5">
            <div className="bottomInfo py-3 px-4 flex items-center justify-between w-full flex-col border-t border-[rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between w-full">
                <span>Tổng sản phẩm: </span>
                <span className="text-red-600 font-bold">{totalQuantity}</span>
              </div>
              <div className="flex items-center justify-between w-full py-3">
                <span>Tổng tiền</span>
                <span className="text-red-600 font-bold">
                  {totalPrice.toLocaleString()}đ
                </span>
              </div>
              <div className="flex items-center justify-between w-full">
                <span>Phí vận chuyển</span>
                <span className="text-red-600 font-bold">0đ</span>
              </div>

              <div className="flex items-center viewCart justify-between">
                <Link to={"/cart"} className="w-[100%] d-block">
                  <Button className="w-full font-[2em] py-2 px-4 rounded transition-all whitespace-nowrap uppercase">
                    GIỎ HÀNG
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPanel;
