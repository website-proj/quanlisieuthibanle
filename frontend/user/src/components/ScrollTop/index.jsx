import React, { useState, useEffect } from "react";
import "./style.css"; // Đảm bảo có CSS cho nút
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        // Ngưỡng hiển thị nút, có thể tùy chỉnh
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Hiệu ứng trượt mượt mà
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "0rem",
            backgroundColor: "#ffffff",
            color: "#000",
            border: "none",
            padding: "0.75rem 1.25rem",
            borderRadius: "50%",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            cursor: "pointer",
            zIndex: 1000,
            transition: "opacity 0.3s",
          }}
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
