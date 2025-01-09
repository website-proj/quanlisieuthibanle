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
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <>
      <div className="homeSlide py-4">
        <div className="px-[5em]">
          <Swiper
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
                    className="w-full h-[25em] object-cover bannerImg"
                  />
                  <div className="absolute bottom-10 left-10">
                    <a
                      onClick={() => {
                        const section = document.getElementById("flashseller");
                        if (section) {
                          section.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="px-6 py-3 text-white bg-blue-900 rounded-full hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 cursor-pointer"
                    >
                      Mua ngay
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
