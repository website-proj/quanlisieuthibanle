// src/components/EditBanner/EditBanner.jsx
import React, { useState } from "react";
import { Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function EditBanner({ selectedBanner, onUpdate, onClose }) {
  const [imagePreview, setImagePreview] = useState(selectedBanner.image);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatedBanner, setUpdatedBanner] = useState({ ...selectedBanner });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    const bannerData = {
      ...updatedBanner,
      image: selectedImage || updatedBanner.image,
    };
    onUpdate(bannerData);
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "#fff", borderRadius: "10px", boxShadow: 0 }}>
      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "1em" }}>
        Chỉnh sửa banner
      </Typography>

      {/* Image Preview and Upload */}
      <Box sx={{ marginY: 2 }}>
        <Typography variant="body1" sx={{ marginBottom: "0.5em" }}>
          <strong>Hình ảnh:</strong>
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "60%", height: "auto", borderRadius: "20px" }}
            />
          )}
          <Button variant="outlined" component="label" sx={{ textTransform: "none", borderRadius: "15px", boxShadow: "none", width: "50%" }}>
            Tải ảnh lên
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
        </Box>
      </Box>

      {/* Position Select */}
      <FormControl fullWidth sx={{ marginY: 2 }}>
        <InputLabel>Vị trí</InputLabel>
        <Select
          value={updatedBanner.position}
          label="Vị trí"
          onChange={(e) => setUpdatedBanner({ ...updatedBanner, position: e.target.value })}
        >
          <MenuItem value="main">Main</MenuItem>
          <MenuItem value="bottom">Bottom</MenuItem>
          <MenuItem value="sidebar">Sidebar</MenuItem>
        </Select>
      </FormControl>

      {/* Status Select */}
      <FormControl fullWidth sx={{ marginY: 2 }}>
        <InputLabel>Trạng thái</InputLabel>
        <Select
          value={updatedBanner.status}
          label="Trạng thái"
          onChange={(e) => setUpdatedBanner({ ...updatedBanner, status: e.target.value })}
        >
          <MenuItem value="Active">Hoạt động</MenuItem>
          <MenuItem value="Inactive">Không hoạt động</MenuItem>
        </Select>
      </FormControl>

      {/* Priority Input */}
      <TextField
        fullWidth
        label="Thứ tự ưu tiên"
        type="number"
        value={updatedBanner.priority}
        onChange={(e) => setUpdatedBanner({ ...updatedBanner, priority: e.target.value })}
        sx={{ marginY: 2 }}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ width: "50%", textTransform: "none", borderRadius: "15px" }}>
          Hủy
        </Button>
        <Button onClick={handleUpdate} variant="contained" sx={{ width: "50%", textTransform: "none", borderRadius: "15px", boxShadow: "none" }}>
          Lưu
        </Button>
      </Box>
    </Box>
  );
}

export default EditBanner;
