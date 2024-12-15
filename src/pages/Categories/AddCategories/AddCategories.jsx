import React, { useState } from 'react';
import './AddCategories.css';
import { Typography, Box, Breadcrumbs, Link } from '@mui/material';

function AddCategories() {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({}); // Lưu lỗi

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({ ...prev, image: '' })); // Xóa lỗi khi người dùng tải ảnh
    }
  };

  const handleAdd = () => {
    const newErrors = {};

    if (!categoryName.trim()) {
      newErrors.categoryName = 'Vui lòng nhập tên danh mục.';
    }

    if (!image) {
      newErrors.image = 'Vui lòng tải lên hình ảnh.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Tên danh mục:', categoryName);
      console.log('Hình ảnh:', image);
      alert('Thêm danh mục thành công!');
      setCategoryName('');
      setImage(null);
    }
  };

  return (
    <div className='add-categories'>
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
            Thêm danh mục
          </Typography>

          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Tổng quan
            </Link>
            <Link underline="hover" color="inherit" href="/categories-list">
              Danh mục
            </Link>
            <Typography color="text.primary">Thêm danh mục</Typography>
          </Breadcrumbs>
        </Box>

        <Box sx={{ padding: "20px", backgroundColor: "var(--white)", borderRadius: "20px", boxShadow: 0, marginTop: "20px" }}>

        <div className="add-categories-info-container">
          <div className="text">Tên danh mục</div>
          <input
            type="text"
            className="input-field"
            placeholder="Nhập tên danh mục"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              setErrors((prev) => ({ ...prev, categoryName: '' })); // Xóa lỗi khi người dùng nhập
            }}
          />
          {errors.categoryName && (
            <div className="error-message">{errors.categoryName}</div>
          )}

          <div id="img" className="text">Hình ảnh</div>
          <div
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
          </div>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          {errors.image && (
            <div className="error-message">{errors.image}</div>
          )}

          <button className="submit-button" onClick={handleAdd}>
            Thêm
          </button>
        </div>
        </Box>
      </main>
    </div>
  );
}

export default AddCategories;
