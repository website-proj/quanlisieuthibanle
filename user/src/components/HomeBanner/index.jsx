import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";

const HomeBanner = () => {
  const [banners, setBanners] = useState([]);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("/API/homeBanner.json");
        const data = await response.json();
        setBanners(data);
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
                    className="w-full h-[25em] bg-cover bg-center object-cover bannerImg"
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
