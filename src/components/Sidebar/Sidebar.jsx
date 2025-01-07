import React from "react";
import "./Sidebar.css";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { PiFlagBannerFold } from "react-icons/pi";
import { LuUser } from "react-icons/lu";

import {
  MdOutlineCategory,
  MdOutlineShoppingBag,
  MdSettings,
  MdLogout,
  MdExpandLess,
  MdExpandMore,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  const [openCategories, setOpenCategories] = React.useState(false);
  const [openProducts, setOpenProducts] = React.useState(false);
  const [openUsers, setOpenUsers] = React.useState(false);
  const [openBanners, setOpenBanners] = React.useState(false);
  const [openSettings, setSettings] = React.useState(false);

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleCategoriesClick = () => setOpenCategories(!openCategories);
  const handleProductsClick = () => setOpenProducts(!openProducts);
  const handleUsersClick = () => setOpenUsers(!openUsers);
  const handleBannersClick = () => setOpenBanners(!openBanners);
  const handleSettingsClick = () => setOpenSettings(!openSettings);

  return (
    <Drawer
      variant="persistent"
      open={isOpen}
      sx={{
        "& .MuiDrawer-paper": {
          width: 270,
          backgroundColor: "var(--white)",
          marginTop: { xs: "56px", sm: "64px" },
          height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: 0,
          zIndex: 1200,
        },
      }}
    >
      <Box>
        <List
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
            display: "flex",
            flexDirection: "column",
            gap: 0.35,
            margin: "0 0.5em",
          }}
        >
          {/* Tổng quan */}
          <ListItem
            button
            component={Link}
            to="/dashboard"
            className={`custom-list-item ${isActive("/dashboard") ? "active" : ""}`}
          >
            <ListItemIcon className="custom-list-item-icon">
              <AiOutlineProduct />
            </ListItemIcon>
            <ListItemText className="custom-list-item-text" primary="Tổng quan" />
          </ListItem>

          {/* Danh mục */}
          <ListItem
            button
            onClick={handleCategoriesClick}
            className={`custom-list-item ${
              isActive("/categories-list") ||
              isActive("/add-categories") ||
              isActive("/subcategories-list") ||
              isActive("/add-subcategories")
                ? "active"
                : ""
            }`}
          >
            <ListItemIcon className="custom-list-item-icon">
              <MdOutlineCategory />
            </ListItemIcon>
            <ListItemText className="custom-list-item-text" primary="Danh mục" />
            {openCategories ? (
              <MdExpandLess className="custom-list-item-icon" />
            ) : (
              <MdExpandMore className="custom-list-item-icon" />
            )}
          </ListItem>
          <Collapse in={openCategories} timeout="auto" unmountOnExit>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                paddingLeft: 0,
                borderLeft: "1px solid var(--dark)",
                marginLeft: 5.5,
              }}
            >
              <ListItem
                button
                component={Link}
                to="/categories-list"
                className={`submenu-list-item ${isActive("/categories-list") ? "active" : ""}`}
                sx={{ paddingLeft: 2 }}
              >
                <ListItemText className="submenu-text" primary="Danh sách danh mục" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/add-categories"
                className={`submenu-list-item ${isActive("/add-categories") ? "active" : ""}`}
                sx={{ paddingLeft: 2 }}
              >
                <ListItemText className="submenu-text" primary="Thêm danh mục" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/subcategories-list"
                className={`submenu-list-item ${isActive("/subcategories-list") ? "active" : ""}`}
                sx={{ paddingLeft: 2 }}
              >
                <ListItemText className="submenu-text" primary="Danh sách danh mục con" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/add-subcategories"
                className={`submenu-list-item ${isActive("/add-subcategories") ? "active" : ""}`}
                sx={{ paddingLeft: 2 }}
              >
                <ListItemText className="submenu-text" primary="Thêm danh mục con" />
              </ListItem>
            </Box>
          </Collapse>

          {/* Sản phẩm */}
          <ListItem
            button
            onClick={handleProductsClick}
            className={`custom-list-item ${
              isActive("/products-list") || isActive("/add-products") ? "active" : ""
            }`}
          >
            <ListItemIcon className="custom-list-item-icon">
              <MdOutlineShoppingBag />
            </ListItemIcon>
            <ListItemText className="custom-list-item-text" primary="Sản phẩm" />
            {openProducts ? (
              <MdExpandLess className="custom-list-item-icon" />
            ) : (
              <MdExpandMore className="custom-list-item-icon" />
            )}
          </ListItem>
          <Collapse in={openProducts} timeout="auto" unmountOnExit>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                paddingLeft: 0,
                borderLeft: "1px solid var(--dark)",
                marginLeft: 5.5,
              }}
            >
              <ListItem
                button
                component={Link}
                to="/products-list"
                className={`submenu-list-item ${isActive("/products-list") ? "active" : ""}`}
                sx={{ paddingLeft: 2 }}
              >
                <ListItemText className="submenu-text" primary="Danh sách sản phẩm" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/add-products"
                className={`submenu-list-item ${isActive("/add-products") ? "active" : ""}`}
                sx={{ paddingLeft: 2 }}
              >
                <ListItemText className="submenu-text" primary="Thêm sản phẩm" />
              </ListItem>
            </Box>
          </Collapse>

          {/* Đơn hàng */}
          <ListItem
            button
            component={Link}
            to="/orders"
            className={`custom-list-item ${isActive("/orders") ? "active" : ""}`}
          >
            <ListItemIcon className="custom-list-item-icon">
              <MdOutlineShoppingCart />
            </ListItemIcon>
            <ListItemText className="custom-list-item-text" primary="Đơn hàng" />
          </ListItem>

          {/* Người dùng */}
          <ListItem
            button
            onClick={handleUsersClick}
            className={`custom-list-item ${
              isActive("/user-management") || isActive("/add-user") ? "active" : ""
            }`}
          >
            <ListItemIcon className="custom-list-item-icon">
              <LuUser   />
            </ListItemIcon>
            <ListItemText className="custom-list-item-text" primary="Người dùng" />
            {openUsers ? (
              <MdExpandLess className="custom-list-item-icon" />
            ) : (
              <MdExpandMore className="custom-list-item-icon" />
            )}
          </ListItem>
          <Collapse in={openUsers} timeout="auto" unmountOnExit>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                paddingLeft: 0,
                borderLeft: "1px solid var(--dark)",
                marginLeft: 5.5,
              }}
            >
              <ListItem
                button
                component={Link}
                to="/user-management"
                className={`submenu-list-item ${isActive("/user-management") ? "active" : ""}`}
                sx={{ paddingLeft: 2 }}
              >
                <ListItemText className="submenu-text" primary="Quản lý người dùng" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/add-user"
                className={`submenu-list-item ${isActive("/add-user") ? "active" : ""}`}
                sx={{ paddingLeft: 2 }}
              >
                <ListItemText className="submenu-text" primary="Thêm người dùng" />
              </ListItem>
            </Box>
          </Collapse>

          
        {/* Quản lý banner */}
        <ListItem
            button
            onClick={handleBannersClick}
            className={`custom-list-item ${
              isActive("/banners-list") || isActive("/add-banner") ? "active" : ""
            }`}
          >
            <ListItemIcon className="custom-list-item-icon">
            <PiFlagBannerFold />
            </ListItemIcon>
            <ListItemText className="custom-list-item-text" primary="Banner" />
            {openBanners ? (
              <MdExpandLess className="custom-list-item-icon" />
            ) : (
              <MdExpandMore className="custom-list-item-icon" />
            )}
          </ListItem>
          <Collapse in={openBanners} timeout="auto" unmountOnExit>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                paddingLeft: 0,
                borderLeft: "1px solid var(--dark)",
                marginLeft: 5.5,
              }}
            >
              <ListItem
                button
                component={Link}
                to="/banners-list"
                className={`submenu-list-item ${isActive("/banners-list") ? "active" : ""}`}
                sx={{ paddingLeft: 2 }}
              >
                <ListItemText className="submenu-text" primary="Danh sách banner" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/add-banner"
                className={`submenu-list-item ${isActive("/add-banner") ? "active" : ""}`}
                sx={{ paddingLeft: 2 }}
              >
                <ListItemText className="submenu-text" primary="Thêm banner" />
              </ListItem>
            </Box>
          </Collapse>
        </List>
      </Box>

      {/* Cài đặt và Đăng xuất */}
      <Box>
        <List>
          <ListItem
            button
            component={Link}
            to="/settings"
            className={`custom-list-item ${isActive("/settings") ? "active" : ""}`}
          >
            <ListItemIcon className="custom-list-item-icon">
              <MdSettings />
            </ListItemIcon>
            <ListItemText className="custom-list-item-text" primary="Cài đặt" />
          </ListItem>

          <ListItem
            button
            onClick={() => alert("Đăng xuất thành công!")}
            className="custom-list-item"
          >
            <ListItemIcon className="custom-list-item-icon" id="logout">
              <MdLogout style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText className="custom-list-item-text" primary="Đăng xuất" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
