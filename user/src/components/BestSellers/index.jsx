import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { BsCart4 } from "react-icons/bs";

const BestSellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Lấy sản phẩm bán chạy nhất từ API
    fetch("/API/best_sellers.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Error fetching best seller products:", error)
      );
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN") + "đ";
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section>
      <div className="flex items-center justify-between px-6 py-4 rounded-lg text_list">
        {/* Text Section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-black text-left shadow-text">
            Bán chạy nhất
          </h3>
          <p className="text-sm text-gray-500">
            Sản phẩm được khách hàng ưa chuộng
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 productListSale">
        {(showAll ? products : products.slice(0, 10)).map((product) => (
          <div
            className="border shadow rounded-lg p-4 hover:shadow-lg transition-all duration-300 ease-in-out transform product_item"
            key={product.product_id}
          >
            <Link to={`/product_detials/${product.product_id}`}>
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
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button onClick={handleShowAll} className="see_more !text-lg mt-4">
          {showAll ? "Ẩn bớt" : "Xem thêm"}
        </Button>
      </div>
    </section>
  );
};

export default BestSellerProducts;
