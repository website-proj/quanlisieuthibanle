import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import SummaryApi, { baseURL } from "../../common/SummaryApi";
import CardLoading from "../CardLoading"; // Import component CardLoading

const BestSellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const { incrementCartCount } = useContext(CartContext);

  useEffect(() => {
    const fetchBestSellerProducts = async () => {
      setLoading(true); // Bắt đầu tải
      try {
        const response = await axios({
          method: SummaryApi.best_seller.method,
          url: `${baseURL}${SummaryApi.best_seller.url}`,
        });

        if (response.data && Array.isArray(response.data.data)) {
          const formattedProducts = response.data.data.map((item) => ({
            ...item.product,
            sold: item.sold,
            category: item["Category of product"],
            parentCategory: item["Parent Category of Product"],
          }));
          setProducts(formattedProducts);
        } else {
          console.error("Dữ liệu không hợp lệ hoặc không có sản phẩm");
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching best seller products:", error);
        setProducts([]);
      } finally {
        setLoading(false); // Kết thúc tải
      }
    };

    fetchBestSellerProducts();
  }, []);

  const formatCurrency = (value) => value.toLocaleString("vi-VN") + "đ";

  const handleShowMore = () => setVisibleCount((prevCount) => prevCount + 5);

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

  return (
    <section>
      <div className="flex items-center justify-between px-6 py-4 rounded-lg text_list">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-black text-left shadow-text">
            Bán chạy nhất
          </h3>
          <p className="text-sm text-gray-500">
            Sản phẩm được khách hàng ưa chuộng
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 productListSale">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <CardLoading key={index} /> // Hiển thị CardLoading khi đang tải
            ))
          : products.slice(0, visibleCount).map((product) => (
              <div
                className="border flex flex-col justify-between shadow rounded-xl p-4 hover:shadow-lg transition-all duration-300 ease-in-out transform product_item"
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
                      <span className="line-through text-sm text-gray-400">
                        {formatCurrency(product.old_price)}
                      </span>
                    </div>
                  </div>
                </Link>

                <Button
                  onClick={(e) => handleAddToCart(e, product, 1)}
                  className="productCart flex items-center whitespace-nowrap"
                >
                  {/* <FiShoppingCart className="text-[2em] mt-auto pr-2" /> */}
                  Thêm vào giỏ hàng
                </Button>
              </div>
            ))}
      </div>

      {visibleCount < products.length && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleShowMore}
            className="see_more pulsating-button !text-lg mt-4"
          >
            Xem thêm
          </Button>
        </div>
      )}
    </section>
  );
};

export default BestSellerProducts;
