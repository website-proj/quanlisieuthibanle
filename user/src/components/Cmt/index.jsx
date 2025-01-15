import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import SummaryApi, { baseURL } from "../../common/SummaryApi"; // Import SummaryApi

const Cmt = ({ productId }) => {
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [orderStatus, setOrderStatus] = useState(""); // Trạng thái đơn hàng: "Đã giao", "Đang giao", "Chưa mua"
  const [orderId, setOrderId] = useState(null); // Thêm state để lưu orderId

  // Kiểm tra trạng thái đơn hàng và lấy orderId
  useEffect(() => {
    const fetchOrderId = async () => {
      try {
        const token = localStorage.getItem("token")?.split(" ")[1];
        if (!token) return;

        // Gọi API để lấy danh sách đơn hàng
        const response = await axios.get(`${baseURL}${SummaryApi.orders.url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Lọc ra đơn hàng có trạng thái "Delivered" hoặc trạng thái hợp lệ khác
        const deliveredOrder = response.data.data.find(
          (order) => order.status === "Delivered"
        );

        if (deliveredOrder) {
          setOrderId(deliveredOrder.order_id); // Lưu orderId vào state
          setOrderStatus(deliveredOrder.status); // Lưu trạng thái đơn hàng vào state
        } else {
          setAlertMessage("Bạn chưa có đơn hàng đã giao.");
          setAlertSeverity("warning");
          setAlertOpen(true);
          setTimeout(() => setAlertOpen(false), 3000);
        }
      } catch (error) {
        console.error("Lỗi khi lấy trạng thái đơn hàng:", error);
      }
    };

    fetchOrderId();
  }, []);

  const handleSubmit = async () => {
    if (rating === 0 || reviewText.trim() === "") {
      setAlertMessage("Vui lòng chọn số sao và nhập đánh giá!");
      setAlertSeverity("error");
      setAlertOpen(true);
      setTimeout(() => setAlertOpen(false), 3000);
    } else if (!orderId) {
      setAlertMessage("Không tìm thấy đơn hàng hợp lệ để đánh giá.");
      setAlertSeverity("error");
      setAlertOpen(true);
      setTimeout(() => setAlertOpen(false), 3000);
    } else {
      try {
        const token = localStorage.getItem("token")?.split(" ")[1];
        if (!token) return;

        // Sử dụng SummaryApi để gọi API tạo đánh giá
        const response = await axios({
          url: `${baseURL}${SummaryApi.create_reviews.url}`, // Kết hợp baseURL và URL của API
          method: SummaryApi.create_reviews.method,
          data: {
            order_id: orderId, // Sử dụng orderId từ state
            product_id: productId, // Sử dụng productId từ prop
            rating: rating,
            comment: reviewText,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setAlertMessage("Đánh giá của bạn đã được gửi!");
          setAlertSeverity("success");
          setAlertOpen(true);
          setTimeout(() => setAlertOpen(false), 3000);
          setRating(0);
          setHover(0);
          setReviewText("");
        }
      } catch (error) {
        setAlertMessage("Đã có lỗi xảy ra. Vui lòng thử lại!");
        setAlertSeverity("error");
        setAlertOpen(true);
        setTimeout(() => setAlertOpen(false), 3000);
      }
    }
  };

  return (
    <div className="ml-[4%] mr-[5%] mx-auto p-6 mt-3 bg-white">
      {orderStatus === "not_purchased" && (
        <Alert severity="error">Bạn cần mua sản phẩm trước khi đánh giá!</Alert>
      )}
      {orderStatus === "shipping" && (
        <Alert severity="warning">
          Đơn hàng của bạn đang giao, bạn không thể đánh giá ngay lúc này.
        </Alert>
      )}
      {orderStatus === "Delivered" && (
        <>
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
                  (hover || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
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
        </>
      )}

      <Collapse in={alertOpen}>
        <Alert severity={alertSeverity} className="mt-4">
          {alertMessage}
        </Alert>
      </Collapse>
    </div>
  );
};

export default Cmt;
