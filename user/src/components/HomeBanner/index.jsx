import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";
import { baseURL } from "../../common/SummaryApi"; // Import baseURL từ SummaryApi

const HomeBanner = () => {
  const [banners, setBanners] = useState([]);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Sử dụng fetch để lấy dữ liệu từ API của bạn
        const response = await fetch(`${baseURL}/api/banner/main`);
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu từ API");
        }
        const data = await response.json();

        // Set dữ liệu banner vào state
        setBanners(data.data);
      } catch (error) {
        console.error("Lỗi lấy banner :", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <>
      <div className="homeSlide py-4">
        <div className="px-[5em]">
          <Swiper
            key={banners.length}
            loop={true}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 5000, // 5 seconds
              disableOnInteraction: false,
            }}
            className="sliderHome"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.banner_id}>
                <div className="relative overflow-hidden">
                  <img
                    src={banner.image}
                    alt={`Banner ${banner.banner_id}`}
                    className="w-full h-[25em]  object-cover  bannerImg"
                  />
                  <div className="absolute bottom-10 left-10">
                    <a
                      onClick={() => {
                        const section = document.getElementById("flashseller");
                        if (section) {
                          section.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="px-6 py-3 text-black bg-white rounded-xl text-xl hover:bg-gradient-to-r hover:from-[#6297DB] hover:to-[#1EECFF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 cursor-pointer"
                    >
                      MUA NGAY
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
