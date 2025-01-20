import React, { useState } from 'react';
import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import Add from "/src/pages/Popups/Add/Add"; 

function AddPopup() {
  const breadcrumbs = [
    { label: "Tổng quan", link: "/dashboard" },
    { label: "Popup", link: "/popups-list" },
    { label: "Thêm popup", link: "/add-popup", active: true },
  ];

  return (
    <div className="add-popup">
      <HeaderCard title="Thêm popup" breadcrumbs={breadcrumbs} />       
      <Add></Add>
    </div>
  );
}

export default AddPopup;
