var baseUrl = "https://skilltera-api.herokuapp.com"
// var baseUrl
// if (process.env.NODE_ENV == "production") {
//   baseUrl = "https://skilltera-api.herokuapp.com";
// } else {
//   baseUrl = "http://localhost:8080";
// }
console.log(baseUrl);
const ApiConstants = {
  LOGIN: `${baseUrl}/login`,
  SIGNUP: `${baseUrl}/signup`,
  RESET_PASSWORD: `${baseUrl}/reset-password`,
  FORGET_PASSWORD: `${baseUrl}/forgetPassword`,
  VERIFY_OTP: `${baseUrl}/verifyOtp`,
  CONTACT_MAIL: `${baseUrl}/contact`,
  COMPANY_LOGIN: `${baseUrl}/company/login`,
  CANDIDATE_DATA: `${baseUrl}/candidates/viewAll`,
  
  COMPANY_DATA: `${baseUrl}/company/viewAll`,

  ADMIN_LOGIN: `${baseUrl}/admin/login`,
  ADMIN_COMPANY_SIGNUP: `${baseUrl}/admin/company/signup`,
  ADMIN_CANDIDATE_SIGNUP: `${baseUrl}/admin/candidate/signup`,
  CANDIDATE_DATA_BY_ID: `${baseUrl}/candidate`,
  ADMIN_CANDIDATE_UPDATE: `${baseUrl}/admin/candidate/update`,
  PROFILE: `${baseUrl}/profile`, 
  ADMIN_COMPANY_PASSWORD_RESET: `${baseUrl}/admin/company/reset`,

  SHORTLISTED_CANDIDATE :`${baseUrl}/company/addShortlisted`,
  REJECTED_CANDIDATE:`${baseUrl}/company/addRejected`,
  INTERVIEWING_CANDIDATE:`${baseUrl}/company/addInterviewed`,
  FUTURE_CANDIDATE:`${baseUrl}/company/addSaved`,

  GET_SHORTLISTED_CANDIDATE :`${baseUrl}/company/shortlisted`,
  GET_REJECTED_CANDIDATE:`${baseUrl}/company/rejected`,
  GET_INTERVIEWING_CANDIDATE:`${baseUrl}/company/interviewed`,
  GET_FUTURE_CANDIDATE:`${baseUrl}/company/saved`,

};
export default ApiConstants;
