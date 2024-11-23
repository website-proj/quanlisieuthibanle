import React, { useEffect, useState } from 'react';
import './ProductsList.css';

function ProductsList() {
  const [products, setProducts] = useState([]);  // State to store fetched products
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch product data after the component mounts
  useEffect(() => {
    fetch('/src/pages/Dashboard/best-selling-products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error("Error fetching product data:", error));
  }, []);

  // Function to filter products based on search text and selected category
  const filterProducts = () => {
    return products.filter(product => {
      const matchesSearchText = product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                product.category.toLowerCase().includes(searchText.toLowerCase()) ||
                                product.subcategory.toLowerCase().includes(searchText.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearchText && matchesCategory;
    });
  };

  return (
    <div className="products-list">
      <main>
        <div className="title-main">Danh sách sản phẩm</div>
        <ul className="box-info">
          <li>
            <i className='bx bxl-shopify'></i>
            <span className="text">
              <h3>Sản phẩm</h3>
              <p>{products.length}</p>
            </span>
          </li>
          <li>
            <i className='bx bx-cart-alt'></i>
            <span className="text">
              <h3>Danh mục</h3>
              <p>1020</p>
            </span>
          </li>
          <li>
            <i className='bx bx-cart-alt'></i>
            <span className="text">
              <h3>Danh mục con</h3>
              <p>1020</p>
            </span>
          </li>
        </ul>

        <div className="best-selling-products">
          <span className="text">
            <h3>Sản phẩm bán chạy nhất</h3>
          </span>
          
          {/* Thanh tìm kiếm */}
          <div className="filter-search">
            <select
              className="filter"
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="food">Thực phẩm</option>
              <option value="beverage">Đồ uống</option>
              <option value="snacks">Bánh kẹo & Đồ ăn nhẹ</option>
              <option value="cosmetics">Hóa mỹ phẩm</option>
              <option value="kitchenware">Gia dụng & Đồ dùng nhà bếp</option>
              <option value="seasoning">Gia vị</option>
              <option value="babycare">Chăm sóc bé</option>
              <option value="books">Sách và văn phòng phẩm</option>
              <option value="cleaning">Sản phẩm vệ sinh nhà cửa</option>
            </select>
            <input
              type="text"
              className="search-input"
              id="search-input"
              placeholder="Nhập nội dung tìm kiếm"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          
          {/* Bảng sản phẩm */}
          <table id="product-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Danh mục</th>
                <th>Danh mục con</th>
                <th>Giá</th>
                <th>Hạn sử dụng</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody id="product-tbody">
              {filterProducts().map((product, index) => (
                <tr key={index}>
                  <td><img src={product.image} alt="Best Seller" width="30" /> {product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.subcategory}</td>
                  <td>{product.price}</td>
                  <td>{product.date}</td>
                  <td>
                    <span className="icon-view"><i className='bx bx-low-vision'></i></span>
                    <span className="icon-edit"><i className='bx bx-edit'></i></span>
                    <span className="icon-delete"><i className='bx bx-trash'></i></span>
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

export default ProductsList;
