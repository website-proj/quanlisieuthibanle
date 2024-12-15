import React, { useState, useEffect } from 'react';
import './SubcategoriesList.css';
import categoryData from '/src/pages/Categories/SubcategoriesList/SubcategoriesList.json'; // Đường dẫn cần kiểm tra lại
import { Typography, Box, Breadcrumbs, Link } from '@mui/material';

export default function SubcategoriesList() {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    setSubcategories(categoryData);
  }, []);

  const handleRemoveSubcategory = (categoryIndex, subcatIndex) => {
    setSubcategories(prev => {
      const updated = prev.map((category, index) => {
        if (index === categoryIndex) {
          return {
            ...category,
            subcategories: category.subcategories.filter((_, i) => i !== subcatIndex)
          };
        }
        return category;
      });

      return updated; 
    });
  };

  return (
    <div className='subcategories-list'>
      <main>
      <Box
          sx={{
            padding: '10px 20px',
            backgroundColor: 'var(--white)',
            borderRadius: '15px',
            boxShadow: 0,
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold' }}>
            Danh sách danh mục con
          </Typography>

          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Tổng quan
            </Link>
            <Link underline="hover" color="inherit" href="/categories-list">
              Danh mục
            </Link>
            <Typography color="text.primary">Danh sách danh mục con</Typography>
          </Breadcrumbs>
        </Box>
  
        <Box sx={{ padding: "20px", backgroundColor: "var(--white)", borderRadius: "20px", boxShadow: 0, marginTop: "20px" }}>

        <div className='subcategories-info-container'>
          <table id="subcategories-table">
            <thead>
              <tr>
                <th className='text'>Danh mục</th>
                <th className='text'>Hình ảnh</th>
                <th className='text'>Danh mục con</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((item, categoryIndex) => (
                <tr key={categoryIndex}>
                  <td className='text'>{item.category}</td>
                  <td className='text'>
                    <img src={item.image} alt="subcategory" width="100" />
                  </td>
                  <td className='text'>
                    {item.subcategories.map((subcat, subcatIndex) => (
                      <span 
                        key={`${categoryIndex}-${subcatIndex}`} 
                        className="subcategory-badge"
                      >
                        {subcat}
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveSubcategory(categoryIndex, subcatIndex)}
                        >
                          X
                        </button>
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </Box>
      </main>
    </div>
  );
}