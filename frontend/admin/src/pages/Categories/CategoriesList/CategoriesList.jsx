import React from 'react';
import './CategoriesList.css';

import HeaderCard from '/src/components/HeaderCard/HeaderCard';
import ContentCard from '/src/components/ContentCard/ContentCard';
import CustomContent from '/src/components/ContentCard/CustomContent';
import BarCategoryChart from '/src/pages/Categories/CategoriesList/BarChart/Chart.jsx';
import PieCategoryChart from '/src/pages/Categories/CategoriesList/PieChart/Chart.jsx';
import TableCategories from '/src/pages/Categories/CategoriesList/TableCategories/Table.jsx';

import { Box } from '@mui/material';

function CategoriesList() {
    const breadcrumbs = [
        { label: 'Tổng quan', link: '/dashboard' },
        { label: 'Danh mục', link: '/categories-list' },
        { label: 'Danh sách danh mục', link: '/categories-list', active: true }
    ];

    return (
        <div>
            <HeaderCard title="Danh sách danh mục" breadcrumbs={breadcrumbs} />

            <Box
                sx={{
                    marginTop: '0.2%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    '@media (max-width: 46.1875em)': {
                        flexDirection: 'column', // Stack items on mobile
                        gap: '10px',
                    },
                    '@media (min-width: 46.25em) and (max-width: 63.9375em)': {
                        flexDirection: 'row', // Tablet: side-by-side layout
                    },
                    '@media (min-width: 64em)': {
                        flexDirection: 'row', // Desktop: side-by-side layout
                    },
                }}
            >
                <Box sx={{ flex: 1.75 }}>
                    <CustomContent>
                        <BarCategoryChart />
                    </CustomContent>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <CustomContent>
                        <PieCategoryChart />
                    </CustomContent>
                </Box>
            </Box>

            <ContentCard>
                <TableCategories />
            </ContentCard>
        </div>
    );
}

export default CategoriesList;
