import react, { useState, useRef } from "react";
import "./forgetpassword.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import ApiConstants from "../../Services/apiconstants";
import Navbar from "../../Component/Navbar/navbar";
import { NavLink } from "react-router-dom";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

export default function ForgetPassword() {
  const { promiseInProgress } = usePromiseTracker();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onBlur",
  });

  const [email, setemail] = useState("");
  const [getOtp, setgetOtp] = useState(false);
  const [newPasswordInput, setnewPasswordInput] = useState(false);
  const [otpButtonDisabled, setotpButtonDisabled] = useState(true);

  const onSubmitEmail = (data) => {
    setemail(data.email);

    trackPromise(
      axios
        .post(ApiConstants.FORGET_PASSWORD, {
          email: data.email,
        })
        .then((response) => {
          setgetOtp(true);
          console.log(response);

          let timerInterval;
          Swal.fire({
            html: "<h1>Please Wait....</h1>",
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
              title: "Email sent",
              allowOutsideClick: true,
              allowEscapeKey: true,
              allowEnterKey: true,
              icon: "success",
              confirmButtonText: "Ok",
            });
          });
        })
        .catch((error) => {
          if (error.message === "Request failed with status code 501") {
            let timerInterval;
            Swal.fire({
              title: "Please Wait....",
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
                title: error.response.data.message,
                icon: "info",
                width: 400,
                height: 100,
              });
            });
          } else if (error.message === "Network Error") {
            let timerInterval;
            Swal.fire({
              title: "Please Wait....",
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
          }
        })
    );
    setotpButtonDisabled(false);
  };

  const onSubmitOtp = (data) => {
    if (data.newpassword === data.cnfnewpassword) {
      axios
        .post(ApiConstants.RESET_PASSWORD, {
          otpCode: data.otp,
          password: data.newpassword,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          Swal.fire({
            title: "Backend Not Connected",
            icon: "info",
            width: 400,
            height: 100,
          });
        });
    } else {
      Swal.fire({
        title: "Password is not matching",
        icon: "info",
        width: 400,
        height: 100,
      });
    }
  };

  // ............clearInputFiled after filldata.....

  const formRef = useRef();

  const handleClick = () => {
    formRef.current.reset();
  };

  return (
    <>
      <Navbar />

      <div className="main-box forgotPassword">
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
        <h2>Forgot Password ?</h2>
        <span>Reset password by email varification</span>

        {!getOtp && (
          <form
            key={1}
            onSubmit={handleSubmit(onSubmitEmail)}
            ref={formRef}
            class="border"
          >
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  disabled={getOtp}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: <p>invalid email</p>,
                    },
                  })}
                />

                {errors.email && (
                  <p style={{ color: "red" }}>Enter the valid email</p>
                )}

                {/* <p style={{ 'color': 'red' }}>{errors.email?.type === 'required' && "Email is required"}</p> */}
              </div>
            </div>
            <div className="row mr-3 ml-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Get Otp
              </button>
            </div>

            <div className="row ">
              <p className="pt-3 d-flex justify-content-center">
                <NavLink to="/login" style={{ color: "#9b51e0" }}>
                  Back
                </NavLink>
              </p>
            </div>
          </form>
        )}

        {getOtp && (
          <form key={2} onSubmit={handleSubmit2(onSubmitOtp)} class="border">
            <div className="modal-body">
              <div className="">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  disabled
                  className="form-control"
                  placeholder={email}
                />
              </div>
              <div className="">
                <label className="form-label">OTP</label>
                <input
                  type="text"
                  disabled={otpButtonDisabled}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder=""
                  {...register2("otp", { required: true })}
                />
                <p style={{ color: "red" }}>
                  {errors2.otp?.type === "required" && "otp is required"}
                </p>
              </div>
              <div className="">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="New Password"
                  {...register2("newpassword", { required: true })}
                />
                <p style={{ color: "red" }}>
                  {errors2.newpassword?.type === "required" &&
                    "New Password is required"}
                </p>
              </div>
              <div className="">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  {...register2("cnfnewpassword", { required: true })}
                />
                <p style={{ color: "red" }}>
                  {errors2.cnfnewpassword?.type === "required" &&
                    "Confirm New Password is required"}
                </p>
              </div>
              <div className="row mr-1 ml-1">
                <button type="submit" className="btn btn-primary">
                  Change Password
                </button>
              </div>
              <div className="row ">
                <p className="pt-2 d-flex justify-content-center">
                  <NavLink to="/login" style={{ color: "#9b51e0" }}>
                    Back
                  </NavLink>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
