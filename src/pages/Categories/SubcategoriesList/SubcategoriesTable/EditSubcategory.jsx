import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";

const EditSubcategory = ({ open, onClose, subcategoryDetails }) => {
  const [formData, setFormData] = useState({
    category_id: '',
    category_name: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (subcategoryDetails) {
      setFormData({
        category_id: subcategoryDetails.id || '',
        category_name: subcategoryDetails.name || ''
      });
    }
  }, [subcategoryDetails]);

  const handleSave = async () => {
    if (!formData.category_id || !formData.category_name.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}${ENDPOINTS.categories.editSubcategory}?category_id=${formData.category_id}&category_name=${encodeURIComponent(formData.category_name)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update subcategory');
      }

      const result = await response.json();
      if (result.message === 'update Success') {
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating subcategory:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
          Chỉnh sửa danh mục con
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box 
          display="flex" 
          flexDirection="column" 
          gap={2}
        >
          <Box>
            <Typography fontWeight="500" align="left" width="100%" marginTop='0em' marginBottom='-0.5em'>
              Mã danh mục con
            </Typography>
            <TextField
              value={formData.category_id}
              fullWidth
              disabled
              required
              sx={{ mt: 1 }}
            />
          </Box>

          <Box>
            <Typography fontWeight="500" align="left" width="100%" marginTop='1em'>
              Tên danh mục con
            </Typography>
            <TextField
              value={formData.category_name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                category_name: e.target.value
              }))}
              fullWidth
              required
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          fullWidth
          sx={{
            textTransform: 'none',
            fontSize: '1em',
            borderRadius: '20px'
          }}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          fullWidth
          sx={{
            textTransform: 'none',
            fontSize: '1em',
            borderRadius: '20px',
            boxShadow: 'none'
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Lưu'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSubcategory;