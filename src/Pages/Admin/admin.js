import react, { useState, useEffect, useRef } from "react";
import Navbar from "../../Component/Navbar/navbar";
import axios from "axios";
import "./admin.css";
import { useForm } from "react-hook-form";
import ApiConstants from "../../Services/apiconstants";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { FcAbout } from "react-icons/fc";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

export default function Admin() {
  const { promiseInProgress } = usePromiseTracker();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isEmailVerified, setisEmailVerified] = useState(false);
  let history = useHistory();

  const onSubmit = (data) => {
    console.log(data);

    trackPromise(
      axios
        .post(ApiConstants.ADMIN_LOGIN, {
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("ADMIN", JSON.stringify(response.data));
          localStorage.setItem("login", true);

          // Swal.fire({
          //   title: response.data.message,
          //   html: "Verifiying Detail", // add html attribute if you want or remove
          //   allowOutsideClick: true,
          //   allowEscapeKey: true,
          //   allowEnterKey: true,

          //   didOpen: () => {
          //     Swal.showLoading();
          //   },
          //   icon: "success",
          // });

          window.location.pathname = "/adminDashboard";
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            let timerInterval;
            Swal.fire({
              title: "Please Wait",
              timer: 2500,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                timerInterval = setInterval(() => {
                  Swal.getTimerLeft();
                }, 50);
              },
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              Swal.fire({
                title: "Backend not connected",
                icon: "info",
                width: 400,
                height: 100,
              });
            });
          } else if (error.message === "Request failed with status code 400") {
            let timerInterval;
            Swal.fire({
              title: "Please Wait",
              timer: 2500,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                timerInterval = setInterval(() => {
                  Swal.getTimerLeft();
                }, 50);
              },
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              Swal.fire({
                title: error.response.data.error,
                icon: "info",
                width: 400,
                height: 100,
              });
            });
          }
        })
    );
  };

  function showHint() {
    alert(
      "1. At least 8 characters \n 2. At least one special char \n 3. At least one number \n 4. At least one upper and one lower case char. \n "
    );
  }

  // ............clearInputFiled after filldata.....

  const formRef = useRef();

  const handleClick = () => {
    formRef.current.reset();
  };

  return (
    <>
      <Navbar />

      <div className="continer-fluid adminSignin border">
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
        <h2 className="d-flex justify-content-center">Admin Sign-in</h2>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              {...register("email", {
                required: true,
                // pattern: {
                //   value:
                //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                //   message: <p>invalid email</p>,
                // },
              })}
            />
            {errors.email && (
              <p style={{ color: "red" }}>Enter the valid email </p>
            )}

            {/* <p style={{ 'color': 'red' }}>{errors.email?.type === 'required' && "Email is required"} </p> */}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", {
                required: true,
                // pattern: { value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/ },
              })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>
                Enter the strong password{" "}
                <button onClick={showHint} className="showHint">
                  {" "}
                  <FcAbout />
                </button>{" "}
              </p>
            )}

            {/* <p style={{ 'color': 'red' }}>  {errors.password?.type === 'required' && "Password is required" }  </p> */}
          </div>
          <div className="row ml-1 mr-1">
            <button
              type="submit"
              className="btn btn-primary "
              onClick={handleClick}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
