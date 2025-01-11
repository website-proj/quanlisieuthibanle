import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import "./style.css";
import Cmt from "../Cmt";
import { useLocation } from "react-router-dom";

function Reviews() {
  const [reviews, setReviews] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const reviewsPerPage = 5;
  const location = useLocation();
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/API/review.json");
        setReviews(response.data);
      } catch (error) {
        console.error("Lỗi khi tải bình luận:", error);
      }
    };

    fetchReviews();
  }, []);

  React.useEffect(() => {
    // Nếu lần đầu tiên tải trang, không làm gì cả (để tránh cuộn)
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    // Khi người dùng phân trang, cuộn đến phần mô tả sản phẩm
    const titleElement = document.querySelector(".text_describe");
    if (titleElement) {
      titleElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]); // Mỗi khi currentPage thay đổi (tức là khi phân trang)

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
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
              <div className="w-12 h-12 rounded-full mr-4">
                <img
                  src={review.userImage}
                  alt={review.user}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 mr-4">
                <p className="font-[600] text-left ml-10">{review.user}</p>
                <p className="text-sm text-gray-500 text-left ml-10">
                  {formatDate(review.date)}
                </p>
              </div>
              <div className="flex justify-center items-center mr-4">
                <p className="text-center text-yellow-500 text-xl">
                  {"★".repeat(review.rating)}{" "}
                  <span className="text-gray-600 text-sm ">
                    {review.rating}
                  </span>
                </p>
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <Cmt />
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
