import React, { useEffect, useRef, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const orderChartRef = useRef(null);
  const ratingChartRef = useRef(null);
  const [products, setProducts] = useState([]);  // State to store the fetched products
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

  // useEffect(() => {
  //   if (orderChartRef.current && ratingChartRef.current) {
  //     // Initialize the charts after the component has rendered and canvas elements are ready
  //     const ctxOrder = orderChartRef.current.getContext('2d');
  //     const ctxRating = ratingChartRef.current.getContext('2d');

  //     // Create chart for order statistics
  //     new window.Chart(ctxOrder, {
  //       type: 'line',
  //       data: {
  //         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  //         datasets: [{
  //           label: 'Đơn hàng',
  //           data: [65, 59, 80, 81, 56],
  //           borderColor: '#4BC0C0',
  //           fill: false
  //         }]
  //       }
  //     });

  //     // Create chart for product ratings
  //     new window.Chart(ctxRating, {
  //       type: 'pie',
  //       data: {
  //         labels: ['Sản phẩm A', 'Sản phẩm B', 'Sản phẩm C'],
  //         datasets: [{
  //           data: [300, 50, 100],
  //           backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
  //         }]
  //       }
  //     });
  //   }
  // }, []);

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
    <div className="dashboard">
      <main>
        <ul className="box-info">
          <li>
            <i className='bx bxs-user'></i>
            <span className="text">
              <h3>Người dùng</h3>
              <p>1020</p>
            </span>
          </li>
          <li>
            <i className='bx bxs-basket'></i>
            <span className="text">
              <h3>Đơn hàng</h3>
              <p>1020</p>
            </span>
          </li>
          <li>
            <i className='bx bxl-shopify'></i>
            <span className="text">
              <h3>Sản phẩm</h3>
              <p>11111</p>
            </span>
          </li>
          <li>
            <i className='bx bxs-star-half'></i>
            <span className="text">
              <h3>Đánh giá</h3>
              <p>1000</p>
            </span>
          </li>
        </ul>

        <div className="chart-container">
          <div className="chart-section">
            <span className="text">
              <h3>Thống kê mua hàng</h3>
            </span>
            <canvas ref={orderChartRef}></canvas> {/* Tham chiếu canvas */}
          </div>

          <div className="chart-section">
            <span className="text">
              <h3>Đánh giá sản phẩm</h3>
            </span>
            <canvas ref={ratingChartRef}></canvas> {/* Tham chiếu canvas */}
          </div>
        </div>

        <div className="best-selling-products">
          <span className="text">
            <h3>Sản phẩm bán chạy nhất</h3>
          </span>

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

export default Dashboard;
