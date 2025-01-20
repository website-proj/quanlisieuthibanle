import React from 'react';
import { Box } from '@mui/material';
import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import ContentCard from "/src/components/ContentCard/ContentCard";
import CustomContent from '/src/components/ContentCard/CustomContent';

import Polar from '/src/pages/Categories/SubcategoriesList/Polar/Chart.jsx';
import Bar from '/src/pages/Categories/SubcategoriesList/Bar/Chart.jsx';
import Table from '/src/pages/Categories/SubcategoriesList/SubcategoriesTable/Table.jsx';

function SubcategoriesList() {
    const breadcrumbs = [
        {label: "Tổng quan", link: "/dashboard"},
        {label: "Danh mục", link: "/categories-list"},
        {label: "Danh sách danh mục con", link: "/subcategories-list", active: true}
    ];

  return (
    <div>
        <HeaderCard title="Danh sách danh mục con" breadcrumbs={breadcrumbs}></HeaderCard>

        <Box
            sx={{
                marginTop: "0.2%",
                display: "flex", 
                gap: "20px",
                flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, side by side on larger screens
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ flex: 1 }}>
                <CustomContent>
                    <Polar />
                </CustomContent>
            </Box>

            <Box sx={{ flex: 1 }}>
                <CustomContent>
                    <Bar />
                </CustomContent>
            </Box>
        </Box>

        <ContentCard>
            <Table />
        </ContentCard>
    </div>
  );
}

export default SubcategoriesList;
