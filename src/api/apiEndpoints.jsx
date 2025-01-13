const BASE_URL = "http://127.0.0.1:8000/api";

const ENDPOINTS = {
  login: "/users/login",
  stats: {
    usersCount: "/admin/user/count",
    productsCount: "/admin/count_products",
    ordersCount: "/order_admin/count",
    categoriesCount: "/admincount_category",
    subcategoriesCount: "/adminsub_category",
  },

  char: {
    countChild: "/char/count_child",
    countProducts: "/char/count_products_of_category",
    revenueCategories: "/char/revenue_category"
  },

  categories: {
    getParentCategories: "/admin/get_parent_categories",
    deleteCategory: "/admin/parent_category",
    addCategory: "/adminparent_category",
    updateCategory: "/admin/parent_category",

    editSubcategory: "/admin/subcategory",
    detailSubcategory: "/admin/subcategory?cat_id=",
    deleteSubcategory: "/admin/sub_category?sub_category_id=",
    addSubcategory: "/admin/sub_category",
  },

  products: {
    allProducts: "/admin/products",
    bestSellerProducts: "/productbest_sellers"
  }


  ,
  users: {
    detailsUser: "/admin/users",
    editUser: "/admin/user",
    deleteUser: "/admin/user?user_id=",
  },



  // getCategories: "/categories/list",
  // getUserInfo: "/user/info",
  // updateProfile: "/user/update",
};

export { BASE_URL, ENDPOINTS };
