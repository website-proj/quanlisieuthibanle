import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Box, Menu, MenuItem } from "@mui/material";
import { LuMoon, LuSun, LuUser } from "react-icons/lu";
import { MdLogout, MdNotificationsNone, MdOutlineAccountCircle, MdMenuOpen, MdOutlineMenu } from "react-icons/md";
import Sidebar from "/src/components/Sidebar/Sidebar.jsx";
import "./Header.css";

function Header({ toggleSidebar, isSidebarOpen }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark", !isDarkMode);
  };

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (path) => {
    setAnchorEl(null); 
    if (path) navigate(path);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <AppBar position="fixed" className="app-bar">
        <Toolbar className="toolbar">
          <Box className="logo-container">
            <Box component={Link} to="/dashboard" className="logo-link">
              <img src="/src/assets/logo.png" alt="Market Logo" />
            </Box>
            <Box className="sidebar-toggle-container">
              <IconButton onClick={toggleSidebar} className="custom-icon-button">
                {isSidebarOpen ? <MdMenuOpen style={{ fontSize: "130%" }} /> : <MdOutlineMenu style={{ fontSize: "130%" }} />}
              </IconButton>
            </Box>
          </Box>

          <Box className="actions-container">
            <IconButton onClick={handleThemeToggle} className="custom-icon-button">
              {isDarkMode ? <LuSun /> : <LuMoon />}
            </IconButton>
            <IconButton className="custom-icon-button">
              <MdNotificationsNone style={{ fontSize: "110%" }} />
            </IconButton>
            <IconButton className="custom-icon-button" onClick={handleAccountClick}>
              <MdOutlineAccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Account Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={() => handleMenuClose(null)} 
        PaperProps={{
          sx: { mt: 1.5, boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", borderRadius: "8px" },
        }}
        className="account-menu"
      >
        <MenuItem onClick={() => handleMenuClose("/settings?account")} className="menu-item">
          <LuUser className="menu-icon" />
          <span className="menu-text">Tài khoản</span>
        </MenuItem>
        <MenuItem onClick={() => handleMenuClose("/sidebar?logout=true")} className="menu-item logout-item">
          <MdLogout className="menu-icon" />
          <span className="menu-text">Đăng xuất</span>
        </MenuItem>
      </Menu>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />
    </>
  );
}

export default Header;
