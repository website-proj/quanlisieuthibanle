import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Backdrop,
  IconButton,
  Alert,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import CategorySelect from "./CategorySelect";
import SubcategorySelect from "./SubcategorySelect";
import SearchProduct from "./SearchProduct";
import Pagination from "./Pagination";
import AddProducts from "/src/pages/Products/Add/Add.jsx";

export default function ProductTable() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const categoryRef = useRef(null);

  // Load danh mục từ dữ liệu JSON mới
  useEffect(() => {
    fetch("/src/pages/Products/List/Products/Products.json")
      .then((response) => response.json())
      .then((data) => {
        const categoryMap = {};

        // Tạo danh sách các danh mục và các sản phẩm thuộc danh mục
        data.forEach((item) => {
          const categoryName = item.category_of_product.category_name;
          const subcategoryName = item.parent_of_category.category_name;

          if (!categoryMap[categoryName]) {
            categoryMap[categoryName] = {
              category: categoryName,
              subcategories: new Set(),
              products: [],
            };
          }

          categoryMap[categoryName].subcategories.add(subcategoryName);
          categoryMap[categoryName].products.push(item.product);
        });

        setCategories(Object.values(categoryMap)); // Chuyển danh mục thành mảng
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  // Hàm thay đổi danh mục chính
  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);

    const category = categories.find((cat) => cat.category === selected);
    setSubcategories(Array.from(category?.subcategories || []));  // Set danh mục con
    setSelectedSubcategory("");
    setProducts([]);
  };

  // Hàm thay đổi danh mục con
  const handleSubcategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedSubcategory(selected);

    const category = categories.find((cat) => cat.category === selectedCategory);
    const subcategory = category?.subcategories.find(
      (sub) => sub === selected
    );
    setProducts(subcategory ? category.products.filter(product => product.category_of_product.category_name === subcategory) : []);
  };

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((prod) =>
    Object.values(prod).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sắp xếp sản phẩm theo tên, giá hoặc số lượng
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortField === "price" || sortField === "quantity") {
      return sortOrder === "asc"
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    } else {
      return sortOrder === "asc"
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    }
  });

  // Phân trang sản phẩm
  const paginatedProducts = sortedProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalProducts = filteredProducts.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleAddProduct = () => {
    setOpenBackdrop(true);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 3 }}>
        <Typography variant="h6">Danh sách sản phẩm</Typography>
        <Button variant="contained" color="primary" onClick={handleAddProduct} sx={{ boxShadow: 'none', textTransform: 'none', borderRadius: '10px', fontSize: '1em' }}>
          Thêm sản phẩm
        </Button>
      </Box>

      <Box display="flex" gap={2} sx={{ marginBottom: 3 }}>
        <CategorySelect categories={categories} selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
        <SubcategorySelect subcategories={subcategories} selectedSubcategory={selectedSubcategory} handleSubcategoryChange={handleSubcategoryChange} selectedCategory={selectedCategory} />
        <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>

      {/* Show alert if no category or subcategory is selected */}
      {(!selectedCategory || !selectedSubcategory) && (
        <Alert severity="warning">Bạn cần chọn Danh mục và Danh mục con để xem sản phẩm.</Alert>
      )}

      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "none" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>Hình ảnh</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Tên sản phẩm</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Ngày hết hạn</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Giá bán</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Số lượng</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(paginatedProducts) && paginatedProducts.length > 0 ? (
              paginatedProducts.map((prod, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center" }}>
                    <img
                      src={prod.product.image}
                      alt={prod.product.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{prod.product.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{prod.product.expiration_date}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{prod.product.price}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{prod.product.stock_quantity}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton color="info">
                      <AiOutlineEye />
                    </IconButton>
                    <IconButton sx={{ color: "green" }}>
                      <AiOutlineEdit />
                    </IconButton>
                    <IconButton sx={{ color: "red" }}>
                      <AiOutlineDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                  No products available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        totalProducts={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(3px)' }} open={openBackdrop} onClick={handleCloseBackdrop}>
        <div onClick={(e) => e.stopPropagation()} style={{ width: '80%', borderRadius: '15px', marginBottom: '15px', transform: 'scale(0.95)' }}>
          <AddProducts onClose={handleCloseBackdrop} />
        </div>
      </Backdrop>
    </Box>
  );
}
