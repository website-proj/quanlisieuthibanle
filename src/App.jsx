import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; 
import "./App.css";
import LogIn from "./LogIn.jsx";

import Sidebar from "./components/Layout/Sidebar/Sidebar.jsx";
import Header from "./components/Layout/Header/Header.jsx";
import Content from "./components/Layout/Content/Content.jsx";

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import CategoriesList from './pages/Categories/CategoriesList/CategoriesList.jsx'; 
import AddCategories from './pages/Categories/AddCategories/AddCategories.jsx'; 
import SubcategoriesList from './pages/Categories/SubcategoriesList/SubcategoriesList.jsx'; 
import AddSubcategories from './pages/Categories/AddSubcategories/AddSubcategories.jsx'; 
import ProductsList from './pages/Products/List/List.jsx'; 
import AddProducts from './pages/Products/Add/AddProducts.jsx'; 
import Orders from "./pages/Orders/Orders.jsx";
import UsersManagement from "./pages/Users/Management/UsersManagement.jsx";
import AddUser from "./pages/Users/Add/AddUser.jsx";
import BannersList from "./pages/Banners/List/List.jsx";
import AddBanner from "./pages/Banners/Add/AddBanners.jsx";
import PopupsList from "./pages/Popups/List/List.jsx";
import AddPopups from "./pages/Popups/Add/AddPopups.jsx";
import Settings from './pages/Settings/Settings.jsx'; 

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
          {/* Route đăng nhập */}
          <Route path="/login" element={<LogIn onLogin={handleLogin} />} />
          
          {/* Route gốc: Nếu chưa đăng nhập, chuyển hướng về login */}
          {/* <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/categories-list"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/subcategories-list"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-categories"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/subcategories-list"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-subcategories"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/products-list"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-products"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/users-management"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-user"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/banners-list"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-banner"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-popup"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          /> */}


          {/* If logged in, show layout with header, sidebar */}
          {isLoggedIn && (
            <Route element={<Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categories-list" element={<CategoriesList />} />
              <Route path="/add-categories" element={<AddCategories />} />
              <Route path="/subcategories-list" element={<SubcategoriesList />} />
              <Route path="/add-subcategories" element={<AddSubcategories />} />
              <Route path="/products-list" element={<ProductsList />} />
              <Route path="/add-products" element={<AddProducts />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/users-management" element={<UsersManagement />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/banners-list" element={<BannersList />} />
              <Route path="/add-banner" element={<AddBanner />} />
              <Route path="/popups-list" element={<PopupsList />} />
              <Route path="/add-popup" element={<AddPopups />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          )}
        </Routes>
      </div>
    </Router>
  );
}

// Layout component to wrap Sidebar and Header around protected routes
function Layout({ isSidebarOpen, toggleSidebar, toggleTheme }) {
  return (
    <div className="layout">
      <Header toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} />
      <Content isSidebarOpen={isSidebarOpen}>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </Content>
    </div>
  );
}

export default App;
