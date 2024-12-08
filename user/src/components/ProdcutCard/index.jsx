import { useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import { LuShoppingCart } from "react-icons/lu";

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
      <div className="flex items-center border border-black upCount">
        {/* Nút trừ */}
        <Button
          onClick={decrement}
          className="p-2 bg-white hover:bg-gray-200 focus:outline-none"
        >
          -
        </Button>

        {/* Chữ số lượng với đường kẻ giữa */}
        <span className="border-x border-gray-300 px-4">{quantity}</span>

        {/* Nút cộng */}
        <Button
          onClick={increment}
          className="p-2 bg-white hover:bg-gray-200 focus:outline-none"
        >
          +
        </Button>
      </div>
    </div>
  );
};

const ProductCard = () => {
  return (
    <div className="proCard border rounded-lg p-4 shadow-lg">
      <div className="flex">
        <div className="w-1/3 proImg">
          <img
            src="https://hcm.fstorage.vn/images/2024/11/10005245-20241109105624.jpg"
            alt="Product"
            className="rounded"
          />
        </div>
        <div className="flex-1 p-4 ml-12">
          <h1 className="text-left text-2xl font-[600]">
            Sữa chua nha đam Vinamilk hộp 100g * 4
          </h1>
          <p className="text-left text-lg text-black-500 mt-2">
            Giá bán lẻ:{" "}
            <span className="text-black-500 font-500 ml-40">800.000đ</span>
          </p>

          <p className="text-black-500 text-left text-lg mt-2">
            Giá khuyến mãi:{" "}
            <span className="text-red-500 font-bold ml-[7.5rem]">600.000đ</span>
          </p>

          <p className="text-black-500 text-left text-lg mt-2">
            Thương hiệu:{" "}
            <span className="text-black-500 font-500 ml-36">Vinamilk</span>
          </p>

          <p className="text-black-500 text-left text-lg mt-2">
            Tình trạng:{" "}
            <span className="text-black-500 font-500 ml-[10.25rem]">
              Còn hàng
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
              Giao hàng trong 2giờ.
            </span>
          </p>

          <p className="text-black-500 text-left text-lg mt-2">
            Đơn vị:{" "}
            <span className="text-black-500 font-500 ml-[12.2rem]">Cái</span>
          </p>

          {/* Thêm đoạn mã đếm số lượng ở đây */}
          <QuantitySelector />

          <Button className=" bg-[#1a73e8] text-white py-2 px-4 rounded mt-4 mx-auto block addPro">
            <LuShoppingCart />
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
