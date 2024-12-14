import React, { useState } from 'react';
import './AddCategories.css';
import Box from "@mui/material/Box";

function AddCategories() {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({}); // Lưu lỗi

  // Xử lý khi chọn ảnh
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

  // Xử lý khi nhấn nút "Thêm"
  const handleAdd = () => {
    const newErrors = {};

    // Kiểm tra trường tên danh mục
    if (!categoryName.trim()) {
      newErrors.categoryName = 'Vui lòng nhập tên danh mục.';
    }

    // Kiểm tra ảnh
    if (!image) {
      newErrors.image = 'Vui lòng tải lên hình ảnh.';
    }

    setErrors(newErrors);

    // Nếu không có lỗi, xử lý logic thêm
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
        <div className="title-main">Thêm danh mục</div>
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
