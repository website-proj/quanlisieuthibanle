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
    revenueCategories: "/char/revenue_category",

    users14days: "/char/user_create_14_day",
    users12months: "/char/user_create_12_month",
    users3years: "/char/user_create_3_years",

    revenue14days: "/char/revenue_14_day",
    cost14days: "/char/cost_14_day",
    profit14days: "/char/profit_14_day",

    revenue12months: "/char/revenue_12_month",
    cost12months: "/char/cost_12_month",
    profit12months: "/char/profit_12_month",

    revenue3years: "/char/Revenue_3_years",
    cost3years: "/char/cost_3_years",
    profit3years: "/char/profit_3_years",
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
    bestSellerProducts: "/productbest_sellers",
    viewProductDetails: "/admin/reviews_of_product?product_id=",
    deleteProduct: "/admin/product?product_id=",
    addProduct: "/admin/products",
    editProduct: "/admin/product/",
  },

  orders: {
    allOrders: "/order_admin/get_all_order",
  },

  users: {
    detailsUser: "/admin/users",
    editUser: "/admin/user",
    deleteUser: "/admin/user?user_id=",
    addUser: "/admin/user",
    addSuperAdmin: "/super_admin/",
  },

  banners: {
    allBanners: "/banner/",
    editBanner: "/banner/",
    deletebanner: "/banner/",
    addBanner: "/banner/",
  },

  popups: {
    allPopups: "/popup/",
    editPopup: "/popup/",
    deletepopup: "/popup/",
    addPopup: "/popup/"
  }
};

export { BASE_URL, ENDPOINTS };
