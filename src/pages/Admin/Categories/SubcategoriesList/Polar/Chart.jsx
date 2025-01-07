import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { saveAs } from "file-saver";
import DownloadMenu from "/src/components/Admin/Download/CsvJsonPng"; // Chắc chắn rằng bạn đã có component này

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// Dữ liệu JSON (giả sử được import từ tệp)
import subcategoriesData from '/src/pages/Admin/Categories/SubcategoriesList/Subcategories.json';

function PolarAreaChart() {
  const [chartData, setChartData] = useState(null);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);

  useEffect(() => {
    // Xử lý dữ liệu từ JSON
    const labels = subcategoriesData.map((item) => item.category);
    const values = subcategoriesData.map((item) => item.subcategories.length);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Số lượng danh mục con",
          data: values,
          backgroundColor: [
            "rgba(0, 123, 255, 0.6)",  // Blue
            "rgba(0, 255, 255, 0.6)",  // Cyan
            "rgba(30, 144, 255, 0.6)", // DodgerBlue
            "rgba(100, 149, 237, 0.6)", // CornflowerBlue
            "rgba(135, 206, 235, 0.6)", // SkyBlue
            "rgba(70, 130, 180, 0.6)", // SteelBlue
            "rgba(176, 224, 230, 0.6)", // LightBlue
            "rgba(95, 158, 160, 0.6)", // CadetBlue
            "rgba(123, 104, 238, 0.6)", // MediumSlateBlue
            "rgba(72, 61, 139, 0.6)",  // DarkSlateBlue
          ]          
          ,
          borderWidth: 0.5,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw} danh mục con`;
          },
        },
      },
    },
  };

  // Xử lý tải xuống CSV
  const handleDownloadCSV = () => {
    let csv = "Danh mục,Số lượng\n";
    subcategoriesData.forEach((item) => {
      csv += `${item.category},${item.subcategories.length}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "du_lieu_danh_muc.csv");
  };

  // Xử lý tải xuống JSON
  const handleDownloadJSON = () => {
    const jsonData = subcategoriesData.map((item) => ({
      category: item.category,
      subcategoriesCount: item.subcategories.length,
    }));
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    saveAs(blob, "du_lieu_danh_muc.json");
  };

  // Xử lý tải xuống PNG
  const handleDownloadPNG = () => {
    const canvas = document.querySelector("canvas");
    canvas.toBlob((blob) => {
      saveAs(blob, "bieu_do_polar.png");
    });
  };

  const handleDownloadMenuClick = (event) => {
    setDownloadAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setDownloadAnchorEl(null);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Số lượng danh mục con theo danh mục</Typography>
        <Box display="flex" gap={2}>
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

      <Box height="400px" display="flex" justifyContent="center" alignItems="center">
        {chartData ? (
          <PolarArea data={chartData} options={options} />
        ) : (
          <Typography>Đang tải dữ liệu...</Typography>
        )}
      </Box>

    </Box>
  );
}

export default PolarAreaChart;
