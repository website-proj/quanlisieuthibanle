import React from 'react'
import { Box } from '@mui/material';

import HeaderCard from "/src/components/HeaderCard/HeaderCard";
import ContentCard from "/src/components/ContentCard/ContentCard";

import Line from '/src/pages/Users/Management/Line/Chart.jsx';
import Table from '/src/pages/Users/Management/Table/Table.jsx';

function UsersList() {
    const breadcrumbs = [
        {label: "Tổng quan", link: "/dashboard"},
        {label: "Người dùng", link: "/users-management"},
        {label: "Quản lý người dùng", link: "/users-management", active: true}
    ];
  return (
    <div>
      <HeaderCard title="Quản lý người dùng" breadcrumbs={breadcrumbs} />
      
      <ContentCard>            
        <Line></Line>
      </ContentCard>

      <ContentCard>
        <Table></Table>
      </ContentCard>
      
    </div>
  )
}

export default UsersList