import React, { useState, useEffect } from 'react';
import { Box, Button, Backdrop, CircularProgress } from '@mui/material';
import ContentCard from '/src/components/ContentCard/ContentCard';
import categoriesData from './CategoriesSubcategories.json';
import SuccessBackdrop from './Backdrop.jsx';
import BasicInfo from '/src/pages/Products/Add/ComponentsOfAdd/BasicInfo';
import ImageUpload from '/src/pages/Products/Add/ComponentsOfAdd/ImageUpload';
import CategorySelection from '/src/pages/Products/Add/ComponentsOfAdd/CategorySelection';
import ProductDetails from '/src/pages/Products/Add/ComponentsOfAdd/ProductDetails';
import PricingDetails from '/src/pages/Products/Add/ComponentsOfAdd/PricingDetails';
import './Add.css';

function AddProducts() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    brand: '',
    expiryDate: '',
    unit: '',
    quantity: '',
    price: '',
    secondaryPrice: '',
    discount: '',
    featuredProduct: 'Không'
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedCategory, setAddedCategory] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập tên sản phẩm';
    if (!formData.description.trim()) newErrors.description = 'Vui lòng nhập mô tả sản phẩm';
    if (!formData.category) newErrors.category = 'Vui lòng chọn danh mục';
    if (!formData.subcategory) newErrors.subcategory = 'Vui lòng chọn danh mục con';
    if (!formData.brand.trim()) newErrors.brand = 'Vui lòng nhập nhãn hàng';
    if (!formData.expiryDate) newErrors.expiryDate = 'Vui lòng chọn ngày hết hạn';
    if (!formData.unit) newErrors.unit = 'Vui lòng nhập đơn vị';
    if (!formData.quantity) newErrors.quantity = 'Vui lòng nhập số lượng';
    if (!formData.price) newErrors.price = 'Vui lòng nhập giá nhập';
    if (!formData.secondaryPrice) newErrors.secondaryPrice = 'Vui lòng nhập giá bán';
    if (!formData.discount) newErrors.discount = 'Vui lòng nhập giảm giá';
    if (!imagePreview) newErrors.image = 'Vui lòng tải lên hình ảnh sản phẩm';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAdd = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        setTimeout(() => {
          setAddedCategory({
            ...formData, 
            image: imagePreview,
          });
          setSuccess(true);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
        setLoading(false);
      }
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      subcategory: '',
      brand: '',
      expiryDate: '',
      unit: '',
      quantity: '',
      price: '',
      secondaryPrice: '',
      discount: '',
      featuredProduct: 'Không'
    });
    setImagePreview('');
    setErrors({});
  };

  const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        if (errors.image) {
          setErrors(prev => ({...prev, image: ''}));
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  useEffect(() => {
    if (formData.category) {
      const selectedCategory = categoriesData.find((item) => item.category === formData.category);
      if (selectedCategory) {
        setSubcategoryOptions(selectedCategory.subcategories);
        handleInputChange('subcategory', '');
      }
    }
  }, [formData.category]);

  return (
    <div>
      <ContentCard>
        <form onSubmit={(e) => e.preventDefault()}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <BasicInfo 
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
            />
            
            <ImageUpload
              imagePreview={imagePreview}
              errors={errors}
              previewImage={previewImage}
            />
          </Box>

          <CategorySelection
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            categoriesData={categoriesData}
            subcategoryOptions={subcategoryOptions}
          />

          <ProductDetails
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />

          <PricingDetails
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            sx={{
              width: '100%',
              marginTop: '20px',
              textTransform: 'none',
              fontSize: '1.1em',
              boxShadow: 'none',
              borderRadius: '15px'
            }}
          >
            Thêm sản phẩm
          </Button>
        </form>
      </ContentCard>

      {loading && (
        <Backdrop open={true} sx={{ zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <SuccessBackdrop
        open={success}
        handleCloseSuccess={handleCloseSuccess}
        addedCategory={addedCategory}
      />
    </div>
  );
}

export default AddProducts;