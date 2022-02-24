import react, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ApiConstants from "../../../Services/apiconstants";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { FcAbout } from "react-icons/fc";
import "./companyAdminPage.css";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

export default function CompanyAdminPage() {
  const { promiseInProgress } = usePromiseTracker();

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
          ApiConstants.ADMIN_COMPANY_SIGNUP,
          {
            email: data.email,
            password: data.password,
            companyName: data.companyName,
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
          if ("Backend Not Connected") {
            Swal.fire({
              title: "Backend Not Connected",
              icon: "info",
              width: 400,
              height: 100,
            });
          } else if (error.response.status == "500") {
            console.log(error.response.status);
            Swal.fire({
              title: error.response.data.message,
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
      <div className="main-box main-box-admin border">
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

        <h2 className="d-flex justify-content-center">Company Admin Page</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Company Name"
              {...register("companyName", {
                required: true,
                message: <p>Invalid Company Name</p>,
              })}
            />
            {errors.companyName && (
              <p style={{ color: "red" }}>Enter the valid Company Name</p>
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
                  message: <p>invalid email</p>,
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
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
