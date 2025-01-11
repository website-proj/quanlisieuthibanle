import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; 
import "./App.css";
import LogIn from "./LogIn.jsx";

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
import Orders from "./pages/Admin/Orders/Orders.jsx";
import UsersManagement from "./pages/Admin/Users/Management/UsersManagement.jsx";
import AddUser from "./pages/Admin/Users/Add/AddUser.jsx";
import BannersList from "./pages/Admin/Banners/List/List.jsx";
import AddBanner from "./pages/Admin/Banners/Add/AddBanners.jsx";
import PopupsList from "./pages/Admin/Popups/List/List.jsx";
import AddPopups from "./pages/Admin/Popups/Add/AddPopups.jsx";
import Settings from './pages/Admin/Settings/Settings.jsx'; 

import PrivateRoute from "./routes/PrivateRoute";  

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); 
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); 
  };

  return (
    <Router>
      <div className={`App ${isDarkMode ? "dark" : ""}`}>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<LogIn onLogin={handleLogin} />} />
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
        </Routes>
        {isLoggedIn && (
          <div className={`App ${isDarkMode ? "dark" : ""}`}>
            <Header toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} isSidebarOpen={isSidebarOpen} />
            <div className="layout">
              <Sidebar 
                isOpen={isSidebarOpen} 
                handleLogout={handleLogout} />
              <Content isSidebarOpen={isSidebarOpen}>
                <div className="content-wrapper">
                  <Routes>
                    <Route path="/dashboard" element={<PrivateRoute isLoggedIn={isLoggedIn}><Dashboard /></PrivateRoute>} />
                    <Route path="/categories-list" element={<PrivateRoute isLoggedIn={isLoggedIn}><CategoriesList /></PrivateRoute>} />
                    <Route path="/add-categories" element={<PrivateRoute isLoggedIn={isLoggedIn}><AddCategories /></PrivateRoute>} />
                    <Route path="/subcategories-list" element={<PrivateRoute isLoggedIn={isLoggedIn}><SubcategoriesList /></PrivateRoute>} />
                    <Route path="/add-subcategories" element={<PrivateRoute isLoggedIn={isLoggedIn}><AddSubcategories /></PrivateRoute>} />
                    <Route path="/products-list" element={<PrivateRoute isLoggedIn={isLoggedIn}><ProductsList /></PrivateRoute>} />
                    <Route path="/add-products" element={<PrivateRoute isLoggedIn={isLoggedIn}><AddProducts /></PrivateRoute>} />
                    <Route path="/orders" element={<PrivateRoute isLoggedIn={isLoggedIn}><Orders /></PrivateRoute>} />
                    <Route path="/users-management" element={<PrivateRoute isLoggedIn={isLoggedIn}><UsersManagement /></PrivateRoute>} />
                    <Route path="/add-user" element={<PrivateRoute isLoggedIn={isLoggedIn}><AddUser /></PrivateRoute>} />
                    <Route path="/banners-list" element={<PrivateRoute isLoggedIn={isLoggedIn}><BannersList /></PrivateRoute>} />
                    <Route path="/add-banner" element={<PrivateRoute isLoggedIn={isLoggedIn}><AddBanner /></PrivateRoute>} />
                    <Route path="/popups-list" element={<PrivateRoute isLoggedIn={isLoggedIn}><PopupsList /></PrivateRoute>} />
                    <Route path="/add-popup" element={<PrivateRoute isLoggedIn={isLoggedIn}><AddPopups /></PrivateRoute>} />
                    <Route path="/settings" element={<PrivateRoute isLoggedIn={isLoggedIn}><Settings /></PrivateRoute>} />
                  </Routes>
                </div>
              </Content>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
