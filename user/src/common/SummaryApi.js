export const baseURL = "http://localhost:8000";
const SummaryApi = {
  register: {
    url: "/api/users/",
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
  forgot_password_otp_verification: {
    url: "api/user/verify-forgot-password-otp",
    method: "put",
  },
  resetPassword: {
    url: "/api/users/resetPassword",
    method: "put",
  },
};

export default SummaryApi;
