import React, { useRef, useEffect, useState } from "react";

const CardLoading = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Hiển thị khi phần tử trong viewport
          }
        });
      },
      { threshold: 0.1 } // Kích hoạt khi 10% của phần tử xuất hiện trong viewport
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white animate-pulse transition-transform duration-700 ${
        isVisible
          ? "transform translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      <div className="min-h-24 bg-blue-50 rounded"></div>
      <div className="p-2 lg:p-3 bg-blue-50 rounded w-20"></div>
      <div className="p-2 lg:p-3 bg-blue-50 rounded"></div>
      <div className="p-2 lg:p-3 bg-blue-50 rounded w-14"></div>
      <div className="flex items-center justify-between gap-3">
        <div className="p-2 lg:p-3 bg-blue-50 rounded w-20"></div>
        <div className="p-2 lg:p-3 bg-blue-50 rounded w-20"></div>
      </div>
    </div>
  );
};

export default CardLoading;
