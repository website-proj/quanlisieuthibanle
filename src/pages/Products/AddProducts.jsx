import React, { useState } from 'react';
import './AddProducts.css';

function AddProducts() {
  const [imagePreview, setImagePreview] = useState(''); // Lưu giá trị preview ảnh
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0); // Thêm state cho giá
  const [expiryDate, setExpiryDate] = useState(''); // State cho ngày hết hạn

  // Hàm để xử lý sự kiện khi chọn ảnh
  const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(''); // Nếu không có ảnh, xóa giá trị preview
    }
  };

  // Hàm thay đổi danh mục để cập nhật danh mục con
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);

    // Cập nhật các danh mục con theo danh mục được chọn
    if (selectedCategory === 'food') {
      setSubcategoryOptions(['Món ăn', 'Đồ hộp', 'Thực phẩm tươi']);
    } else if (selectedCategory === 'beverage') {
      setSubcategoryOptions(['Nước ngọt', 'Cà phê', 'Trà']);
    } else {
      setSubcategoryOptions([]);
    }
  };

  // Hàm để thay đổi giá trị của giá khi nhấn mũi tên
  const handlePriceChange = (event) => {
    let newPrice = event.target.value;
    // Kiểm tra nếu giá trị nhập vào là âm thì đặt lại giá trị bằng 0
    if (newPrice < 0) {
      newPrice = 0;
    }
    setPrice(newPrice);
  };

  // Hàm xử lý thay đổi ngày hết hạn
  const handleExpiryDateChange = (event) => {
    const date = event.target.value;
    setExpiryDate(date);
  };

  return (
    <div className='add-products'>
      <main>
        <div className="title-main">Thêm sản phẩm</div>
        <div className="product-info-container">
          <h2>Thông tin sản phẩm</h2>
          <form className="product-info-form" encType="multipart/form-data">
            {/* Phần trên: Tên sản phẩm, mô tả và thêm ảnh */}
            <div className="top-section">
              <div className="left-section">
                <div className="form-group">
                  <label htmlFor="product-name">Tên sản phẩm</label>
                  <input type="text" id="product-name" placeholder="Nhập tên sản phẩm" required />
                </div>
                <div className="form-group">
                  <label htmlFor="product-description">Mô tả sản phẩm</label>
                  <textarea id="product-description" placeholder="Nhập mô tả sản phẩm" required></textarea>
                </div>
              </div>
              <div className="right-section">
                <label htmlFor="product-image"></label>
                <div className="image-upload">
                  <input
                    type="file"
                    id="product-image"
                    accept="image/*"
                    onChange={previewImage}
                    required
                    style={{ display: 'none' }}
                  />
                  <div className="image-preview" id="image-preview">
                    {imagePreview ? <img src={imagePreview} alt="Preview" /> : <span>Chưa có ảnh</span>}
                  </div>
                  <button
                    type="button"
                    className="upload-button"
                    onClick={() => document.getElementById('product-image').click()}
                  >
                    Tải ảnh lên
                  </button>
                </div>
              </div>
            </div>

            {/* Phần dưới: Ma trận 3x3 */}
            <div className="matrix-section">
              <div className="form-group">
                <label htmlFor="category">Danh mục</label>
                <select id="category" value={category} onChange={handleCategoryChange} required>
                  <option value="" disabled>Chọn danh mục</option>
                  <option value="food">Thực phẩm</option>
                  <option value="beverage">Đồ uống</option>
                  <option value="snacks">Bánh kẹo & Đồ ăn nhẹ</option>
                  <option value="cosmetics">Hóa mỹ phẩm</option>
                  <option value="kitchenware">Gia dụng & Đồ dùng nhà bếp</option>
                  <option value="seasoning">Gia vị</option>
                  <option value="babycare">Chăm sóc bé</option>
                  <option value="books">Sách và văn phòng phẩm</option>
                  <option value="cleaning">Sản phẩm vệ sinh nhà cửa</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="subcategory">Danh mục con</label>
                <select id="subcategory" required>
                  <option value="" disabled>Chọn danh mục con</option>
                  {subcategoryOptions.map((sub, index) => (
                    <option key={index} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="featured">Sản phẩm nổi bật</label>
                <select id="featured" required>
                  <option value="" disabled>Chọn trạng thái</option>
                  <option value="none">Không</option>
                  <option value="featured">Có</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="unit">Đơn vị</label>
                <input type="text" id="unit" placeholder="Nhập đơn vị" required />
              </div>
              <div className="form-group">
                <label htmlFor="brand">Nhãn hàng</label>
                <input type="text" id="brand" placeholder="Nhập nhãn hàng" required />
              </div>
              <div className="form-group">
                <label htmlFor="expiry-date">Hết hạn</label>
                <input
                  type="date"
                  id="expiry-date"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  min="2024-01-01"
                  max="2025-12-31"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Số lượng</label>
                <input type="number" id="quantity" placeholder="Nhập số lượng" min="0" required />
              </div>
              <div className="form-group">
                <label htmlFor="price">Giá</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  placeholder="Nhập giá sản phẩm"
                  step="1000"
                  onChange={handlePriceChange}
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="discount">Giảm giá</label>
                <input type="number" id="discount" placeholder="Nhập giảm giá (%)" min="0" required />
              </div>
            </div>

            {/* Nút Thêm */}
            <div className="form-group full-width">
              <button type="submit" className="submit-button">Thêm</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddProducts;
