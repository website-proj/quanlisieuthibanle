import React, { useState, useEffect } from 'react';
import './CategoriesList.css';
import categoryData from './CategoriesList.json'; 
import Box from "@mui/material/Box";
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
        <div className="title-main">Danh sách danh mục</div>
        <Box sx={{ padding: "20px", backgroundColor: "var(--white)", borderRadius: "20px", boxShadow: 0, marginTop: "20px" }}>
        {/* <div className="categories-info-container"> */}
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
