var baseUrl;
if (process.env.NODE_ENV == 'development') {
    baseUrl = "http://localhost:8080"
} else {
    baseUrl = "https://skilltera-api.herokuapp.com"
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
    COMPANY_DATA: `${baseUrl}/candidates/viewAll`

}
export default ApiConstants;