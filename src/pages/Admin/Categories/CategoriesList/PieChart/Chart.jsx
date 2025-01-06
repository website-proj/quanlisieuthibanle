import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { saveAs } from "file-saver";
import DownloadMenu from "/src/components/Admin/Download/CsvJsonPng";

const materialColors = [
  "#ADD8E6",  // Light Blue
  "#87CEFA",  // Light Sky Blue
  "#4682B4",  // Steel Blue
  "#9998FF",
  "#5F9EA0",  // Cadet Blue
  "#00BFFF",  // Deep Sky Blue
  "#1E90FF",  // Dodger Blue
  "#B0E0E6",  // Powder Blue
  "#6495ED",  // Cornflower Blue
  "#9966FF",
  "#4169E1",  // Royal Blue
  "#6A5ACD",  // Slate Blue
  "#7B68EE",  // Medium Slate Blue
  "#4169E1",  // Royal Blue
];


  

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = () => {
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState([]);
  const [colors, setColors] = useState([]);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesResponse = await fetch("/src/pages/Admin/Categories/CategoriesList/Category.json");
      const categoriesData = await categoriesResponse.json();

      setCategories(categoriesData.categories);
      setValues(categoriesData.values);

      const assignedColors = materialColors.slice(0, categoriesData.categories.length);
      setColors(assignedColors);
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
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
            const percentage = ((context.raw / total) * 100).toFixed(2);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          },
        },
      },
    },
  };

  const handleDownloadCSV = () => {
    let csv = "Danh mục,Doanh thu\n";
    categories.forEach((category, index) => {
      csv += `${category},${values[index]}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "du_lieu_danh_muc.csv");
  };

  const handleDownloadJSON = () => {
    const jsonData = categories.map((category, index) => ({
      category,
      revenue: values[index],
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
        <Typography variant="h6">Danh mục sản phẩm</Typography>
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
          <Pie data={data} options={options} />
        ) : (
          <Typography>Đang tải dữ liệu...</Typography>
        )}
      </Box>

    </Box>
  );
};

export default CategoryChart;
