import React from 'react'
import "./CategoriesList.css"

import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import ContentCard from "/src/components/ContentCard/ContentCard";
import CustomContent from '/src/components/ContentCard/CustomContent';
import BarCategoryChart from '/src/pages/Categories/CategoriesList/BarChart/Chart.jsx';
import PieCategoryChart from '/src/pages/Categories/CategoriesList/PieChart/Chart.jsx';
import TableCategories from '/src/pages/Categories/CategoriesList/TableCategories/Table.jsx';

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