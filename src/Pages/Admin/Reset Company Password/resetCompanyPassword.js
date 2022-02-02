import react, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ApiConstants from "../../../Services/apiconstants";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { FcAbout } from "react-icons/fc";
import "./resetCompanyPassword.css";

export default function ResetCompanyPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="main-box main-box-admin-reset">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
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
          <div className="row">
            <div className="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
