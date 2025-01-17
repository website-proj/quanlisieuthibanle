import React, { useState, useEffect } from "react";
import axios from "axios";
import SummaryApi, { baseURL } from "../../common/SummaryApi";
import "./style.css";

const BannerSlide = () => {
  const [banners, setBanners] = useState([]); // Lưu trữ nhiều banner
  const [loading, setLoading] = useState(true); // Biến trạng thái tải
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0); // Chỉ số banner hiện tại

  useEffect(() => {
    // Lấy thông tin banner từ API
    axios({
      method: "get",
      url: `${baseURL}${SummaryApi.bannerSlide.url}`,
    })
      .then((response) => {
        // Set dữ liệu banner khi thành công
        setBanners(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching banner slide:", error);
        setLoading(false);
      });
  }, []);

  // Hàm chuyển sang banner tiếp theo
  const nextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // Hàm quay lại banner trước
  const prevBanner = () => {
    setCurrentBannerIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };

  return (
    <div className="xl:w-1/4 lg:w-1/4 md:w-2/5 sm:w-1/2 p-2 banner sticky top-0 h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="spinner"></div> {/* Thêm vòng xoay loading */}
        </div>
      ) : (
        <div>
          {/* Hiển thị một banner duy nhất */}
          <img
            loading="lazy"
            src={banners[currentBannerIndex].image}
            alt="banner"
            className="cursor-pointer"
            style={{
              height: "41.5em",
              borderRadius: "0.5em",
              transition: "opacity 0.5s ease", // Hiệu ứng chuyển mờ khi ảnh tải xong
              opacity: loading ? 0 : 1, // Làm mờ ảnh khi đang tải
            }}
            onLoad={() => setLoading(false)} // Đặt trạng thái tải về false khi ảnh đã tải xong
          />
        </div>
      )}
    </div>
  );
};

export default BannerSlide;
