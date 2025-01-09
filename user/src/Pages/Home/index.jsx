import React, { useState, useEffect } from "react";
import HomeBanner from "../../components/HomeBanner";

import Timer from "../../components/Timer";
import "./style.css";
import { Button } from "@mui/material";

import { BsCart4 } from "react-icons/bs";

import { Link } from "react-router-dom";
import ScrollToTopButton from "../../components/ScrollTop";
import DiscountProducts from "../../components/Discounts";
import BestSellerProducts from "../../components/BestSellers";
import NewProducts from "../../components/NewProducts";
import FooterBanner from "../../components/FooterBanner";
import BannerSlide from "../../components/BannerSlide";

const Home = () => {
  // Chuyển hướng cho id

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(15); // Set the number of visible products initially

  useEffect(() => {
    // Fetch data from API
    fetch("/API/products.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log("Fetched products:", data); // Log the fetched data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleShowAll = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      setVisibleProducts((prevVisible) => {
        const newVisible = prevVisible + 10;
        console.log("Updated visibleProducts:", newVisible); // Log the updated number of visible products
        return newVisible;
      });
      setLoading(false); // Stop loading after the timeout
    }, 2000); // Simulate the loading time (2 seconds)
  };

  return (
    <>
      <HomeBanner />

      <section id="flashseller" className="homeProducts">
        <div className="container mx-auto px-4">
          <div className="flex w-full">
            {/* Banner chiếm 1/4 chiều rộng */}
            <BannerSlide />

            {/* Timer và danh sách sản phẩm chiếm 3/4 chiều rộng */}
            <div className="w-3/4 productSale">
              <Timer duration={2 * 24 * 60 * 60 * 1000} />
              <div className="grid grid-cols-4 gap-8 productList">
                {products?.slice(0, 12).map((product) => {
                  // Hàm định dạng số tiền
                  const formatCurrency = (value) =>
                    value.toLocaleString("vi-VN") + "đ";

                  return (
                    <div
                      className="border rounded-lg p-4 shadow hover:shadow-lg transition-all duration-300 ease-in-out transform product_item"
                      key={product.product_id} // Đặt key trực tiếp trên phần tử bao bọc
                    >
                      <Link to={`/product_detials/${product.product_id}`}>
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
                          />
                          {product.discount && (
                            <span className="absolute top-6 left-0 bg-[#1a73e8] text-white text-xs font-semibold px-2 py-1 rounded">
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
                      <Button className="productCart">
                        <BsCart4 className="text-[2em] pr-2" />
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
    </>
  );
};

export default Home;
