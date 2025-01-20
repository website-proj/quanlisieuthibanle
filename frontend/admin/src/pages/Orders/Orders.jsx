import React from 'react'
import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import ContentCard from "/src/components/ContentCard/ContentCard";
import Table from '/src/pages/Orders/Table/Table.jsx'
function Orders() {
    const breadcrumbs = [
        {label: "Tổng quan", link: "/dashboard"},
        {label: "Quản lý đơn hàng", link: "/orders", active: true},
    ];
  return (
    <div>
        <HeaderCard title="Quản lý đơn hàng" breadcrumbs={breadcrumbs}></HeaderCard>
        <ContentCard><Table></Table></ContentCard>
    </div>
  )
}

export default Orders