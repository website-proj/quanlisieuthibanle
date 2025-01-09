import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Settings.css";

import HeaderCard from "/src/components/Admin/HeaderCard/HeaderCard";
import ContentCard from "/src/components/Admin/ContentCard/ContentCard";
import Account from "./Account.jsx";

function Settings() {
  const navigate = useNavigate();
  const location = useLocation();

  const breadcrumbs = [
    { label: "Tổng quan", link: "/dashboard" },
    { label: "Cài đặt", link: "/settings", active: true },
  ];

  // Xác định tab active dựa vào URL
  const [activeTab, setActiveTab] = useState(
    location.search.includes("account") ? "account" : "interface"
  );

  const [mode, setMode] = useState(localStorage.getItem("mode") || "Sáng");
  const [brightness, setBrightness] = useState(Number(localStorage.getItem("brightness")) || 25);
  const [fontSize, setFontSize] = useState(Number(localStorage.getItem("fontSize")) || 16);

  const resetSettings = () => {
    setMode("Sáng");
    setBrightness(25);
    setFontSize(16);
    localStorage.clear();
  };

  useEffect(() => {
    localStorage.setItem("mode", mode);
    document.body.className = mode === "Tối" ? "dark-mode" : "light-mode";
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("brightness", brightness);
  }, [brightness]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    document.documentElement.style.fontSize = `${fontSize}px`; // To apply global font size
  }, [fontSize]);

  // Xử lý khi chuyển tab và cập nhật URL
  useEffect(() => {
    if (activeTab === "account") {
      navigate("/settings?account");
    } else {
      navigate("/settings?interface");
    }
  }, [activeTab, navigate]);

  return (
    <>
      <HeaderCard title="Cài đặt" breadcrumbs={breadcrumbs}></HeaderCard>
      <ContentCard>
        <div className="settings-container">
          <div className="sidebar">
            <button
              className={`sidebar-item ${activeTab === "interface" ? "active" : ""}`}
              onClick={() => setActiveTab("interface")}
              style={{ fontSize: `${fontSize}px` }}
            >
              Giao diện
            </button>
            <button
              className={`sidebar-item ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
              style={{ fontSize: `${fontSize}px` }}
            >
              Tài khoản
            </button>
          </div>
          <div className="content">
            {activeTab === "interface" ? (
              <>
                <h2 style={{ fontSize: `1.3em` }}>Cài đặt giao diện</h2>

                <div className="setting-item">
                  <span style={{ fontSize: `${fontSize}px` }}>Chế độ</span>
                  <div className="toggle-switch">
                    <button
                      className={`toggle-option ${mode === "Tối" ? "active" : ""}`}
                      onClick={() => setMode("Tối")}
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      Tối
                    </button>
                    <button
                      className={`toggle-option ${mode === "Sáng" ? "active" : ""}`}
                      onClick={() => setMode("Sáng")}
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      Sáng
                    </button>
                  </div>
                </div>

                <div className="setting-item">
                  <span style={{ fontSize: `${fontSize}px` }}>Cỡ chữ</span>
                  <input
                    type="range"
                    min="16"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                  />
                  <span style={{ fontSize: `${fontSize}px` }}>{fontSize}px</span>
                </div>

                <div className="setting-item">
                  <button
                    className="reset-button"
                    onClick={resetSettings}
                    style={{ fontSize: `1em` }}
                  >
                    Cài đặt lại
                  </button>
                </div>
              </>
            ) : (
              <Account />
            )}
          </div>
        </div>
      </ContentCard>
    </>
  );
}

export default Settings;
