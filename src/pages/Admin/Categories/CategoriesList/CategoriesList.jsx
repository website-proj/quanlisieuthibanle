import React from 'react'
import "./CategoriesList.css"

import HeaderCard from "/src/components/Admin/HeaderCard/HeaderCard";
import ContentCard from "/src/components/Admin/ContentCard/ContentCard";
import CustomContent from '/src/components/Admin/ContentCard/CustomContent';
import BarCategoryChart from '/src/pages/Admin/Categories/CategoriesList/BarChart/Chart.jsx';
import PieCategoryChart from '/src/pages/Admin/Categories/CategoriesList/PieChart/Chart.jsx';
import TableCategories from '/src/pages/Admin/Categories/CategoriesList/TableCategories/Table.jsx';

import { Box } from '@mui/material';
function CategoriesList() {
    const breadcrumbs = [
        {label: "Tổng quan", link: "/dashboard"},
        {label: "Danh mục", link: "/categories-list"},
        {label: "Danh sách danh mục", link: "/categories-list", active: true}
    ];
  return (
    <div>
      <HeaderCard title="Danh sách danh mục" breadcrumbs={breadcrumbs} />
      
      <Box
        sx={{
          marginTop: "0.2%",
          display: "flex", 
          gap: "20px",
        }}
      >
        <Box sx={{ flex: 1.75 }}>
          <CustomContent>
            <BarCategoryChart></BarCategoryChart>
          </CustomContent>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomContent>
            <PieCategoryChart></PieCategoryChart>
          </CustomContent>
        </Box>
      </Box>
      
      <ContentCard><TableCategories></TableCategories></ContentCard>
      
      </div>
  )
}

export default CategoriesList