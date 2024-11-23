import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/header/Header';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
// import Category from './pages/Category/Category'; 
import ProductsList from './pages/Products/ProductsList';
import AddProducts from './pages/Products/AddProducts';

// import Orders from './pages/Orders/Orders';
// import StoreManagement from './pages/StoreManagement/StoreManagement';
// import CustomerManagement from './pages/CustomerManagement/CustomerManagement';
// import Settings from './pages/Settings/Settings';

function App() {
  return (
    <Router> {/* Bọc toàn bộ ứng dụng với Router */}
      <div className="App">
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <Routes> {/* Sử dụng Routes thay cho Switch */}
            {/* Route mặc định để chuyển đến /dashboard khi vào trang chủ */}
            <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redirect từ / đến /dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products-list" element={<ProductsList />} />
            <Route path="/add-products" element={<AddProducts />} />

            {/* Các route khác */}
            {/* <Route path="/category" element={<Category />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/store-management" element={<StoreManagement />} />
            <Route path="/customer-management" element={<CustomerManagement />} />
            <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
