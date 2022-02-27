import react, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ApiConstants from "../../../Services/apiconstants";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { FcAbout } from "react-icons/fc";
import "./candidateAdminSignup.css";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

export default function CandidateAdminSignup() {
  const { promiseInProgress } = usePromiseTracker();
  const formRef = useRef();

  const handleClick = () => {
    formRef.current.reset();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    setId(JSON.parse(sessionStorage.getItem("ADMIN")).admin._id);
    setToken(JSON.parse(sessionStorage.getItem("ADMIN")).token);
  }, []);
  const onSubmit = (data) => {
    console.log("id", id);
    console.log("token", token);

    trackPromise(
      axios
        .post(
          ApiConstants.ADMIN_CANDIDATE_SIGNUP,
          {
            email: data.email,
            password: data.password,
            fullname: data.fullName,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              token: token,
              _id: id,
              "Access-Control-Allow-Origin": true,
              "Access-Control-Allow-Methods": "GET, POST, PATCH",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            title: response.data.message,
            icon: "info",
            width: 400,
            height: 100,
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
  return (
    <>
      <div className="main-box main-box-admin-candidate-signup border">
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
        <h2 className="d-flex justify-content-center">
          Candidate Admin Signup
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              {...register("fullName", {
                required: true,
                message: <p>Invalid Full Name</p>,
              })}
            />
            {errors.fullName && (
              <p style={{ color: "red" }}>Enter the valid Full Name</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Entered value does not match email format",
                },
              })}
            />
            {errors.email && (
              <p style={{ color: "red" }}>Enter the valid email </p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", {
                required: true,
                pattern: { value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/ },
              })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>Enter the strong password </p>
            )}

            {/* <p style={{ 'color': 'red' }}>  {errors.password?.type === 'required' && "Password is required" }  </p> */}
          </div>
          <div className="row mt-2 ml-2">
            <button type="submit" className="btn btn-primary" onClick={handleClick}>
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
