import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Backdrop, CircularProgress } from '@mui/material';
import ContentCard from "/src/components/ContentCard/ContentCard";
import './AddCategories.css';
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";

function AddCategories() {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 
  const [success, setSuccess] = useState(false); 
  const [addedCategory, setAddedCategory] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(file); 
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({ ...prev, image: '' })); 
    }
  };

  const handleAdd = async () => {
    const newErrors = {};

    if (!categoryName.trim()) {
      newErrors.categoryName = 'Vui lòng nhập tên danh mục.';
    }
    if (!image) {
      newErrors.image = 'Vui lòng tải lên hình ảnh.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      try {
        const jwtToken = localStorage.getItem('jwtToken'); 
        if (!jwtToken) throw new Error('Không tìm thấy JWT token.');

        const formData = new FormData();
        formData.append('category_name', categoryName);
        formData.append('file', image);

        const response = await fetch(`${BASE_URL}${ENDPOINTS.categories.addCategory}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${jwtToken}`, 
          },
          body: formData, 
        });

        const result = await response.json();

        if (response.ok) {
          setAddedCategory(result.data);
          setSuccess(true);
          setCategoryName('');
          setImage(null);
        } else {
          throw new Error(result.message || 'Có lỗi xảy ra!');
        }
      } catch (error) {
        console.error('Lỗi khi thêm danh mục:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false); 
    window.location.reload();
  };

  return (
    <div>
      <ContentCard>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6" className='title-add-categories'>Tên danh mục</Typography>
          <TextField
            placeholder="Nhập tên danh mục"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            error={Boolean(errors.categoryName)}
            helperText={errors.categoryName}
            fullWidth
            className="input-field"
          />

          <Typography variant="h6" className='title-add-categories'>Hình ảnh</Typography>
          <Box
            className="upload-container"
            onClick={() => document.getElementById('fileInput').click()}
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)} 
                className="image-preview"
              />
            ) : (
              <div className="upload-icon">
                <i className="bx bxs-cloud-upload"></i>
              </div>
            )}
          </Box>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          {errors.image && (
            <Typography color="error" className="error-message">
              {errors.image}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            // className="submit-button"
            sx={{borderRadius: '15px', textTransform: 'none', fontSize: '1em', boxShadow: 'none'}}
          >
            Thêm danh mục
          </Button>
        </Box>
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
            maxWidth: '90%',
            maxHeight: '80%',
            width: 'auto',
            height: 'auto',
            overflow: 'hidden',
            transform: 'scale(0.9)', 
            transformOrigin: 'center',
          }}
          onClick={(e) => e.stopPropagation()} 
        >
          <Typography variant="h5" style={{ fontWeight: '500' }}>Bạn đã thêm một danh mục!</Typography>
          <img src={addedCategory?.image} alt="Category" style={{ width: '30em', height: '22em', objectFit: 'contain', marginBottom: '0em' }} />
          <Typography variant="h6">Tên danh mục: {addedCategory?.category_name}</Typography>
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
                              marginTop: '1em'
                            }}
                          >
            Đóng
          </Button>
        </Box>
      </Backdrop>
    </div>
  );
}

export default AddCategories;
