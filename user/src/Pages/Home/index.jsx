import React, { useState, useEffect } from "react";
import HomeBanner from "../../components/HomeBanner";
import Banner from "../../assets/images/banner2.jpg";
import Timer from "../../components/Timer";
import "./style.css";
import { Button } from "@mui/material";
import Banner1 from "../../assets/images/banner3.jpg";
import Banner2 from "../../assets/images/banner4.jpg";
import { BsCart4 } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ScrollToTopButton from "../../components/ScrollTop";
// import { useLocation } from "react-router-dom";

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
            <div className="w-1/4 p-2 banner sticky top-0 h-screen">
              <img src={Banner} className="cursor-pointer" alt="banner" />
            </div>

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

      <section>
        <div className="flex items-center justify-between px-6 py-4 rounded-lg text_list">
          {/* Text Section */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-black text-left">Giảm giá</h3>
            <p className="text-sm text-gray-500">
              Sản phẩm với mức giá tốt nhất
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 productListSale">
          {products.slice(0, 10).map((product) => {
            const formatCurrency = (value) => {
              return value.toLocaleString("vi-VN") + "đ";
            };

            return (
              <div className="border shadow rounded-lg p-4 hover:shadow-lg transition-all duration-300 ease-in-out transform product_item">
                <Link to="/product_detials" key={product.product_id}>
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

                <Button className="productCart">
                  <BsCart4 className="text-[2em] pr-2" />
                  Thêm vào giỏ hàng
                </Button>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleShowAll} className="see_more !text-lg mt-4">
            Xem thêm
          </Button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between px-6 py-4 rounded-lg text_list">
          {/* Text Section */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-black text-left">
              Bán chạy nhất
            </h3>
            <p className="text-sm text-gray-500">
              Sản phẩm được khác hàng ưa chuộng
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 productListSale">
          {products.slice(0, 10).map((product) => {
            const formatCurrency = (value) => {
              return value.toLocaleString("vi-VN") + "đ";
            };

            return (
              <div className="border shadow rounded-lg p-4 hover:shadow-lg transition-all duration-300 ease-in-out transform product_item">
                <Link to="/product_detials" key={product.product_id}>
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

                <Button className="productCart">
                  <BsCart4 className="text-[2em] pr-2" />
                  Thêm vào giỏ hàng
                </Button>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleShowAll} className="see_more !text-lg mt-4">
            Xem thêm
          </Button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between px-6 py-4 rounded-lg text_list">
          {/* Text Section */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-black text-left">
              Sản phẩm mới
            </h3>
            <p className="text-sm text-gray-500">
              Mặt hàng vừa mới được bổ sung vào kệ hàng
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 productListSale">
          {products.slice(0, 10).map((product) => {
            const formatCurrency = (value) => {
              return value.toLocaleString("vi-VN") + "đ";
            };

            return (
              <div className="border shadow rounded-lg p-4 hover:shadow-lg transition-all duration-300 ease-in-out transform product_item">
                <Link to="/product_detials" key={product.product_id}>
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

                <Button className="productCart">
                  <BsCart4 className="text-[2em] pr-2" />
                  Thêm vào giỏ hàng
                </Button>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleShowAll} className="see_more !text-lg mt-4">
            Xem thêm
          </Button>
        </div>
      </section>

      {/* Banner chân cuối trang */}
      <div className="container mx-auto mt-5 mb-5 botBanner">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Banner 1 */}
          <div className="relative">
            <a href="#" className="block w-full h-full">
              <img
                src={Banner1}
                alt="Discount Banner"
                className="w-full h-[13.375em] object-cover transition-opacity duration-300 ease-in-out hover:opacity-80"
              />
            </a>
          </div>

          {/* Banner 2 */}
          <div className="relative">
            <a href="#" className="block w-full h-full">
              <img
                src={Banner2}
                alt="Sale Banner"
                className="w-full h-[13.375em] object-cover transition-opacity duration-300 ease-in-out hover:opacity-80"
              />
            </a>
          </div>

          {/* Banner 3 */}
          <div className="relative">
            <a href="#" className="block w-full h-full">
              <img
                src="https://s3-alpha-sig.figma.com/img/eea8/8e5d/a4cd1953d002281a0c42a8bfa10242c0?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZGu8w0Wa61tUHxOgamiONEryoU0hl-oIQ12CBsf7hcG0HX-F5bCw~y4c-7pQ1IlWG4Okz6i~ZGzJOAt77GWSEuYmyxXxuKJ4-7bKyLQWhTgKs0ZnBHyCdsIJ8OsEIC7t9D0-hHqgvI6u1Qe7Mul5CAdJsjpENrs1xBsJLoAFuito3eJsLfafaVYjmrGk8Xn8hHt7QADGcUjMfZWx1hahwiqNSsEB5S0w1aramJEWEkfnYVGiqWa7sfAKTXJ~SmOIZANe-X2H3sVcWWhni5H-AEYGrLm6jp~0tAcNH0-aV0iLkKnFwWdgdFyT3rphEd1Q-quxOYtoWRKfqZVrNpI41Q__"
                alt="Black Friday Banner"
                className="w-full h-[13.375em] object-cover transition-opacity duration-300 ease-in-out hover:opacity-80"
              />
            </a>
          </div>
        </div>
      </div>

      <ScrollToTopButton />
    </>
  );
};

export default Home;
