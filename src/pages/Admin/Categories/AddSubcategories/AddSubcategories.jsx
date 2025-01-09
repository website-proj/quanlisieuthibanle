import React from 'react'
import HeaderCard from "/src/components/Admin/HeaderCard/HeaderCard";
import Add from './Add.jsx'
function AddSubcategories() {
    const breadcrumbs = [
        { label: "Tổng quan", link: "/dashboard" },
        { label: "Danh mục", link: "categories-list" },
        { label: "Thêm danh mục con", link: "add-subcategories", active: true }
    ];
  return (
    <div>
        <HeaderCard title="Thêm danh mục con" breadcrumbs={breadcrumbs}></HeaderCard>
        <Add></Add>
    </div>
  )
}

export default AddSubcategories