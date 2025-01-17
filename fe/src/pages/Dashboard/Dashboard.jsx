import React from 'react';
import { Box } from '@mui/material';

import Stats from '/src/pages/Dashboard/Stats/Stats';
import ContentCard from '/src/components/ContentCard/ContentCard';
import CustomContent from '/src/components/ContentCard/CustomContent';
import RenevenueChart from '/src/pages/Dashboard/Revenue/Chart';
import UserChart from '/src/pages/Users/Management/Line/Chart';
import CategoryChart from '/src/pages/Categories/CategoriesList/PieChart/Chart';
import BestSellingProductsTable from '/src/pages/Products/List/BestSellingProducts/Table';

export default function Dashboard() {
  return (
    <>
      <Stats></Stats>
      <ContentCard>
        <RenevenueChart></RenevenueChart>
      </ContentCard>
      <Box
        sx={{
          marginTop: "0.2%",
          display: "flex", 
          gap: "20px",
        }}
      >
        <Box sx={{ flex: 2 }}>
          <CustomContent>
            <UserChart></UserChart>
          </CustomContent>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomContent>
            <CategoryChart></CategoryChart>
          </CustomContent>
        </Box>
      </Box>

      <ContentCard>
        <BestSellingProductsTable></BestSellingProductsTable>
      </ContentCard>
    </>
  );
}
