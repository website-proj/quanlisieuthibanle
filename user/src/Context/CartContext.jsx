import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (productImage) => {
    // Tăng số lượng giỏ hàng
    setCartCount((prev) => prev + 1);

    // Thực hiện hiệu ứng bay nếu cần
    const imgElement = document.createElement("img");
    imgElement.src = productImage;
    imgElement.className = "flying-img";
    document.body.appendChild(imgElement);

    const cartIcon = document.getElementById("cart-icon");
    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect();
      const startX = window.innerWidth / 2; // Chỉnh lại vị trí bắt đầu
      const startY = window.innerHeight / 2;
      const endX = cartRect.left + cartRect.width / 2;
      const endY = cartRect.top + cartRect.height / 2;

      imgElement.style.position = "absolute";
      imgElement.style.left = `${startX}px`;
      imgElement.style.top = `${startY}px`;
      imgElement.style.width = "50px";
      imgElement.style.height = "50px";
      imgElement.style.transition =
        "transform 1s ease-in-out, opacity 1s ease-in-out";

      imgElement.style.transform = `translate(${endX - startX}px, ${
        endY - startY
      }px) scale(0.2)`;
      imgElement.style.opacity = "0";

      setTimeout(() => {
        imgElement.remove();
      }, 1000);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
