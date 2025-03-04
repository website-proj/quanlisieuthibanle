import React from 'react'
import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import ContentCard from "/src/components/ContentCard/ContentCard";

import Stats from '/src/pages/Products/List/Stats/Stats.jsx'
import BestSellingProducts from '/src/pages/Products/List/BestSellingProducts/Table.jsx'
import Products from '/src/pages/Products/List/Products/Table.jsx'
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