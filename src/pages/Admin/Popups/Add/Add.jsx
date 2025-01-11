import React, { useState } from 'react';
import ContentCard from "/src/components/Admin/ContentCard/ContentCard";
import { TextField, MenuItem, Select, FormControl, Button, Typography, Box, Backdrop, CircularProgress } from '@mui/material';

function AddPopup() {
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
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
    setErrors((prev) => ({ ...prev }));
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
    if (!formData.start_date) newErrors.start_date = 'Vui lòng nhập ngày bắt đầu.';
    if (!formData.end_date) newErrors.end_date = 'Vui lòng nhập ngày kết thúc.';
    if (!formData.status) newErrors.status = 'Vui lòng chọn trạng thái.';
    if (!formData.popupImage) newErrors.popupImage = 'Vui lòng tải lên ảnh popup.';
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setOpenBackdrop(true);
  
      // Format the dates to dd/mm/yyyy
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
  
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setAddedCategory({
          start_date: formatDate(formData.start_date),
          end_date: formatDate(formData.end_date),
          status: formData.status,
          image: formData.popupImage,
        });
        setOpenBackdrop(false);
      }, 2000);
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    setFormData({
      start_date: '',
      end_date: '',
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
                <Typography variant="h6" sx={{ fontSize: '1em', fontWeight: '500' }}>Ngày bắt đầu</Typography>
                <TextField
                  type="date"
                  fullWidth
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                  InputLabelProps={{ shrink: true }}
                />
                {errors.start_date && <Typography color="error">{errors.start_date}</Typography>}
              </Box>

              <Box mb={3}>
                <Typography variant="h6" sx={{ fontSize: '1em', fontWeight: 500 }}>Ngày kết thúc</Typography>
                <TextField
                  type="date"
                  fullWidth
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                  InputLabelProps={{ shrink: true }}
                />
                {errors.end_date && <Typography color="error">{errors.end_date}</Typography>}
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
            overflow: 'hidden',
            transform: 'scale(0.85)', 
            transformOrigin: 'center',
          }}
          onClick={(e) => e.stopPropagation()} 
        >
          <Typography variant="h5" style={{ fontWeight: '500', textAlign: 'center' }}>
            Bạn đã thêm một popup!
          </Typography>

          <Box style={{ width: '80%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <img 
              src={addedCategory?.image} 
              alt="Category" 
              style={{ 
                width: '90%', 
                height: 'auto', 
                objectFit: 'contain', 
                maxWidth: '40em', 
                borderRadius: '15px',
              }} 
            />
          </Box>

          <Box
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <Typography variant="h6" style={{ fontWeight: '500' }}>
              Ngày bắt đầu: <span style={{ fontWeight: 'normal' }}>{addedCategory?.start_date}</span>
            </Typography>
            <Typography variant="h6" style={{ fontWeight: '500' }}>
              Ngày kết thúc: <span style={{ fontWeight: 'normal' }}>{addedCategory?.end_date}</span>
            </Typography>            <Typography variant="h6" style={{ fontWeight: '500' }}>
              Trạng thái: <span style={{ fontWeight: 'normal' }}>
                {addedCategory?.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
              </span>
            </Typography>
          </Box>
        </Box>
        </Backdrop>

    </div>
  );
}

export default AddPopup;
