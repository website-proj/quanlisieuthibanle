import RangeSlider from "react-range-slider-input";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const { incrementCartCount } = useContext(CartContext);

  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parentId"); // Lấy parentId từ URL
  const categoryId = searchParams.get("categoryId"); // Lấy categoryId từ URL (nếu có)

  useEffect(() => {
    if (!parentId) return; // Chỉ tiếp tục nếu có parentId

    const fetchProducts = async () => {
      try {
        const url = categoryId
          ? `${baseURL}${SummaryApi.get_product_categories.url}?parent_category_id=${parentId}&sub_category_id=${categoryId}`
          : `${baseURL}${SummaryApi.get_product_categories.url}?parent_category_id=${parentId}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
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

  return (
    <>
      <section className="product_listing_Page">
        <div className="container">
          <div className="productListing flex">
            <div className="w-1/5">
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
              </div>
            </div>
            <div className="w-4/5 pl-4 Cart">
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
                >
                  Khuyến mại
                </Button>
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
