

exports.authHeader = authHeader;

function authHeader() {
  // return authorization header with basic auth credentials
  var user = JSON.parse(localStorage.getItem("candidate_data"));
  console.log("userdata", user);

  if (user && user.token) {
    return {
      authorization: "bearer ".concat(user.token)
    };
  } else {
    return {};
  }
}
