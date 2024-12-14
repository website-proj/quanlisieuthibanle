import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton, TablePagination, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Chart } from "react-chartjs-2";
import combinedData from "./revenue-statistics.json";
import usersData from "./users-data.json";
import categoriesData from "./categories-data.json";
import bestSellingProducts from "./best-selling-products.json"; 
import { FiUser, FiShoppingCart, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (id) => {
    console.log("View product:", id);
  };

  const handleEdit = (id) => {
    console.log("Edit product:", id);
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    console.log("Deleted product:", productToDelete);
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

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
                    color: "grey",
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
                            fontColor: "grey",
                          };
                        }
                        return {
                          text: label,
                          fillStyle: chart.data.datasets[0].backgroundColor[labels.indexOf(label)],
                          fontColor: "grey",
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

      <Box sx={{ padding: "20px", backgroundColor: "var(--white)", borderRadius: "20px", boxShadow: 0, marginTop: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "1%", fontSize: '1em', fontWeight: 500 }}>Sản phẩm bán chạy nhất</Typography>
        <TableContainer className="custom-table" component={Paper} sx={{ borderRadius: "10px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell>Phân loại</TableCell>
                <TableCell>Ngày</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bestSellingProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar src={product.image} variant="rounded" sx={{ width: 56, height: 56 }} />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.subcategory}</TableCell>
                  <TableCell>{product.date}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <IconButton className="icon-button-small"
                      onClick={() => handleView(product.id)}
                      sx={{ color: "black", "&:hover": { color: "#1E88E5" } }}
                    >
                      <FiEye />
                    </IconButton>
                    <IconButton className="icon-button-small"
                      onClick={() => handleEdit(product.id)}
                      sx={{ color: "black", "&:hover": { color: "#43A047" } }}
                    >
                      <FiEdit2 />
                    </IconButton>
                    <IconButton className="icon-button-small"
                      onClick={() => handleDelete(product)}
                      sx={{ color: "black", "&:hover": { color: "#E53935" } }}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 15]}
          count={bestSellingProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số dòng mỗi trang"
        />
      </Box>

      {/* Dialog xác nhận xóa sản phẩm */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa sản phẩm "{productToDelete?.name}" không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">Hủy</Button>
          <Button onClick={confirmDelete} color="secondary">Xóa</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Dashboard;
