import React, { useState } from 'react';
import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import Add from "/src/pages/Banners/Add/Add"; 

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
