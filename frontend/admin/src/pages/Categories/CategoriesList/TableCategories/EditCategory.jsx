import React, { useState, useEffect } from 'react';
import {
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";
import './Edit.css';

const EditCategory = ({ open, category, onClose, onUpdate, jwtToken }) => {
  const [formData, setFormData] = useState({
    category_id: '',
    category_name: '',
    file: null
  });

  useEffect(() => {
    if (category) {
      setFormData({
        category_id: category.category_id || '',
        category_name: category.category_name || '',
        file: null
      });
    }
  }, [category]);

  const handleSave = async () => {
    if (!category) return;

    if (!formData.category_id || !formData.category_name || (!formData.file && !category.image)) {
      return;
    }

    const submitData = new FormData();
    submitData.append('category_id', formData.category_id);
    submitData.append('category_name', formData.category_name);
    if (formData.file) {
      submitData.append('file', formData.file);
    }

    try {
      const response = await axios.put(
        `${BASE_URL}${ENDPOINTS.categories.updateCategory}?category_id=${formData.category_id}&category_name=${encodeURIComponent(formData.category_name)}`,
        submitData,
        {
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.data) {
        onUpdate(response.data.data);
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file
      }));
    }
  };

  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: 'blur(3px)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }}
      open={open}
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          width: '0%', 
          maxWidth: '800px', 
          backgroundColor: '#fff', 
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        {category && (
          <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              <Typography 
                variant="h6" 
                fontWeight="bold" 
                textAlign="center"
              >
                Chỉnh sửa danh mục
              </Typography>
            </DialogTitle>
            
            <DialogContent>
              <Box 
                display="flex" 
                flexDirection="column" 
                gap={2}
              >
                <Typography fontWeight="500" align="left" width="100%" marginTop='0em' marginBottom='-0.5em'>
                  Mã danh mục
                </Typography>
                <TextField
                  placeholder="Mã danh mục"
                  value={formData.category_id}
                  fullWidth
                  disabled
                  required
                />
                
                <Typography fontWeight="500" align="left" width="100%" marginTop='-0.5em'>
                  Tên danh mục
                </Typography>
                <TextField
                  placeholder="Tên danh mục"
                  value={formData.category_name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    category_name: e.target.value
                  }))}
                  sx={{marginTop:'-0.5em', marginBottom: '-0.5em'}}
                  fullWidth
                  required
                />

                <Typography fontWeight="500" align="left" width="100%">
                  Ảnh danh mục
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    borderRadius: "10px",
                    textTransform: 'none',
                    justifyContent: '',
                    width: 'auto',
                    padding: '1px',
                    marginTop: '-0.5em',
                    marginBottom: '-0.5em',
                  }}
                >
                  Tải ảnh lên
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>

                <Box width="100%">
                  {formData.file ? (
                    <img
                      src={URL.createObjectURL(formData.file)}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "10px"
                      }}
                    />
                  ) : (
                    category.image && (
                      <img
                        src={category.image}
                        alt="Current"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "15px"
                        }}
                      />
                    )
                  )}
                </Box>
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2, gap: 2 }}>
              <Button
                variant="outlined"
                onClick={onClose}
                fullWidth
                sx={{textTransform: 'none', fontSize: '1em', borderRadius: '20px' }}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                fullWidth
                sx={{textTransform: 'none', fontSize: '1em', borderRadius: '20px', boxShadow: 'none' }}
              >
                Lưu
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </Backdrop>
  );
};

export default EditCategory;