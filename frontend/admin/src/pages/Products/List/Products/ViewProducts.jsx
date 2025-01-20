import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Modal,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  Button,
  Avatar,
  Rating,
} from "@mui/material";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";

const ProductDetails = ({ productId, onClose }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [reviews, setReviews] = useState([]);  
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}${ENDPOINTS.products.viewProductDetails}${productId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const productData = response.data[productId]?.product;
        const reviewData = response.data[productId]?.review;

        if (productData) {
          setProductDetails({
            ...productData,
            reviews: reviewData || [],
          });
          setReviews(reviewData || []);  
        }
      } catch (error) {
        console.error("Error loading product details:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId, jwtToken]);

  if (!productDetails) {
    return (
      <Modal
        open={Boolean(productId)}
        onClose={onClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 4,
            maxWidth: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <CircularProgress />
        </Box>
      </Modal>
    );
  }

  return (
    <Modal
      open={Boolean(productId)}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        scrollbarColor: "#ccc transparent",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 6,
          boxShadow: 10,
          p: 4,
          maxWidth: "55%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Box>
          {/* Header */}
          <Box textAlign="center" mb={2}>
            <Typography variant="h5" fontWeight="bold">
              Thông tin sản phẩm
            </Typography>
          </Box>

          {/* Product Layout */}
          <Grid container spacing={3}>
            {/* Product Image */}
            <Grid item xs={12} md={6}>
              {productDetails.image ? (
                <img
                  src={productDetails.image}
                  alt={productDetails.name}
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Không có ảnh
                </Typography>
              )}
            </Grid>

            {/* Product Details */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Tên sản phẩm:</strong> {productDetails.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Mã sản phẩm:</strong> {productId}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Thương hiệu:</strong> {productDetails.name_brand}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Giá nhập:</strong> {productDetails.original_price} VNĐ
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Giá bán:</strong> {productDetails.price} VNĐ
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Đang giảm giá:</strong> {productDetails.discount}%
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Đơn vị bán:</strong> {productDetails.unit}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Số lượng tồn kho:</strong> {productDetails.stock_quantity}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Ngày hết hạn:</strong>{" "}
                {productDetails.expiration_date
                  ? new Date(
                      productDetails.expiration_date
                    ).toLocaleDateString("vi-VN")
                  : "Không có"}
              </Typography>
            </Grid>
          </Grid>

          {/* Product Description */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Thông tin mô tả
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {productDetails.description || "Đang cập nhật"}
            </Typography>
          </Box>

          {/* Reviews */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Đánh giá sản phẩm
            </Typography>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <Paper
                  key={review.review_id}
                  sx={{ p: 2, mb: 2, borderRadius: "15px", marginTop: "10px" }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar>{review.user_id?.[0] || "U"}</Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {review.user_id}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.review_date).toLocaleDateString("vi-VN")}
                      </Typography>
                    </Box>
                  </Box>
                  <Rating value={review.rating} readOnly />
                  <Typography variant="body2" mt={1}>
                    {review.comment}
                  </Typography>
                </Paper>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Chưa có người dùng đánh giá.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductDetails;
