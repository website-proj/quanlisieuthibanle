import React from 'react';
import { Box, Button, FormHelperText } from '@mui/material';

const ImageUpload = ({ imagePreview, errors, previewImage }) => {
  return (
    <Box sx={{ width: '48%', textAlign: 'center', position: 'relative', paddingTop: '1.8em' }}>
      <input
        type="file"
        id="product-image"
        accept="image/*"
        onChange={previewImage}
        style={{ display: 'none' }}
      />
      <Box
        sx={{
          backgroundColor: '#f0f0f0',
          borderRadius: '10px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          cursor: 'pointer',
          border: errors.image ? '1px solid #d32f2f' : 'none'
        }}
        onClick={() => document.getElementById('product-image').click()}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        ) : (
          <div className="upload-icon">
            <i className="bx bxs-cloud-upload"></i>
          </div>
        )}
      </Box>
      {errors.image && (
        <FormHelperText error>{errors.image}</FormHelperText>
      )}
      <Button
        variant="contained"
        sx={{
          fontSize: '1em',
          textTransform: 'none',
          borderRadius: '10px',
          width: '100%',
          // backgroundColor: '#1976d2',
          // '&:hover': {
          //   backgroundColor: '#1565c0',
          // },
          boxShadow: 'none',
        }}
        onClick={() => document.getElementById('product-image').click()}
      >
        Tải ảnh lên
      </Button>
    </Box>
  );
};

export default ImageUpload;
