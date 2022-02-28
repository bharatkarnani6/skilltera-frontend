import react, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import ApiConstants from "../../Services/apiconstants";
import Swal from "sweetalert2";
import { FcAbout } from "react-icons/fc";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Navbar from "../../Component/Navbar/navbar";
import { NavLink } from "react-router-dom";
import "./signup.css";
export default function Signup(props) {
  const { promiseInProgress } = usePromiseTracker();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [isEmailVerified, setisEmailVerified] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    trackPromise(
      axios
        .post(ApiConstants.SIGNUP, {
          fullname: data.fullname,
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            title: "Email Sent !",
            html: "Please Verify your Email",
            icon: "success",
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            confirmButtonText: "Ok",
          });

        })
        .catch((error) => {
          if (error.message === "Request failed with status code 500") {
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
  };

  const reCaptchaSubmit = (value) => {
    setIsSubmitting(false);
    // console.log(value);
  };

  //rak

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

      <div className="main-box signup ">
        {promiseInProgress === true ? (
          <div className="d-flex align-items-center">
            <h3 className="mb-1">Loading...</h3>
            <div
              class="spinner-border ml-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        ) : null}
        <h5 className="modal-title" id="exampleModalLabel">
          Create an Account
        </h5>

        <form onSubmit={handleSubmit(onSubmit)} ref={formRef} class="border">
          <div className="modal-body">
            <div className="mb-1">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Full Name"
                {...register("fullname", { required: true, minLength: 3 })}
              />
              {errors.fullname && (
                <p style={{ color: "red" }}>Enter valid name minimum 3 letters</p>
              )}
              {/* <p style={{ 'color': 'red' }}>{errors.fullname?.type === 'required' && "Full Name is required"}</p> */}
            </div>
            <div className="mb-1">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="E-mail"
                {...register("email", {
                  required: true,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: <p>Invalid Email</p>,
                  },
                })}
              />

              {errors.email && (
                <p style={{ color: "red" }}>Enter the valid email</p>
              )}
              {/* <p style={{ 'color': 'red' }}>{errors.email?.type === 'required' && "Email is required"}</p> */}
            </div>
            <div className="mb-1">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  pattern: { value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/ },
                })}
              />
              {errors.password && (
                <p style={{ color: "red" }}>
                  Please enter the password{" "}
                  <button onClick={showHint} className="showHint">
                    {" "}
                    <FcAbout />
                  </button>{" "}
                </p>
              )}

              {/* <p style={{ 'color': 'red' }}>{errors.password?.type === 'required' && "Password is required"}</p> */}
            </div>
            <div className="mt-2 mb-1 d-flex justify-content-center">
              <ReCAPTCHA
                sitekey="6LeV1SgdAAAAACOIFJkXmryFhyxHnK9jH4oYGkVN"
                onChange={reCaptchaSubmit}
              />
            </div>

            <div className="row mr-1 ml-1">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Sign up
              </button>
            </div>

            <div className="row ">
              <p className="pt-3 d-flex justify-content-center">
                Already on Skilltera?{" "}
                <NavLink to="/login" style={{ color: "#9b51e0" }}>
                  Sign in{" "}
                </NavLink>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
