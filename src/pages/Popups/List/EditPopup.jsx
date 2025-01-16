import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints.jsx";

const EditPopup = ({ open, onClose, popupData, onSave }) => {
  const [image, setImage] = useState(popupData?.image || "");
  const [startDate, setStartDate] = useState(popupData?.start_date || "");
  const [endDate, setEndDate] = useState(popupData?.end_date || "");
  const [status, setStatus] = useState(popupData?.status || "Active");
  const [error, setError] = useState("");

  useEffect(() => {
    setImage(popupData?.image || "");
    setStartDate(popupData?.start_date || "");
    setEndDate(popupData?.end_date || "");
    setStatus(popupData?.status || "Active");
  }, [popupData]);

  const handleSubmit = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
  
      const requestBody = {
        popup_id: popupData.popup_id,
        status: status,
        start_date: startDate,  
        end_date: endDate,     
      };
  
      if (image && typeof image !== "string") {
        const formData = new FormData();
        formData.append("file", image);
        
        const response = await fetch(`${BASE_URL}${ENDPOINTS.popups.editPopup}?popup_id=${popupData.popup_id}&status=${status}&start_date=${startDate}&end_date=${endDate}`, {
            method: "PUT",
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
          },
          body: formData,
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update popup");
        }
  
        onSave();
        onClose();
      } else {
        // Send data as JSON if no file is provided
        const response = await fetch(`${BASE_URL}${ENDPOINTS.popups.editPopup}?popup_id=${popupData.popup_id}&status=${status}&start_date=${startDate}&end_date=${endDate}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
            "Content-Type": "application/json",  // Set Content-Type to JSON
          },
          body: JSON.stringify(requestBody),  // Convert the body to JSON
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update popup");
        }
  
        onSave();
        onClose();
      }
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <Modal open={open} onClose={onClose} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: "15px", width: "80%", maxWidth: "500px", height: '80%', overflowY: 'auto',       scrollbarColor: '#ccc transparent',
 }}>
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "0.5em" }}>
          Chỉnh sửa popup
        </Typography>

        {error && <Typography sx={{ color: "red", marginBottom: "1em" }}>{error}</Typography>}

        <Typography sx={{ marginBottom: 2 }}>
          <strong>Mã popup:</strong> {popupData.popup_id}
        </Typography>

        <Typography sx={{ marginBottom: 2 }}>
          <strong>Hình ảnh hiện tại:</strong>
          <Box sx={{ marginBottom: "1em" }}>
            {image ? (
              <img src={image} alt="Popup" style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} />
            ) : (
              <Typography>No image available</Typography>
            )}
          </Box>
          <TextField
            type="file"
            fullWidth
            variant="outlined"
            onChange={(e) => setImage(e.target.files[0])}
            sx={{ marginBottom: "1em" }}
          />
        </Typography>

        <Typography sx={{ marginBottom: 2 }}>
          <strong>Ngày bắt đầu:</strong>
          <TextField
            type="date"
            fullWidth
            variant="outlined"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ marginBottom: "1em" }}
            InputLabelProps={{ shrink: true }} // Make sure the label stays above the input
          />
        </Typography>

        <Typography sx={{ marginBottom: 2 }}>
          <strong>Ngày kết thúc:</strong>
          <TextField
            type="date"
            fullWidth
            variant="outlined"
            color="primary"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ marginBottom: "1em" }}
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
            // marginBottom: "1em",
          }}
        >
          Lưu
        </Button>

      </Box>

      </Box>
    </Modal>
  );
};

export default EditPopup;
