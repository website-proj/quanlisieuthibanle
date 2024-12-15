import React, { useState, useEffect } from 'react';
import './CategoriesList.css';
import categoryData from './CategoriesList.json'; 
import { Typography, Box, Breadcrumbs, Link } from '@mui/material';

function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(categoryData);
  }, []);

  const handleDelete = (indexToDelete) => {
    const updatedCategories = categories.filter((_, index) => index !== indexToDelete);
    setCategories(updatedCategories);

    // Đồng bộ JSON (nếu cần cập nhật vào file JSON, cần thực hiện thông qua backend)
    console.log("Updated JSON data:", updatedCategories); 
  };

  return (
    <div className="categories-list">
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
            Danh sách danh mục
          </Typography>

          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Tổng quan
            </Link>
            <Link underline="hover" color="inherit" href="/categories-list">
              Danh mục
            </Link>
            <Typography color="text.primary">Danh sách danh mục</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ padding: "20px", backgroundColor: "var(--white)", borderRadius: "20px", boxShadow: 0, marginTop: "20px" }}>
          <table id="categories-table">
            <thead>
              <tr>
                <th className='text'>Danh mục</th>
                <th className='text'>Hình ảnh</th>
                <th className='text'>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td className='text'>{category.category}</td>
                  <td>
                    <img
                      src={category.image}
                      alt={`Hình ảnh của ${category.category}`}
                      width="50"
                    />
                  </td>
                  <td>
                    <span className="icon-edit">
                      <i className="bx bx-edit"></i>
                    </span>
                    <span className="icon-delete" onClick={() => handleDelete(index)}>
                      <i className="bx bx-trash"></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        {/* </div> */}
        </Box>
      </main>
    </div>
  );
}

export default CategoriesList;
