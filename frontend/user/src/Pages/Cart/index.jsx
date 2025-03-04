import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Thay đổi import Navigation
import "swiper/css";
import "swiper/css/navigation";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import SummaryApi, { baseURL } from "../../common/SummaryApi";
import noDataImage from "../../assets/images/nothing here yet.webp";

const formatCurrency = (value) => value.toLocaleString("vi-VN") + "đ";
const Cart = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]); // Using cartItems state here
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Gọi API để lấy danh sách sản phẩm liên quan
  useEffect(() => {
    const token = localStorage.getItem("token")?.split(" ")[1];

    if (!token) {
      console.error("Token không tồn tại. Vui lòng đăng nhập.");
      window.location.href = "/signIn";
      return;
    }

    const fetchCartData = async () => {
      try {
        const cartItemsResponse = await axios.get(
          `${baseURL}${SummaryApi.cart_item.url}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (cartItemsResponse.data.message === "success") {
          const cartItemsList = Object.values(cartItemsResponse.data.data).map(
            (item) => ({
              ...item.product[0],
              quantity: item.quantity,
            })
          );
          setCartItems(cartItemsList);
        }

        const totalPriceResponse = await axios.get(
          `${baseURL}${SummaryApi.totalPrice.url}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (totalPriceResponse.data.message === "total price") {
          setTotalPrice(totalPriceResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(
        `${baseURL}${SummaryApi.best_seller.url}`
      );
      setRelatedProducts(response.data.data); // Lưu danh sách sản phẩm vào state
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm liên quan:", error);
    }
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

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

  // Deleting cart item
  const deleteCartItem = async (product_id) => {
    const token = localStorage.getItem("token")?.split(" ")[1];

    if (!token) {
      console.error("Token không tồn tại. Vui lòng đăng nhập.");
      window.location.href = "/signIn";
      return;
    }

    try {
      const response = await axios.delete(
        `${baseURL}${SummaryApi.cart_items_delete.url}?product_id=${product_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "deleted cart item") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      alert("Có lỗi xảy ra khi xóa sản phẩm!");
    }
  };

  // Hàm tăng số lượng

  const increaseQuantity = async (id) => {
    const updatedItem = cartItems.find((item) => item.product_id === id);
    const newQuantity = updatedItem.quantity + 1;

    try {
      const token = localStorage.getItem("token")?.split(" ")[1];
      if (!token) {
        console.error("Token không tồn tại. Vui lòng đăng nhập.");
        window.location.href = "/signIn";
        return;
      }

      const response = await axios.put(
        `${baseURL}${SummaryApi.update_product.url}`, // Cập nhật URL với API PUT
        {
          product_id: id,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Cập nhật số lượng vào giỏ hàng
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product_id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        console.error("Cập nhật số lượng thất bại");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Hàm giảm số lượng
  const decreaseQuantity = async (id) => {
    const updatedItem = cartItems.find((item) => item.product_id === id);
    const newQuantity = updatedItem.quantity > 1 ? updatedItem.quantity - 1 : 1;

    try {
      const token = localStorage.getItem("token")?.split(" ")[1];
      if (!token) {
        console.error("Token không tồn tại. Vui lòng đăng nhập.");
        window.location.href = "/signIn";
        return;
      }

      const response = await axios.put(
        `${baseURL}${SummaryApi.update_product.url}`, // Cập nhật URL với API PUT
        {
          product_id: id,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Cập nhật số lượng vào giỏ hàng
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product_id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        console.error("Cập nhật số lượng thất bại");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Tính tổng tiền sản phẩm
  const totalAmount = cartItems.reduce(
    (total, product) => total + product.price * product.quantity, // Tính tổng giá của sản phẩm
    0
  );

  // Tính tiền tiết kiệm
  const totalSavings = cartItems.reduce(
    (total, item) => total + (item.old_price - item.price) * item.quantity, // Tiền tiết kiệm = giá cũ - giá mới nhân với số lượng
    0
  );

  // Tính phí vận chuyển (ví dụ, bạn có thể tính phí vận chuyển theo một số quy tắc)
  const shippingFee = 0; // Ví dụ là 30.000đ

  // Tính thành tiền (tạm tính + phí vận chuyển - tiền tiết kiệm)
  const finalAmount = totalAmount + shippingFee;

  const clearCart = async () => {
    const token = localStorage.getItem("token")?.split(" ")[1];

    if (!token) {
      console.error("Token không tồn tại. Vui lòng đăng nhập.");
      window.location.href = "/signIn";
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/cart/cart", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Parse JSON từ phản hồi
      const data = await response.json();

      // Kiểm tra trạng thái HTTP và nội dung phản hồi
      if (response.ok && data.message === "deleted cart") {
        setCartItems([]); // Làm rỗng giỏ hàng trên frontend
        console.log("Giỏ hàng đã được xóa thành công:", data.message);
        window.location.reload(); // Reload để cập nhật giao diện
      } else {
        console.error(
          "Lỗi khi xóa giỏ hàng:",
          data.message || "Phản hồi không hợp lệ."
        );
        alert("Không thể xóa giỏ hàng!");
      }
    } catch (error) {
      window.location.reload();
    }
  };

  const handleCheckout = () => {
    navigate("/payment");
  };

  const { cartCount, incrementCartCount } = useContext(CartContext);

  return (
    <>
      <Header />
      <section className="mt-36 mb-3">
        <div className="container mx-auto flex flex-col items-center">
          {/* Tiêu đề */}
          <h1 className="text-3xl font-[600] text-center mb-6 shadow-text">
            Giỏ hàng
          </h1>
          {/* Thanh tiến trình */}
          <div className="flex items-center justify-between w-full max-w-4xl">
            {/* Bước 1 */}
            <div className="flex items-center w-full">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-500 text-white font-bold">
                  1
                </div>
              </div>
              <div className="flex-grow border-t-4 border-blue-500 mx-2"></div>
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-400 text-white font-bold">
                  2
                </div>
              </div>
              <div className="flex-grow border-t-4 border-gray-400 mx-2"></div>
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-400 text-white font-bold">
                  3
                </div>
              </div>
            </div>
          </div>
          <div className="container ml-[4%] flex">
            <div className="leftPart w-[60%]">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-end justify-center text-gray-500">
                  <img
                    src={noDataImage}
                    alt="no data"
                    className="w-1/2 max-w-sm mb-4"
                  />
                  <p className="text-neutral-500 mr-32 mb-2">Giỏ hàng trống</p>
                  <Link
                    to="/home"
                    className="text-blue-500 mb-5 mr-20 hover:underline"
                  >
                    <Button className="see_more pulsating-button !text-lg">
                      Tiếp tục mua sắm
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="">
                  <table className="w-full border-collapse bg-white shadow-md rounded-xl overflow-hidden ml-[6%] mt-4">
                    {/* Nội dung bảng */}
                    <thead>
                      <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-2 text-left">Sản phẩm</th>
                        <th className="px-4 py-2">Đơn giá</th>
                        <th className="px-4 py-2 w-40">Số lượng</th>
                        <th className="px-4 py-2 w-32">Số tiền</th>
                        <th className="px-4 py-2">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((product) => (
                        <tr key={product.product_id} className="border-b">
                          <td className="px-4 py-2 flex items-center">
                            <Link
                              to={`/product_detials/${product.product_id}`}
                              state={product}
                              className="flex items-center"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 mr-3"
                              />
                              <div>
                                <p className="font-bold text-left">
                                  {product.name}
                                </p>
                                <p className="text-sm text-gray-500 text-left">{`ĐVT: ${product.unit}`}</p>
                              </div>
                            </Link>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <span className="line-through text-gray-500">
                              {product.old_price.toLocaleString()}đ
                            </span>
                            <br />
                            {product.price.toLocaleString()}đ
                          </td>
                          <td className="px-4 py-2 text-center w-40">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() =>
                                  decreaseQuantity(product.product_id)
                                }
                                className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full bg-gray-300"
                              >
                                -
                              </button>
                              <span className="mx-2 w-8 text-center">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  increaseQuantity(product.product_id)
                                }
                                className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-center w-32">
                            {(
                              product.price * product.quantity
                            ).toLocaleString()}
                            đ
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button className="text-red-500 hover:underline">
                              <MdDeleteOutline
                                onClick={() =>
                                  deleteCartItem(product.product_id)
                                }
                                className="text-2xl"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="!text-right justify-items-end mt-4">
                    <Button
                      onClick={() => clearCart([])} // Fix clear cart logic
                      className=" !text-white !bg-blue-600 hover:underline"
                    >
                      Xoá tất cả giỏ hàng
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Phần này chỉ hiển thị khi cartItems.length > 0 */}
            {cartItems.length > 0 && (
              <div className="rightPart w-[26%] ml-24 mt-4">
                <div className="shadow-md rounded-xl bg-white p-4">
                  <div className="flex justify-between mb-2">
                    <span>Tạm tính</span>
                    <span>{formatCurrency(totalAmount)}đ</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Tiết kiệm</span>
                    <span>{formatCurrency(totalSavings)}đ</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Phí vận chuyển</span>
                    <span>{formatCurrency(shippingFee)}đ</span>
                  </div>
                  <div className="flex justify-between font-bold text-red-500">
                    <span>Thành tiền</span>
                    <span>{formatCurrency(finalAmount)}đ</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-blue-500 text-white py-2 rounded-xl mt-4"
                  >
                    THANH TOÁN {formatCurrency(finalAmount)}đ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 mb-5">
          <h3 className="text-lg font-[600] text-slate-950 text-left ml-[4%]">
            Có thể bạn cũng thích
          </h3>
          <Swiper
            slidesPerView={5}
            spaceBetween={40}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper relatedPro"
          >
            {relatedProducts.map((item, index) => (
              <SwiperSlide key={item.product.product_id}>
                <div
                  className="border bg-white rounded-xl h-[24em] flex flex-col justify-between p-4 shadow hover:shadow-lg transition-all duration-300 ease-in-out transform product_item"
                  key={item.product.product_id} // Đặt key trực tiếp trên phần tử bao bọc
                >
                  <Link
                    to={`/product_detials/${item.product.product_id}`}
                    state={item.product} // Truyền toàn bộ đối tượng sản phẩm
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    {item.product.discount > 0 && (
                      <span className="absolute top-[2em] left-0 bg-[#1a73e8] text-white text-xs font-semibold px-2 py-1 rounded">
                        {item.product.discount}%
                      </span>
                    )}
                    <div className="mt-4">
                      <h5 className="text-[0.9em] text-left">
                        {item.product.name}
                      </h5>
                      <p className="text-[0.72em] text-black-500 text-left">
                        ĐVT: {item.product.unit}
                      </p>
                      <div className="flex items-center justify-between mt-2 space-x-2">
                        <span className="text-red-500 text-base font-bold">
                          {formatCurrency(item.product.price)}{" "}
                          {/* Đảm bảo format giá đúng */}
                        </span>
                        {item.product.old_price && (
                          <span className="line-through text-sm text-gray-400">
                            {formatCurrency(item.product.old_price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                  <Button
                    onClick={(e) => handleAddToCart(e, item.product, 1)} // Thêm sản phẩm vào giỏ hàng
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
      </section>
    </>
  );
};

export default Cart;
