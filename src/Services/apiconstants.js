// var baseUrl
// if (process.env.NODE_ENV == "production") {
//   baseUrl = "https://skilltera-api.herokuapp.com";
// } else {
//   baseUrl = "http://localhost:8080";
// }
// console.log(process.env.PORT);
// console.log(process.env);
// const baseURL = process.env.NODE_ENV === "production"
//     ? "/api"
//     : "http://localhost:5000/api";

const ApiConstants = {
  LOGIN: '/api/login',
  SIGNUP: '/api/signup',
  RESET_PASSWORD: '/api/reset-password',
  FORGET_PASSWORD: '/api/forgetPassword',
  VERIFY_OTP: '/api/verifyOtp',
  CONTACT_MAIL: '/api/contact',
  COMPANY_LOGIN: '/api/company/login',

  CANDIDATE_DATA: '/api/candidates/viewAll',

  COMPANY_DATA: '/api/company/viewAll',

  ADMIN_LOGIN: '/api/admin/login',
  ADMIN_COMPANY_SIGNUP: '/api/admin/company/signup',
  ADMIN_CANDIDATE_SIGNUP: '/api/admin/candidate/signup',
  CANDIDATE_DATA_BY_ID: '/api/candidate',
  ADMIN_CANDIDATE_UPDATE: '/api/admin/candidate/update',
  PROFILE: '/api/profile',
  ADMIN_COMPANY_PASSWORD_RESET: '/api/admin/company/reset',

  SHORTLISTED_CANDIDATE: '/api/company/addShortlisted',
  REJECTED_CANDIDATE: '/api/company/addRejected',
  INTERVIEWING_CANDIDATE: '/api/company/addInterviewed',
  FUTURE_CANDIDATE: '/api/company/addSaved',

  GET_SHORTLISTED_CANDIDATE: '/api/company/shortlisted',
  GET_REJECTED_CANDIDATE: '/api/company/rejected',
  GET_INTERVIEWING_CANDIDATE: '/api/company/interviewed',
  GET_FUTURE_CANDIDATE: '/api/company/saved',

  CANDIDATE_SHORTLISTED_DATA_BY_COMPANY: '/api/candidates/shortlisted',
  CANDIDATE_REJECTED_DATA_BY_COMPANY: '/api/candidates/rejected',
  CANDIDATE_INTERVIEWED_DATA_BY_COMPANY: '/api/candidates/interviewed',
  CANDIDATE_SELECTED_DATA_BY_COMPANY: '/api/candidates/selected',
  CANDIDATE_SAVED_DATA_BY_COMPANY: '/api/candidates/saved',

  GET_SHORTLISTED_CANDIDATE: '/api/company/shortlisted',
  GET_REJECTED_CANDIDATE: '/api/company/rejected',
  GET_INTERVIEWING_CANDIDATE: '/api/company/interviewed',
  GET_FUTURE_CANDIDATE: '/api/company/saved',
  GET_ALL_COMPANY_CANDIDATE: '/api/company/candidates',

  RESUME_UPLOAD: '/api/candidate/upload'

};
export default ApiConstants;
