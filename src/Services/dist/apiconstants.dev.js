"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var baseUrl;

if (process.env.NODE_ENV == 'production') {
  baseUrl = "https://skilltera-api.herokuapp.com";
} else {
  baseUrl = "http://localhost:8080";
}

console.log(baseUrl);
var ApiConstants = {
  LOGIN: "".concat(baseUrl, "/login"),
  SIGNUP: "".concat(baseUrl, "/signup"),
  RESET_PASSWORD: "".concat(baseUrl, "/reset-password"),
  FORGET_PASSWORD: "".concat(baseUrl, "/forgetPassword"),
  VERIFY_OTP: "".concat(baseUrl, "/verifyOtp"),
  CONTACT_MAIL: "".concat(baseUrl, "/contact"),
  COMPANY_LOGIN: "".concat(baseUrl, "/company/login"),
  CANDIDATE_DATA: "".concat(baseUrl, "/candidates/viewAll"),
  COMPANY_DATA: "".concat(baseUrl, "/company/viewAll"),
  ADMIN_LOGIN: "".concat(baseUrl, "/admin/login"),
  ADMIN_COMPANY_SIGNUP: "".concat(baseUrl, "/admin/company/signup"),
  ADMIN_CANDIDATE_SIGNUP: "".concat(baseUrl, "/admin/candidate/signup")
};
var _default = ApiConstants;
exports["default"] = _default;