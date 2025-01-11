import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../../Context/CartContext"; // Import CartContext

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { incrementCartCount } = useContext(CartContext); // Lấy hàm tăng số lượng giỏ hàng từ context

  useEffect(() => {
    fetch("/API/new_products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Error fetching discount products:", error)
      );
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN") + "đ";
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
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
            Sản phẩm mới
          </h3>
          <p className="text-sm text-gray-500">
            Mặt hàng vừa mới được bổ sung vào kệ hàng
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 productListSale">
        {(showAll ? products : products.slice(0, 10)).map((product) => (
          <div
            className="border shadow rounded-xl p-4 hover:shadow-lg transition-all duration-300 ease-in-out transform product_item"
            key={product.product_id}
          >
            <Link to={`/product_detials/${product.product_id}`} state={product}>
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              {product.discount && (
                <span className="absolute top-6 left-0 bg-[#1a73e8] text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discount}
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
              className="productCart"
            >
              <FiShoppingCart className="text-[2em] pr-2" />
              Thêm vào giỏ hàng
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          onClick={handleShowAll}
          className="see_more pulsating-button !text-lg mt-4"
        >
          {showAll ? "Ẩn bớt" : "Xem thêm"}
        </Button>
      </div>
    </section>
  );
};

export default NewProducts;
