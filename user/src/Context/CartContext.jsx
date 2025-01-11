import React, { createContext, useState, useContext } from "react";

// Tạo CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Cập nhật số lượng giỏ hàng
  const incrementCartCount = (quantity) => {
    setCartCount((prevCount) => prevCount + quantity);
  };

  return (
    <CartContext.Provider value={{ cartCount, incrementCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
