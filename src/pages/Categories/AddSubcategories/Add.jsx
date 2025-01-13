import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Backdrop, CircularProgress, Select, MenuItem } from "@mui/material";
import axios from "axios";
import "./Add.css";
import ContentCard from "/src/components/ContentCard/ContentCard";
import { BASE_URL, ENDPOINTS } from "/src/api/apiEndpoints";

function AddSubcategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [addedSubcategory, setAddedSubcategory] = useState(null);
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get(`${BASE_URL}${ENDPOINTS.categories.getParentCategories}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, 
        },
      })
      .then((response) => {
        const data = response.data.data;
        setCategories(data); 
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  const handleAdd = async () => {
    const newErrors = {};
  
    if (!selectedCategory) {
      newErrors.selectedCategory = "Vui lòng chọn tên danh mục.";
    }
    if (!subCategoryName) {
      newErrors.subCategoryName = "Vui lòng nhập tên danh mục con.";
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}${ENDPOINTS.categories.addSubcategory}`,  
          new URLSearchParams({
            category_name: subCategoryName,
            parent_category_id: selectedCategory,
          }).toString(),
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/x-www-form-urlencoded",  
            },
          }
        );
  
        if (response.status === 200) {
          setAddedSubcategory({
            name: subCategoryName,
            parentCategory: selectedCategory,
            categoryId: response.data.data.category_id,  
          });
          setSuccess(true);
          setSubCategoryName("");
          setSelectedCategory("");
        }
      } catch (error) {
        console.error("Lỗi khi thêm danh mục con:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    window.location.reload();
  };

  return (
    <div>
      <ContentCard>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6" className="title-add-categories">
            Tên danh mục
          </Typography>
          <Select
            className="dropdown-categories"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
            sx={{
              borderRadius: "10px",
              height: "3em",
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200, 
                  overflowY: 'auto',
                },
              },
            }}
          >
            <MenuItem value="">Chọn danh mục</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category.category_id}>
                {category.category_name}
              </MenuItem>
            ))}
          </Select>
          {errors.selectedCategory && (
            <Typography color="error" className="error-message">
              {errors.selectedCategory}
            </Typography>
          )}

          <Typography variant="h6" className="title-add-categories">
            Tên danh mục con
          </Typography>
          <TextField
            placeholder="Nhập tên danh mục con"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            error={Boolean(errors.subCategoryName)}
            helperText={errors.subCategoryName}
            fullWidth
            className="input-field"
          />

          <Button variant="contained" color="primary" onClick={handleAdd} sx={{borderRadius: '20px', boxShadow: 'none', fontSize: '1em', textTransform: 'none'}}>
            Thêm danh mục con
          </Button>
        </Box>
      </ContentCard>

      <Backdrop open={loading} style={{ zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop
        open={success}
        style={{ zIndex: 9999, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={handleCloseSuccess}
      >
        <Box
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography variant="h5" style={{ fontWeight: "500" }}>
            Bạn đã thêm một danh mục con!
          </Typography>
          {/* <Typography variant="h6" style={{ marginTop: "1em" }}>
            Mã danh mục con: {addedSubcategory?.id} 
          </Typography> */}
          <Typography variant="h6" style={{ marginTop: "1em" }}>
            Tên danh mục con: {addedSubcategory?.name} 
          </Typography>
          <Typography variant="h6" style={{ marginTop: "1em" }}>
            Tên danh mục: {categories.find(category => category.category_id === addedSubcategory?.parentCategory)?.category_name}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseSuccess}
            style={{ marginTop: "1em", borderRadius: "15px", textTransform: 'none', boxShadow: 'none', fontSize: '1em', width: '50%' }}
          >
            Đóng
          </Button>
        </Box>
      </Backdrop>
    </div>
  );
}

export default AddSubcategory;
