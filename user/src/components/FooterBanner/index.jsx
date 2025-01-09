import React, { useState, useEffect } from "react";

const FooterBanner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Lấy thông tin banner từ API
    fetch("/API/footerBanner.json")
      .then((response) => response.json())
      .then((data) => setBanners(data))
      .catch((error) => console.error("Error fetching footer banners:", error));
  }, []);

  return (
    <div className="container mx-auto mt-5 mb-5 botBanner">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {banners.map((banner, index) => (
          <div key={index} className="relative r">
            <a href={banner.link} className="block w-full h-full">
              <img
                src={banner.image}
                alt={banner.altText}
                className="w-full h-[13.375em] rounded-md shadow object-cover transition-opacity duration-300 ease-in-out hover:opacity-80"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterBanner;
