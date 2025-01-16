export const baseURL = "http://localhost:8000";
const SummaryApi = {
  register: {
    url: "/api/users/",
    method: "post",
  },
  register_check_code: {
    url: "/api/users/register/check_code",
    method: "post",
  },
  signIn: {
    url: "/api/users/login",
    method: "post",
  },
  forgot_password: {
    url: "/api/users/get_code_forgotPassword",
    method: "put",
  },
  check_code: {
    url: "/api/users/check_code",
    method: "put",
  },

  resetPassword: {
    url: "/api/users/resetPassword",
    method: "put",
  },
  login_gg: {
    url: "/api/login/",
    method: "get",
  },
  login_gg_token: {
    url: "/api/login/token",
    method: "get",
  },

  discount_products: {
    url: "/api/product/discount",
    method: "get",
  },
  flash_sale: {
    url: "/api/product/flash_sale",
    method: "get",
  },
  best_seller: {
    url: "/api/productbest_sellers",
    method: "get",
  },
  new_arrivals: {
    url: "/api/product/new_arrivals",
    method: "get",
  },
  search: {
    url: "/api/product/search",
    method: "get",
  },
  relevantProduct: {
    url: "/api/product/relevant_products",
    method: "get",
  },
  addToCart: {
    url: "/api/cart/",
    method: "post",
  },
  account: {
    url: "/api/users/profile",
    method: "put",
  },
  changePassword: {
    url: "/api/users/changePassword",
    method: "put",
  },
  profile: {
    url: "/api/users/profile",
    method: "put",
  },
  cart_item: {
    url: "/api/cart/carts",
    method: "get",
  },
  cart_items_delete: {
    url: "/api/cart/cart_item",
    method: "delete",
  },
  update_product: {
    url: "/api/cart/",
    method: "put",
  },
  delteCart: {
    url: "/api/cart/cart",
    method: "delete",
  },

  totalPrice: {
    url: "/api/cart/totalPrice",
    method: "get",
  },
  count_products: {
    url: "/api/cart/count_product",
    method: "get",
  },
  categories: {
    url: "/api/user/category/all_category",
    method: "get",
  },
  popup: {
    url: "/api/popup/",
    method: "get",
  },
  homeBanner: {
    url: "/api/banner/main",
    method: "get",
  },
  bannerSlide: {
    url: "/api/banner/sidebar",
    method: "get",
  },
  footBanner: {
    url: "/api/banner/bottom",
    method: "get",
  },
  parent_categories: {
    url: "/api/admin/product/parent_category",
    method: "get",
  },

  create_reviews: {
    url: "/api/review/",
    method: "post",
  },
  orders: {
    url: "/api/order/",
    method: "get",
  },
  reviews_product: {
    url: "/api/product/get_reviews_of_product",
    method: "get",
  },
  payment: {
    url: "/api/payment/",
    method: "post",
  },
  membership: {
    url: "/api/cart/get_membership_status",
    method: "get",
  },
  get_bill: {
    url: "/api/cart/get_bill",
    method: "get",
  },
  order: {
    url: "/api/order/",
    method: "get",
  },
  get_product_categories: {
    url: "/api/product/get_product_by_2_categoryID",
    method: "get",
  },
  get_bestseller: {
    url: "/api/product/get_best_seller_2cat",
    method: "get",
  },
  get_discount: {
    url: "/api/product/discount_2cat",
    method: "get",
  },
};
export default SummaryApi;
