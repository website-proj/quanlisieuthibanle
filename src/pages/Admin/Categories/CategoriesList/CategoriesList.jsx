import React from 'react'
import "./CategoriesList.css"

import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import ContentCard from "/src/components/ContentCard/ContentCard";
import CustomContent from '/src/components/ContentCard/CustomContent';
import PieCategoryChart from '/src/pages/Admin/Categories/CategoriesList/PieChart/Chart';

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
        <Box sx={{ flex: 1 }}>
          <CustomContent>
          </CustomContent>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomContent>
            <PieCategoryChart></PieCategoryChart>
          </CustomContent>
        </Box>
      </Box>
      
      <ContentCard></ContentCard>
      
      </div>
  )
}

export default CategoriesList