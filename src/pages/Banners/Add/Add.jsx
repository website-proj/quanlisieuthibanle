import React, { useState } from 'react';
import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import ContentCard from "/src/components/ContentCard/ContentCard";
import { TextField, MenuItem, Select, FormControl, Button, Typography, Box, Backdrop, CircularProgress } from '@mui/material';
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";
import axios from 'axios';

function AddBanner() {
  const [formData, setFormData] = useState({
    position: '',
    priority: '',
    status: '',
    bannerImage: null,
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
        bannerImage: file,
      }));
      setErrors((prev) => ({ ...prev, bannerImage: '' }));
    }
  };
const jwtToken = localStorage.getItem("jwtToken")
const handleSubmit = (e) => {
  e.preventDefault();

  const newErrors = {};
  if (!formData.position) newErrors.position = 'Vui lòng chọn vị trí.';
  if (!formData.priority || Number(formData.priority) < 1)
    newErrors.priority = 'Vui lòng nhập thứ tự ưu tiên lớn hơn hoặc bằng 1.';
  if (!formData.status) newErrors.status = 'Vui lòng chọn trạng thái.';
  if (!formData.bannerImage) newErrors.bannerImage = 'Vui lòng tải lên ảnh banner.';

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    setLoading(true);
    setOpenBackdrop(true);

    const formDataRequest = new FormData();
    formDataRequest.append('file', formData.bannerImage); // Chỉ thêm file vào FormData

    const jwtToken = localStorage.getItem("jwtToken");

    // Gửi yêu cầu POST với các tham số trong URL
    axios.post(`${BASE_URL}${ENDPOINTS.banners.addBanner}?position=${formData.position}&status=${formData.status}&priority=${formData.priority}`, formDataRequest, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        // 'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      setLoading(false);
      setSuccess(true);
      setAddedCategory({
        position: formData.position,
        priority: formData.priority,
        status: formData.status,
        image: URL.createObjectURL(formData.bannerImage),
      });
      setOpenBackdrop(false);
    })
    .catch((error) => {
      setLoading(false);
      setOpenBackdrop(false);
      console.error("There was an error submitting the form:", error.response?.data || error);

      if (error.response?.data?.detail) {
        error.response.data.detail.forEach((err, index) => {
          console.error(`Error ${index + 1}:`, err);
        });
      }
    });
  }
};

  const handleCloseSuccess = () => {
    setSuccess(false);
    setFormData({
      position: '',
      priority: '',
      status: '',
      bannerImage: null,
    });
    window.location.reload()
  };

  return (
    <div className="add-banner">
      <ContentCard>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
            <Box flex={1}>
              <Box mb={3}>
                <Typography variant="h6" sx={{ fontSize: '1em', fontWeight: '500' }}>Vị trí</Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.position}
                    name="position"
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="main">Main</MenuItem>
                    <MenuItem value="bottom">Bottom</MenuItem>
                    <MenuItem value="sidebar">Sidebar</MenuItem>
                  </Select>
                  {errors.position && <Typography color="error">{errors.position}</Typography>}
                </FormControl>
              </Box>

              <Box mb={3}>
                <Typography variant="h6" sx={{ fontSize: '1em', fontWeight: '500' }}>Thứ tự ưu tiên</Typography>
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
                    <MenuItem value="Active">Đang hoạt động</MenuItem>
                    <MenuItem value="Inactive">Không hoạt động</MenuItem>
                  </Select>
                  {errors.status && <Typography color="error">{errors.status}</Typography>}
                </FormControl>
              </Box>
            </Box>

            <Box flex={1}>
              <Box mb={3} display="flex" justifyContent="center" alignItems="center" flexDirection="column" paddingTop='1.05em'>
                <div
                  className="upload-container"
                  onClick={() => document.getElementById('banner-upload').click()}
                >
                  {formData.bannerImage ? (
                    <img src={URL.createObjectURL(formData.bannerImage)} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="upload-placeholder">
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
                <Typography variant="h6" sx={{ fontSize: '1em', fontWeight: '500', mt: 1 }}>Tải hình ảnh</Typography>
                {errors.bannerImage && <Typography color="error">{errors.bannerImage}</Typography>}
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
              'Thêm banner'
            )}
          </Button>
        </form>
      </ContentCard>

      <Backdrop open={loading} style={{ zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

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
      overflowY: 'auto', 
      transform: 'scale(0.85)', 
      transformOrigin: 'center',
      scrollbarColor: '#ccc transparent',
            // '&::-webkit-scrollbar': {
            //   width: '6px',
            //   marginRight: '2px'
            // },
            // '&::-webkit-scrollbar-track': {
            //   background: 'transparent',
            //   marginTop: '10px',
            //   marginBottom: '10px'
            // },
            // '&::-webkit-scrollbar-thumb': {
            //   background: '#ccc',
            //   borderRadius: '3px',
            //   border: '2px solid transparent',
            //   backgroundClip: 'padding-box'
            // }
    }}
    onClick={(e) => e.stopPropagation()} 
  >
    <Typography variant="h5" style={{ fontWeight: '500', textAlign: 'center' }}>
      Bạn đã thêm một banner!
    </Typography>
    <Box style={{ width: '80%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <img 
        src={addedCategory?.image} 
        alt="Category" 
        style={{ 
          width: '50%', 
          height: 'auto', 
          objectFit: 'contain', 
          maxWidth: '40em', 
          borderRadius: '15px',
          textAlign: 'center',
          paddingBottom: '1em'
        }} 
      />
    </Box>
    <Typography variant='h6'> Vị trí: {addedCategory?.position}</Typography>
    <Typography variant='h6'> 
      Trạng thái: {addedCategory?.status === 'Active' ? 'Hoạt động' : 'Không hoạt động'}
    </Typography>
    <Typography variant='h6'> Thứ tự ưu tiên:  {addedCategory?.priority}</Typography>

    <Box
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px',
      }}
    >
      <Button
        variant="contained"
        onClick={handleCloseSuccess}
        fullWidth
        sx={{
          marginBottom: "0em",
          borderRadius: "15px",
          textTransform: 'none',
          boxShadow: 'none',
          fontSize: '1em',
        }}
      >
        Đóng
      </Button>
    </Box>
  </Box>
</Backdrop>

    </div>
  );
}

export default AddBanner;
