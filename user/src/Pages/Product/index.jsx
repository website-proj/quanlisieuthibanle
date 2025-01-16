import Slider from "@mui/material/Slider";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import "./style.css";

import { FiShoppingCart } from "react-icons/fi";
import ScrollToTopButton from "../../components/ScrollTop";

import { CartContext } from "../../Context/CartContext";
import SummaryApi, { baseURL } from "../../common/SummaryApi";

const Product = () => {
  const [products, setProducts] = useState([]); // Sản phẩm
  const [loading, setLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const { incrementCartCount } = useContext(CartContext);

  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parentId"); // Lấy parentId từ URL
  const categoryId = searchParams.get("categoryId"); // Lấy categoryId từ URL (nếu có)

  // Hàm gọi API lấy sản phẩm bán chạy
  const fetchBestSellers = async () => {
    if (!parentId) return;

    setLoading(true);
    try {
      const url = categoryId
        ? `${baseURL}${SummaryApi.get_bestseller.url}?parent_id=${parentId}&sub_id=${categoryId}`
        : `${baseURL}${SummaryApi.get_bestseller.url}?parent_id=${parentId}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch bestseller products");

      const data = await response.json();
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching bestseller products:", error);
    } finally {
      setLoading(false);
    }
  };
  // Hàm gọi API lấy sản phẩm bán chạy

  // Hàm gọi API lấy tất cả sản phẩm theo danh mục
  const fetchProducts = async () => {
    if (!parentId) return;

    setLoading(true);
    try {
      const url = categoryId
        ? `${baseURL}${SummaryApi.get_product_categories.url}?parent_category_id=${parentId}&sub_category_id=${categoryId}`
        : `${baseURL}${SummaryApi.get_product_categories.url}?parent_category_id=${parentId}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!parentId) return; // Chỉ tiếp tục nếu có parentId
    fetchProducts(); // Lấy sản phẩm khi trang load
  }, [parentId, categoryId]); // Khi thay đổi categoryId, sản phẩm sẽ được tải lại

  const handleShowAll = () => {
    setVisibleProducts((prev) => prev + 12);
  };

  const { categoryName } = useParams(); // Lấy category từ URL

  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Lưu ID của nút đang được chọn

  const formatCurrency = (num) => num.toLocaleString("vi-VN") + "đ";

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`${baseURL}${SummaryApi.categories.url}`);
        const data = await response.json();

        const parentCategory = Object.keys(data)
          .map((parentName) => ({
            name: parentName,
            subcategories: data[parentName],
          }))
          .find((cat) =>
            cat.subcategories.some((sub) => sub.parent_category_id === parentId)
          );

        if (parentCategory) {
          const filteredSubcategories = categoryId
            ? parentCategory.subcategories.filter(
                (sub) => sub.category_id === categoryId
              )
            : parentCategory.subcategories;

          setSubcategories(filteredSubcategories);
          setSelectedCategoryId(categoryId || null); // Đặt ID danh mục đã chọn
        }
      } catch (error) {
        console.error("Lỗi khi tải danh mục con:", error);
      }
    };

    fetchSubcategories();
  }, [parentId, categoryId]);

  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    // Cập nhật trạng thái danh mục con được chọn
    setSelectedCategoryId(id === selectedCategoryId ? null : id); // Chọn hoặc bỏ chọn
    // Điều này sẽ không làm thay đổi các danh mục con khác, chỉ chọn hoặc bỏ chọn một danh mục con.
    navigate(
      `?parentId=${parentId}&categoryId=${id === selectedCategoryId ? "" : id}`
    );
  };

  const fetchDiscount = async () => {
    if (!parentId) return;

    setLoading(true);
    try {
      const url = categoryId
        ? `${baseURL}${SummaryApi.get_discount.url}?parent_id=${parentId}&sub=${categoryId}`
        : `${baseURL}${SummaryApi.get_discount.url}?parent_id=${parentId}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch discount products");

      const data = await response.json();
      setProducts(data || []); // Lọc các sản phẩm có khuyến mại
    } catch (error) {
      console.error("Error fetching discount products:", error);
    } finally {
      setLoading(false);
    }
  };

  const [value2, setValue2] = useState([10000, 500000]);

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    fetchProductsByPrice(); // Gọi API lọc sản phẩm theo giá
  };

  // Hàm để hiển thị giá trị dưới dạng tiền tệ (nếu cần)

  const fetchProductsByPrice = async () => {
    if (!parentId) return;

    setLoading(true);
    try {
      const url = categoryId
        ? `${baseURL}${SummaryApi.filter_product.url}?parent_cat_id=${parentId}&bottom_price=${value2[0]}&up_price=${value2[1]}&sub_cat_id=${categoryId}`
        : `${baseURL}${SummaryApi.filter_product.url}?parent_cat_id=${parentId}&bottom_price=${value2[0]}&up_price=${value2[1]}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products by price");

      const data = await response.json();
      setProducts(data || []); // Lọc các sản phẩm theo mức giá
    } catch (error) {
      console.error("Error fetching products by price:", error);
    } finally {
      setLoading(false);
    }
  };

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
    <>
      <section className="product_listing_Page">
        <div className="container">
          <div className="productListing flex">
            <div className="w-1/5 mb-4">
              <div className="col1 bg-white p-4 shadow rounded-xl">
                <div className="mb-6">
                  <h6 className="font-medium text-2xl mb-3 text-center">
                    {categoryName}
                  </h6>
                  <div className="h-auto">
                    <ul className="space-y-3">
                      {subcategories.map((sub, idx) => (
                        <li key={idx}>
                          <button
                            className={`block w-full text-left py-2 px-4 rounded-lg transition-all ${
                              selectedCategoryId === sub.category_id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 hover:bg-blue-100"
                            }`}
                            onClick={() => handleButtonClick(sub.category_id)}
                          >
                            {sub.category_name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-8 p-4 bg-white">
                  <h6 className="font-medium text-xl mb-4 text-gray-800">
                    LỌC THEO GIÁ
                  </h6>
                  <Slider
                    value={value2}
                    onChange={handleChange2} // Khi thay đổi giá trị, gọi fetchProductsByPrice
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => formatCurrency(value)}
                    min={10000}
                    max={500000}
                    step={5000}
                    disableSwap
                    valueLabelPlacement="top"
                    sx={{
                      width: "100%",
                      "& .MuiSlider-thumb": {
                        backgroundColor: "#1976d2", // Màu của đầu kéo
                        border: "2px solid #fff", // Viền trắng cho đầu kéo
                        width: 24, // Kích thước đầu kéo
                        height: 24, // Kích thước đầu kéo
                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)", // Hiệu ứng bóng cho đầu kéo
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "#ddd", // Màu đường ray
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "#1976d2", // Màu của thanh kéo
                      },
                      "& .MuiSlider-valueLabel": {
                        backgroundColor: "transparent", // Không hiển thị nền của nhãn giá trị
                        color: "#000", // Màu chữ nhãn giá trị
                      },
                    }}
                  />

                  <div className="flex justify-between text-sm pt-2 text-gray-700">
                    <span>
                      Từ:{" "}
                      <strong className="text-red-400">
                        {formatCurrency(value2[0])}
                      </strong>
                    </span>
                    <span>
                      Đến:{" "}
                      <strong className="text-red-400">
                        {formatCurrency(value2[1])}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-4/5 pl-4 mb-6 Cart">
              <div className="flex items-center space-x-4 mb-4">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                    borderRadius: "10px",
                    "&:hover": { backgroundColor: "#F0F0F0" },
                  }}
                  className="capitalize"
                  onClick={fetchBestSellers} // Gọi API bán chạy khi nhấn nút
                >
                  Bán chạy
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                    borderRadius: "10px",
                    "&:hover": { backgroundColor: "#F0F0F0" },
                  }}
                  className="capitalize"
                  onClick={fetchDiscount} // Gọi API khuyến mại khi nhấn nút
                >
                  Khuyến mại
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-8 productList">
                {products.slice(0, visibleProducts).map((product) => (
                  <div
                    className="border flex flex-col justify-between rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300 ease-in-out transform product_item"
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
                        {product.discount > 0 && (
                          <span className="absolute top-[0.5em] left-0 bg-[#1a73e8] text-white text-xs font-semibold px-2 py-1 rounded">
                            {product.discount}%
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
                      onClick={(e) => handleAddToCart(e, product, 1)} // Sử dụng số lượng mặc định là 1
                      className="productCart flex items-center whitespace-nowrap"
                    >
                      <FiShoppingCart className="text-[2em] mt-auto pr-2" />
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                ))}
              </div>

              {/* <div className="flex justify-center items-center all_pro_bot">
                <Button onClick={handleShowAll} className="hover:text-gray-600">
                  {loading ? "Đang tải..." : "Xem thêm sản phẩm"}
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <ScrollToTopButton />
    </>
  );
};

export default Product;
