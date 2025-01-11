import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Backdrop, CircularProgress, Select, MenuItem } from "@mui/material";
import "./Add.css";
import ContentCard from "/src/components/Admin/ContentCard/ContentCard";

function AddSubcategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [addedSubcategory, setAddedSubcategory] = useState(null);

  useEffect(() => {
    fetch("/src/pages/Admin/Categories/CategoriesList/Category.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched categories:", data);
        setCategories(Object.keys(data.categories)); 
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

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
        setTimeout(() => {
          setAddedSubcategory({ name: subCategoryName, parentCategory: selectedCategory });
          setSuccess(true);
          setSubCategoryName("");
          setSelectedCategory("");
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Lỗi khi thêm danh mục con:", error);
        setLoading(false);
      }
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
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
          >
            <MenuItem value="">Chọn danh mục</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
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

          <Button variant="contained" color="primary" onClick={handleAdd} className="submit-button">
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
          <Typography variant="h6" style={{ marginTop: "1em" }}>
            Danh mục: {addedSubcategory?.parentCategory}
          </Typography>
          <Typography variant="h6">Danh mục con: {addedSubcategory?.name}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseSuccess}
            style={{ marginTop: "1em", borderRadius: "15px" }}
          >
            Đóng
          </Button>
        </Box>
      </Backdrop>
    </div>
  );
}

export default AddSubcategory;
