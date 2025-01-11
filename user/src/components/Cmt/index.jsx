import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

const Cmt = () => {
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [alertOpen, setAlertOpen] = useState(false); // Trạng thái hiển thị alert
  const [alertMessage, setAlertMessage] = useState(""); // Nội dung của alert
  const [alertSeverity, setAlertSeverity] = useState("success"); // Loại alert (success, error, etc.)

  const handleSubmit = () => {
    if (rating === 0 || reviewText.trim() === "") {
      setAlertMessage("Vui lòng chọn số sao và nhập đánh giá!");
      setAlertSeverity("error");
      setAlertOpen(true);

      // Tự động tắt Alert sau 3 giây
      setTimeout(() => setAlertOpen(false), 3000);
    } else {
      setAlertMessage("Đánh giá của bạn đã được gửi!");
      setAlertSeverity("success");
      setAlertOpen(true);

      // Tự động tắt Alert sau 3 giây
      setTimeout(() => setAlertOpen(false), 3000);

      // Reset form
      setRating(0);
      setHover(0);
      setReviewText("");
    }
  };

  return (
    <div className="ml-[4%] mr-[5%] mx-auto p-6 mt-3 bg-white">
      <p className="text-md font-[600] text-left mb-4 text-gray-700">
        Viết đánh giá
      </p>
      <textarea
        className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Viết đánh giá sản phẩm"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <div className="flex items-center mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl cursor-pointer ${
              (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
            }`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <button
        className="w-full mt-6 py-2 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-500 transition duration-200"
        onClick={handleSubmit}
      >
        Đánh giá
      </button>

      {/* Hiển thị Alert */}
      <Collapse in={alertOpen}>
        <Alert severity={alertSeverity} className="mt-4">
          {alertMessage}
        </Alert>
      </Collapse>
    </div>
  );
};

export default Cmt;
