import React, { useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowCircleDown } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ProductSale = () => {
  const products = [
    {
      id: 1,
      img: "https://hcm.fstorage.vn/images/2024/11/10005245-20241109105624.jpg",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      old_price: "28.000đ",
      discount: "50%",
      new_price: "24.000đ",
    },
    {
      id: 2,
      img: "https://hcm.fstorage.vn/images/2024/07/blockwarp_probi_vq_65ml_0001-20240717072954.png",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      old_price: "28.000đ",
      discount: "60%",
      new_price: "24.000đ",
    },
    {
      id: 3,
      img: "https://hcm.fstorage.vn/images/2024/11/10005245-20241109105624.jpg",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      old_price: "28.000đ",
      discount: "80%",
      new_price: "24.000đ",
    },
    {
      id: 4,
      img: "https://hcm.fstorage.vn/images/2024/07/hu-sca-100g0024-20240717065924.png",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      old_price: "28.000đ",
      discount: "55%",
      new_price: "24.000đ",
    },
    {
      id: 5,
      img: "https://hcm.fstorage.vn/images/2022/162427267592210625162-g4-thung-48-hop-sua-tuoi-tiet-trung-vinamilk-cu-duong-180ml-og.jpg",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      old_price: "28.000đ",
      discount: "65%",
      new_price: "24.000đ",
    },
  ];
  const [loading, setLoading] = useState(false);

  const handleViewMore = () => {
    setLoading(true);
    // Mô phỏng tải dữ liệu (thời gian chờ)
    setTimeout(() => {
      setLoading(false);
      // Thay bằng logic thực tế của bạn
    }, 2000);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="productRow">
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="item productItem">
                  <div className="pro">
                    <div className="imgWrapper">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-100"
                      />

                      <span className="badge badge-primary">
                        {product.discount}
                      </span>
                    </div>
                    <div className="info">
                      <h4>{product.title}</h4>
                      <p>ĐVT: {product.unit}</p>
                      <div className="d-flex">
                        <span className="oldPrice">{product.old_price}</span>
                        <span className="newPrice text-danger ml-2">
                          {product.new_price}
                        </span>
                      </div>
                      <Button className="add-item-card">
                        <span>Thêm vào giỏ hàng</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="row">
        <div className="productRow">
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="item productItem">
                  <div className="pro">
                    <div className="imgWrapper">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-100"
                      />

                      <span className="badge badge-primary">
                        {product.discount}
                      </span>
                    </div>
                    <div className="info">
                      <h4>{product.title}</h4>
                      <p>ĐVT: {product.unit}</p>
                      <div className="d-flex">
                        <span className="oldPrice">{product.old_price}</span>
                        <span className="newPrice text-danger ml-2">
                          {product.new_price}
                        </span>
                      </div>
                      <Button className="add-item-card">
                        <span>Thêm vào giỏ hàng</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="row">
        <div className="viewAllBtn">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Đang đợi tải...</p>
            </div>
          ) : (
            <Button onClick={handleViewMore}>
              Xem thêm sản phẩm <FaArrowCircleDown />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSale;
