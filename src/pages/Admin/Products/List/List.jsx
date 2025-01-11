import React from 'react'
import HeaderCard from "/src/components/Admin/HeaderCard/HeaderCard";
import ContentCard from "/src/components/Admin/ContentCard/ContentCard";

import Stats from '/src/pages/Admin/Products/List/Stats/Stats.jsx'
import BestSellingProducts from '/src/pages/Admin/Products/List/BestSellingProducts/Table.jsx'
import Products from '/src/pages/Admin/Products/List/Products/Table.jsx'
// import ProductTable from '/src/pages/Admin/Products/List/Products/ProductTable.jsx'
function List() {
  const breadcrumbs = [
    { label: "Tổng quan", link: "/dashboard" },
    { label: "Sản phẩm", link: "products-list" },
    { label: "Danh sách sản phẩm", link: "products-list", active: true }
];
  return (
    <div>
      <HeaderCard title="Danh sách sản phẩm" breadcrumbs={breadcrumbs}></HeaderCard>
      <Stats></Stats>
      <ContentCard>
        <BestSellingProducts></BestSellingProducts>
      </ContentCard>

      <ContentCard>
        <Products></Products>
        {/* <ProductTable></ProductTable> */}
      </ContentCard>
    </div>
  )
}

export default List