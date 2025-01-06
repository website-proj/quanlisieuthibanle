import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu"; // Thêm import LuShoppingCart
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Thay đổi import Navigation
import "swiper/css";
import "swiper/css/navigation";

const Cart = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const apiURL = "/API/cart.json";
  const navigate = useNavigate();

  // Gọi API để lấy danh sách sản phẩm liên quan
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get("/API/products.json");
        if (Array.isArray(response.data)) {
          setRelatedProducts(response.data);
        } else {
          console.error(
            "Unexpected data structure for related products:",
            response.data
          );
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm liên quan:", error);
      }
    };

    fetchRelatedProducts();
  }, []);

  // Fetch dữ liệu từ API giỏ hàng
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (Array.isArray(data)) {
          const initialData = data.map((product) => ({
            ...product,
            quantity: 1,
          }));
          setProducts(initialData);
        } else {
          console.error("Unexpected data structure for cart:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Hàm tăng số lượng
  const increaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Hàm giảm số lượng
  const decreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  // Hàm xóa sản phẩm
  const removeProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.product_id !== id)
    );
  };

  // Tính tổng tiền sản phẩm
  const totalAmount = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // Tính tiền tiết kiệm
  const totalSavings = products.reduce(
    (total, product) =>
      total + (product.original_price - product.price) * product.quantity,
    0
  );

  // Thêm các chi phí khác
  const discount = totalSavings; // Tiết kiệm
  const shippingFee = 0; // Phí vận chuyển
  const promotion = 0; // Khuyến mãi
  const finalAmount = totalAmount - discount + shippingFee + promotion;

  const handleCheckout = () => {
    navigate("/payment");
  };

  return (
    <section className="mt-0 mb-3">
      <div className="container mx-auto flex flex-col items-center">
        {/* Tiêu đề */}
        <h1 className="text-3xl font-[600] text-center mb-6">Giỏ hàng</h1>
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
        <div className="container flex">
          <div className="leftPart w-[60%]">
            <table className="w-full border-collapse bg-white shadow-md rounded-md overflow-hidden ml-[6%] mt-4">
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
                {products.map((product) => (
                  <tr key={product.product_id} className="border-b">
                    <td className="px-4 py-2 flex items-center">
                      <a
                        href={`/product/${product.product_id}`}
                        className="flex items-center"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 mr-3"
                        />
                        <div>
                          <p className="font-bold text-left">{product.name}</p>
                          <p className="text-sm text-gray-500 text-left">{`ĐVT: ${product.unit}`}</p>
                        </div>
                      </a>
                    </td>

                    <td className="px-4 py-2 text-center">
                      <span className="line-through text-gray-500">
                        {product.original_price.toLocaleString()}đ
                      </span>
                      <br />
                      {product.price.toLocaleString()}đ
                    </td>
                    <td className="px-4 py-2 text-center w-40">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => decreaseQuantity(product.product_id)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full bg-gray-300"
                        >
                          -
                        </button>
                        <span className="mx-2 w-8 text-center">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(product.product_id)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center w-32">
                      {(product.price * product.quantity).toLocaleString()}đ
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => removeProduct(product.product_id)}
                        className="text-red-500 hover:underline"
                      >
                        <MdDeleteOutline className="text-2xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-4">
              <button
                onClick={() => setProducts([])}
                className="text-red-500 hover:underline"
              >
                Xoá tất cả giỏ hàng
              </button>
            </div>
          </div>
          <div className="rightPart w-[28%] ml-24 mt-4">
            <div className="shadow-md rounded-md bg-white p-4">
              <div className="flex justify-between mb-2">
                <span>Tạm tính</span>
                <span>{totalAmount.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tiết kiệm</span>
                <span>{totalSavings.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Phí vận chuyển</span>
                <span>{shippingFee.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between font-bold text-red-500">
                <span>Thành tiền</span>
                <span>{finalAmount.toLocaleString()}đ</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
              >
                THANH TOÁN {finalAmount.toLocaleString()}đ
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 mb-5">
        <h3 className="text-lg font-[600] text-slate-950 text-left ml-[4%]">
          Có thể bạn thích
        </h3>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper relatedPro"
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relatedPro_item border rounded-lg p-4 shadow-lg w-full hover:border-blue-500 hover:shadow-xl">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-t-lg w-full"
                  />
                  {product.discount && (
                    <span className="absolute top-4 left-[-1.2em] bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded">
                      {product.discount}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <h4 className="text-base font-semibold">{product.name}</h4>
                  <p className="text-sm text-gray-500">ĐVT: {product.unit}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-red-500 font-bold">
                      {product.price.toLocaleString()}đ
                    </span>
                    {product.old_price && (
                      <span className="line-through text-gray-400">
                        {product.old_price.toLocaleString()}đ
                      </span>
                    )}
                  </div>
                  <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center">
                    <LuShoppingCart className="text-2xl mr-4" />
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Cart;
