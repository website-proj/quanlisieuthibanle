// import Button from "@mui/material/Button";
import HomeBanner from "../../Components/HomeBanner";
import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";

import Timer from "../../Components/Timer";

import ProductSale from "../../Components/Product_Sale";
import ProductItem from "../../Components/ProductItem";
import Banner1 from "../../assets/imgages/banner3.jpg";
import Banner2 from "../../assets/imgages/banner4.jpg";
import BackToTop from "../../Components/ScrollTop";

const Home = () => {
  var productSliderOptions = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <>
      <div>
        <BackToTop />
        {/* Các nội dung khác của trang có thể thêm sau này */}
      </div>
      <HomeBanner />

      <Timer duration={2 * 24 * 60 * 60 * 1000} />
      <ProductSale />

      <div className="container">
        <div className="row">
          <div className="bestSeller">
            <span className="best">Giảm giá</span>
          </div>
        </div>
      </div>
      <ProductSale />

      <div className="container">
        <div className="row">
          <div className="bestSeller">
            <span className="best">Bán chạy nhất</span>
          </div>
        </div>
      </div>
      <ProductItem />
      <div className="container">
        <div className="row">
          <div className="bestSeller">
            <span className="best">Sản phẩm mới nhất</span>
          </div>
        </div>
      </div>
      <ProductItem />

      {/* Banner row */}
      <div className="container">
        <div className="row">
          <div className="san-pham-items banner-row">
            <div className="san-pham-item-banner">
              <a href="#" className="banner-link">
                <img src={Banner1} alt="Discount Banner" />
              </a>
            </div>
            <div className="san-pham-item-banner">
              <a href="#" className="banner-link">
                <img src={Banner2} alt="Sale Banner" />
              </a>
            </div>
            <div className="san-pham-item-banner">
              <a href="#" className="banner-link">
                <img src={Banner1} alt="Black Friday Banner" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
