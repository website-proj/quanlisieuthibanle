import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Backdrop, CircularProgress } from '@mui/material';
import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import ContentCard from "/src/components/ContentCard/ContentCard";
import './AddCategories.css';

function AddCategories() {
  const breadcrumbs = [
    { label: "Tổng quan", link: "/dashboard" },
    { label: "Danh mục", link: "/categories-list" },
    { label: "Thêm danh mục", link: "/add-categories", active: true }
  ];
  
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Để hiển thị backdrop khi đang tải
  const [success, setSuccess] = useState(false); // Để hiển thị thông báo thêm thành công
  const [addedCategory, setAddedCategory] = useState(null); // Để lưu thông tin danh mục mới thêm

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({ ...prev, image: '' })); 
    }
  };

  const handleAdd = async () => {
    const newErrors = {};

    // Kiểm tra tên danh mục phải là chữ (bao gồm cả chữ hoa và chữ thường)
    const namePattern = /^[A-Za-z\s]+$/; // Biểu thức chính quy cho phép chỉ chữ cái và khoảng trắng
    if (!categoryName.trim()) {
      newErrors.categoryName = 'Vui lòng nhập tên danh mục.';
    } else if (!namePattern.test(categoryName.trim())) {
      newErrors.categoryName = 'Tên danh mục chỉ được phép chứa chữ cái.';
    }

    if (!image) {
      newErrors.image = 'Vui lòng tải lên hình ảnh.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        // Giả lập thêm danh mục (không dùng API thực tế)
        setTimeout(() => {
          setAddedCategory({ name: categoryName, image: image });
          setSuccess(true);  // Hiển thị thông báo thành công
          setCategoryName('');
          setImage(null);
          setLoading(false);
        }, 1500); // Giả lập thời gian gửi dữ liệu
      } catch (error) {
        console.error('Lỗi khi thêm danh mục:', error);
        setLoading(false);
      }
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false); // Đóng thông báo khi nhấp ngoài backdrop
  };

  return (
    <div>
      <HeaderCard title="Thêm danh mục" breadcrumbs={breadcrumbs} />
      <ContentCard>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6">Tên danh mục</Typography>
          <TextField
            placeholder="Nhập tên danh mục"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            error={Boolean(errors.categoryName)}
            helperText={errors.categoryName}
            fullWidth
            className="input-field"
          />

          <Typography variant="h6">Hình ảnh</Typography>
          <Box
            className="upload-container"
            onClick={() => document.getElementById('fileInput').click()}
          >
            {image ? (
              <img src={image} alt="Preview" className="image-preview" />
            ) : (
              <div className="upload-icon">
                <i className="bx bxs-cloud-upload"></i>
              </div>
            )}
          </Box>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          {errors.image && (
            <Typography color="error" className="error-message">
              {errors.image}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            className="submit-button"
          >
            Thêm
          </Button>
        </Box>
      </ContentCard>

      {/* Backdrop thông báo khi thêm thành công */}
      <Backdrop open={loading} style={{ zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop 
        open={success} 
        style={{ zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={handleCloseSuccess} 
      >
        <Box
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onClick={(e) => e.stopPropagation()} 
        >
          <Typography variant="h5" style={{fontWeight: '500'}}>Bạn đã thêm một danh mục!</Typography>
          <img src={addedCategory?.image} alt="Category" style={{ width: '30em', height: '22em', objectFit: 'contain', marginBottom: '0em' }} />
          <Typography variant="h6">Tên danh mục: {addedCategory?.name}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseSuccess}
            style={{ marginTop: '1em', borderRadius: "15px" }}
          >
            Đóng
          </Button>
        </Box>
      </Backdrop>
    </div>
  );
}

export default AddCategories;
