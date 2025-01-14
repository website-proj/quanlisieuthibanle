// components/Table.jsx
import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField, Typography, Alert, Button, Chip, TablePagination } from '@mui/material';
import TableHeader from './TableHeader';
import { ProductsModal, AddressModal } from './ProductsModal';
import { getStatusColor, getComparator } from './TableHelper';
import './Table.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('order_id');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/src/pages/Orders/Orders.json');
      if (!response.ok) throw new Error('Không thể tải dữ liệu đơn hàng');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredOrders = orders
    .filter(order =>
      order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyer_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_date.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(getComparator(order, orderBy));

  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          variant="outlined"
          label="Tìm kiếm đơn hàng"
          size="medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "350px" }}
        />
      </Box>

      {filteredOrders.length === 0 ? (
        <Alert severity="warning" sx={{ borderRadius: "10px", mb: 2 }}>
          Không tìm thấy đơn hàng phù hợp với "{searchTerm}".
        </Alert>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: "15px", boxShadow: "none", width: '100%', overflowX: 'auto' }}>
          <Table>
            <TableHeader 
              orderBy={orderBy} 
              order={order} 
              onSort={handleSort}
            />
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell align="center">{order.order_id}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={order.status}
                      size="small"
                      sx={{
                        fontWeight: '500',
                        borderRadius: '12px',
                        ...getStatusColor(order.status)
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="text"
                      onClick={() => setSelectedProducts(order.products)}
                      sx={{ textTransform: 'none' }}
                    >
                      Xem chi tiết
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="text"
                      onClick={() => setSelectedAddress(order.delivery_address)}
                      sx={{ textTransform: 'none' }}
                    >
                      Xem chi tiết
                    </Button>
                  </TableCell>
                  <TableCell align="center">{order.buyer_id}</TableCell>
                  <TableCell align="center">{order.total_amount.toLocaleString()}</TableCell>
                  <TableCell align="center">{order.payment_method}</TableCell>
                  <TableCell align="center">{order.order_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "16px",
      }}>
        <Typography variant="subtitle2">
          Tổng số đơn hàng: {filteredOrders.length}
        </Typography>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Số đơn hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
        />
      </Box>

      <ProductsModal
        products={selectedProducts}
        onClose={() => setSelectedProducts(null)}
      />

      <AddressModal
        address={selectedAddress}
        onClose={() => setSelectedAddress(null)}
      />
    </Box>
  );
};

export default OrderManagement;