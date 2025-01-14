import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { Stack, Box, Typography, Paper, Avatar, Rating } from "@mui/material";
import axios from "axios";
import "./style.css";
import Cmt from "../Cmt";
import SummaryApi, { baseURL } from "../../common/SummaryApi";
import { FaUserCircle } from "react-icons/fa";

function Reviews({ productId }) {
  const [reviews, setReviews] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const reviewsPerPage = 5;
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const newtoken = localStorage.getItem("token");
        if (!newtoken) {
          console.error("Token không tồn tại. Vui lòng đăng nhập.");
          window.location.href = "/signIn";
          return;
        }

        const token = newtoken.split(" ")[1]; // Giả sử token có định dạng "Bearer <token>"

        if (!productId) {
          console.error("Thiếu productId. Không thể tải đánh giá.");
          return;
        }

        console.log("Gửi yêu cầu API với params:", { product_id: productId });

        const response = await axios.get(
          `${baseURL}${SummaryApi.reviews_product.url}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm header Authorization
            },
            params: { product_id: productId }, // Đảm bảo truyền đúng productId
          }
        );

        console.log("Kết quả từ API:", response.data);

        // Lấy danh sách review từ dữ liệu trả về
        const productData = response.data[productId];
        if (productData && productData.review) {
          setReviews(productData.review); // Đảm bảo `reviews` là một mảng
        } else {
          console.error("Không tìm thấy đánh giá cho sản phẩm.");
          setReviews([]); // Đặt giá trị mặc định nếu không có review
        }
      } catch (error) {
        console.error("Lỗi khi tải bình luận:", error);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  React.useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    const titleElement = document.querySelector(".text_describe");
    if (titleElement) {
      titleElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

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

      <div className="ml-[1.3%] bg-white border rounded-2xl p-4 shadow-lg">
        <div className="mt-4 space-y-4">
          {currentReviews.map((review) => (
            <div
              key={review.review_id}
              className="flex items-center p-4 rounded"
            >
              <div className="w-12 h-12 rounded-full mr-4">
                <FaUserCircle className="text-lg bg-blue-500 text-white w-full h-full rounded-full object-cover" />
              </div>
              <div className="flex flex-col flex-1 mr-4">
                <p className="font-[600] text-left ml-10">{review.user_id}</p>
                <p className="text-sm text-gray-500 text-left ml-10">
                  {formatDate(review.review_date)}
                </p>
              </div>
              <div className="flex justify-center items-center mr-4">
                <Rating value={review.rating} readOnly />
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <Cmt productId={productId} />

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
