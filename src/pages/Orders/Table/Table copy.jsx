import React, { useState, useEffect } from 'react';
import './Table.css'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  TableSortLabel,
  Alert,
  Button,
  Modal,
  Chip,
  IconButton,
  TablePagination
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '1000px',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

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
  
  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };
  
  const descendingComparator = (a, b, orderBy) => {
    if (a[orderBy] < b[orderBy]) return -1;
    if (a[orderBy] > b[orderBy]) return 1;
    return 0;
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đang giao':
        return {
          color: 'primary.main', 
          backgroundColor: '#90caf9', 
        };
      case 'Đã giao':
        return {
          color: 'success.main', 
          backgroundColor: '#e8f5e9', 
        };
      case 'Đã hủy':
        return {
          color: 'error.main',
          backgroundColor: '#ffebee', 
        };
      default:
        return {
          color: 'text.primary',
          backgroundColor: 'background.default',
        };
    }
  };
  
  

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center">
          {/* <SearchIcon sx={{ mr: 1, color: 'action.active' }} /> */}
          <TextField
            variant="outlined"
            label="Tìm kiếm đơn hàng"
            size="medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "350px" }}
          />
        </Box>
      </Box>

      {filteredOrders.length === 0 ? (
        <Alert severity="warning" sx={{ borderRadius: "10px", mb: 2 }}>
          Không tìm thấy đơn hàng phù hợp với "{searchTerm}".
        </Alert>
      ) : (
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: "15px", 
            boxShadow: "none",
            width: '100%',
            overflowX: 'auto' 
          }}
        >
          {/* <Table sx={{ minWidth: 100 }}> */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === 'order_id'}
                    direction={orderBy === 'order_id' ? order : 'asc'}
                    onClick={() => handleSort('order_id')}
                  >
                    Mã đơn hàng
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleSort('status')}
                  >
                    Trạng thái
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">Sản phẩm</TableCell>
                <TableCell align="center">Địa chỉ giao hàng</TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === 'buyer_id'}
                    direction={orderBy === 'buyer_id' ? order : 'asc'}
                    onClick={() => handleSort('buyer_id')}
                  >
                    Mã người mua
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === 'total_amount'}
                    direction={orderBy === 'total_amount' ? order : 'asc'}
                    onClick={() => handleSort('total_amount')}
                  >
                    Tổng tiền
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === 'payment_method'}
                    direction={orderBy === 'payment_method' ? order : 'asc'}
                    onClick={() => handleSort('payment_method')}
                  >
                    Thanh toán
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === 'order_date'}
                    direction={orderBy === 'order_date' ? order : 'asc'}
                    onClick={() => handleSort('order_date')}
                  >
                    Ngày đặt hàng
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
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
                        color: getStatusColor(order.status).color, 
                        backgroundColor: getStatusColor(order.status).backgroundColor, 
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số đơn hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
        />
      </Box>

      {/* Modal Chi tiết Sản phẩm */}
      <Modal
        open={Boolean(selectedProducts)}
        onClose={() => setSelectedProducts(null)}
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Chi tiết sản phẩm</Typography>
            <IconButton onClick={() => setSelectedProducts(null)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Mã sản phẩm</TableCell>
                  <TableCell align="center">Tên sản phẩm</TableCell>
                  <TableCell align="center">Số lượng</TableCell>
                  <TableCell align="center">Giá</TableCell>
                  <TableCell align="center">Tổng tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProducts?.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell align="center">{product.product_id}</TableCell>
                    <TableCell align="center">{product.product_name}</TableCell>
                    <TableCell align="center">{product.quantity}</TableCell>
                    <TableCell align="center">{product.price.toLocaleString()}</TableCell>
                    <TableCell align="center">{product.total_price.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>

      {/* Modal Chi tiết Địa chỉ */}
      <Modal
        open={Boolean(selectedAddress)}
        onClose={() => setSelectedAddress(null)}
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Chi tiết địa chỉ giao hàng</Typography>
            <IconButton onClick={() => setSelectedAddress(null)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Họ và tên người nhận</TableCell>
                  <TableCell align="center">Số điện thoại</TableCell>
                  <TableCell align="center">Địa chỉ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">{selectedAddress?.recipient_name}</TableCell>
                  <TableCell align="center">{selectedAddress?.phone_number}</TableCell>
                  <TableCell align="center">{selectedAddress?.address}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderManagement;