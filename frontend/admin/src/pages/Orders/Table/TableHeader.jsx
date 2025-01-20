import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

const TableHeader = ({ orderBy, order, onSort }) => {
  const headers = [
    { id: 'order_id', label: 'Mã đơn hàng' },
    { id: 'status', label: 'Trạng thái' },
    { id: null, label: 'Sản phẩm' },
    { id: null, label: 'Địa chỉ giao hàng' },
    { id: 'buyer_id', label: 'Mã người mua' },
    { id: 'total_amount', label: 'Tổng tiền' },
    { id: 'payment_method', label: 'Thanh toán' },
    { id: 'order_date', label: 'Ngày đặt hàng' }
  ];

  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell key={header.label} align="center">
            {header.id ? (
              <TableSortLabel
                active={orderBy === header.id}
                direction={orderBy === header.id ? order : 'asc'}
                onClick={() => onSort(header.id)}
              >
                {header.label}
              </TableSortLabel>
            ) : (
              header.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;