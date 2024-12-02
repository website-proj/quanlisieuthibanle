import React, { useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowCircleDown } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ProductItem = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      img: "https://hcm.fstorage.vn/images/2024/11/10005245-20241109105624.jpg",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      price: "28.000đ",
      discount: "50%",
    },
    {
      id: 2,
      img: "https://hcm.fstorage.vn/images/2024/07/blockwarp_probi_vq_65ml_0001-20240717072954.png",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      price: "28.000đ",
      discount: "60%",
    },
    {
      id: 3,
      img: "https://hcm.fstorage.vn/images/2024/11/10005245-20241109105624.jpg",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      price: "28.000đ",
      discount: "80%",
    },
    {
      id: 4,
      img: "https://hcm.fstorage.vn/images/2024/07/hu-sca-100g0024-20240717065924.png",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      price: "28.000đ",
      discount: "55%",
    },
    {
      id: 5,
      img: "https://hcm.fstorage.vn/images/2022/162427267592210625162-g4-thung-48-hop-sua-tuoi-tiet-trung-vinamilk-cu-duong-180ml-og.jpg",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      price: "28.000đ",
      discount: "65%",
    },
  ]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dữ liệu giả lập khi "Xem thêm"
  const moreProducts = [
    {
      id: 6,
      img: "https://hcm.fstorage.vn/images/2024/11/10005245-20241109105624.jpg",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      price: "28.000đ",
      discount: "50%",
    },
    {
      id: 7,
      img: "https://hcm.fstorage.vn/images/2024/07/blockwarp_probi_vq_65ml_0001-20240717072954.png",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      price: "28.000đ",
      discount: "60%",
    },
    {
      id: 8,
      img: "https://hcm.fstorage.vn/images/2024/11/10005245-20241109105624.jpg",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      price: "28.000đ",
      discount: "80%",
    },
    {
      id: 9,
      img: "https://hcm.fstorage.vn/images/2024/07/hu-sca-100g0024-20240717065924.png",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      price: "28.000đ",
      discount: "55%",
    },
    {
      id: 10,
      img: "https://hcm.fstorage.vn/images/2022/162427267592210625162-g4-thung-48-hop-sua-tuoi-tiet-trung-vinamilk-cu-duong-180ml-og.jpg",
      title: "Sữa chua nha đam Vinamilk hộp 100g * 4",
      unit: "4 hộp",
      price: "28.000đ",
      discount: "65%",
    },
  ];

  const handleViewMore = () => {
    setLoading(true);
    // Giả lập thời gian tải dữ liệu (chẳng hạn như gọi API)
    setTimeout(() => {
      setProducts((prev) => [...prev, ...moreProducts]); // Thêm sản phẩm mới vào danh sách
      setLoading(false); // Tắt trạng thái tải
    }, 2000); // Thời gian chờ 2 giây giả lập
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
                    </div>
                    <div className="info">
                      <h4>{product.title}</h4>
                      <p>ĐVT: {product.unit}</p>
                      <div className="d-flex">
                        <span>{product.price}</span>
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
                    </div>
                    <div className="info">
                      <h4>{product.title}</h4>
                      <p>ĐVT: {product.unit}</p>
                      <div className="d-flex">
                        <span>{product.price}</span>
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
        <div className="viewAllBtn ">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
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

export default ProductItem;
