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

  discount_products: {
    url: "/api/product/discount",
    method: "get",
  },
  flash_sale: {
    url: "/api/product/flash_sale",
    method: "get",
  },
  best_seller: {
    url: "/api/product/best_seller",
    method: "get",
  },
  new_arrivals: {
    url: "/api/product/new_arrivals",
    method: "get",
  },
};

export default SummaryApi;
