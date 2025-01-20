import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Modal, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from "@mui/material";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints.jsx";

const EditPopup = ({ open, onClose, popupData, onSave }) => {
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState(popupData.status);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (popupData) {
      setImage(popupData.image || null);
      setStartDate(popupData.start_date ? popupData.start_date.split('T')[0] : "");
      setEndDate(popupData.end_date ? popupData.end_date.split('T')[0] : "");
      setStatus(popupData.status || false);
    }
  }, [popupData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const formData = new FormData();
  
      formData.append("popup_id", popupData.popup_id);
      if (image instanceof File) {
        formData.append("file", image);
      }
  
      const statusString = status ? "Active" : "Inactive";
  
      const response = await fetch(
        `${BASE_URL}${ENDPOINTS.popups.editPopup}?status=${statusString}&start_date=${startDate}&end_date=${endDate}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update popup");
      }
  
      const responseData = await response.json();
      setSuccess(true); 
      onSave(responseData);
    } catch (err) {
      setError(err.message);
      console.error("Error during API call:", err);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSuccess(false);
    window.location.reload();
  };
  
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 2,
            borderRadius: "15px",
            width: "80%",
            maxWidth: "500px",
            height: "80%",
            overflowY: "auto",
            scrollbarColor: "#ccc transparent",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "0.5em" }}
          >
            Chỉnh sửa popup
          </Typography>

          {error && (
            <Typography sx={{ color: "red", marginBottom: "1em" }}>
              {error}
            </Typography>
          )}

          <Typography sx={{ marginBottom: 2 }}>
            <strong>Mã popup:</strong> {popupData?.popup_id}
          </Typography>

          <Typography sx={{ marginBottom: 2 }}>
            <strong>Hình ảnh hiện tại:</strong>
            <Box sx={{ marginBottom: "1em" }}>
              {image ? (
                <img
                  src={image instanceof File ? URL.createObjectURL(image) : image}
                  alt="Popup"
                  style={{
                    width: "100%",
                    maxHeight: "40%",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                />
              ) : (
                <Typography>Chưa có hình ảnh</Typography>
              )}
            </Box>
            <Button
              variant="outlined"
              component="label"
              sx={{ marginBottom: "1em", textTransform: "none", borderRadius: "8px", boxShadow: 'none' }}
            >
              Tải ảnh lên
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          </Typography>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            {/* <InputLabel id="status-label">Trạng thái</InputLabel> */}
            <Typography>
            <strong>Trạng thái:</strong> </Typography>
            <Select
              labelId="status-label"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={true}>Hoạt động</MenuItem>
              <MenuItem value={false}>Không hoạt động</MenuItem>
            </Select>
          </FormControl>

          <Typography sx={{ marginBottom: 2 }}>
            <strong>Ngày bắt đầu:</strong>
            <TextField
              type="date"
              fullWidth
              variant="outlined"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ marginBottom: "1em" }}
              InputLabelProps={{ shrink: true }}
            />
          </Typography>

          <Typography sx={{ marginBottom: 2 }}>
            <strong>Ngày kết thúc:</strong>
            <TextField
              type="date"
              fullWidth
              variant="outlined"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ marginBottom: "1em" }}
              InputLabelProps={{ shrink: true }}
            />
          </Typography>

          <Box display="flex" justifyContent="space-between" gap={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={onClose}
              sx={{
                width: "48%",
                textTransform: "none",
                boxShadow: "none",
                fontWeight: "1em",
                borderRadius: "15px",
              }}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                width: "48%",
                textTransform: "none",
                boxShadow: "none",
                fontWeight: "1em",
                borderRadius: "15px",
              }}
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Bạn đã sửa thành công!
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditPopup;
