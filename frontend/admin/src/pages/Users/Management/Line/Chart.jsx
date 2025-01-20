import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { saveAs } from "file-saver";
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
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";
import axios from "axios";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip, Filler);

const UserChart = () => {
  const [timeFrame, setTimeFrame] = useState("12months");
  const [chartData, setChartData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);

  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchData = async () => {
      let filteredData = [];
      let endpoint = '';

      try {
        if (timeFrame === "14days") {
          endpoint = ENDPOINTS.char.users14days;
        } else if (timeFrame === "12months") {
          endpoint = ENDPOINTS.char.users12months;
        } else if (timeFrame === "3years") {
          endpoint = ENDPOINTS.char.users3years;
        }

        const response = await axios.get(`${BASE_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });

        if (response.data.message === "success") {
          filteredData = Object.entries(response.data.data).map(([date, users]) => ({
            date,
            users
          }));

          // Sắp xếp dữ liệu theo từng loại timeFrame
          if (timeFrame === "14days") {
            filteredData.sort((a, b) => {
              const [dayA, monthA, yearA] = a.date.split("/");
              const [dayB, monthB, yearB] = b.date.split("/");
              const dateA = new Date(20 + yearA, monthA - 1, dayA);
              const dateB = new Date(20 + yearB, monthB - 1, dayB);
              return dateA - dateB;
            });
          } else if (timeFrame === "12months") {
            filteredData.sort((a, b) => {
              const [monthA, yearA] = a.date.split("/");
              const [monthB, yearB] = b.date.split("/");
              const dateA = new Date(20 + yearA, monthA - 1);
              const dateB = new Date(20 + yearB, monthB - 1);
              return dateA - dateB;
            });
          } else if (timeFrame === "3years") {
            filteredData.sort((a, b) => Number(a.date) - Number(b.date));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setChartData({
        labels: filteredData.map((item) => item.date),
        datasets: [
          {
            label: "Người đăng ký",
            data: filteredData.map((item) => item.users),
            borderColor: "#6f42c1",
            backgroundColor: "rgba(111, 66, 193, 0.2)",
            fill: true,
            tension: 0.5,
          },
        ],
      });
    };

    fetchData();
  }, [timeFrame]);

  const chartOptions = {
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
        // ticks: {
        //   maxRotation: 45,
        //   minRotation: 45,
        // },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Số lượng người đăng ký",
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
          drawBorder: true,
          borderDash: [5, 5],
        },
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  const handleDownloadCSV = () => {
    let csv = "Ngày,Số lượng người đăng ký\n";
    chartData.labels.forEach((label, index) => {
      csv += `${label},${chartData.datasets[0].data[index]}\n`;
    });
    const bom = "\uFEFF";
    const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "so_luong_nguoi_dang_ky.csv");
  };

  const handleDownloadJSON = () => {
    const jsonData = chartData.labels.map((label, index) => ({
      date: label,
      users: chartData.datasets[0].data[index],
    }));
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    saveAs(blob, "so_luong_nguoi_dang_ky.json");
  };

  const handleDownloadPNG = () => {
    const canvas = document.querySelector("canvas");
    canvas.toBlob((blob) => {
      saveAs(blob, "bieu_do_nguoi_dang_ky.png");
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
        <Typography variant="h6">Số lượng người đăng ký</Typography>
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
            options={chartOptions}
          />
        ) : (
          <Typography>Đang tải dữ liệu...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserChart;