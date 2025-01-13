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
    method: "getget",
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
};

export default SummaryApi;
