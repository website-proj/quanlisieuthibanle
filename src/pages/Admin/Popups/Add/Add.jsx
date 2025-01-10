import React, { useState } from 'react';
import HeaderCard from "/src/components/Admin/HeaderCard/HeaderCard";
import ContentCard from "/src/components/Admin/ContentCard/ContentCard";
import { TextField, MenuItem, Select, FormControl, Button, Typography, Box, Backdrop, CircularProgress } from '@mui/material';

function AddPopup() {
  const [formData, setFormData] = useState({
    popupName: '',
    position: '',
    priority: '',
    status: '',
    popupImage: null,
  });

  const [errors, setErrors] = useState({});
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [success, setSuccess] = useState(false);
  const [addedCategory, setAddedCategory] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        popupImage: URL.createObjectURL(file),
      }));
      setErrors((prev) => ({ ...prev, popupImage: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.popupName) newErrors.popupName = 'Vui lòng nhập tên popup.';
    if (!formData.position) newErrors.position = 'Vui lòng chọn vị trí.';
    if (!formData.priority || Number(formData.priority) < 1)
      newErrors.priority = 'Vui lòng nhập thứ tự ưu tiên lớn hơn hoặc bằng 1.';
    if (!formData.status) newErrors.status = 'Vui lòng chọn trạng thái.';
    if (!formData.popupImage) newErrors.popupImage = 'Vui lòng tải lên ảnh popup.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setOpenBackdrop(true);  // Show backdrop on form submission

      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setAddedCategory({
          name: formData.popupName,
          position: formData.position,
          priority: formData.priority,
          status: formData.status,
          image: formData.popupImage,
        });
        setOpenBackdrop(false);
      }, 2000); // Simulate a delay for loading effect
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    setFormData({
      popupName: '',
      position: '',
      priority: '',
      status: '',
      popupImage: null,
    });
  };

  return (
    <div className="add-popup">
      <ContentCard>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
            <Box flex={1}>
              <Box mb={3}>
                <Typography variant="h6" sx={{ fontSize: '1em', fontWeight: '500' }}>Tên Popup</Typography>
                <TextField
                  fullWidth
                  name="popupName"
                  value={formData.popupName}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                />
                {errors.popupName && <Typography color="error">{errors.popupName}</Typography>}
              </Box>

              <Box mb={3}>
                <Typography variant="h6" sx={{ fontSize: '1em', fontWeight: '500' }}>Vị trí</Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.position}
                    name="position"
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="header">Header</MenuItem>
                    <MenuItem value="bottom">Bottom</MenuItem>
                    <MenuItem value="sidebar">Sidebar</MenuItem>
                  </Select>
                  {errors.position && <Typography color="error">{errors.position}</Typography>}
                </FormControl>
              </Box>

              <Box mb={3}>
                <Typography variant="h6" sx={{ fontSize: '1em', fontWeight: 500 }}>Thứ tự ưu tiên</Typography>
                <TextField
                  type="number"
                  fullWidth
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                />
                {errors.priority && <Typography color="error">{errors.priority}</Typography>}
              </Box>

              <Box mb={3}>
                <Typography variant="h6" sx={{ fontSize: '1em', fontWeight: '500' }}>Trạng thái</Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.status}
                    name="status"
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="active">Đang hoạt động</MenuItem>
                    <MenuItem value="inactive">Không hoạt động</MenuItem>
                  </Select>
                  {errors.status && <Typography color="error">{errors.status}</Typography>}
                </FormControl>
              </Box>
            </Box>

            <Box flex={1}>
              <Box mb={3} display="flex" justifyContent="center" alignItems="center" flexDirection="column" paddingTop='1.05em'>
                <div
                  className="upload-container"
                  onClick={() => document.getElementById('popup-upload').click()}
                >
                  {formData.popupImage ? (
                    <img src={formData.popupImage} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <div className="upload-icon">
                        <i className="bx bxs-cloud-upload"></i>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  id="popup-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <Typography variant="h6" sx={{ fontSize: '1em', fontWeight: '500', mt: 1 }}>Tải hình ảnh</Typography>
                {errors.popupImage && <Typography color="error">{errors.popupImage}</Typography>}
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              width: '100%',
              marginTop: '20px',
              borderRadius: '15px',
              boxShadow: 'none',
              textTransform: 'none',
              fontSize: '1em',
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : (
              'Thêm popup'
            )}
          </Button>
        </form>
      </ContentCard>

      {/* Backdrop Loading Spinner */}
      <Backdrop open={loading} style={{ zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Success Backdrop displaying form data */}
      <Backdrop 
        open={success} 
        style={{
          zIndex: 9999, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
        }}
        onClick={handleCloseSuccess} 
      >
        <Box
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '60%',
            maxHeight: '80%',
            width: 'auto',
            height: 'auto',
            overflow: 'hidden',
            transform: 'scale(0.85)', 
            transformOrigin: 'center',
          }}
          onClick={(e) => e.stopPropagation()} 
        >
          <Typography variant="h5" style={{ fontWeight: '500', textAlign: 'center' }}>
            Bạn đã thêm một popup!
          </Typography>

          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '20px',
            }}
          >
            <Box style={{ width: '48%' }}>
              <Typography variant="h6">
                <div style={{ marginBottom: '10px' }}>
                  Tên Popup: {addedCategory?.name}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  Vị trí: {addedCategory?.position}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  Thứ tự ưu tiên: {addedCategory?.priority}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  Trạng thái: {addedCategory?.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                </div>
              </Typography>
            </Box>

            <Box 
              style={{
                width: '48%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" style={{ marginBottom: '10px' }}>Ảnh popup</Typography>
              <img 
                src={addedCategory?.image} 
                alt="Category" 
                style={{ 
                  width: '80%', 
                  height: 'auto', 
                  objectFit: 'contain', 
                  maxWidth: '30em', 
                  marginBottom: '1em',
                  borderRadius: '15px',
                }} 
              />
            </Box>
          </Box>
        </Box>
      </Backdrop>
    </div>
  );
}

export default AddPopup;
