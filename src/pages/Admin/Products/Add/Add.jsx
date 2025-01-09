import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, MenuItem, Select, FormControl } from '@mui/material';
import ContentCard from "/src/components/Admin/ContentCard/ContentCard";
import './Add.css'
// Giả sử dữ liệu danh mục và danh mục con được lưu trữ trong CategoriesSubcategories.json
import categoriesData from './CategoriesSubcategories.json';

function AddProducts() {
  const [imagePreview, setImagePreview] = useState('');
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [secondaryPrice, setSecondaryPrice] = useState(0); // Thêm state cho ô giá phụ
  const [expiryDate, setExpiryDate] = useState('');
  const [featuredProduct, setFeaturedProduct] = useState('Không'); // Thêm state cho sản phẩm nổi bật
  const [unit, setUnit] = useState(0); // Thêm state cho đơn vị
  const [quantity, setQuantity] = useState(0); // Thêm state cho số lượng

  useEffect(() => {
    if (category) {
      const selectedCategory = categoriesData.find(item => item.category === category);
      setSubcategoryOptions(selectedCategory ? selectedCategory.subcategories : []);
    }
  }, [category]);

  const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    let newPrice = event.target.value;
    if (newPrice <= 0) {
      newPrice = 1; // Giá phải lớn hơn 0
    }
    setPrice(newPrice);
  };

  const handleSecondaryPriceChange = (event) => {
    let newPrice = event.target.value;
    if (newPrice <= 0) {
      newPrice = 1; // Giá phụ phải lớn hơn 0
    }
    setSecondaryPrice(newPrice);
  };

  const handleUnitChange = (event) => {
    let newUnit = event.target.value;
    if (newUnit <= 0) {
      newUnit = 1; // Đơn vị phải lớn hơn 0
    }
    setUnit(newUnit);
  };

  const handleQuantityChange = (event) => {
    let newQuantity = event.target.value;
    if (newQuantity <= 0) {
      newQuantity = 1; // Số lượng phải lớn hơn 0
    }
    setQuantity(newQuantity);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleFeaturedProductChange = (event) => {
    setFeaturedProduct(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý logic thêm sản phẩm ở đây
    console.log({
      category,
      subcategory: subcategoryOptions,
      price,
      secondaryPrice,
      expiryDate,
      featuredProduct,
      unit,
      quantity,
      // Các trường khác
    });
  };

  return (
    <div>
      <ContentCard>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          {/* Các phần nhập tên sản phẩm, mô tả sản phẩm */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Box sx={{ width: '48%' }}>
              <Typography variant="h6" className="add-products-list">Tên sản phẩm</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Nhập tên sản phẩm"
                required
                sx={{ marginBottom: '16px' }}
              />
              <Typography variant="h6" className="add-products-list">Mô tả sản phẩm</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Nhập mô tả sản phẩm"
                multiline
                rows={5.5}
                required
              />
            </Box>

            <Box sx={{ width: '48%', textAlign: 'center', position: 'relative', paddingTop: '2em' }}>
              <input
                type="file"
                id="product-image"
                accept="image/*"
                onChange={previewImage}
                style={{ display: 'none' }}
                required
              />
              <Box
                sx={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: '10px',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  cursor: 'pointer',
                }}
                onClick={() => document.getElementById('product-image').click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                ) : (
                  <div className="upload-icon">
                    <i className="bx bxs-cloud-upload"></i>
                  </div>
                )}
              </Box>
              <Button
                variant="contained"
                sx={{
                  fontSize: '1em',
                  textTransform: 'none',
                  borderRadius: '10px',
                  width: '100%',
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                  boxShadow: 'none'
                }}
              >
                Tải ảnh lên
              </Button>
            </Box>
          </Box>

          {/* Các phần nhập danh mục, đơn vị, nhãn hàng */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Box sx={{ width: '48%' }}>
              <Typography variant="h6" className="add-products-list">Danh mục</Typography>
              <FormControl fullWidth>
                <Select
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  required
                >
                  <MenuItem value="" disabled>
                    Chọn danh mục
                  </MenuItem>
                  {categoriesData.map((item, index) => (
                    <MenuItem key={index} value={item.category}>
                      {item.category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ width: '48%' }}>
              <Typography variant="h6" className="add-products-list">Danh mục con</Typography>
              <FormControl fullWidth>
                <Select id="subcategory" required>
                  <MenuItem value="" disabled>
                    Chọn danh mục con
                  </MenuItem>
                  {subcategoryOptions.map((sub, index) => (
                    <MenuItem key={index} value={sub.name}>
                      {sub.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Các trường số đều phải lớn hơn 0 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <Box>
              <Typography variant="h6" className="add-products-list">Đơn vị</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={unit}
                onChange={handleUnitChange}
                required
                placeholder="Nhập đơn vị (phải lớn hơn 0)"
              />
            </Box>

            <Box>
              <Typography variant="h6" className="add-products-list">Nhãn hàng</Typography>
              <TextField fullWidth variant="outlined" placeholder="Nhập nhãn hàng" required />
            </Box>

            <Box>
              <Typography variant="h6" className="add-products-list">Ngày hết hạn</Typography>
              <TextField
                fullWidth
                type="date"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                required
              />
            </Box>

            <Box>
              <Typography variant="h6" className="add-products-list">Số lượng</Typography>
              <TextField
                fullWidth
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                required
                placeholder="Nhập số lượng (phải lớn hơn 0)"
              />
            </Box>
          </Box>

          {/* Các trường còn lại trong 1 hàng */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <Box>
              <Typography variant="h6" className="add-products-list">Giá nhập</Typography>
              <TextField
                fullWidth
                type="number"
                value={price}
                placeholder="Nhập giá nhập"
                onChange={handlePriceChange}
                required
              />
            </Box>

            <Box>
              <Typography variant="h6" className="add-products-list">Giá bán</Typography>
              <TextField
                fullWidth
                type="number"
                value={secondaryPrice}
                placeholder="Nhập giá bán"
                onChange={handleSecondaryPriceChange}
                required
              />
            </Box>

            <Box>
              <Typography variant="h6" className="add-products-list">Giảm giá (%)</Typography>
              <TextField fullWidth type="number" placeholder="Nhập giảm giá (%)" required />
            </Box>

            <Box>
              <Typography variant="h6" className="add-products-list">Sản phẩm nổi bật</Typography>
              <FormControl fullWidth>
                <Select
                  id="featured-product"
                  value={featuredProduct}
                  onChange={handleFeaturedProductChange}
                  required
                >
                  <MenuItem value="Không">Không</MenuItem>
                  <MenuItem value="Có">Có</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: '100%', marginTop: '20px', textTransform: 'none', fontSize: '1.1em', boxShadow: 'none', borderRadius: '15px' }}
          >
            Thêm sản phẩm
          </Button>
        </form>
      </ContentCard>
    </div>
  );
}

export default AddProducts;
