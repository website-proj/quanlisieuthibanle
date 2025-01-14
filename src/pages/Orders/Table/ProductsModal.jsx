import React from 'react';
import { Box, Modal, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { modalStyle } from './ModalStyles';

export const ProductsModal = ({ products, onClose }) => {
  if (!products) return null;
  
  return (
    <Modal open={Boolean(products)} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Chi tiết sản phẩm</Typography>
          <IconButton onClick={onClose} size="small">
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
              {products.map((product) => (
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
  );
};

// components/AddressModal.jsx
export const AddressModal = ({ address, onClose }) => {
  if (!address) return null;

  return (
    <Modal open={Boolean(address)} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Chi tiết địa chỉ giao hàng</Typography>
          <IconButton onClick={onClose} size="small">
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
                <TableCell align="center">{address.recipient_name}</TableCell>
                <TableCell align="center">{address.phone_number}</TableCell>
                <TableCell align="center">{address.address}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};