import React from 'react'
import HeaderCard from "/src/components/HeaderCard/HeaderCard";

import Add from './Add.jsx'
function AddProducts() {
  const breadcrumbs = [
      { label: "Tổng quan", link: "/dashboard" },
      { label: "Sản phẩm", link: "products-list" },
      { label: "Thêm sản phẩm", link: "add-products", active: true }
  ];
  return (
      <div>
          <HeaderCard title="Thêm sản phẩm" breadcrumbs={breadcrumbs}></HeaderCard>
              <Add></Add>
      </div>
  );
}

export default AddProducts;
