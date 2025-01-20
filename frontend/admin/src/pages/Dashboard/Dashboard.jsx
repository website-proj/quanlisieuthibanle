import React from "react";
import { Box, Grid } from "@mui/material";

import Stats from "/src/pages/Dashboard/Stats/Stats";
import ContentCard from "/src/components/ContentCard/ContentCard";
import CustomContent from "/src/components/ContentCard/CustomContent";
import RenevenueChart from "/src/pages/Dashboard/Revenue/Chart";
import UserChart from "/src/pages/Users/Management/Line/Chart";
import CategoryChart from "/src/pages/Categories/CategoriesList/PieChart/Chart";
import BestSellingProductsTable from "/src/pages/Products/List/BestSellingProducts/Table";

export default function Dashboard() {
  return (
    <Box sx={{ padding: "1px" }}>
      {/* Stats Section */}
      <Stats />

      {/* Revenue Chart Section */}
      <ContentCard>
        <RenevenueChart />
      </ContentCard>

      {/* Charts Section */}
      <Box
        sx={{
          marginTop: "16px",
          display: "grid",
          gap: "20px",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr", 
            md: "2fr 1fr", 
          },
        }}
      >
        <CustomContent>
          <UserChart />
        </CustomContent>
        <CustomContent>
          <CategoryChart />
        </CustomContent>
      </Box>

      {/* Best Selling Products Section */}
      <ContentCard sx={{ marginTop: "16px" }}>
        <BestSellingProductsTable />
      </ContentCard>
    </Box>
  );
}
