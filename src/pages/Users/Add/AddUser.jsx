import React from 'react'
import HeaderCard from "/src/components/HeaderCard/HeaderCard";

import Add from './Add.jsx'
function AddUser() {
  const breadcrumbs = [
    {label: "Tổng quan", link: "/dashboard"},
    {label: "Người dùng", link: "/users-management"},
    {label: "Thêm người dùng", link: "/add-user", active: true}
  ];
  return (
    <div>
      <HeaderCard title="Thêm người dùng" breadcrumbs={breadcrumbs}/>
    
      <Add></Add>
    </div>
  )
}

export default AddUser