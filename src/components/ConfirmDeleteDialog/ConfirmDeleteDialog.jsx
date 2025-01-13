import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

function ConfirmDeleteDialog({ open, onClose, onConfirm, itemName }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa</DialogTitle>
      <DialogContent>
        Bạn có chắc chắn muốn xóa {itemName}?
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="secondary"
          sx={{
            '&:hover': {
              borderRadius: '15px', 
            },
            borderRadius: '15px',
            textTransform: 'none',
            fontSize: '1em'
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={() => { onConfirm(); onClose(); window.location.reload();}}
          color="primary"
          sx={{
            '&:hover': {
                borderRadius: '15px', 
            },
            borderRadius: '15px', 
            textTransform: 'none',
            fontSize: '1em'
        }}
        >
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
