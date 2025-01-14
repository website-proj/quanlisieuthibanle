import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { saveAs } from "file-saver";
import TimeFrameSelector from "/src/components/Chart/TimeFrameSelector";
import DownloadMenu from "/src/components/Download/CsvJsonPng";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";

ChartJS.register(LineElement, BarElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip);

const Chart = () => {
  const [timeFrame, setTimeFrame] = useState("12months");
  const [chartData, setChartData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);

  const jwtToken = localStorage.getItem("jwtToken");

  const fetchData = async (timeFrame) => {
    const endpointsMap = {
      "14days": [ENDPOINTS.char.revenue14days, ENDPOINTS.char.cost14days, ENDPOINTS.char.profit14days],
      "12months": [ENDPOINTS.char.revenue12months, ENDPOINTS.char.cost12months, ENDPOINTS.char.profit12months],
      "3years": [ENDPOINTS.char.revenue3years, ENDPOINTS.char.cost3years, ENDPOINTS.char.profit3years],
    };

    const [revenueEndpoint, costEndpoint, profitEndpoint] = endpointsMap[timeFrame];

    const fetchApiData = async (endpoint) => {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      const json = await response.json();
      return json.data;
    };

    const [revenueData, costData, profitData] = await Promise.all([
      fetchApiData(revenueEndpoint),
      fetchApiData(costEndpoint),
      fetchApiData(profitEndpoint),
    ]);

    const sortedKeys = Object.keys(revenueData).sort((a, b) => {
      const [dayA, monthA, yearA] = a.split("/").map(Number);
      const [dayB, monthB, yearB] = b.split("/").map(Number);
      if (yearA !== yearB) return yearA - yearB;
      if (monthA !== monthB) return monthA - monthB;
      return dayA - dayB;
    });

    setChartData({
      labels: sortedKeys,
      datasets: [
        {
          label: "Doanh thu",
          data: sortedKeys.map((key) => revenueData[key] / 1000000),
          borderColor: "#4caf50",
          fill: false,
          type: "line",
          tension: 0.5,
        },
        {
          label: "Chi phí",
          data: sortedKeys.map((key) => costData[key] / 1000000),
          borderColor: "#ff655a",
          fill: false,
          type: "line",
          tension: 0.5,
        },
        {
          label: "Lợi nhuận",
          data: sortedKeys.map((key) => profitData[key] / 1000000),
          backgroundColor: "#2999f0",
          type: "bar",
        },
      ],
    });
  };

  useEffect(() => {
    fetchData(timeFrame);
  }, [timeFrame]);

  const handleDownloadCSV = () => {
    let csv = "Ngày,Doanh thu (triệu VND),Chi phí (triệu VND),Lợi nhuận (triệu VND)\n";
    chartData.labels.forEach((label, index) => {
      csv += `${label},${chartData.datasets[0].data[index]},${chartData.datasets[1].data[index]},${chartData.datasets[2].data[index]}\n`;
    });
    const bom = "\uFEFF";
    const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "du_lieu_doanh_thu.csv");
  };

  const handleDownloadJSON = () => {
    const jsonData = chartData.labels.map((label, index) => ({
      date: label,
      revenue: chartData.datasets[0].data[index],
      cost: chartData.datasets[1].data[index],
      profit: chartData.datasets[2].data[index],
    }));
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    saveAs(blob, "du_lieu_doanh_thu.json");
  };

  const handleDownloadPNG = () => {
    const canvas = document.querySelector("canvas");
    canvas.toBlob((blob) => {
      saveAs(blob, "bieu_do_doanh_thu.png");
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
        <Typography variant="h6">Thống kê doanh thu</Typography>
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

      <Box height="400px">
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
                tooltip: {
                  callbacks: {
                    title: (context) => `Ngày: ${context[0].label}`,
                    label: (context) => {
                      const datasetLabel = context.dataset.label || "";
                      const value = context.raw || 0;
                      return `${datasetLabel}: ${value} triệu VND`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text:
                      timeFrame === "14days"
                        ? "Thời gian (ngày)"
                        : timeFrame === "12months"
                        ? "Thời gian (tháng)"
                        : "Thời gian (năm)",
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Giá trị (triệu VND)",
                    font: {
                      family: "'Poppins', sans-serif",
                      size: 16,
                    },
                  },
                  grid: {
                    display: true,
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

export default Chart;
