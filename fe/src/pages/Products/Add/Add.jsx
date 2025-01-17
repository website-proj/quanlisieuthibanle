import React, { useState, useEffect } from 'react';
import { Box, Button, Backdrop, CircularProgress } from '@mui/material';
import ContentCard from '/src/components/ContentCard/ContentCard';
import SuccessBackdrop from '/src/pages/Products/Add/ComponentsOfAdd/Backdrop.jsx';
import BasicInfo from '/src/pages/Products/Add/ComponentsOfAdd/BasicInfo';
import ImageUpload from '/src/pages/Products/Add/ComponentsOfAdd/ImageUpload';
import CategorySelection from '/src/pages/Products/Add/ComponentsOfAdd/CategorySelection';
import ProductDetails from '/src/pages/Products/Add/ComponentsOfAdd/ProductDetails';
import PricingDetails from '/src/pages/Products/Add/ComponentsOfAdd/PricingDetails';
import './Add.css';
import { BASE_URL, ENDPOINTS } from '/src/api/apiEndpoints';
import axios from 'axios';

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
    oldPrice: '',
    sellPrice: '',
    discount: '',
    featuredProduct: 'Không',
  });

  const jwtToken = localStorage.getItem('jwtToken');
  const [categoriesData, setCategoriesData] = useState([]);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedCategory, setAddedCategory] = useState(null);

  useEffect(() => {
    console.log("JWT Token available:", !!jwtToken);
  }, [jwtToken]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!jwtToken) {
        console.error("Không tìm thấy JWT token.");
        return;
      }
  
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}${ENDPOINTS.char.revenueCategories}`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });
  
        if (!response.ok) {
          throw new Error(`Lỗi khi lấy danh mục: ${response.statusText}`);
        }
  
        const data = await response.json();
  
        if (data.message === "success") {
          const formattedCategories = Object.entries(data.data).map(([key, value]) => ({
            id: key,
            category: value.parent_category_name,
            subcategories: Object.entries(value.child_categories).map(([subKey, subValue]) => ({
              id: subKey,
              name: subValue.category_name,
              amount: subValue.category_amount,
            })),
          }));
          setCategoriesData(formattedCategories);
        } else {
          console.error("Định dạng phản hồi không hợp lệ:", data);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [jwtToken]);

  useEffect(() => {
    if (formData.category) {
      const selectedCategory = categoriesData.find(item => item.id === formData.category);
      if (selectedCategory) {
        setSubcategoryOptions(selectedCategory.subcategories);
      }
    }
  }, [formData.category, categoriesData]);

  const validateForm = () => {
    console.log("Validating form data:", formData);
    const newErrors = {};

    if (formData.expiryDate) {
      const expiryYear = new Date(formData.expiryDate).getFullYear();
      if (expiryYear < 2000 || expiryYear > 3000) {
        newErrors.expiryDate = 'Năm phải từ 2000 đến 3000';
      }
    }

    if (formData.discount && (formData.discount < 0 || formData.discount > 100)) {
      newErrors.discount = 'Giảm giá phải nhỏ hơn hoặc bằng 100%';
    }

    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập tên sản phẩm';
    if (!formData.description.trim()) newErrors.description = 'Vui lòng nhập mô tả sản phẩm';
    if (!formData.category) newErrors.category = 'Vui lòng chọn danh mục';
    if (!formData.subcategory) newErrors.subcategory = 'Vui lòng chọn danh mục con';
    if (!formData.brand.trim()) newErrors.brand = 'Vui lòng nhập nhãn hiệu';
    if (!formData.expiryDate) newErrors.expiryDate = 'Vui lòng chọn ngày hết hạn';
    if (!formData.unit) newErrors.unit = 'Vui lòng nhập đơn vị';
    if (!formData.quantity) newErrors.quantity = 'Vui lòng nhập số lượng';
    if (!formData.sellPrice) newErrors.sellPrice = 'Vui lòng nhập giá bán';
    if (!formData.oldPrice) newErrors.oldPrice = 'Vui lòng nhập giá gốc';
    if (!imageFile) newErrors.image = 'Vui lòng tải lên hình ảnh sản phẩm';

    console.log("Validation errors:", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating field ${field} with value:`, value);
    setFormData(prev => ({
      ...prev,
      [field]: value || ""  
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAdd = async () => {
    console.log("Bắt đầu thêm sản phẩm");
  
    if (!validateForm()) {
      console.log("Form không hợp lệ", errors);
      return;
    }
  
    const formDataToSend = new FormData();
  
    formDataToSend.append('name', formData.name || ''); 
    formDataToSend.append('name_brand', formData.brand || ''); 
    formDataToSend.append('description', formData.description || ''); 
    formDataToSend.append('price', formData.sellPrice || 0); 
    formDataToSend.append('original_price', formData.oldPrice || 0); 
    formDataToSend.append('discount', formData.discount || 0); 
    formDataToSend.append('unit', formData.unit || ''); 
    formDataToSend.append('stock_quantity', formData.quantity || 0); 
    formDataToSend.append('star_product', formData.featuredProduct === 'Có' ? 'true' : 'false'); 
    formDataToSend.append('expiration_date', formData.expiryDate || ''); 
    formDataToSend.append('category_id', formData.subcategory || ''); 
  
    if (imageFile) {
      formDataToSend.append('file', imageFile);
    } else {
      formDataToSend.append('file', ''); 
    }
  
    console.log("FormData chuẩn bị gửi:", Object.fromEntries(formDataToSend));
  
    try {
      setLoading(true);
  
      const apiUrl = `${BASE_URL}${ENDPOINTS.products.addProduct}`;
  
      const response = await axios.post(apiUrl, formDataToSend, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log("API Response:", response);
  
      if (response.data?.message === "Product created successfully") {
        const createdProduct = response.data.product; 
        console.log('Created Product:', createdProduct);
        setAddedCategory({
          ...createdProduct,
          old_price: formData.oldPrice || 0, 
          price: formData.sellPrice || 0,      
          secondaryPrice: formData.oldPrice || 0,  
          expiryDate: formData.expiryDate || '', 
        });
        setSuccess(true);
      } else {
        console.error("Error: Product creation failed", response.data);
        alert('Không thể tạo sản phẩm. Hãy thử lại!');
      }
    } catch (error) {
      console.error('API Error:', error);
      alert(`Lỗi: ${error.response?.data?.detail || 'Đã có lỗi xảy ra khi thêm sản phẩm'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    window.location.reload();
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
      sellPrice: '',
      oldPrice: '',
      discount: '',
      featuredProduct: 'Không',
    });
    setImagePreview('');
    setImageFile(null);
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
      setImageFile(file);
    } else {
      setImagePreview('');
      setImageFile(null);
    }
  };

  return (
    <div>
      <ContentCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <BasicInfo formData={formData} errors={errors} handleInputChange={handleInputChange} />
          <ImageUpload imagePreview={imagePreview} errors={errors} previewImage={previewImage} />
        </Box>

        <CategorySelection
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          categoriesData={categoriesData} 
          subcategoryOptions={subcategoryOptions}
        />

        <ProductDetails formData={formData} errors={errors} handleInputChange={handleInputChange} />
        <PricingDetails formData={formData} errors={errors} handleInputChange={handleInputChange} />

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
            borderRadius: '15px',
          }}
        >
          Thêm sản phẩm
        </Button>
      </ContentCard>

      {loading && (
        <Backdrop open={true} sx={{ zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <SuccessBackdrop
        open={success}
        handleCloseSuccess={handleCloseSuccess}
        addedCategory={{
          name: formData.name,
          description: formData.description,
          brand: formData.brand,
          // category: formData.category,
          // subcategory: formData.subcategory,
          unit: formData.unit,
          quantity: formData.quantity,
          expiryDate: formData.expiryDate,
          featuredProduct: formData.discount === "true" ? "Có" : "Không" ,
          price: formData.sellPrice,
          secondaryPrice: formData.oldPrice,
          discount: formData.discount,
          image: imagePreview,  
        }}
      />
    </div>
  );
}

export default AddProducts;
