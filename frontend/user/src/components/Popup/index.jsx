import React, { useEffect, useState, useRef } from "react";
import axios from "axios"; // Đảm bảo bạn đã cài axios
import { baseURL } from "../../common/SummaryApi"; // Đảm bảo đường dẫn đúng tới SummaryApi
import "./style.css";

const Popup = () => {
  const [popupData, setPopupData] = useState(null);
  const popupRef = useRef(null); // Sử dụng ref để tham chiếu đến phần tử popup

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        // Gửi yêu cầu GET tới API để lấy thông tin popup
        const response = await axios.get(`${baseURL}${"/api/popup/"}`);

        // Lọc popup hợp lệ
        const now = new Date();
        const validPopups = response.data.data.filter((popup) => {
          const startDate = new Date(popup.start_date);
          const endDate = popup.end_date ? new Date(popup.end_date) : null;

          return (
            popup.status === "Active" &&
            startDate <= now &&
            (!endDate || endDate >= now)
          );
        });

        // Chọn ngẫu nhiên một popup từ danh sách hợp lệ
        if (validPopups.length > 0) {
          const randomPopup =
            validPopups[Math.floor(Math.random() * validPopups.length)];
          setPopupData(randomPopup);

          // Ngăn cuộn khi popup hiển thị
          document.body.style.overflow = "hidden";
        }
      } catch (error) {
        console.error("Error fetching popup data:", error);
      }
    };

    fetchPopupData();

    // Cleanup: Gỡ ngăn cuộn khi component bị unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Hiệu ứng mờ cho các phần tử khi popup hiển thị
  useEffect(() => {
    const header = document.querySelector("header"); // Lấy phần tử header
    const mainContent = document.querySelector("main"); // Lấy phần tử main (nếu cần)

    if (popupData) {
      header?.classList.add("blur");
      mainContent?.classList.add("blur");
    } else {
      header?.classList.remove("blur");
      mainContent?.classList.remove("blur");
    }

    // Cleanup: Gỡ hiệu ứng mờ khi component bị unmount
    return () => {
      header?.classList.remove("blur");
      mainContent?.classList.remove("blur");
    };
  }, [popupData]);

  const handleClose = () => {
    setPopupData(null);

    // Bỏ ngăn cuộn khi đóng popup
    document.body.style.overflow = "auto";
  };

  // Lắng nghe sự kiện click ngoài popup để đóng popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Kiểm tra nếu click ngoài vùng popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClose();
      }
    };

    // Thêm sự kiện click lắng nghe
    window.addEventListener("click", handleClickOutside);

    // Cleanup: Gỡ sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (!popupData) return null;

  return (
    <>
      {/* Overlay làm mờ toàn bộ trang */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 blur-overlay"></div>

      {/* Popup Content */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center mt-16"
        ref={popupRef} // Gán ref cho popup content
      >
        <div className="relative bg-white rounded-[0.625em] shadow-lg max-w-md">
          <button
            className="absolute top-[-0.4em] right-[-0.4em] bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-[600] hover:bg-red-700"
            onClick={handleClose}
          >
            X
          </button>
          <img
            src={popupData.image}
            alt="popup-banner"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>
    </>
  );
};

export default Popup;
