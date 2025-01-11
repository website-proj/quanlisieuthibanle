import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios"; // Import axios để gọi API
import "./style.css";
import Cmt from "../Cmt";

function Reviews() {
  const [reviews, setReviews] = React.useState([]); // State để lưu các bình luận
  const [currentPage, setCurrentPage] = React.useState(1);
  const reviewsPerPage = 5;

  // Gọi API để lấy dữ liệu bình luận
  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/API/review.json"); // Gọi API lấy dữ liệu bình luận
        setReviews(response.data); // Cập nhật reviews với dữ liệu nhận được
      } catch (error) {
        console.error("Lỗi khi tải bình luận:", error);
      }
    };

    fetchReviews();
  }, []);

  // Cuộn lên đầu tiêu đề khi trang hiện tại thay đổi
  React.useEffect(() => {
    const titleElement = document.querySelector(".text_describe");
    if (titleElement) {
      titleElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]); // Theo dõi thay đổi của currentPage

  // Tính toán các bình luận cần hiển thị dựa trên trang hiện tại
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleChange = (event, value) => {
    setCurrentPage(value); // Cập nhật trạng thái trang hiện tại
  };

  // Hàm format lại ngày giờ
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      weekday: "short", // Thứ
      year: "numeric", // Năm
      month: "numeric", // Tháng
      day: "numeric", // Ngày
      hour: "numeric", // Giờ
      minute: "numeric", // Phút
    });
  };

  return (
    <>
      <div className="flex flex-col mt-5 mb-5">
        <h3 className="text-lg font-[600] text-black text-left text-shadow text_describe ml-[1.6em] shadow-text">
          Đánh giá sản phẩm
        </h3>
      </div>

      <div className=" ml-[1.5%] bg-white border rounded-2xl p-4 shadow-lg">
        <div className="mt-4 space-y-4">
          {currentReviews.map((review) => (
            <div key={review.id} className="flex items-center p-4 rounded ">
              {/* Cột 1: Ảnh người dùng */}
              <div className="w-12 h-12 rounded-full mr-4">
                <img
                  src={review.userImage}
                  alt={review.user}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* Cột 2: Tên và Ngày đăng */}
              <div className="flex flex-col flex-1 mr-4">
                <p className="font-[600] text-left ml-10">{review.user}</p>
                <p className="text-sm text-gray-500 text-left ml-10">
                  {formatDate(review.date)}
                </p>
              </div>

              {/* Cột 3: Số sao đánh giá */}
              <div className="flex justify-center items-center mr-4">
                <p className="text-center text-yellow-500 text-xl">
                  {"★".repeat(review.rating)}{" "}
                  <span className="text-gray-600 text-sm ">
                    ({review.rating})
                  </span>
                </p>
              </div>

              {/* Cột 4: Bình luận */}
              <div className="flex flex-col flex-1">
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <Cmt />

        {/* Phân trang */}
        <Stack spacing={2} className="mt-4 pagination">
          <Pagination
            count={Math.ceil(reviews.length / reviewsPerPage)} // Tính toán số trang
            page={currentPage}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
      </div>
    </>
  );
}

export default Reviews;
