import React, { useContext } from "react";
// import './Header.css';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { LuMoon, LuSun } from "react-icons/lu";
import { MdNotificationsNone, MdOutlineAccountCircle, MdMenuOpen, MdOutlineMenu } from "react-icons/md";
import Sidebar from "/src/components/Sidebar/Sidebar.jsx";
import { ThemeContext } from '/src/components/Admin/Layout/Header/ThemeContext.jsx'; // Đường dẫn đến ThemeContext

function Header({ toggleSidebar, isSidebarOpen }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);  // Lấy giá trị từ context

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "var(--white)", boxShadow: 0 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/dashboard"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                "& img": {
                  height: { xs: "30px", sm: "40px", md: "50px" },
                  marginRight: 0,
                },
              }}
            >
              <img src="/src/assets/logo.png" alt="Market Logo" />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, paddingLeft: "15.2%"}}>
              <IconButton onClick={toggleSidebar} className="custom-icon-button">
                {isSidebarOpen ? <MdMenuOpen style={{ fontSize: "130%" }} /> : <MdOutlineMenu style={{ fontSize: "130%" }} />}
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, paddingRight: "5%" }}>
            <IconButton onClick={toggleTheme} className="custom-icon-button">
              {isDarkMode ? <LuSun /> : <LuMoon />}
            </IconButton>
            <IconButton className="custom-icon-button">
              <MdNotificationsNone style={{ fontSize: "110%" }} />
            </IconButton>
            <IconButton className="custom-icon-button">
              <MdOutlineAccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />
    </>
  );
}

export default Header;
