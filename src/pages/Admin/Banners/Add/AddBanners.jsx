import React, { useState } from 'react';
import HeaderCard from "/src/components/Admin/HeaderCard/HeaderCard";
import Add from "/src/pages/Admin/Banners/Add/Add"; 

function AddBanner() {
  const breadcrumbs = [
    { label: "Tổng quan", link: "/dashboard" },
    { label: "Banner", link: "/banners-list" },
    { label: "Thêm banner", link: "/add-banner", active: true },
  ];

  return (
    <div className="add-banner">
      <HeaderCard title="Thêm banner" breadcrumbs={breadcrumbs} />       
      <Add></Add>
    </div>
  );
}

export default AddBanner;
