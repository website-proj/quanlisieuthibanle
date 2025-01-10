import React from 'react';
import { Backdrop, Box, Typography, Button, Grid, Divider } from '@mui/material';

const SuccessBackdrop = ({ open, handleCloseSuccess, addedCategory }) => {
  if (!open) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'chưa có thông tin';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/');
  };

  const formatValue = (value, isDate) => {
    if (isDate) return formatDate(value);
    if (value === undefined || value === null) return 'chưa có thông tin';
    // return String(value).toLowerCase();
    return String(value);
  };

  const InfoRow = ({ label, value, isDate }) => (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={4}>
        <Typography variant="body1" sx={{ fontSize: '1em', fontWeight: '400', textTransform: 'none' }}>
          {label}:
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1" sx={{ textTransform: 'none' }}>
          {formatValue(value, isDate)}
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Backdrop
      open={open}
      onClick={handleCloseSuccess}
      sx={{
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflowX: 'hidden',
          overflowY: 'auto',
          position: 'relative',
          scrollbarWidth: 'thin',
          scrollbarColor: '#ccc transparent',
          '&::-webkit-scrollbar': {
            width: '6px',
            marginRight: '2px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
            marginTop: '10px',
            marginBottom: '10px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#ccc',
            borderRadius: '3px',
            border: '2px solid transparent',
            backgroundClip: 'padding-box'
          }
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center', fontSize: '1.5em' }}>
          Thêm sản phẩm thành công!
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontSize: '1.2em', fontWeight: '500', mb: 2 }}>
            Thông tin cơ bản
          </Typography>
          <InfoRow label="Tên sản phẩm" value={addedCategory?.name} />
          <InfoRow label="Mô tả" value={addedCategory?.description} />
          <InfoRow label="Thương hiệu" value={addedCategory?.brand} />
        </Box>

        {addedCategory?.image && (
          <Box 
          sx={{ 
            mb: 3, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' // Đảm bảo ảnh được căn giữa
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 1, 
              textTransform: 'none', 
              textAlign: 'left', 
              width: '100%',
              fontSize: '1.2em', fontWeight: '500'
            }}
          >
            Hình ảnh sản phẩm
          </Typography>
          <img
            src={addedCategory.image}
            alt="Sản phẩm"
            style={{
              width: '80%',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '10px',
            }}
          />
        </Box>
        
        
        )}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontSize: '1.2em', fontWeight: '500', mb: 2 }}>
            Phân loại
          </Typography>
          <InfoRow label="Danh mục" value={addedCategory?.category} />
          <InfoRow label="Danh mục con" value={addedCategory?.subcategory} />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontSize: '1.2em', fontWeight: '500', mb: 2 }}>
            Chi tiết sản phẩm
          </Typography>
          <InfoRow label="Đơn vị" value={addedCategory?.unit} />
          <InfoRow label="Số lượng" value={addedCategory?.quantity} />
          <InfoRow label="Ngày hết hạn" value={addedCategory?.expiryDate} isDate={true} />
          <InfoRow label="Sản phẩm nổi bật" value={addedCategory?.featuredProduct} />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontSize: '1.2em', fontWeight: '500', mb: 2 }}>
            Thông tin giá
          </Typography>
          <InfoRow label="Giá nhập" value={`${addedCategory?.price || ''} đ`} />
          <InfoRow label="Giá bán" value={`${addedCategory?.secondaryPrice || ''} đ`} />
          <InfoRow label="Giảm giá" value={`${addedCategory?.discount || ''} %`} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleCloseSuccess}
            sx={{
              borderRadius: '15px',
              minWidth: '50%',
              textTransform: 'none',
              fontSize: '1em'
            }}
          >
            Đóng
          </Button>
        </Box>
      </Box>
    </Backdrop>
  );
};

export default SuccessBackdrop;
