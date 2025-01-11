const BASE_URL = "http://127.0.0.1:8000/api";

const ENDPOINTS = {
  char: {
    countChild: "/char/count_child",
    countProducts: "/char/count_products_of_category",
    revenueCategories: "/char/revenue_category"
  },
  categories: {
    getParentCategories: "/admin/get_parent_categories",
    deleteCategory: "/admin/parent_category",
  },
  getCategories: "/categories/list",
  getUserInfo: "/user/info",
  updateProfile: "/user/update",
};

export { BASE_URL, ENDPOINTS };
