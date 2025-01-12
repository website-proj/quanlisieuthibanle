import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { saveAs } from "file-saver";
import dailyData from "./Daily.json";
import monthlyData from "./Monthly.json";
import yearlyData from "./Yearly.json";
import TimeFrameSelector from "/src/components/Chart/TimeFrameSelector";
import DownloadMenu from "/src/components/Download/CsvJsonPng";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip, Filler);

const UserChart = () => {
  const [timeFrame, setTimeFrame] = useState("12months");
  const [chartData, setChartData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);

  useEffect(() => {
    let filteredData;

    if (timeFrame === "14days") {
      filteredData = dailyData.slice(-14);
    } else if (timeFrame === "12months") {
      filteredData = monthlyData.slice(-12);
    } else if (timeFrame === "3years") {
      filteredData = yearlyData.slice(-3);
    }

    setChartData({
      labels: filteredData.map((item) => item.date),
      datasets: [
        {
          label: "Người dùng",
          data: filteredData.map((item) => item.users),
          borderColor: "#6f42c1", // Màu tím đậm cho đường kẻ
          backgroundColor: "rgba(111, 66, 193, 0.2)", // Màu tím nhạt cho nền
          fill: true,
          tension: 0.5,
        },
      ],
    });
  }, [timeFrame]);

  const handleDownloadCSV = () => {
    let csv = "Ngày,Số lượng người dùng\n";
    chartData.labels.forEach((label, index) => {
      csv += `${label},${chartData.datasets[0].data[index]}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "so_luong_nguoi_dung.csv");
  };

  const handleDownloadJSON = () => {
    const jsonData = chartData.labels.map((label, index) => ({
      date: label,
      users: chartData.datasets[0].data[index],
    }));
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    saveAs(blob, "so_luong_nguoi_dung.json");
  };

  const handleDownloadPNG = () => {
    const canvas = document.querySelector("canvas");
    canvas.toBlob((blob) => {
      saveAs(blob, "bieu_do_nguoi_dung.png");
    });
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDownloadMenuClick = (event) => {
    setDownloadAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setDownloadAnchorEl(null);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Số lượng người dùng</Typography>
        <Box display="flex" gap={2}>
          <TimeFrameSelector
            timeFrame={timeFrame}
            setTimeFrame={setTimeFrame}
            handleMenuClick={handleMenuClick}
            anchorEl={anchorEl}
            handleMenuClose={handleMenuClose}
          />
          <DownloadMenu
            handleDownloadCSV={handleDownloadCSV}
            handleDownloadJSON={handleDownloadJSON}
            handleDownloadPNG={handleDownloadPNG}
            downloadAnchorEl={downloadAnchorEl}
            handleMenuClose={handleMenuClose}
            handleDownloadMenuClick={handleDownloadMenuClick}
          />
        </Box>
      </Box>

      <Box height="300px">
        {chartData.labels && chartData.labels.length > 0 ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    font: {
                      family: "'Poppins', sans-serif",
                      size: 14,
                    },
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: timeFrame === "14days" ? "Ngày" : timeFrame === "12months" ? "Tháng" : "Năm",
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Số lượng người dùng",
                  },
                  ticks: {
                    stepSize: 500,
                  },
                  grid: {
                    display: true,
                    drawBorder: true,
                    drawOnChartArea: true,
                    color: "rgba(0, 0, 0, 0.1)",
                    borderDash: [5, 5],
                  },
                },
              },
            }}
          />
        ) : (
          <Typography>Đang tải dữ liệu...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserChart;
