import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { saveAs } from "file-saver";
import DownloadMenu from "/src/components/Admin/Download/CsvJsonPng";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function PolarAreaChart() {
  const [chartData, setChartData] = useState(null);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);

  const getBackgroundColors = () => [
    "rgba(0, 123, 255, 0.6)", // Blue
    "rgba(0, 255, 255, 0.6)", // Cyan
    "rgba(30, 144, 255, 0.6)", // DodgerBlue
    "rgba(100, 149, 237, 0.6)", // CornflowerBlue
    "rgba(135, 206, 235, 0.6)", // SkyBlue
    "rgba(70, 130, 180, 0.6)", // SteelBlue
    "rgba(176, 224, 230, 0.6)", // LightBlue
    "rgba(95, 158, 160, 0.6)", // CadetBlue
    "rgba(123, 104, 238, 0.6)", // MediumSlateBlue
    "rgba(72, 61, 139, 0.6)", // DarkSlateBlue
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwtToken");
      try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.char.countChild}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.message === "success") {
          const labels = Object.values(result.data).map((item) => Object.keys(item)[0]);
          const values = Object.values(result.data).map((item) => Object.values(item)[0]);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: "Số lượng danh mục con",
                data: values,
                backgroundColor: getBackgroundColors(),
                borderWidth: 0.5,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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

  const handleDownloadCSV = () => {
    if (!chartData) return;
  
    let csv = "Danh mục,Số lượng\n";
    chartData.labels.forEach((label, index) => {
      csv += `${label},${chartData.datasets[0].data[index]}\n`;
    });
  
    const bom = "\uFEFF";
    const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "du_lieu_danh_muc.csv");
  };
  

  const handleDownloadJSON = () => {
    if (!chartData) return;
    const jsonData = chartData.labels.map((label, index) => ({
      category: label,
      subcategoriesCount: chartData.datasets[0].data[index],
    }));
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    saveAs(blob, "du_lieu_danh_muc.json");
  };

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

      <Box height="300px" display="flex" justifyContent="center" alignItems="center">
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
