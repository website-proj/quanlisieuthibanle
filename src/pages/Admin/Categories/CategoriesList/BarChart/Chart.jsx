import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { saveAs } from "file-saver";
import DownloadMenu from "/src/components/Admin/Download/CsvJsonPng";

const materialColors = [
  "#ADD8E6", "#87CEFA", "#4682B4", "#9998FF", "#5F9EA0",
  "#00BFFF", "#1E90FF", "#B0E0E6", "#6495ED", "#9966FF",
  "#4169E1", "#6A5ACD", "#7B68EE", "#4169E1",
];

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CategoryChart = () => {
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState([]);
  const [colors, setColors] = useState([]);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/src/pages/Admin/Categories/CategoriesList/Category.json");
      const data = await response.json();

      const categoryKeys = Object.keys(data.categories);
      const categoryValues = categoryKeys.map(key => data.categories[key].value);

      setCategories(categoryKeys);
      setValues(categoryValues);
      setColors(materialColors.slice(0, categoryKeys.length));
    };

    fetchData();
  }, []);

  const data = {
    labels: categories,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
            display: true,
            color: "rgba(0, 0, 0, 0.06)",
            lineWidth: 1,
          },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const handleDownloadCSV = () => {
    let csv = "Danh mục,Số lượng\n";
    categories.forEach((category, index) => {
      csv += `${category},${values[index]}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "du_lieu_danh_muc.csv");
  };

  const handleDownloadJSON = () => {
    const jsonData = categories.map((category, index) => ({
      category,
      quantity: values[index],
    }));
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    saveAs(blob, "du_lieu_danh_muc.json");
  };

  const handleDownloadPNG = () => {
    const canvas = document.querySelector("canvas");
    canvas.toBlob((blob) => {
      saveAs(blob, "bieu_do_danh_muc.png");
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
        <Typography variant="h6">Số lượng sản phẩm theo danh mục</Typography>
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

      <Box
        height="300px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {categories.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <Typography>Đang tải dữ liệu...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CategoryChart;
