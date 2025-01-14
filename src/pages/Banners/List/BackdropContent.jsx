import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const BackdropContent = ({ formData, onClose }) => {
  return (
    <Box sx={{ width: '100%', padding: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Thông tin sản phẩm
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Typography><strong>Mã banner:</strong> {formData.name}</Typography>
        <Typography><strong>Tên banner:</strong> {formData.name}</Typography>
        <Typography><strong>Hình ảnh banner:</strong> <img src={formData.imagePreview || '/default-image.jpg'} alt="Product" style={{ maxWidth: '100%' }} /></Typography>
        <Typography><strong>Vị trí:</strong> {formData.category}</Typography>
        <Typography><strong>Thứ tự ưu tiên:</strong> {formData.discount}</Typography>
        <Typography><strong>Ngày tạo:</strong> {new Date().toLocaleDateString()}</Typography>
      </Box>
      <Button onClick={onClose} variant="contained" color="secondary" sx={{ width: '100%' }}>
        Đóng
      </Button>
    </Box>
  );
};

export default BackdropContent;
