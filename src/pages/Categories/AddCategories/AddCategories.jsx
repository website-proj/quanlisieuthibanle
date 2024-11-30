import React, { useState } from 'react';
import './AddCategories.css';

function AddCategories() {
  const [image, setImage] = useState(null); 
  // Xử lý khi chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='add-categories'>
      <main>
        <div className="title-main">Thêm danh mục</div>
        <div className="add-categories-info-container">
          <div className="text">Tên danh mục</div>
          <input type="text" className="input-field" placeholder="Nhập tên danh mục" />

          <div className="text">Hình ảnh</div>
          <div className="upload-container" onClick={() => document.getElementById('fileInput').click()}>
            {image ? (
              <img src={image} alt="Preview" className="image-preview" />
            ) : (
              <div className="upload-icon">
                <i class='bx bxs-cloud-upload'></i>
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

          <button className="submit-button">Thêm</button>
        </div>
      </main>
    </div>
  );
}

export default AddCategories;
