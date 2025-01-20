import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField, Typography, Button, Chip, TablePagination, Snackbar, Alert } from '@mui/material';
import TableHeader from './TableHeader';
import { ProductsModal, AddressModal } from './ProductsModal';
import { getStatusColor, getComparator } from './TableHelper';
import axios from 'axios';
import './Table.css';
import { BASE_URL, ENDPOINTS } from '/src/api/apiEndpoints';

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
  const [alertMessage, setAlertMessage] = useState(null);
  const [openAlert, setOpenAlert] = useState(false); // State for Snackbar
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${ENDPOINTS.orders.allOrders}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      if (response.data.message === "order response" && response.data.data) {
        const transformedOrders = Object.entries(response.data.data).map(([_, orderData]) => {
          const orderInfo = orderData.order || {};
          const addressInfo = orderData.address || {};
          const paymentInfo = orderData.payment || {};
          const productsInfo = orderData.products || [];

          const addressParts = [
            addressInfo.house_number,
            addressInfo.street,
            addressInfo.ward,
            addressInfo.district,
            addressInfo.state
          ].filter(Boolean);

          return {
            order_id: orderInfo.order_id || '',
            status: orderInfo.status || '',
            products: productsInfo,
            delivery_address: {
              recipient_name: addressInfo.user_name || '',
              phone_number: addressInfo.phone_number || '',
              address: addressParts.length > 0 ? addressParts.join(', ') : 'Không có địa chỉ'
            },
            buyer_id: orderInfo.user_id || '',
            total_amount: orderInfo.total_amount || 0,
            payment_method: paymentInfo.payment_method || '',
            order_date: orderInfo.order_date ?
              new Date(orderInfo.order_date).toLocaleDateString('vi-VN') :
              ''
          };
        });

        setOrders(transformedOrders);
      } else {
        throw new Error('Định dạng dữ liệu không hợp lệ');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Không thể tải dữ liệu đơn hàng');
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
      (order.order_id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (order.status?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (order.buyer_id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (order.order_date?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    )
    .sort(getComparator(order, orderBy));

  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  const formatStatusText = (status) => {
    const statusMap = {
      'Processing': 'Đang xử lý',
      'Delivered': 'Đã giao hàng',
      'Canceled': 'Đã hủy',
    };
    return statusMap[status] || status || 'Không xác định';
  };

  const formatPaymentMethod = (method) => {
    if (!method) return 'Không xác định';
    if (method === 'Cash') return 'Tiền mặt';
    if (method === 'Credit Card') return 'Thẻ tín dụng';
    if (method === 'Debit Card') return 'Thẻ ghi nợ';
    return method;
  };

  const handleViewProducts = (products) => {
    if (!products || products.length === 0) {
      setAlertMessage('Không có thông tin sản phẩm');
      setOpenAlert(true);
      return;
    }
    setSelectedProducts(products);
  };

  const handleViewAddress = (address) => {
    if (!address || !address.recipient_name) {
      setAlertMessage('Không có thông tin địa chỉ');
      setOpenAlert(true); 
      return;
    }
    setSelectedAddress(address);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false); 
  };

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
<TableContainer component={Paper} sx={{ borderRadius: "15px", boxShadow: "none", width: '100%', overflowX: 'auto' }} className="table-container">
  <Table>
    <TableHeader 
      orderBy={orderBy} 
      order={order} 
      onSort={handleSort}
    />
    <TableBody>
      {paginatedOrders.map((order) => (
        <TableRow key={order.order_id}>
          <TableCell className="table-cell" align="center">{order.order_id || 'N/A'}</TableCell>
          <TableCell className="table-cell" align="center">
            <Chip
              label={formatStatusText(order.status)}
              size="small"
              sx={{
                fontWeight: '500',
                borderRadius: '12px',
                ...getStatusColor(order.status)
              }}
            />
          </TableCell>
          <TableCell className="table-cell" align="center">
            <Button
              variant="text"
              onClick={() => handleViewProducts(order.products)}
              sx={{ textTransform: 'none' }}
            >
              Xem chi tiết
            </Button>
          </TableCell>
          <TableCell className="table-cell" align="center">
            <Button
              variant="text"
              onClick={() => handleViewAddress(order.delivery_address)}
              sx={{ textTransform: 'none' }}
            >
              Xem chi tiết
            </Button>
          </TableCell>
          <TableCell className="table-cell" align="center">{order.buyer_id || 'N/A'}</TableCell>
          <TableCell className="table-cell" align="center">{(order.total_amount || 0).toLocaleString()}</TableCell>
          <TableCell className="table-cell" align="center">{formatPaymentMethod(order.payment_method)}</TableCell>
          <TableCell className="table-cell" align="center">{order.order_date || 'N/A'}</TableCell>
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

      {/* Snackbar for Alerts */}
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
      >
        <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%', borderRadius: '10px' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderManagement;
