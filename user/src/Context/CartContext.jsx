import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const incrementCartCount = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  const decrementCartCount = () => {
    setCartCount((prevCount) => Math.max(0, prevCount - 1));
  };

  return (
    <CartContext.Provider
      value={{ cartCount, incrementCartCount, decrementCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
