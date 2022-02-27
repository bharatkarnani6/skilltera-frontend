import react, { useState, useEffect, useRef } from "react";
import "./login.css";
import { useForm } from "react-hook-form";
import Navbar from "../../Component/Navbar/navbar";
import axios from "axios";
import ApiConstants from "../../Services/apiconstants";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { FcAbout } from "react-icons/fc";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { NavLink } from "react-router-dom";

const Login = () => {
  const { promiseInProgress } = usePromiseTracker();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isEmailVerified, setisEmailVerified] = useState(false);

  let history = useHistory();

  const onSubmit = (data) => {
    trackPromise(
      axios
        .post(ApiConstants.LOGIN, {
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          console.log(response.data);

          sessionStorage.setItem("candidate_data", JSON.stringify(response.data));

          sessionStorage.setItem("login", true);
          sessionStorage.setItem("candidateDashboard", true);

          window.location.pathname = "/dashboard";
          // history.push('/dashboard')
          setisEmailVerified(response.data.candidate.isVerified);
        })
        .catch((error) => {
          if (error.message === "Request failed with status code 400") {
            Swal.fire({
              title: error.response.data.error,
              icon: "info",
              width: 400,
              height: 100,
            });
          } else if (error.message === "Network Error") {
            Swal.fire({
              title: "Backend not connected",
              icon: "info",
              width: 400,
              height: 100,
            });
          }
        })
    );
    reset();
  };

  function showHint() {
    alert(
      "1. At least 8 characters \n 2. At least one special char \n 3. At least one number \n 4. At least one upper and one lower case char. \n "
    );
  }

  return (
    <>
      <Navbar />

      <div className="main-box login  border">
        {promiseInProgress === true ? (
          <div class="d-flex align-items-center">
            <h3 className="mb-3">Loading...</h3>
            <div
              class="spinner-border ml-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        ) : null}
        <h2 className="d-flex justify-content-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              id="email"
              className="form-control"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Entered value does not match email format",
                },
              })}
              type="email"
            />
            {errors.email && (
              <span role="alert" style={{ color: "red" }}>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              id="password"
              className="form-control"
              {...register("password", {
                required: "Please Enter Password",
              })}
              type="password"
            />
            {errors.password && (
              <span role="alert" style={{ color: "red" }}>
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="row">
            <div className="d-grid col-12 mx-auto">
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </div>
          </div>
        </form>

        <div className="row">
          <div className="col-6">
            <p className="pt-3" style={{ color: "#9b51e0" }}>
              <NavLink to="/forgotPassword"> Forget Password </NavLink>
            </p>
          </div>
          <div className="col-6">
            <p style={{ color: "#9b51e0" }} className="pt-3">
              <NavLink to="/signup"> New User? Register </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
