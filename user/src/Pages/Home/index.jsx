import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Button } from "@mui/material";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import ScrollToTopButton from "../../components/ScrollTop";
import Header from "../../components/Header";
import HomeBanner from "../../components/HomeBanner";
import Timer from "../../components/Timer";
import BannerSlide from "../../components/BannerSlide";
import DiscountProducts from "../../components/Discounts";
import BestSellerProducts from "../../components/BestSellers";
import NewProducts from "../../components/NewProducts";
import FooterBanner from "../../components/FooterBanner";
import "./style.css";
import Popup from "../../components/Popup";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cartCount, incrementCartCount } = useContext(CartContext);

  // Lấy thông tin sản phẩm
  useEffect(() => {
    fetch("/API/products.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

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
    <>
      <div id="home">
        <Header cartCount={cartCount} />
        <Popup />
        <HomeBanner />
        <section id="flashseller" className="homeProducts">
          <div className="container mx-auto px-4">
            <div className="flex w-full">
              <BannerSlide />
              <div className="w-3/4 productSale">
                <Timer duration={2 * 24 * 60 * 60 * 1000} />
                <div className="grid grid-cols-4 gap-5 productList">
                  {products?.slice(0, 12).map((product) => {
                    const formatCurrency = (value) =>
                      value.toLocaleString("vi-VN") + "đ";

                    return (
                      <div
                        className="border rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300 ease-in-out transform product_item"
                        key={product.product_id}
                      >
                        <Link
                          to={`/product_detials/${product.product_id}`}
                          state={product}
                        >
                          <div className="relative overflow-hidden rounded-lg">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
                            />
                            {product.discount && (
                              <span className="absolute top-[0.5em] left-0 bg-[#1a73e8] text-white text-xs font-semibold px-2 py-1 rounded">
                                {product.discount}
                              </span>
                            )}
                          </div>
                          <div className="mt-4">
                            <h5 className="text-[0.9em] text-left">
                              {product.name}
                            </h5>
                            <p className="text-[0.72em] text-black-500 text-left">
                              ĐVT: {product.unit}
                            </p>
                            <div className="flex items-center justify-between mt-2 space-x-2">
                              <span className="text-red-500 text-base font-bold">
                                {formatCurrency(product.price)}
                              </span>
                              {product.old_price && (
                                <span className="line-through text-sm text-gray-400">
                                  {formatCurrency(product.old_price)}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                        <Button
                          onClick={(e) => handleAddToCart(e, product, 1)} // Sử dụng số lượng mặc định là 1
                          className="productCart"
                        >
                          <FiShoppingCart className="text-[2em] pr-2" />
                          Thêm vào giỏ hàng
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <DiscountProducts />
        <BestSellerProducts />
        <NewProducts />
        <FooterBanner />
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Home;
