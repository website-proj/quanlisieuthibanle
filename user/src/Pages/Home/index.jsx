import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Button } from "@mui/material";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import ScrollToTopButton from "../../components/ScrollTop";
import HomeBanner from "../../components/HomeBanner";
import Timer from "../../components/Timer";
import BannerSlide from "../../components/BannerSlide";
import DiscountProducts from "../../components/Discounts";
import BestSellerProducts from "../../components/BestSellers";
import NewProducts from "../../components/NewProducts";
import FooterBanner from "../../components/FooterBanner";
import "./style.css";
import Popup from "../../components/Popup";
import axios from "axios";
import SummaryApi, { baseURL } from "../../common/SummaryApi";
import CardLoading from "../../components/CardLoading";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cartCount, incrementCartCount } = useContext(CartContext);

  // Lấy thông tin sản phẩm
  useEffect(() => {
    const fetchDiscountProducts = async () => {
      try {
        const response = await axios({
          method: SummaryApi.flash_sale.method,
          url: `${baseURL}${SummaryApi.flash_sale.url}`,
        });

        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error("Dữ liệu không hợp lệ hoặc không có sản phẩm");
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching discount products:", error);
        setProducts([]);
      }
    };

    fetchDiscountProducts();
  }, []);

  const handleAddToCart = async (e, product, quantity = 1) => {
    try {
      // Tạo hiệu ứng hoạt hình cho hình ảnh
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
        incrementCartCount(quantity); // Cập nhật số lượng giỏ hàng nếu API thành công
      }, 1000);

      // Lấy token từ localStorage
      const newtoken = localStorage.getItem("token"); // Đảm bảo lấy token đúng cách từ localStorage
      const token = newtoken ? newtoken.split(" ")[1] : null; // Lấy phần sau "bearer "

      if (!token) {
        console.error("Token không tồn tại. Vui lòng đăng nhập.");
        window.location.href = "/signIn"; // Chuyển hướng đến trang đăng nhập
        return; // Nếu không có token, không tiếp tục gửi yêu cầu
      }

      // Tiến hành gửi yêu cầu với token hợp lệ
      const response = await fetch(`${baseURL}${SummaryApi.addToCart.url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Đảm bảo thêm "Bearer" trước token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: product.product_id, quantity }), // Chỉnh sửa từ "productId" thành "product_id"
      });

      if (response.ok) {
        const result = await response.json(); // Chỉ gọi .json() khi phản hồi thành công
        console.log("Sản phẩm đã được thêm vào giỏ hàng", result);

        // Xử lý kết quả trả về
        if (result.message === "added product to cart") {
          const cartData = result.data;
          console.log("Thông tin giỏ hàng:", cartData);
          // Cập nhật giỏ hàng với thông tin từ response
          // Ví dụ: cập nhật giỏ hàng trên giao diện người dùng
        }
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        alert(
          "Có lỗi khi thêm sản phẩm vào giỏ hàng: " + JSON.stringify(errorData)
        );
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Bắt đầu tải
      // Giả lập thời gian tải dữ liệu (thay bằng API thực tế nếu cần)
      setTimeout(() => {
        setLoading(false); // Dữ liệu đã tải xong
      }, 0); // Thời gian giả lập tải dữ liệu (2 giây)
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div id="home">
        <Popup />
        <HomeBanner />
        <section id="flashseller" className="homeProducts">
          <div className="container mx-auto px-4">
            <div className="flex w-full">
              <BannerSlide />
              <div className="lg:w-3/4 md:w-2/3 sm:w-1/2 w-full productSale">
                <Timer duration={2 * 24 * 60 * 60 * 1000} />

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 productList">
                  {loading
                    ? Array.from({ length: 12 }).map((_, index) => (
                        <CardLoading key={index} /> // Hiển thị skeleton cards khi loading
                      ))
                    : products?.slice(0, 12).map((product) => {
                        const formatCurrency = (value) =>
                          value.toLocaleString("vi-VN") + "đ";

                        return (
                          <div
                            className="border rounded-xl p-4 flex flex-col justify-between shadow hover:shadow-lg transition-all duration-300 ease-in-out transform product_item"
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
                                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                                />
                              </div>
                              {product.discount > 0 && (
                                <span className="absolute top-[2em] left-0 bg-[#1a73e8] text-white text-xs font-semibold px-2 py-1 rounded">
                                  {product.discount}%
                                </span>
                              )}
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
                              className="productCart flex items-center whitespace-nowrap"
                            >
                              <FiShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-10 xl:h-10  mt-auto pr-2" />
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
        <ScrollToTopButton className="hidden sm:block" />
      </div>
    </>
  );
};

export default Home;
