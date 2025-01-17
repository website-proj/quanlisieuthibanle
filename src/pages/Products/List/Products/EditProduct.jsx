import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Alert,
  Grid,
} from "@mui/material";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";
import axios from "axios";

export default function Edit({ product, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    name_brand: "",
    description: "",
    price: "",
    original_price: "",
    discount: "",
    unit: "",
    stock_quantity: "",
    star_product: "false",
    expiration_date: "",
    category_id: "",
    image: null,
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [currentImage, setCurrentImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        name_brand: product.name_brand || "",
        description: product.description || "",
        price: product.price || "",
        original_price: product.original_price || "",
        discount: product.discount || "",
        unit: product.unit || "",
        stock_quantity: product.stock_quantity || "",
        star_product: product.star_product ? "true" : "false",
        expiration_date: product.expiration_date ? product.expiration_date.split('T')[0] : "",
        category_id: product.category_id || "",
        image: null,
      });
      setCurrentImage(product.image || "");
    }
  }, [product]);

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case 'price':
      case 'original_price':
        if (value && (isNaN(value) || value < 0)) {
          error = 'Giá trị phải là số dương';
        }
        break;
      case 'discount':
        if (value && (isNaN(value) || value < 0 || value > 100)) {
          error = 'Giảm giá phải từ 0 đến 100';
        }
        break;
      case 'stock_quantity':
        if (value && (isNaN(value) || value < 0 || !Number.isInteger(Number(value)))) {
          error = 'Số lượng phải là số nguyên dương';
        }
        break;
      case 'expiration_date':
        if (value) {
          const year = new Date(value).getFullYear();
          if (year < 2000 || year > 3000) {
            error = 'Năm phải nằm trong khoảng 2000-3000';
          }
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setCurrentImage(URL.createObjectURL(file));
    }
  };

  const handleStarProductChange = (e) => {
    setFormData(prev => ({
      ...prev,
      star_product: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Kiểm tra xem có lỗi validation không
    const hasErrors = Object.values(fieldErrors).some(error => error !== "");
    if (hasErrors) {
      setError("Vui lòng sửa các lỗi trước khi cập nhật");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("product_id", product.product_id);
      
      if (formData.image) {
        formDataToSend.append("file", formData.image);
      }

      const changedFields = {};
      
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'image' && value !== '' && value !== product[key]) {
          if (key === 'price' || key === 'original_price' || key === 'stock_quantity') {
            changedFields[key] = parseInt(value);
          } else if (key === 'discount') {
            changedFields[key] = parseFloat(value);
          } else if (key === 'star_product') {
            changedFields[key] = value === 'true';
          } else {
            changedFields[key] = value;
          }
        }
      });

      const queryParams = new URLSearchParams();
      Object.entries(changedFields).forEach(([key, value]) => {
        queryParams.append(key, value);
      });

      const url = `${BASE_URL}${ENDPOINTS.products.editProduct}?${queryParams.toString()}`;

      const response = await axios.put(url, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.status === 200) {
        setSuccess(true);
        if (onUpdate) onUpdate(response.data);
        setTimeout(() => {
          window.location.reload(); // Reload trang sau khi cập nhật thành công
        }, 1500);
      }
    } catch (error) {
      console.error("Error response:", error.response);
      setError(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật sản phẩm");
    }
  };

  const renderTextField = (name, label, type = "text", multiline = false, rows = 1) => (
    <>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>{label}</Typography>
      <TextField
        fullWidth
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        multiline={multiline}
        rows={rows}
        error={!!fieldErrors[name]}
        helperText={fieldErrors[name]}
        sx={{ mb: 2 }}
      />
    </>
  );

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
        Chỉnh sửa sản phẩm
      </Typography>

      {error && (
        <Alert severity="error" sx={{ position: 'fixed', top: 16, right: 16, mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ position: 'fixed', top: 16, right: 16, mb: 2 }}>
          Cập nhật sản phẩm thành công!
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Ảnh sản phẩm</Typography>
          <Box sx={{ mb: 2 }}>
            {currentImage && (
              <Box sx={{ mb: 1 }}>
                <img 
                  src={currentImage} 
                  alt="Current product" 
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                />
              </Box>
            )}
            <Button
              variant="contained"
              component="span"
              onClick={() => document.getElementById('file-upload').click()}
              sx={{
                mt: 2,
                borderRadius: "15px",
                boxShadow: "none",
                backgroundColor: "primary.main",
              }}
            >
              Tải ảnh lên
            </Button>
            <input
              accept="image/*"
              id="file-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </Box>

          {renderTextField("name", "Tên sản phẩm")}
          {renderTextField("name_brand", "Tên nhãn hàng")}
          {renderTextField("description", "Mô tả", "text", true, 4)}
        </Grid>

        <Grid item xs={6}>
        {renderTextField("price", "Giá bán", "number")}
          {renderTextField("original_price", "Giá gốc", "number")}
          {renderTextField("discount", "Giảm giá", "number")}
          {renderTextField("unit", "Đơn vị")}
          {renderTextField("stock_quantity", "Số lượng trong kho", "number")}
          {renderTextField("expiration_date", "Ngày hết hạn", "date")}

          <Typography variant="subtitle2" sx={{ mb: 1 }}>Sản phẩm nổi bật</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select
              value={formData.star_product}
              name="star_product"
              onChange={handleStarProductChange}
            >
              <MenuItem value="true">Có</MenuItem>
              <MenuItem value="false">Không</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
  <Button
    variant="outlined"
    onClick={onClose}
    sx={{
      borderRadius: "15px", 
      textTransform: "none",  
      boxShadow: "none",       
      fontSize: "1em"          
    }}
  >
    Hủy
  </Button>
  <Button
    type="submit"
    variant="contained"
    sx={{
      borderRadius: "15px", 
      textTransform: "none",  
      boxShadow: "none",       
      fontSize: "1em"          
    }}
    disabled={Object.values(fieldErrors).some(error => error !== "")}
  >
    Cập nhật
  </Button>
</Box>

    </Box>
  );
}