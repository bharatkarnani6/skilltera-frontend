import react, { useState, useRef } from "react";
import "./forgetpassword.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import ApiConstants from "../../Services/apiconstants";
import Navbar from "../../Component/Navbar/navbar";
import { NavLink } from "react-router-dom";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

export default function ForgetPassword() {

  const [isSubmitting, setIsSubmitting] = useState(true);

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
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const [email, setemail] = useState("");
  const [getOtp, setgetOtp] = useState(false);
  const [newPasswordInput, setnewPasswordInput] = useState(false);
  const [otpButtonDisabled, setotpButtonDisabled] = useState(true);

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

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
        })
        .catch((error) => {
          // console.log("eroroM ", error.response.data.message);
          setEmailErrorMessage(error.response.data.error);
        })
    );
    setotpButtonDisabled(false);
    reset();
  };

  const onSubmitOtp = (data) => {
    if (data.newpassword === data.cnfnewpassword) {
      trackPromise(
        axios
          .post(ApiConstants.RESET_PASSWORD, {
            otpCode: data.otp,
            password: data.newpassword,
          })
          .then((response) => {
            console.log(response);
            window.location.pathname = "/login";
          })
          .catch((error) => {
            setPasswordErrorMessage("Password not matched");
          })
      );
    } else {
      setPasswordErrorMessage("Password not matched");
    }

    reset();
  };

  // ............clearInputFiled after filldata.....

  const formRef = useRef();

  const handleClick = () => {
    formRef.current.reset();
  };

  //.......
  const handleError = () => {
    setEmailErrorMessage("");
  };

  const handleError2 = () => {
    setPasswordErrorMessage("");
  };


  const reCaptchaSubmit = (value) => {
    setIsSubmitting(false);
    // console.log(value);
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

        {!getOtp && (
          <form
            key={1}
            onSubmit={handleSubmit(onSubmitEmail)}
            class="border"
            ref={formRef}
          >
            <h2 class="d-flex justify-content-center">Forgot Password ?</h2>
            <span>Reset password by email verification</span>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  id="email"
                  className="form-control"
                  disabled={getOtp}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid email format",
                    },
                  })}
                  type="email"
                  onClick={handleError}
                />
                {errors.email && (
                  <span role="alert" style={{ color: "red" }}>
                    {errors.email.message}
                  </span>
                )}

                <span role="alert" style={{ color: "red" }}>
                  {emailErrorMessage}
                </span>
              </div>
            </div>
            <div className="mt-2 mb-1 d-flex justify-content-center">
              <ReCAPTCHA
                sitekey="6Lc1UbwfAAAAAFN7tTEMmUWZEQJ0Sxbr0HQ1SGiM"
                onChange={reCaptchaSubmit}
              />
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
          <form
            key={2}
            onSubmit={handleSubmit2(onSubmitOtp)}
            class="border"
            ref={formRef}
          >
            <h3 class="d-flex justify-content-center">Reset your Password</h3>
            <span style={{ color: "#9b51e0" }}>
              Use the OTP sent to your email to set your new password. Please
              check your spam folder if you don't find email in your inbox
            </span>

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
              <div className="mt-1">
                <label className="form-label">OTP</label>
                <input
                  type="text"
                  disabled={otpButtonDisabled}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter OTP"
                  {...register2("otp", { required: true })}
                  onClick={handleError2}
                />
                <p style={{ color: "red" }}>
                  {errors2.otp?.type === "required" && "otp is required"}
                </p>
              </div>
              <div className="mb-2">
                <label className="form-label">New Password</label>
                <input
                  id="password"
                  className="form-control"
                  placeholder="New Password"
                  {...register2("newpassword", {
                    required: "Newpassword is required",
                  })}
                  type="password"
                  onClick={handleError2}
                />
                {errors.password && (
                  <span role="alert" style={{ color: "red" }}>
                    {errors.password.message}
                  </span>
                )}
                <span role="alert" style={{ color: "red" }}>
                  {passwordErrorMessage}
                </span>
              </div>
              <div className="mt-2 mb-2">
                <label className="form-label">Confirm New Password</label>
                <input
                  id="password"
                  className="form-control"
                  placeholder="confirm password"
                  {...register2("cnfnewpassword", {
                    required: "conferm password required",
                  })}
                  type="password"
                />
                {errors.password && (
                  <span role="alert" style={{ color: "red" }}>
                    {errors.password.message}
                  </span>
                )}

                <span role="alert" style={{ color: "red" }}>
                  {passwordErrorMessage}
                </span>
              </div>
              <div className="row mr-1 ml-1 ">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
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
