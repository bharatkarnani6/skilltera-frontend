"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var local = "http://localhost:8080";
var ApiConstants = {
  LOGIN: "".concat(local, "/login"),
  SIGNUP: "".concat(local, "/signup"),
  RESET_PASSWORD: "".concat(local, "/reset-password"),
  FORGET_PASSWORD: "".concat(local, "/forgetPassword"),
  VERIFY_OTP: "".concat(local, "/verifyOtp"),
  PROFILE: "".concat(local, "/profile")
};
var _default = ApiConstants;
exports["default"] = _default;