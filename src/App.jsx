import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";

import Dashboard from "./pages/Dashboard/Dashboard";
import ProductsList from './pages/Products/ProductsList';
import AddProducts from './pages/Products/AddProducts';
import CategoriesList from './pages/Categories/CategoriesList/CategoriesList'; 
import AddCategories from './pages/Categories/AddCategories/AddCategories';
import SubcategoriesList from './pages/Categories/SubcategoriesList/SubcategoriesList';
import AddSubcategories from './pages/Categories/AddSubcategories/AddSubcategories';
import UserManagement from "./pages/User/UserManagement/UserManagement";
import AddUser from "./pages/User/AddUser/AddUser";
import Orders from "./pages/Orders/Orders"
import BannersList from "./pages/Banners/BannersList/BannersList"
import AddBanner from "./pages/Banners/AddBanner/AddBanner"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`App ${isDarkMode ? "dark" : ""}`}>
        <Header toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} isSidebarOpen={isSidebarOpen} />
        <div className="layout">
          <Sidebar isOpen={isSidebarOpen} />
          <Content isSidebarOpen={isSidebarOpen}>
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products-list" element={<ProductsList />} />
                <Route path="/add-products" element={<AddProducts />} />
                <Route path="/categories-list" element={<CategoriesList />} />
                <Route path="/add-categories" element={<AddCategories />} />
                <Route path="/subcategories-list" element={<SubcategoriesList/>} />
                <Route path="/add-subcategories" element={<AddSubcategories/>} />
                <Route path="/user-management" element={<UserManagement/>} />
                <Route path="/add-user" element={<AddUser/>} />
                <Route path="/orders" element={<Orders/>} />
                <Route path="/banners-list" element={<BannersList/>} />
                <Route path="/add-banner" element={<AddBanner/>} />
                
              </Routes>
            </div>
          </Content>
        </div>
      </div>
    </Router>
  );
}

export default App;
