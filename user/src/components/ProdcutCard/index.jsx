import { useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import { BsCart4 } from "react-icons/bs";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";

// Component đếm số lượng
const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1); // Khởi tạo số lượng ban đầu là 1

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
  // Kiểm tra nếu product chưa được truyền vào hoặc các giá trị là undefined
  if (!product) {
    return <div>Loading...</div>; // Hoặc có thể trả về một thông báo nếu product chưa có dữ liệu
  }

  const { cartCount, incrementCartCount } = useContext(CartContext);

  const handleAddToCart = (e, productImage) => {
    // Animation logic
    const imgElement = document.createElement("img");
    imgElement.src = productImage;
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
      incrementCartCount();
    }, 1000);
  };

  return (
    <div className="proCard mt-2 border rounded-2xl p-4 shadow-lg">
      <div className="flex">
        <div className="w-1/3 proImg">
          <img
            src={product.image || "default-image.jpg"} // Nếu không có ảnh thì sử dụng ảnh mặc định
            alt={product.name || "Sản phẩm"} // Nếu không có tên thì hiển thị 'Sản phẩm'
            className="rounded"
          />
        </div>
        <div className="flex-1 p-4 ml-12">
          <h1 className="text-left text-2xl font-[500]">
            {product.name || "Tên sản phẩm"}{" "}
            {/* Nếu không có tên sản phẩm, hiển thị 'Tên sản phẩm' */}
          </h1>
          <p className="text-left text-lg text-black-500 mt-2">
            Giá bán lẻ:{" "}
            <span className="text-black-500 font-500 ml-40">
              {product.old_price ? product.old_price.toLocaleString() : "N/A"}đ{" "}
              {/* Kiểm tra giá trị của price */}
            </span>
          </p>

          <p className="text-black-500 text-left text-lg mt-2">
            Giá khuyến mãi:{" "}
            <span className="text-red-500 font-bold ml-[7.5rem]">
              {product.price ? product.price.toLocaleString() : "N/A"}đ{" "}
              {/* Kiểm tra giá trị của discount_price */}
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
            {" "}
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

          {/* Thêm đoạn mã đếm số lượng ở đây */}
          <QuantitySelector />

          <Button
            onClick={(e) => handleAddToCart(e, product.image)}
            className=" bg-[#1a73e8] text-white py-2 px-4 rounded mt-4 mx-auto block addPro"
          >
            <BsCart4 />
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
