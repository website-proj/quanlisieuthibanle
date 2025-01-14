import Sidebar from "../../components/Sidebar";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import "./style.css";

import { FiShoppingCart } from "react-icons/fi";
import ScrollToTopButton from "../../components/ScrollTop";

import { CartContext } from "../../Context/CartContext";
import Header from "../../components/Header";
import SummaryApi, { baseURL } from "../../common/SummaryApi";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const { incrementCartCount } = useContext(CartContext);

  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parentId"); // Lấy parentId từ URL
  const categoryId = searchParams.get("categoryId"); // Lấy categoryId từ URL (nếu có)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = categoryId
          ? `${baseURL}${SummaryApi.parent_categories.url}` // Nếu có categoryId
          : `${baseURL}/api/products?parentId=${parentId}`; // Nếu chỉ có parentId

        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data); // Cập nhật sản phẩm
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (parentId) {
      fetchProducts(); // Gọi API khi parentId hoặc categoryId thay đổi
    }
  }, [parentId, categoryId]);
  const handleShowAll = () => {
    setVisibleProducts((prev) => prev + 12);
  };

  const handleAddToCart = (e, product, quantity = 1) => {
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
      incrementCartCount(quantity);
    }, 1000);
  };

  return (
    <>
      <Header />
      <section className="product_listing_Page">
        <div className="container">
          <div className="productListing flex">
            <div className="w-1/5">
              <Sidebar />
            </div>
            <div className="w-4/5 pl-4 Cart">
              <div className="flex items-center space-x-4 mb-4">
                <Link to="">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FFFFFF",
                      color: "#000000",
                      borderRadius: "10px",
                      "&:hover": { backgroundColor: "#F0F0F0" },
                    }}
                    className="capitalize"
                  >
                    Bán chạy
                  </Button>
                </Link>
                <Link to="">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FFFFFF",
                      color: "#000000",
                      borderRadius: "10px",
                      "&:hover": { backgroundColor: "#F0F0F0" },
                    }}
                    className="capitalize"
                  >
                    Khuyến mại
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-4 gap-8 productList">
                {products.slice(0, visibleProducts).map((product) => (
                  <div
                    className="border rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300 ease-in-out transform product_item"
                    key={product.product_id}
                  >
                    <Link
                      to={`/product_details/${product.product_id}`}
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
                            {product.price.toLocaleString("vi-VN")}đ
                          </span>
                          {product.old_price && (
                            <span className="line-through text-sm text-gray-400">
                              {product.old_price.toLocaleString("vi-VN")}đ
                            </span>
                          )}
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

              <div className="flex justify-center items-center all_pro_bot">
                <Button onClick={handleShowAll} className="hover:text-gray-600">
                  {loading ? "Đang tải..." : "Xem thêm sản phẩm"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTopButton />
    </>
  );
};

export default Product;
