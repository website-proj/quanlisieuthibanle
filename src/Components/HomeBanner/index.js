import React from "react";
import Slider from "react-slick";

const HomeBanner = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };
  return (
    <>
      <div className="homeBannerSection">
        <Slider {...settings}>
          <div className="item">
            <img
              src="https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427522/1731427519864_New_Project_11.jpg"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427470/1731427468095_New_Project_13.jpg"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427522/1731427519864_New_Project_11.jpg"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427470/1731427468095_New_Project_13.jpg"
              className="w-100"
            />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default HomeBanner;
