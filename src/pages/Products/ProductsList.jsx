import React, { useEffect, useState } from 'react';
import './ProductsList.css';
import { Breadcrumbs, Link } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Avatar, IconButton, Box, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { FiUser, FiShoppingCart, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi'; // Đã import các biểu tượng
import BestSellingProductsTable from '/src/pages/Admin/Products/List/BestSellingProducts/Table';
import CustomContent from '/src/components/ContentCard/CustomContent';

function ProductsList() {
  const stats = [
    { icon: <FiUser className="icon" />, title: "Người dùng", count: 1020 },
    { icon: <FiShoppingCart className="icon" />, title: "Đơn hàng", count: 1020 },
    { icon: <FiShoppingCart className="icon" />, title: "Sản phẩm", count: 11111 },
  ];

  const [products, setProducts] = useState([]); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetch('/src/pages/Dashboard/best-selling-products.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching product data:', error));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (id) => {
    console.log('View product:', id);
  };

  const handleEdit = (id) => {
    console.log('Edit product:', id);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    console.log('Deleted product:', productToDelete);
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productToDelete.id));
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  return (
    <div className="products-list">
      <main>
        <Box
          sx={{
            padding: '10px 20px',
            backgroundColor: 'var(--white)',
            borderRadius: '15px',
            boxShadow: 0,
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold' }}>
            Danh sách sản phẩm
          </Typography>

          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Tổng quan
            </Link>
            <Link underline="hover" color="inherit" href="/products-list">
              Sản phẩm
            </Link>
            <Typography color="text.primary">Danh sách sản phẩm</Typography>
          </Breadcrumbs>
        </Box >
        {/* Hiển thị các thống kê */}
        <Box className="stats-header-container" sx={{
          marginTop: '20px', }}>
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

        {/* <Box
          sx={{
            padding: '20px',
            backgroundColor: 'var(--white)',
            borderRadius: '20px',
            boxShadow: 0,
            marginTop: '20px',
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: '1%', fontSize: '1em', fontWeight: 500 }}>
            Sản phẩm bán chạy nhất
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
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
                {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
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
                      <IconButton
                        onClick={() => handleView(product.id)}
                        sx={{ color: 'black', '&:hover': { color: '#1E88E5' } }}
                      >
                        <FiEye />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEdit(product.id)}
                        sx={{ color: 'black', '&:hover': { color: '#43A047' } }}
                      >
                        <FiEdit2 />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(product)}
                        sx={{ color: 'black', '&:hover': { color: '#E53935' } }}
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
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số dòng mỗi trang"
          />
        </Box> */}

        {/* Dialog xác nhận xóa sản phẩm */}
        {/* <Dialog open={openDeleteDialog} onClose={cancelDelete}>
          <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
          <DialogContent>
            <Typography>Bạn có chắc chắn muốn xóa sản phẩm "{productToDelete?.name}" không?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete} color="primary">
              Hủy
            </Button>
            <Button onClick={confirmDelete} color="secondary">
              Xóa
            </Button>
          </DialogActions>
        </Dialog> */}
        <CustomContent>
            <BestSellingProductsTable></BestSellingProductsTable>
        </CustomContent>
      </main>
    </div>
  );
}

export default ProductsList;
