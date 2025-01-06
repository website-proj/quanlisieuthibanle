import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { FiDownload } from "react-icons/fi";

const CsvJsonPng = ({ 
  handleDownloadCSV, 
  handleDownloadJSON, 
  handleDownloadPNG, 
  downloadAnchorEl, 
  handleMenuClose, 
  handleDownloadMenuClick 
}) => {
  const buttonRef = React.useRef(null);

  return (
    <div>
      <Button 
        variant="contained" 
        onClick={handleDownloadMenuClick} 
        ref={buttonRef} // Sử dụng ref để lấy chiều rộng thực tế của nút
        sx={{
          height: 30,
          borderRadius: '10px',
          boxShadow: 'none',
          minWidth: 50,
          padding: 0,
        }}  
      >
        <FiDownload />
      </Button>
      <Menu 
        anchorEl={downloadAnchorEl} 
        open={Boolean(downloadAnchorEl)} 
        onClose={handleMenuClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '10px',
            boxShadow: 2,
            width: buttonRef.current?.offsetWidth || 50, // Đảm bảo menu có chiều rộng khớp với nút
          },
          '& .MuiMenuItem-root': {
            display: 'flex',
            justifyContent: 'center', // Căn giữa chữ theo chiều ngang
            alignItems: 'center', // Căn giữa chữ theo chiều dọc
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            padding: '8px 16px', // Đảm bảo khoảng cách đồng đều
            borderRadius: '8px',
            transition: 'background-color 0.2s',
            '&:hover': {
              backgroundColor: '#cce5ff',
            },
          },
        }}
      >
        <MenuItem onClick={() => { handleDownloadCSV(); handleMenuClose(); }}>CSV</MenuItem>
        <MenuItem onClick={() => { handleDownloadJSON(); handleMenuClose(); }}>JSON</MenuItem>
        <MenuItem onClick={() => { handleDownloadPNG(); handleMenuClose(); }}>PNG</MenuItem>
      </Menu>
    </div>
  );
};

export default CsvJsonPng;
