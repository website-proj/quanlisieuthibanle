import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
  TablePagination,
} from "@mui/material";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

  useEffect(() => {
    // Thay đường dẫn này bằng JSON hoặc API của bạn
    fetch("/src/pages/Orders/orders.json")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
      });
  }, []);

  // Hàm tìm kiếm nâng cao
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = orders.filter((order) =>
      Object.values(order).some((val) =>
        val.toString().toLowerCase().includes(value)
      )
    );
    setFilteredOrders(filtered);
    setPage(0); // Reset về trang đầu khi tìm kiếm
  };

  // Hàm sắp xếp dữ liệu
  const handleSort = (property) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    const direction = isAsc ? "desc" : "asc";
    setOrderDirection(direction);
    setOrderBy(property);

    const sorted = [...filteredOrders].sort((a, b) => {
      if (typeof a[property] === "number") {
        return isAsc ? a[property] - b[property] : b[property] - a[property];
      }
      return isAsc
        ? a[property].toString().localeCompare(b[property])
        : b[property].toString().localeCompare(a[property]);
    });
    setFilteredOrders(sorted);
  };

  // Xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Xử lý thay đổi số hàng hiển thị
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="orders">
      <main>
        {/* Header */}
        <Box
          sx={{
            padding: "10px 20px",
            backgroundColor: "#fff",
            borderRadius: "15px",
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h1" sx={{ fontWeight: "bold" }}>
            Quản lý đơn hàng
          </Typography>

          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Tổng quan
            </Link>
            <Typography color="text.primary">Đơn hàng</Typography>
          </Breadcrumbs>
        </Box>

        {/* Bảng dữ liệu */}
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "15px",
            marginTop: "20px",
          }}
        >
          {/* Thanh tìm kiếm */}
          <TextField
            label="Tìm kiếm đơn hàng"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            fullWidth
            sx={{ marginBottom: "20px" }}
          />

          {/* Bảng */}
          <TableContainer component={Paper} className="orders">
          <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "id"}
                      direction={orderDirection}
                      onClick={() => handleSort("id")}
                    >
                      Mã đơn hàng
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "status"}
                      direction={orderDirection}
                      onClick={() => handleSort("status")}
                    >
                      Trạng thái
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "product"}
                      direction={orderDirection}
                      onClick={() => handleSort("product")}
                    >
                      Sản phẩm
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "address"}
                      direction={orderDirection}
                      onClick={() => handleSort("address")}
                    >
                      Địa chỉ giao hàng
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "buyerId"}
                      direction={orderDirection}
                      onClick={() => handleSort("buyerId")}
                    >
                      Mã người mua
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "total"}
                      direction={orderDirection}
                      onClick={() => handleSort("total")}
                    >
                      Tổng tiền
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "payment"}
                      direction={orderDirection}
                      onClick={() => handleSort("payment")}
                    >
                      Phương thức thanh toán
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "date"}
                      direction={orderDirection}
                      onClick={() => handleSort("date")}
                    >
                      Ngày đặt hàng
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.address}</TableCell>
                      <TableCell>{order.buyerId}</TableCell>
                      <TableCell>{order.total}đ</TableCell>
                      <TableCell>{order.payment}</TableCell>
                      <TableCell>{order.date}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Phân trang */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Typography>
              Tổng sản phẩm: {filteredOrders.length}
            </Typography>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={filteredOrders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Số hàng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}–${to} trên ${count !== -1 ? count : `nhiều hơn`}`
              }
            />
          </Box>
        </Box>
      </main>
    </div>
  );
}

export default Orders;
