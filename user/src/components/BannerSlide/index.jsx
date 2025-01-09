import React, { useState, useEffect } from "react";

const BannerSlide = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    // Lấy thông tin banner từ API
    fetch("/API/bannerSlide.json")
      .then((response) => response.json())
      .then((data) => setBanner(data))
      .catch((error) => console.error("Error fetching banner slide:", error));
  }, []);

  return (
    <div className="w-1/4 p-2 banner sticky top-0 h-screen">
      {banner ? (
        <img
          src={banner.image}
          alt="banner"
          className="cursor-pointer"
          style={{ height: "41.5em", borderRadius: "0.5em" }}
        />
      ) : (
        <p>Loading banner...</p>
      )}
    </div>
  );
};

export default BannerSlide;
