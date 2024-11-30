import React, { useState, useEffect } from 'react';
import './SubcategoriesList.css';
import categoryData from '/src/pages/Categories/SubcategoriesList/SubcategoriesList.json'; // Đường dẫn cần kiểm tra lại

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
      </main>
    </div>
  );
}