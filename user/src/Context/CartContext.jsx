import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (e, productImage) => {
    // Tạo ảnh đại diện để làm animation
    const imgElement = document.createElement("img");
    imgElement.src = productImage;
    imgElement.className = "flying-img";
    document.body.appendChild(imgElement);

    // Lấy vị trí của nút thêm vào giỏ hàng và vị trí giỏ hàng
    const rect = e.target.getBoundingClientRect();
    const cartRect = document
      .getElementById("cart-icon")
      .getBoundingClientRect();

    // Thiết lập vị trí ban đầu cho hình ảnh
    imgElement.style.position = "absolute";
    imgElement.style.left = `${rect.left}px`;
    imgElement.style.top = `${rect.top}px`;
    imgElement.style.width = "50px";
    imgElement.style.height = "50px";
    imgElement.style.zIndex = "1000";
    imgElement.style.transition =
      "transform 1s ease-in-out, opacity 1s ease-in-out";

    // Thực hiện animation: chuyển hình ảnh từ nút đến giỏ hàng
    setTimeout(() => {
      imgElement.style.transform = `translate(${cartRect.left - rect.left}px, ${
        cartRect.top - rect.top
      }px) scale(0.2)`;
      imgElement.style.opacity = "0";
    }, 10); // Thời gian nhỏ để đảm bảo animation chạy

    // Xóa hình ảnh sau khi animation hoàn tất và tăng số lượng giỏ hàng
    setTimeout(() => {
      imgElement.remove();
      setCartCount((prev) => prev + 1); // Tăng số lượng giỏ hàng
    }, 1000); // Khớp với thời gian transition
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
