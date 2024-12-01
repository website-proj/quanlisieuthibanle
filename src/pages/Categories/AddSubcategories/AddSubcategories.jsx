import React, { useState } from 'react';
import './AddSubcategories.css';

function AddSubcategories() {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [errors, setErrors] = useState({}); // Để lưu lỗi từng trường

  const categories = [
    'Thực phẩm',
    'Đồ uống',
    'Bánh kẹo & Đồ ăn nhẹ',
    'Hóa mỹ phẩm',
    'Gia dụng & Đồ dùng nhà bếp',
    'Gia vị',
    'Chăm sóc bé',
    'Sách và văn phòng phẩm',
    'Sản phẩm vệ sinh nhà cửa'
  ];

  const handleAdd = () => {
    // Reset lỗi
    const newErrors = {};

    if (!category) {
      newErrors.category = 'Vui lòng chọn danh mục.';
    }
    if (!subCategory.trim()) {
      newErrors.subCategory = 'Vui lòng nhập tên danh mục con.';
    }

    setErrors(newErrors);

    // Nếu không có lỗi, xử lý logic thêm
    if (Object.keys(newErrors).length === 0) {
      console.log('Danh mục:', category);
      console.log('Tên danh mục con:', subCategory);
      // Xử lý thêm danh mục con ở đây
      alert('Thêm danh mục con thành công!');
    }
  };

  return (
    <div className='add-subcategories'>
      <main>
        <div className="title-main">Thêm danh mục con</div>
        <div className="add-subcategories-info-container">
          <div className="input-container">
            <label className='text' htmlFor="category">Danh mục</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled hidden>
                Chọn danh mục
              </option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <div className="error-message">{errors.category}</div>
            )}
          </div>

          <div className="input-container">
            <label className='text' htmlFor="subCategory">Tên danh mục con</label>
            <input
              type="text"
              id="subCategory"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              placeholder="Nhập tên danh mục con"
            />
            {errors.subCategory && (
              <div className="error-message">{errors.subCategory}</div>
            )}
          </div>

          <button className="add-button" onClick={handleAdd}>
            Thêm
          </button>
        </div>
      </main>
    </div>
  );
}

export default AddSubcategories;
