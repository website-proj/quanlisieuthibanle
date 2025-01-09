import React from 'react'
import HeaderCard from "/src/components/Admin/HeaderCard/HeaderCard";
import Add from './Add.jsx'
function AddCategories() {
  const breadcrumbs = [
    { label: "Tổng quan", link: "/dashboard" },
    { label: "Danh mục", link: "/categories-list" },
    { label: "Thêm danh mục", link: "/add-categories", active: true }
  ];
  return (
    <div>
      <HeaderCard title="Thêm danh mục" breadcrumbs={breadcrumbs} />
      <Add></Add>
    </div>
  )
}

export default AddCategories