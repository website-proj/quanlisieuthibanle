import { useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
import SummaryApi, { baseURL } from "../../common/SummaryApi"; // Import API
import axios from "axios"; // Import axios

// Component đếm số lượng
const QuantitySelector = ({ quantity, setQuantity }) => {
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-2">
      <p className="text-black-500 text-left text-lg">Số lượng:</p>
      <div className="flex items-center rounded-xl border border-black upCount">
        {/* Nút trừ */}
        <Button
          onClick={decrement}
          className="p-2 !border !rounded-xl !text-black !text-lg bg-white hover:bg-gray-200 focus:outline-none"
        >
          -
        </Button>

        {/* Chữ số lượng với đường kẻ giữa */}
        <span className="border-x border-gray-300 px-4">{quantity}</span>

        {/* Nút cộng */}
        <Button
          onClick={increment}
          className="p-2 border !rounded-xl !text-black !text-lg bg-white hover:bg-gray-200 focus:outline-none"
        >
          +
        </Button>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { cartCount, incrementCartCount } = useContext(CartContext);

  const handleAddToCart = async (e, product, quantity = 1) => {
    if (quantity < 1 || quantity > product.stock_quantity) {
      alert("Số lượng không hợp lệ.");
      return;
    }

    try {
      const imgElement = document.createElement("img");
      imgElement.src = product.image;
      imgElement.className = "flying-img";
      document.body.appendChild(imgElement);

      const rect = e.target.getBoundingClientRect();
      const cartRect = document
        .getElementById("cart-icon")
        .getBoundingClientRect();

      const startX = rect.left + window.scrollX;
      const startY = rect.top + window.scrollY;
      const endX = cartRect.left + window.scrollX;
      const endY = cartRect.top + window.scrollY;

      imgElement.style.position = "absolute";
      imgElement.style.left = `${startX}px`;
      imgElement.style.top = `${startY}px`;
      imgElement.style.width = "50px";
      imgElement.style.height = "50px";
      imgElement.style.zIndex = "1000";
      imgElement.style.transition =
        "transform 1s ease-in-out, opacity 1s ease-in-out";
      imgElement.style.transform = `translate(${endX - startX}px, ${
        endY - startY
      }px) scale(0.2)`;
      imgElement.style.opacity = "0";

      setTimeout(() => {
        imgElement.remove();
        incrementCartCount(quantity); // Update cart count after the animation
      }, 1000);

      const newtoken = localStorage.getItem("token");
      const token = newtoken ? newtoken.split(" ")[1] : null;

      if (!token) {
        console.error("Token không tồn tại. Vui lòng đăng nhập.");
        window.location.href = "/signIn";
        return;
      }

      const response = await fetch(`${baseURL}${SummaryApi.addToCart.url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: product.product_id, quantity }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Sản phẩm đã được thêm vào giỏ hàng", result);
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        alert("Có lỗi khi thêm sản phẩm vào giỏ hàng.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="proCard mt-2 border rounded-2xl p-4 shadow-lg">
      <div className="flex">
        <div className="w-1/3 proImg">
          <img
            src={product.image || "default-image.jpg"}
            alt={product.name || "Sản phẩm"}
            className="rounded"
          />
        </div>
        <div className="flex-1 p-4 ml-12">
          <h1 className="text-left text-2xl font-[500]">
            {product.name || "Tên sản phẩm"}
          </h1>
          <p className="text-left text-lg text-black-500 ml-1 mt-2">
            Giá bán lẻ:{" "}
            <span className="text-black-500 font-500 ml-40">
              {product.old_price ? product.old_price.toLocaleString() : "N/A"}đ
            </span>
          </p>
          <p className="text-black-500 text-left ml-[2px] text-lg mt-2">
            Giá khuyến mãi:{" "}
            <span className="text-red-500 font-bold ml-[7.5rem]">
              {product.price ? product.price.toLocaleString() : "N/A"}đ
            </span>
          </p>
          <p className="text-black-500 text-left text-lg mt-2">
            Thương hiệu:{" "}
            <span className="text-black-500 font-500 ml-36">
              {product.brand || "Chưa có thông tin"}
            </span>
          </p>
          <p className="text-black-500 text-left text-lg mt-2">
            Tình trạng:{" "}
            <span className="text-black-500 font-500 ml-[10.25rem]">
              {product.stock_quantity ? "Còn hàng" : "Hết hàng"}
            </span>
          </p>
          <p className="text-black-500 text-left text-lg mt-2">
            Vận chuyển:{" "}
            <span className="text-black-500 font-500 ml-[9.5rem]">
              Miễn phí giao hàng cho đơn từ 300.000đ.
            </span>
          </p>
          <p className="text-black-500 text-left text-lg mt-2">
            <span className="text-black-500 font-500 ml-[15.8rem]">
              Giao hàng trong 2 giờ.
            </span>
          </p>
          <p className="text-black-500 text-left text-lg mt-2">
            Đơn vị:{" "}
            <span className="text-black-500 font-500 ml-[12.2rem]">
              {product.unit || "Chưa có thông tin"}
            </span>
          </p>

          {/* Quantity selector */}
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

          <Button
            onClick={(e) => handleAddToCart(e, product, quantity)}
            className="bg-[#1a73e8] text-white py-2 px-4 rounded mt-4 mx-auto block addPro"
          >
            <FiShoppingCart />
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
