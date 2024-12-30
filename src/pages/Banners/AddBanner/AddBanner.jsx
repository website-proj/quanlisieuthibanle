import React, { useState } from 'react';
import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import ContentCard from "/src/components/ContentCard/ContentCard";
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Typography, Box } from '@mui/material';

function AddBanner() {
  const [formData, setFormData] = useState({
    position: '',
    priority: '',
    status: '',
    bannerImage: null,
  });

  const [errors, setErrors] = useState({}); 

  const breadcrumbs = [
    { label: "Tổng quan", link: "/dashboard" },
    { label: "Banner", link: "/banners-list" },
    { label: "Thêm banner", link: "/add-banner", active: true },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Xóa lỗi khi nhập liệu
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        bannerImage: URL.createObjectURL(file), // Sử dụng URL.createObjectURL để hiển thị preview ảnh
      }));
      setErrors((prev) => ({ ...prev, bannerImage: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.position) newErrors.position = 'Vui lòng chọn vị trí.';
    if (!formData.priority) newErrors.priority = 'Vui lòng nhập thứ tự ưu tiên.';
    if (!formData.status) newErrors.status = 'Vui lòng chọn trạng thái.';
    if (!formData.bannerImage) newErrors.bannerImage = 'Vui lòng tải lên ảnh banner.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Dữ liệu form:', formData);
      alert('Thêm banner thành công!');
    }
  };

  return (
    <div className="add-banner">
      <HeaderCard title="Thêm banner" breadcrumbs={breadcrumbs} />
      <ContentCard>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
            {/* Left side fields */}
            <Box flex={1}>
              {/* Vị trí */}
              <Box mb={3}>
                <InputLabel>Vị trí</InputLabel>
                <FormControl fullWidth>
                  <Select
                    value={formData.position}
                    name="position"
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="header">Header</MenuItem>
                    <MenuItem value="footer">Footer</MenuItem>
                    <MenuItem value="sidebar">Sidebar</MenuItem>
                  </Select>
                  {errors.position && <Typography color="error">{errors.position}</Typography>}
                </FormControl>
              </Box>

              {/* Thứ tự ưu tiên */}
              <Box mb={3}>
                <InputLabel>Thứ tự ưu tiên</InputLabel>
                <TextField
                  type="number"
                  fullWidth
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
                {errors.priority && <Typography color="error">{errors.priority}</Typography>}
              </Box>

              {/* Trạng thái */}
              <Box mb={3}>
                <InputLabel>Trạng thái</InputLabel>
                <FormControl fullWidth>
                  <Select
                    value={formData.status}
                    name="status"
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="active">Hoạt động</MenuItem>
                    <MenuItem value="inactive">Không hoạt động</MenuItem>
                  </Select>
                  {errors.status && <Typography color="error">{errors.status}</Typography>}
                </FormControl>
              </Box>
            </Box>

            {/* Right side: File Upload */}
            <Box flex={1}>
              <Box mb={3} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <InputLabel>Tải ảnh banner</InputLabel>
                <div
                  className="upload-container"
                  onClick={() => document.getElementById('banner-upload').click()}
                >
                  {formData.bannerImage ? (
                    <img src={formData.bannerImage} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      {/* <CloudUploadIcon sx={{ fontSize: 50, color: '#ccc' }} /> */}
                      {/* <Typography variant="body2"></Typography> */}
                      <div className="upload-icon">
                <i className="bx bxs-cloud-upload"></i>
              </div>
                    </div>
                  )}
                </div>
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {errors.bannerImage && <Typography color="error">{errors.bannerImage}</Typography>}
              </Box>
            </Box>
          </Box>

          {/* Nút thêm */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: '100%', marginTop: '20px' }}
          >
            Thêm
          </Button>
        </form>
      </ContentCard>
    </div>
  );
}

export default AddBanner;
