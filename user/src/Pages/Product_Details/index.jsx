const formatCurrency = (value) => value.toLocaleString("vi-VN") + "đ";

import React, { useEffect, useState } from "react";
import IconBreadcrumbs from "../../components/IconBreadcrumbs";
import ProductCard from "../../components/ProdcutCard";
import Reviews from "../../components/Reviews";
import { FiShoppingCart } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";
import { useLocation } from "react-router-dom";
// import required modules
import { Navigation } from "swiper/modules";
import ScrollToTopButton from "../../components/ScrollTop";
import { Button } from "@mui/material";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import SummaryApi, { baseURL } from "../../common/SummaryApi"; // Import API

const Product_Details = () => {
  const location = useLocation();
  const product = location.state; // Lấy thông tin sản phẩm từ state (được truyền qua Link)

  const [relatedProducts, setRelatedProducts] = useState([]);

  // Gọi API để lấy danh sách sản phẩm liên quan
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(
          `${baseURL}${SummaryApi.relevantProduct.url}`,
          {
            params: { product_id: product.product_id }, // Truyền product_id vào query params
          }
        );

        setRelatedProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm liên quan:", error);
      }
    };

    fetchRelatedProducts();
  }, []);

  if (!product) {
    // Nếu không có thông tin sản phẩm, có thể chuyển hướng hoặc thông báo lỗi
    return <div>Thông tin sản phẩm không tồn tại!</div>;
  }

  const handleClosePopup = () => {
    setShowPopup(false); // Ẩn popup
  };
  const { cartCount, incrementCartCount } = useContext(CartContext);

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

  // Lấy mô tả sản phẩm từ state và cắt theo dấu chấm
  const description = product.description || ""; // Lấy mô tả sản phẩm từ state
  const sentences = description
    .split(".") // Tách thành mảng các câu
    .map((sentence) => sentence.trim()) // Loại bỏ khoảng trắng thừa
    .filter((sentence) => sentence.length > 0); // Lọc các câu không rỗng

  return (
    <>
      <div className="mt-36 mb-4">
        <IconBreadcrumbs productName={product.name} />
        <div className="container mx-auto p-4">
          <ProductCard product={product} className="mr-[6%]" />

          <div className="mt-3 mb-3  ml-[3%] mr-[5%]">
            <div className="mota">
              {/* Thêm margin vào div chứa mô tả */}
              <div className="flex flex-col mt-5 mb-5">
                <h3 className="text-lg font-[600] text-black text-left text-shadow text_describe ml-[1em] shadow-text">
                  Mô tả sản phẩm
                </h3>
              </div>
              <div className="border bg-white rounded-2xl p-6 shadow-lg ml-[1.1%] h-[90.5%]">
                <div className="text-left text-black">
                  {sentences.map((sentence, index) => (
                    <p key={index} className="mb-2">
                      {sentence}.
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Reviews productId={product.product_id} />
            </div>
          </div>

          <div className="flex flex-col ml-[4%] mr-[5%] mt-12 mb-5">
            <h3 className="text-lg font-[600] text-black text-left text-shadow text_describe shadow-text">
              Sản phẩm liên quan
            </h3>
          </div>

          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper relatedPro"
          >
            {relatedProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div
                  className="border bg-white flex flex-col justify-between h-[24em] shadow rounded-xl p-4 hover:shadow-lg transition-all duration-300 ease-in-out transform product_item"
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
                      <h5 className="text-[0.9em] text-left">{product.name}</h5>
                      <p className="text-[0.72em] text-black-500 text-left">
                        ĐVT: {product.unit}
                      </p>
                      <div className="flex items-center justify-between mt-2 space-x-2">
                        <span className="text-red-500 text-base font-bold">
                          {formatCurrency(product.price)}
                        </span>
                        {/* <span className="line-through text-sm text-gray-400">
                                    {formatCurrency(product.old_price)}
                                  </span> */}
                      </div>
                    </div>
                  </Link>

                  <Button
                    onClick={(e) => handleAddToCart(e, product, 1)}
                    className="productCart flex items-center whitespace-nowrap"
                  >
                    <FiShoppingCart className="text-[2em] pr-2" />
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Product_Details;
