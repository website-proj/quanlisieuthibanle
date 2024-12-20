import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";

import slideBanner1 from "../../assets/images/slideBanner1.jpg";
import slideBanner2 from "../../assets/images/slideBanner2.jpg";

const HomeBanner = () => {
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
            <SwiperSlide>
              <div className="relative overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427522/1731427519864_New_Project_11.jpg"
                  alt="Banner 1"
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
            <SwiperSlide>
              <div className="relative overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427470/1731427468095_New_Project_13.jpg"
                  alt="Banner 2"
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
            <SwiperSlide>
              <div className="relative overflow-hidden">
                <img
                  src={slideBanner1}
                  alt="Banner 3"
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
            <SwiperSlide>
              <div className="relative overflow-hidden">
                <img
                  src={slideBanner2}
                  alt="Banner 4"
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
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
