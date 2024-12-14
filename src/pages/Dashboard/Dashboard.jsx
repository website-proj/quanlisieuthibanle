import React from "react";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Chart } from "react-chartjs-2";
import combinedData from "./revenue-statistics.json";
import usersData from "./users-data.json";
import categoriesData from "./categories-data.json";
import bestSellingProducts from "./best-selling-products.json"; // Import JSON file

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
  ArcElement
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
      <Box
        sx={{
          marginTop: "2%",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        {/* Biểu đồ số lượng người dùng */}
        <Box
          sx={{
            flex: 2,
            minWidth: "300px",
            padding: "20px",
            backgroundColor: "var(--white)",
            borderRadius: "20px",
            boxShadow: 0,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "1%", fontSize: "1em", fontWeight: 500 }}>
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
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Ngày",
                    font: { family: "Segoe UI", size: 13 },
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Số lượng người dùng",
                    font: { family: "Segoe UI", size: 13 },
                  },
                },
              },
            }}
          />
        </Box>

        {/* Biểu đồ tỷ lệ các danh mục */}
        <Box
          sx={{
            flex: 1,
            minWidth: "300px",
            padding: "20px",
            backgroundColor: "var(--white)",
            borderRadius: "20px",
            boxShadow: 0,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "1%", fontSize: "1em", fontWeight: 500 }}>
            Tỷ lệ các danh mục
          </Typography>
          <Chart
            type="pie"
            data={categoriesData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    font: { family: "Segoe UI", size: 13 },
                    color: "grey", // Đổi màu chữ chú thích thành màu xanh
                    padding: 10,
                    boxWidth: 12,
                    boxHeight: 12,
                    generateLabels: function (chart) {
                      const labels = chart.data.labels;
                      return labels.map((label) => {
                        const maxLength = 150;
                        if (label.length > maxLength) {
                          return {
                            text: label.substring(0, maxLength) + "...",
                            fillStyle: chart.data.datasets[0].backgroundColor[labels.indexOf(label)],
                            fontColor: "grey", // Màu chữ khi cắt dài
                          };
                        }
                        return {
                          text: label,
                          fillStyle: chart.data.datasets[0].backgroundColor[labels.indexOf(label)],
                          fontColor: "grey", // Màu chữ thông thường
                        };
                      });
                    },
                  },
                },
                
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const label = context.label || "";
                      const value = context.raw || 0;
                      const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                      const percentage = ((value / total) * 100).toFixed(1) + "%";
                      return `${label}: ${value} (${percentage})`;
                    },
                  },
                },
                datalabels: {
                  color: "red",
                  font: { family: "Segoe UI", size: 12, weight: "bold" },
                  formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce(
                      (sum, val) => sum + val,
                      0
                    );
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}%`;
                  },
                },
              },
              layout: {
                padding: {
                  top: 10,
                  bottom: 10,
                },
              },
            }}
          />
        </Box>
      </Box>
      
    </>
  );
};

export default Dashboard;
