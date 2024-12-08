import React from "react";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Chart } from "react-chartjs-2";
import combinedData from "./revenue-statistics.json"; // Dữ liệu thống kê doanh thu
import usersData from "./users-data.json"; // Dữ liệu số lượng người dùng
import categoriesData from "./categories-data.json"; // Dữ liệu danh mục phần trăm

import { FiUser, FiShoppingCart } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { GrBasket } from "react-icons/gr";
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Để sử dụng cho biểu đồ tròn
);

const Dashboard = () => {
  const stats = [
    { icon: <FiUser className="icon" />, title: "Người dùng", count: 1020 },
    { icon: <GrBasket className="icon" />, title: "Đơn hàng", count: 1020 },
    { icon: <FiShoppingCart className="icon" />, title: "Sản phẩm", count: 11111 },
    { icon: <FaRegStar className="icon" />, title: "Đánh giá", count: 1000 },
  ];

  return (
    <>
      {/* Hiển thị các thống kê */}
      <Box className="stats-header-container">
        {stats.map((item, index) => (
          <Box key={index} className="info-box">
            {item.icon}
            <Box>
              <Typography className="info-title">{item.title}</Typography>
              <Typography className="info-count">{item.count}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

{/* Biểu đồ doanh thu */}
<Box sx={{ padding: "20px", backgroundColor: "var(--white)", borderRadius: "20px", boxShadow: 0, marginTop: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: "1%", fontSize: '1em', fontWeight: 500 }}>
          Thống kê doanh thu
        </Typography>
        <Chart
          type="line"
          data={combinedData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  font: { family: "Segoe UI", size: 13 },
                }
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Tháng",
                  font: { family: "Segoe UI", size: 13 }
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Giá trị (triệu đồng)",
                  font: { family: "Segoe UI", size: 13 }
                },
              }
            }
          }}
        />
      </Box>

      {/* Biểu đồ thống kê kinh doanh và biểu đồ số lượng người dùng */}
      <Box sx={{ display: "flex", gap: "20px", justifyContent: "space-between" }}>
        {/* Biểu đồ số lượng người dùng chiếm 2/3 chiều ngang */}
        <Box sx={{ flex: 2, padding: "20px", backgroundColor: "var(--white)", borderRadius: "20px", boxShadow: 0 }}>
          <Typography variant="h6" sx={{ marginBottom: "1%", fontSize: '1em', fontWeight: 500 }}>
            Số lượng người dùng
          </Typography>
          <Chart
            type="line"
            data={usersData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    font: { family: "Segoe UI", size: 13 },
                  }
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Ngày",
                    font: { family: "Segoe UI", size: 13 }
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Số lượng người dùng",
                    font: { family: "Segoe UI", size: 13 }
                  },
                }
              }
            }}
          />
        </Box>

        {/* Biểu đồ danh mục phần trăm chiếm 1/3 chiều ngang */}
        <Box sx={{ flex: 1, padding: "20px", backgroundColor: "var(--white)", borderRadius: "20px", boxShadow: 0 }}>
          <Typography variant="h6" sx={{ marginBottom: "1%", fontSize: '1em', fontWeight: 500 }}>
            Tỷ lệ phần trăm các danh mục
          </Typography>
          <Chart
            type="pie"
            data={categoriesData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    font: { family: "Segoe UI", size: 13 },
                  }
                },
              }
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
