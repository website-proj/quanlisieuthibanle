import Sidebar from "../../components/Sidebar";
import React, { useContext } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";
import { useState, useEffect } from "react"; // Thêm dòng này

import { BsCart4 } from "react-icons/bs";
import ScrollToTopButton from "../../components/ScrollTop";

import { CartContext } from "../../Context/CartContext"; // Import CartContext
import Header from "../../components/Header";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12); // Số sản phẩm hiển thị ban đầu
  const { incrementCartCount } = useContext(CartContext); // Lấy hàm tăng số lượng giỏ hàng từ context

  useEffect(() => {
    // Fetch data từ API
    fetch("/API/products.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log("Fetched products:", data); // Log dữ liệu fetch
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleShowAll = () => {
    setLoading(true); // Bắt đầu tải dữ liệu
    setTimeout(() => {
      setVisibleProducts((prevVisible) => {
        const newVisible = prevVisible + 12; // Mỗi lần hiển thị thêm 12 sản phẩm
        console.log("Updated visibleProducts:", newVisible); // Log số sản phẩm hiển thị
        return newVisible;
      });
      setLoading(false); // Dừng loading sau khi cập nhật
    }, 2000); // Giả lập thời gian tải dữ liệu (2 giây)
  };

  const handleAddToCart = (e, productImage) => {
    handleAddToCartAnimation(e, productImage);
    incrementCartCount(); // Tăng số lượng giỏ hàng
  };

  const handleAddToCartAnimation = (e, productImage) => {
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
    <>
      <Header />
      <section className="product_listing_Page">
        <div className="container">
          <div className="productListing flex">
            {/* Sidebar */}
            <div className="w-1/5">
              <Sidebar />
            </div>

            {/* Content bên cạnh Sidebar */}
            <div className="w-4/5 pl-4 Cart">
              {/* Danh sách nút */}
              <div className="flex items-center space-x-4 mb-4">
                <Link to="">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FFFFFF",
                      color: "#000000",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#F0F0F0", // Màu khi hover
                      },
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
                      "&:hover": {
                        backgroundColor: "#F0F0F0",
                      },
                    }}
                    className="capitalize"
                  >
                    Khuyến mại
                  </Button>
                </Link>
              </div>

              {/* Các nội dung khác */}
              <div className="grid grid-cols-4 gap-8 productList">
                {products.slice(0, visibleProducts).map((product) => {
                  // Hàm định dạng số tiền
                  const formatCurrency = (value) => {
                    return value.toLocaleString("vi-VN") + "đ";
                  };

                  return (
                    // Bao bọc mỗi product_item bằng Link để chuyển trang khi nhấp vào sản phẩm
                    <div
                      className="border rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300 ease-in-out transform product_item"
                      key={product.product_id} // Đặt key trực tiếp trên phần tử bao bọc
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
                        onClick={(e) => handleAddToCart(e, product.image)}
                        className="productCart"
                      >
                        <BsCart4 className="text-[2em] pr-2" />
                        Thêm vào giỏ hàng
                      </Button>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center items-center all_pro_bot">
                <Button onClick={handleShowAll} className="hover:text-gray-600">
                  {loading ? (
                    <div className="loading-container">
                      <div className="spinner"></div>
                      <p>Đang tải...</p>
                    </div>
                  ) : (
                    <div className="whitespace-nowrap justify-center items-center">
                      Xem thêm sản phẩm
                    </div>
                  )}
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
