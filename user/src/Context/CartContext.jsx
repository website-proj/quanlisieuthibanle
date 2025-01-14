import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../common/SummaryApi";

// Tạo CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState();

  // Hàm lấy số lượng sản phẩm từ API
  const fetchCartCount = async () => {
    const token = localStorage.getItem("token")?.split(" ")[1];
    if (!token) return;

    try {
      const response = await axios.get(`${baseURL}/api/cart/count_product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.message === "count products") {
        const cartData = response.data.data;
        const cartKey = Object.keys(cartData)[0]; // Lấy key đầu tiên trong object
        const cartCount = cartData[cartKey]?.quantity || 0; // Lấy số lượng sản phẩm
        setCartCount(cartCount); // Cập nhật số lượng sản phẩm
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchCartCount();
  }, []);

  // Hàm cập nhật số lượng giỏ hàng (nếu cần thêm sản phẩm)
  const incrementCartCount = (quantity) => {
    setCartCount((prevCount) => prevCount + quantity);
  };

  return (
    <CartContext.Provider
      value={{ cartCount, incrementCartCount, fetchCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
