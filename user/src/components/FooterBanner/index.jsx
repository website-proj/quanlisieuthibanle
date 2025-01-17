import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../common/SummaryApi"; // Đảm bảo import đúng baseURL từ SummaryApi
import "./style.css";

const BannerSlide = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Lấy thông tin banner từ API
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/banner/bottom`);
        // Trộn mảng banner và lấy 3 banner ngẫu nhiên
        const shuffledBanners = response.data.data.sort(
          () => Math.random() - 0.5
        );
        setBanners(shuffledBanners.slice(0, 3)); // Lấy 3 banner ngẫu nhiên
      } catch (error) {
        console.error("Error fetching footer banners:", error);
      }
    };

    fetchBanners();
  }, []); // Dùng [] để chỉ gọi một lần khi component được mount

  return (
    <div className="container mx-auto mt-5 mb-5 botBanner">
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-5">
        {banners.map((banner, index) => (
          <div key={index} className="relative">
            <a href={banner.link || "#"} className="block w-full h-full">
              <img
                src={banner.image}
                alt={banner.banner_id}
                className="w-full   sm:h-[5em] lg:h-[10em] h-[13.375em] rounded-md shadow object-cover transition-opacity duration-300 ease-in-out hover:opacity-80 "
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlide;
