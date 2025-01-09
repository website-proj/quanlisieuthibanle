import React, { useState, useEffect } from "react";
import './Chart.css'
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MenuItem, Select, FormControl, Box, Typography } from "@mui/material";
import { saveAs } from "file-saver"; 
import DownloadMenu from "/src/components/Admin/Download/CsvJsonPng"; 

import subcategoriesData from "/src/pages/Admin/Categories/SubcategoriesList/Subcategories.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Chart() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null); 

  useEffect(() => {
    const loadedCategories = subcategoriesData.map((item) => ({
      category: item.category,
      subcategories: item.subcategories,
    }));
    setCategories(loadedCategories);
    setSelectedCategory(loadedCategories[0]); 
  }, []);

  const handleCategoryChange = (event) => {
    const selected = categories.find(
      (category) => category.category === event.target.value
    );
    setSelectedCategory(selected);
  };

  const chartData = selectedCategory
    ? {
        labels: selectedCategory.subcategories.map((sub) => sub.name),
        datasets: [
          {
            label: "Doanh thu",
            data: selectedCategory.subcategories.map((sub) => sub.revenue),
            backgroundColor: "rgba(0, 131, 238, 0.84)",
            borderWidth: 0,
          },
        ],
      }
    : null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Roboto, sans-serif",
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Danh mục con",
          font: {
            size: 14,
            family: "Roboto, sans-serif",
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Doanh thu (VNĐ)",
          font: {
            size: 14,
            family: "Roboto, sans-serif",
          },
        },
        grid: {
          display: true,
          color: "#e0e0e0", 
          drawBorder: false,
        },
      },
    },
  };

  const handleDownloadCSV = () => {
    let csv = "Danh mục,Số lượng\n";
    subcategoriesData.forEach((item) => {
      csv += `${item.category},${item.subcategories.length}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "du_lieu_danh_muc.csv");
  };

  const handleDownloadJSON = () => {
    const jsonData = subcategoriesData.map((item) => ({
      category: item.category,
      subcategoriesCount: item.subcategories.length,
    }));
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    saveAs(blob, "du_lieu_danh_muc.json");
  };

  const handleDownloadPNG = () => {
    const canvas = document.querySelector("canvas");
    canvas.toBlob((blob) => {
      saveAs(blob, "bieu_do_bar.png");
    });
  };

  const handleDownloadMenuClick = (event) => {
    setDownloadAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setDownloadAnchorEl(null);
  };

  return (
    <Box sx={{ fontFamily: "Roboto, sans-serif" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: "1em" }}>
          Biểu đồ doanh thu của các danh mục con
        </Typography>
        <DownloadMenu
          handleDownloadCSV={handleDownloadCSV}
          handleDownloadJSON={handleDownloadJSON}
          handleDownloadPNG={handleDownloadPNG}
          downloadAnchorEl={downloadAnchorEl}
          handleMenuClose={handleMenuClose}
          handleDownloadMenuClick={handleDownloadMenuClick}
        />
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <Select
          labelId="category-select-label"
          value={selectedCategory?.category || ""}
          onChange={handleCategoryChange}
          sx={{
            borderRadius: "10px",
            height: "35px", 
          }}
        >
          {categories.map((item) => (
            <MenuItem key={item.category} value={item.category}>
              {item.category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box height="224px" display="flex" justifyContent="center" alignItems="center">
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <Typography sx={{ fontSize: "1em" }}>Đang tải dữ liệu...</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Chart;
