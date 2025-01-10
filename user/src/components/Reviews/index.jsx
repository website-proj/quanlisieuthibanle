import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./style.css";

// Giả lập API trả về các bình luận với ngày và giờ
function Reviews() {
  const reviews = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      rating: 5,
      comment: "Sản phẩm rất tốt",
      date: "2024-12-08 14:30:00",
      userImage: "https://randomuser.me/api/portraits/men/1.jpg", // Ví dụ ảnh người dùng
    },
    {
      id: 2,
      user: "Hehe",
      rating: 4,
      comment: "Sản phẩm dùng rất tốt",
      date: "2024-12-08 13:30:00",
      userImage: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      user: "Hihi",
      rating: 4,
      comment: "Chất lượng ổn",
      date: "2024-12-07 16:20:00",
      userImage: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      user: "Haha",
      rating: 4,
      comment: "Giá cả hợp lý",
      date: "2024-12-07 18:15:00",
      userImage: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      user: "Khà khà",
      rating: 4,
      comment: "Không có chỗ che",
      date: "2024-12-06 10:10:00",
      userImage: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      user: "TymTym",
      rating: 4,
      comment: "Ok nha bé :))",
      date: "2024-12-05 09:00:00",
      userImage: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  ];

  const [currentPage, setCurrentPage] = React.useState(1);
  const reviewsPerPage = 5;

  // Tính toán các bình luận cần hiển thị dựa trên trang hiện tại
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleChange = (event, value) => {
    setCurrentPage(value);
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
        <h3 className="text-lg font-bold text-black text-left text-shadow text_describe ml-[1.6em] shadow-text">
          Đánh giá sản phẩm
        </h3>
      </div>

      <div className="proCard border rounded-lg p-4 shadow-lg">
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

        {/* Phân trang */}
        <Stack spacing={2} className="mt-4 pagination">
          <Pagination
            count={Math.ceil(reviews.length / reviewsPerPage)}
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
