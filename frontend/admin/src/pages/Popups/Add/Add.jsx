import React, { useEffect, useState } from 'react';
import ContentCard from "/src/components/ContentCard/ContentCard";
import { TextField, MenuItem, Select, FormControl, Button, Typography, Box, Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '/src/api/apiEndpoints';

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
  const jwtToken = localStorage.getItem("jwtToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      console.log("Updated formData:", updatedData); // log formData after change
      return updatedData;
    });
    setErrors((prev) => ({ ...prev }));
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        popupImage: file,
      }));
      setErrors((prev) => ({ ...prev, popupImage: '' }));
    }
  };

  // Function to format the date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
  
    if (!formData.start_date) newErrors.start_date = 'Ngày bắt đầu là bắt buộc';
    if (!formData.end_date) newErrors.end_date = 'Ngày kết thúc là bắt buộc';
    if (!formData.status) newErrors.status = 'Trạng thái là bắt buộc';
    if (!formData.popupImage) newErrors.popupImage = 'Hình ảnh là bắt buộc';
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setLoading(true);
    setOpenBackdrop(true);
  
    try {
      const formattedStartDate = formatDate(formData.start_date);
      const formattedEndDate = formatDate(formData.end_date);
  
      const formDataToSend = new FormData();
      // Change 'popupImage' to 'file' to match the API expectation
      formDataToSend.append('file', formData.popupImage);
  
      const response = await axios.post(
        `${BASE_URL}${ENDPOINTS.popups.addPopup}?status=${formData.status}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
  
      if (response.status === 200) {
        const { start_date, end_date, status } = response.data;
  
        setAddedCategory({
          start_date,
          end_date,
          status,
          image: URL.createObjectURL(formData.popupImage),
        });
  
        setSuccess(true);
      }
    } catch (error) {
      console.error('Error adding popup:', error);
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || {});
      }
    } finally {
      setLoading(false);
      setOpenBackdrop(false);
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
    window.location.reload();
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
                  onClick={() => document.getElementById('popup-upload').click()}
                >
                  {formData.popupImage ? (
                    <img src={URL.createObjectURL(formData.popupImage)} alt="Preview" className="image-preview" />
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
            overflowY: 'auto',
            scrollbarColor: '#ccc transparent',

          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography variant="h5" style={{ fontWeight: '500', textAlign: 'center' }}>
            Bạn đã thêm một popup!
          </Typography>

          <Box style={{ width: '80%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <img
              src={addedCategory?.image}
              alt="Popup"
              style={{
                width: '90%',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '15px',
              }}
            />
          </Box>

          {/* <Box style={{ marginTop: '20px' }}>
            <Typography variant="h6">
              Ngày bắt đầu: {addedCategory.start_date}
            </Typography>
            <Typography variant="h6">
              Ngày kết thúc: {addedCategory.end_date}
            </Typography>
            <Typography variant="h6">
              Trạng thái: {addedCategory?.status === 'Active' ? 'Đang hoạt động' : 'Không hoạt động'}
            </Typography>
          </Box> */}
        </Box>
      </Backdrop>
    </div>
  );
}

export default AddPopup;
