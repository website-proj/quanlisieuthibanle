import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  const toggleProductsMenu = () => {
    setShowProductsMenu(!showProductsMenu);

  };
  const toggleCategoriesMenu = () => {
    setShowCategoriesMenu(!showCategoriesMenu);

  };

  return (
    <aside className="sidebar">
      <section id="sidebar">
        <ul className="side-menu top primary-menu">
          <li className="active">
            <Link to="/dashboard">
              <i className="bx bxs-dashboard"></i>
              <span>Tổng quan</span>
            </Link>
          </li>
          <li className="active">
            <a href='#' onClick={toggleCategoriesMenu}>
              <i className="bx bxs-cuboid"></i>
              <span>Danh mục</span>
              <i className={`bx bx-chevron-${showCategoriesMenu ? 'up' : 'down'}`} />
            </a>
            <ul className={`sub-menu ${showCategoriesMenu ? 'show' : ''}`}>
              <li>
                <Link to="/categories-list">
                    <span>Danh sách danh mục</span>
                  </Link>
              </li>
              <li>
                <Link to="/add-categories">
                  <span>Thêm danh mục</span>
                </Link>
              </li>
              <li>
                <Link to="/subcategories-list">
                  <span>Danh sách danh mục con</span>
                </Link>
              </li>
              <li>
                <Link to="/add-subcategories">
                  <span>Thêm danh mục con</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="active">
            <a href="#" onClick={toggleProductsMenu}>
              <i className="bx bxl-shopify"></i>
              <span>Sản phẩm</span>
              <i className={`bx bx-chevron-${showProductsMenu ? 'up' : 'down'}`} />
            </a>
            <ul className={`sub-menu ${showProductsMenu ? 'show' : ''}`}>
              <li>
                <Link to="/products-list">
                  <span>Danh sách sản phẩm</span>
                </Link>
              </li>
              <li>
                <Link to="/add-products">
                  <span>Thêm sản phẩm</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="active">
            <Link to="/orders">
              <i className="bx bxs-basket"></i>
              <span>Đơn hàng</span>
            </Link>
          </li>
          <li className="active">
            <Link to="/store-management">
              <i className="bx bxs-store"></i>
              <span>Quản lý cửa hàng</span>
            </Link>
          </li>
          <li className="active">
            <Link to="/customer-management">
              <i className="bx bxs-group"></i>
              <span>Quản lý khách hàng</span>
            </Link>
          </li>
        </ul>

        <ul className="side-menu bottom">
          <li>
            <Link to="/settings">
              <i className="bx bxs-cog"></i>
              <span>Cài đặt</span>
            </Link>
          </li>
          <li>
            <a href="#" className="logout" onClick={(e) => e.preventDefault()}>
              <i className="bx bxs-log-out-circle"></i>
              <span>Đăng xuất</span>
            </a>
          </li>
        </ul>
      </section>
    </aside>
  );
}

export default Sidebar;
