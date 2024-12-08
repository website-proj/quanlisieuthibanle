import Sidebar from "../../components/Sidebar";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";
import { useState, useEffect } from "react"; // Thêm dòng này

import { LuShoppingCart } from "react-icons/lu";
import ScrollToTopButton from "../../components/ScrollTop";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12); // Số sản phẩm hiển thị ban đầu

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

  return (
    <>
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
              <div className="flex items-center space-x-4 mb-4 Cart">
                <Link to="/#bestseller">
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
                {/* <Link to="/">
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
                    Khuyến mại
                  </Button>
                </Link> */}

                <Link to="/#flashseller">
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
              <div className="grid grid-cols-4 gap-4 productList">
                {products.slice(0, visibleProducts).map((product) => {
                  // Hàm định dạng số tiền
                  const formatCurrency = (value) => {
                    return value.toLocaleString("vi-VN") + "đ";
                  };

                  return (
                    // Bao bọc mỗi product_item bằng Link để chuyển trang khi nhấp vào sản phẩm
                    <Link
                      key={product.product_id}
                      to={`/product_details/${product.product_id}`} // Truyền product_id vào URL
                      className="border rounded-lg p-4 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out transform product_item"
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        {product.discount && (
                          <span className="absolute top-2 left-2 bg-[#1a73e8] text-white text-xs font-semibold px-2 py-1 rounded">
                            {product.discount}
                          </span>
                        )}
                      </div>
                      <div className="mt-4">
                        <h5 className="text-lg font-[400] text-left">
                          {product.name}
                        </h5>
                        <p className="text-sm text-black-500 text-left">
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
                        <Button className="productCart">
                          <LuShoppingCart className="text-[2em] pr-2" />
                          Thêm vào giỏ hàng
                        </Button>
                      </div>
                    </Link>
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
