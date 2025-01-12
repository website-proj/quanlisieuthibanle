import React, { useEffect, useState } from "react";
import "./style.css";

const Popup = () => {
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        const response = await fetch("/API/popup.json");
        const data = await response.json();

        // Lọc popup hợp lệ
        const now = new Date();
        const validPopups = data.filter((popup) => {
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

  if (!popupData) return null;

  return (
    <>
      {/* Overlay làm mờ toàn bộ trang */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 blur-overlay"></div>

      {/* Popup Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
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
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default Popup;
