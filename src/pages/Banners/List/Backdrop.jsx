import React, { useEffect } from "react";
import { Backdrop, Modal, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackdropComponent = ({ open, onClose, children }) => {
    useEffect(() => {
        if (open) {
          const handleClickOutside = (event) => {
            if (event.target.id === "backdrop-overlay") {
              onClose();
            }
          };
          document.addEventListener("click", handleClickOutside);
          return () => {
            document.removeEventListener("click", handleClickOutside);
          };
        }
      }, [open, onClose]);
  return (
    <Modal open={open} onClose={onClose}>
      <Backdrop        id="backdrop-overlay"

        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={open}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 1, 
            borderRadius: 4,
            maxWidth: "600px", 
            width: "100%",
            maxHeight: "90vh", 
            overflowY: "auto", 
            '&::-webkit-scrollbar': {
              width: '6px', 
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ccc', 
              borderRadius: '10px', 
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
          }}
        >
          {children}
        </Box>
      </Backdrop>
    </Modal>
  );
};

export default BackdropComponent;
