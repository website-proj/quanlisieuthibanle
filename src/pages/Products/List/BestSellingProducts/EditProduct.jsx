import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Typography,
  Alert,
  Grid,
} from "@mui/material";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";
import axios from "axios";
import Edit from "./EditProduct";
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
    star_product: false,
    expiration_date: "",
    category_id: "",
  });
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
        star_product: product.star_product || false,
        expiration_date: product.expiration_date ? product.expiration_date.split('T')[0] : "",
        category_id: product.category_id || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (e) => {
    setFormData(prev => ({
      ...prev,
      star_product: e.target.checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const queryParams = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== "") {
          if (typeof value === 'boolean') {
            queryParams.append(key, value);
          } else {
            queryParams.append(key, encodeURIComponent(value));
          }
        }
      });

      const response = await axios.put(
        `${BASE_URL}${ENDPOINTS.products.editProduct}?${queryParams.toString()}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        if (onUpdate) onUpdate(formData);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật sản phẩm");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
        Chỉnh sửa sản phẩm
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Cập nhật sản phẩm thành công!
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Tên sản phẩm"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Tên nhãn hàng"
            name="name_brand"
            value={formData.name_brand}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Mô tả"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Giá bán"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Giá gốc"
            name="original_price"
            type="number"
            value={formData.original_price}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Giảm giá"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Đơn vị"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Số lượng trong kho"
            name="stock_quantity"
            type="number"
            value={formData.stock_quantity}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Ngày hết hạn"
            name="expiration_date"
            type="date"
            value={formData.expiration_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.star_product}
                onChange={handleSwitchChange}
                name="star_product"
              />
            }
            label="Sản phẩm nổi bật"
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ borderRadius: "10px" }}
        >
          Hủy
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: "10px" }}
        >
          Cập nhật
        </Button>
      </Box>
    </Box>
  );
}