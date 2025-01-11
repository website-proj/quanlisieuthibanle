import React, { useState } from "react";

const Cmt = () => {
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = () => {
    if (rating === 0 || reviewText.trim() === "") {
      alert("Vui lòng chọn số sao và nhập đánh giá!");
    } else {
      alert("Đánh giá của bạn đã được gửi!"); // Thông báo thành công
      // Reset form
      setRating(0);
      setHover(0);
      setReviewText("");
    }
  };

  return (
    <div className="ml-[4%] mr-[5%] mx-auto p-6 mt-3 bg-white ">
      <p className="text-md font-[600] text-left mb-4 text-gray-700 ">
        Viết đánh giá
      </p>
      <textarea
        className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Write a Review"
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
    </div>
  );
};

export default Cmt;
