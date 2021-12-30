var baseUrl;
if (process.env.NODE_ENV == 'production') {
    baseUrl = "https://skilltera-api.herokuapp.com"
} else {
    baseUrl = "http://localhost:8080"
}
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


}
export default ApiConstants;