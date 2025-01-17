import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Snackbar, Alert } from "@mui/material";

function ConfirmDeleteDialog({ open, onClose, onConfirm, itemName }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setSnackbarOpen(true);
    onClose();
    window.location.reload()
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return; 
    }
    setSnackbarOpen(false);
  };

  return (
    <>
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
              "&:hover": {
                borderRadius: "15px",
              },
              borderRadius: "15px",
              textTransform: "none",
              fontSize: "1em",
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            sx={{
              "&:hover": {
                borderRadius: "15px",
              },
              borderRadius: "15px",
              textTransform: "none",
              fontSize: "1em",
            }}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          Bạn đã xóa thành công!
        </Alert>
      </Snackbar>
    </>
  );
}

export default ConfirmDeleteDialog;
