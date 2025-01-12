import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../../Context/CartContext"; // Import CartContext
import axios from "axios";
import SummaryApi, { baseURL } from "../../common/SummaryApi";

const DiscountProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); // Số lượng sản phẩm hiển thị ban đầu
  const { incrementCartCount } = useContext(CartContext); // Lấy hàm tăng số lượng giỏ hàng từ context

  useEffect(() => {
    const fetchDiscountProducts = async () => {
      try {
        const response = await axios({
          method: SummaryApi.discount_products.method,
          url: `${baseURL}${SummaryApi.discount_products.url}`,
        });

        if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data); // Cập nhật sản phẩm vào state từ trường "data"
        } else {
          console.error("Dữ liệu không hợp lệ hoặc không có sản phẩm");
          setProducts([]); // Gán mảng trống nếu dữ liệu không hợp lệ
        }
      } catch (error) {
        console.error("Error fetching discount products:", error);
        setProducts([]); // Gán mảng trống khi có lỗi xảy ra
      }
    };

    fetchDiscountProducts();
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN") + "đ";
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Tăng số lượng sản phẩm hiển thị thêm 5
  };

  const handleAddToCart = (e, product, quantity = 1) => {
    // Animation logic
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
      incrementCartCount(quantity); // Cập nhật số lượng vào giỏ hàng
    }, 1000);
  };

  return (
    <section>
      <div className="flex items-center justify-between px-6 py-4 rounded-lg text_list">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-black text-left shadow-text">
            Giảm giá
          </h3>
          <p className="text-sm text-gray-500">Sản phẩm với mức giá tốt nhất</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 productListSale">
        {products.slice(0, visibleCount).map((product) => (
          <div
            className="border flex flex-col justify-between shadow rounded-xl p-4 hover:shadow-lg transition-all duration-300 ease-in-out transform product_item"
            key={product.product_id}
          >
            <Link to={`/product_detials/${product.product_id}`} state={product}>
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              {product.discount && (
                <span className="absolute top-6 left-0 bg-[#1a73e8] text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discount}%
                </span>
              )}
              <div className="mt-4">
                <h5 className="text-[0.9em] text-left">{product.name}</h5>
                <p className="text-[0.72em] text-black-500 text-left">
                  ĐVT: {product.unit}
                </p>
                <div className="flex items-center justify-between mt-2 space-x-2">
                  <span className="text-red-500 text-base font-bold">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="line-through text-sm text-gray-400">
                    {formatCurrency(product.old_price)}
                  </span>
                </div>
              </div>
            </Link>

            <Button
              onClick={(e) => handleAddToCart(e, product, 1)}
              className="productCart "
            >
              <FiShoppingCart className="text-[2em] mt-auto pr-2" />
              Thêm vào giỏ hàng
            </Button>
          </div>
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleShowMore} // Tăng số lượng sản phẩm hiển thị thêm 5
            className="see_more pulsating-button !text-lg mt-4"
          >
            Xem thêm
          </Button>
        </div>
      )}
    </section>
  );
};

export default DiscountProducts;
