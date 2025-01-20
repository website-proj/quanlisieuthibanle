import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";

function CustomTable({
  columns, 
  data, 
  total, 
  page, 
  rowsPerPage, 
  onPageChange, 
  onRowsPerPageChange,
}) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 2 }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  sx={{
                    minWidth: column.minWidth || 100,
                    fontSize: "14px",
                    fontWeight: "bold",
                    // Adjusting font size for responsiveness
                    '@media (max-width: 46.1875em)': {
                      fontSize: '12px',
                    },
                    '@media (min-width: 46.25em) and (max-width: 63.9375em)': {
                      fontSize: '13px',
                    },
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} hover>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    sx={{
                      fontSize: "14px",
                      // Adjusting font size for responsiveness
                      '@media (max-width: 46.1875em)': {
                        fontSize: '12px',
                      },
                      '@media (min-width: 46.25em) and (max-width: 63.9375em)': {
                        fontSize: '13px',
                      },
                    }}
                  >
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        sx={{
          // Adjusting pagination for responsiveness
          fontSize: '14px',
          '@media (max-width: 46.1875em)': {
            fontSize: '12px', // Smaller font for mobile
          },
          '@media (min-width: 46.25em) and (max-width: 63.9375em)': {
            fontSize: '13px', // Medium font for tablets
          },
        }}
      />
    </Paper>
  );
}

export default CustomTable;
