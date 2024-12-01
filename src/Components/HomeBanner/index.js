import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";

import slideBanner1 from "../../assets/imgages/slideBanner1.jpg";
import slideBanner2 from "../../assets/imgages/slideBanner2.jpg";

const HomeBanner = () => {
  return (
    <>
      <div className="homeBannerSection">
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <div className="item">
              <img
                src="https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427522/1731427519864_New_Project_11.jpg"
                className="w-100"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <img
                src="https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427470/1731427468095_New_Project_13.jpg"
                className="w-100"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <img src={slideBanner1} className="w-100" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <img src={slideBanner2} className="w-100" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default HomeBanner;
