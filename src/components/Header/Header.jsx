import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Thêm hoặc xóa class 'dark' khỏi body
    document.body.classList.toggle("dark", !isDarkMode);
  };

  return (
    <header className="header">
      {/* Phần logo */}
      <div className="header__left">
        <Link to="/dashboard" className="brand"> {/* Sử dụng Link thay cho a */}
          <span>Market</span>
        </Link>
      </div>

      {/* Phần menu */}
      {/* <div className="header__center">
        <i className="bx bx-menu" style={{ fontSize: "170%" }}></i>
      </div> */}

      {/* Phần icon bên phải */}
      <div className="header__right">
        {/* Icon chuyển chế độ sáng/tối */}
        <a href="#" id="theme-toggle" onClick={(e) => e.preventDefault()}>
          <i
            className={`bx ${isDarkMode ? "bxs-sun" : "bxs-moon"}`}
            id="theme-icon"
            onClick={handleThemeToggle}
          ></i>
        </a>

        {/* Icon thông báo */}
        <a href="#" className="notification" onClick={(e) => e.preventDefault()}>
          <i className="bx bxs-bell"></i>
        </a>

        {/* Icon hồ sơ */}
        <a href="#" className="profile" onClick={(e) => e.preventDefault()}>
          <i className="bx bxs-user-circle"></i>
        </a>
      </div>
    </header>
  );
}

export default Header;
