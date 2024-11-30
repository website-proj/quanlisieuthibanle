import React, { useState, useEffect } from 'react';
import './SubcategoriesList.css';
import categoryData from '/src/pages/Categories/SubcategoriesList/SubcategoriesList.json';  // Adjust path if necessary

export default function SubcategoriesList() {
  // Initialize state for subcategories data
  const [subcategories, setSubcategories] = useState([]);

  // UseEffect hook to load the data (you could fetch from an API if necessary)
  useEffect(() => {
    // Assuming the JSON data has a structure with 'category', 'image', and 'subcategories' properties
    setSubcategories(categoryData);
  }, []);

  return (
    <div className='subcategories-list'>
      <main>
        <div className="title-main">Danh sách danh mục con</div>
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
              {subcategories.map((item, index) => (
                <tr key={index}>
                  <td className='text'>{item.category}</td>
                  <td className='text'>
                    <img src={item.image} alt="subcategory" width="100" />
                  </td>
                  <td className='text'>
                    {item.subcategories.map((subcat, i) => (
                      <span key={i} className="subcategory-badge">{subcat}</span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
