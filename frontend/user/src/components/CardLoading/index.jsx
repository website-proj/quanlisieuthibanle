import React, { useRef, useEffect, useState, useCallback } from "react";

const CardLoading = () => {
  const [data, setData] = useState([]); // Dữ liệu hiển thị
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải dữ liệu
  const observerRef = useRef(null);

  // Hàm để tải thêm dữ liệu
  const fetchData = useCallback(() => {
    if (isLoading) return; // Nếu đang tải thì không gọi lại

    setIsLoading(true);
    // Giả lập tải dữ liệu (có thể thay bằng API thực tế)
    setTimeout(() => {
      const newData = Array.from(
        { length: 10 }, // Giả lập tải thêm 10 mục dữ liệu
        (_, i) => `Item ${data.length + i + 1}`
      );
      setData((prevData) => [...prevData, ...newData]);
      setIsLoading(false);
    }, 1000); // Giả lập thời gian tải 1 giây
  }, [data, isLoading]);

  // Intersection Observer để phát hiện khi cuộn đến cuối danh sách
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          fetchData(); // Tải thêm dữ liệu khi phần tử trong viewport
        }
      },
      { threshold: 1.0 } // Ngưỡng khi phần tử đã vào hết viewport
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchData, isLoading]);

  return (
    <div>
      <div className="grid gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="border h-48 py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded-xl bg-white"
          >
            <div className="text-lg font-bold">{item}</div>
            <div className="min-h-24 bg-blue-50 rounded"></div>
            <div className="p-2 lg:p-3 bg-blue-50 rounded w-20"></div>
            <div className="p-2 lg:p-3 bg-blue-50 rounded"></div>
            <div className="p-2 lg:p-3 bg-blue-50 rounded w-14"></div>
            <div className="flex items-center justify-between gap-3">
              <div className="p-2 lg:p-3 bg-blue-50 rounded w-20"></div>
              <div className="p-2 lg:p-3 bg-blue-50 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Phần tử quan sát để phát hiện cuộn */}
      <div ref={observerRef} className="h-10"></div>

      {/* Hiển thị trạng thái đang tải */}
      {isLoading && <div className="text-center py-4">Loading...</div>}
    </div>
  );
};

export default CardLoading;
