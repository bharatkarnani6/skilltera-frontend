// var baseUrl
// if (process.env.NODE_ENV == "production") {
//   baseUrl = "https://skilltera-api.herokuapp.com";
// } else {
//   baseUrl = "http://localhost:8080";
// }
console.log(process.env.PORT);
console.log(process.env);
const ApiConstants = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  RESET_PASSWORD: '/reset-password',
  FORGET_PASSWORD: '/forgetPassword',
  VERIFY_OTP: '/verifyOtp',
  CONTACT_MAIL: '/contact',
  COMPANY_LOGIN: '/company/login',

  CANDIDATE_DATA: '/candidates/viewAll',

  COMPANY_DATA: '/company/viewAll',

  ADMIN_LOGIN: '/admin/login',
  ADMIN_COMPANY_SIGNUP: '/admin/company/signup',
  ADMIN_CANDIDATE_SIGNUP: '/admin/candidate/signup',
  CANDIDATE_DATA_BY_ID: '/candidate',
  ADMIN_CANDIDATE_UPDATE: '/admin/candidate/update',
  PROFILE: '/profile',
  ADMIN_COMPANY_PASSWORD_RESET: '/admin/company/reset',

  SHORTLISTED_CANDIDATE: '/company/addShortlisted',
  REJECTED_CANDIDATE: '/company/addRejected',
  INTERVIEWING_CANDIDATE: '/company/addInterviewed',
  FUTURE_CANDIDATE: '/company/addSaved',

  GET_SHORTLISTED_CANDIDATE: '/company/shortlisted',
  GET_REJECTED_CANDIDATE: '/company/rejected',
  GET_INTERVIEWING_CANDIDATE: '/company/interviewed',
  GET_FUTURE_CANDIDATE: '/company/saved',

  CANDIDATE_SHORTLISTED_DATA_BY_COMPANY: '/candidates/shortlisted',
  CANDIDATE_REJECTED_DATA_BY_COMPANY: '/candidates/rejected',
  CANDIDATE_INTERVIEWED_DATA_BY_COMPANY: '/candidates/interviewed',
  CANDIDATE_SELECTED_DATA_BY_COMPANY: '/candidates/selected',
  CANDIDATE_SAVED_DATA_BY_COMPANY: '/candidates/saved',

  GET_SHORTLISTED_CANDIDATE: '/company/shortlisted',
  GET_REJECTED_CANDIDATE: '/company/rejected',
  GET_INTERVIEWING_CANDIDATE: '/company/interviewed',
  GET_FUTURE_CANDIDATE: '/company/saved',
  GET_ALL_COMPANY_CANDIDATE: '/company/candidates',

  RESUME_UPLOAD: '/candidate/upload'

};
export default ApiConstants;
