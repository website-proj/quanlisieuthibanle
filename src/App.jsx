import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Admin/Layout/Sidebar/Sidebar.jsx";
import Header from "./components/Admin/Layout/Header/Header.jsx";
import Content from "./components/Admin/Layout/Content/Content.jsx";

import Dashboard from "./pages/Admin/Dashboard/Dashboard.jsx";

import CategoriesList from './pages/Admin/Categories/CategoriesList/CategoriesList.jsx'; 
import AddCategories from './pages/Admin/Categories/AddCategories/AddCategories.jsx'; 
import SubcategoriesList from './pages/Admin/Categories/SubcategoriesList/SubcategoriesList.jsx'; 
import AddSubcategories from './pages/Admin/Categories/AddSubcategories/AddSubcategories.jsx'; 

import ProductsList from './pages/Admin/Products/List/List.jsx'; 
import AddProducts from './pages/Admin/Products/Add/AddProducts.jsx'; 

import Orders from "./pages/Admin/Orders/Orders.jsx"

import UsersManagement from "./pages/Admin/Users/Management/UsersManagement.jsx";
import AddUser from "./pages/Admin/Users/Add/AddUser.jsx";

import BannersList from "./pages/Admin/Banners/List/List.jsx"
import AddBanner from "./pages/Admin/Banners/Add/AddBanners.jsx"

import PopupsList from "./pages/Admin/Popups/List/List.jsx"
import AddPopups from "./pages/Admin/Popups/Add/AddPopups.jsx"

import Settings from './pages/Admin/Settings/Settings.jsx'; 



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

                <Route path="/categories-list" element={<CategoriesList />} />
                <Route path="/add-categories" element={<AddCategories />} />
                <Route path="/subcategories-list" element={<SubcategoriesList />} />
                <Route path="/add-subcategories" element={<AddSubcategories />} />
                
                <Route path="/products-list" element={<ProductsList />} />
                <Route path="/add-products" element={<AddProducts />} />

                <Route path="/orders" element={<Orders/>} />

                <Route path="/users-management" element={<UsersManagement/>} />
                <Route path="/add-user" element={<AddUser/>} />
                 
                <Route path="/banners-list" element={<BannersList/>} />
                <Route path="/add-banner" element={<AddBanner/>} />
                
                <Route path="/popups-list" element={<PopupsList/>} />
                <Route path="/add-popup" element={<AddPopups/>} />
                               
                <Route path="/settings" element={<Settings/>} />
              </Routes>
            </div>
          </Content>
        </div>
      </div>
    </Router>
  );
}

export default App;
