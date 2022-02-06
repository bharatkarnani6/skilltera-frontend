import React from "react";
import react, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ApiConstants from "../../Services/apiconstants";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Swal from "sweetalert2";
import "./Personal.css";

const Profile = () => {
  const { promiseInProgress } = usePromiseTracker();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [check, setCheck] = useState(true);

  const candidateData = JSON.parse(localStorage.getItem("candidate_data"));

  const token = candidateData.token;

  const userId = candidateData.candidate._id;

  const user = candidateData.candidate;

  const onSubmit = (data) => {
    trackPromise(
      axios
        .put(
          ApiConstants.PROFILE,
          {
            phone: data.phone,
            country: data.country,
            currentCity: data.currentCity,
            linkedInUrl: data.linkedInUrl,
            relocation: data.relocation,
            typeOfJob: data.jobOfType,
            timeToJoin: data.timeToJoin,
            needVisaEmployers: data.needVisaEmployers,
            expectedRateC2CorC2H: data.expectedRateC2CorC2H,
          },
          {
            Accept: "application/json",
            "Content-type": "application/json",
            token: token,
            _id: userId,
            "Access-Control-Allow-Origin": true,
            "Access-Control-Allow-Methods": "GET, POST, PATCH",
          }
        )
        .then((response) => {
          let timerInterval;
          // Swal.fire({
          //   title: "Please Wait....",
          //   timer: 2500,
          //   timerProgressBar: true,
          //   didOpen: () => {
          //     Swal.showLoading();
          //     timerInterval = setInterval(() => {
          //       Swal.getTimerLeft();
          //     }, 1000);
          //   },
          //   willClose: () => {
          //     clearInterval(timerInterval);
          //   },
          // });
          // setTimeout(function () {
          //   window.location.pathname = "/dashboard";
          // }, 2000);

          window.location.pathname = "/dashboard";
        })
        .catch((error) => {
          console.log("ERROR : ", error);
          let timerInterval;
          Swal.fire({
            title: "Loading...",
            timer: 2500,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              timerInterval = setInterval(() => {
                Swal.getTimerLeft();
              }, 1000);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((error) => {
            Swal.fire({
              title: "backend not working",
              icon: "error",
              width: 400,
              height: 100,
            });
          });
        })
    );
  };

  // .............tooltips.........

  return (
    <>
      <div class="border border-dark rounded personal">
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <legend>Personal Info</legend>
          <div class="row">
            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlTextarea1">Phone Number</label>
              <input
                type="number"
                className="form-control"
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                defaultValue={user.phone}
                {...register("phone")}
                disabled={check}
              />
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">
                When can you join(week)
              </label>
              <select
                class="form-control"
                {...register("timeToJoin")}
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                disabled={check}
              >
                <option value="1">1 </option>
                <option value="2">2 </option>
                <option value="1">3 </option>
                <option value="2">4 </option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="col">
              <label for="exampleFormControlTextarea1">Country</label>
              <input
                type="text"
                class="form-control"
                id="inputState"
                placeholder="India"
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                defaultValue={user.country}
                {...register("country")}
                disabled={check}
              />
            </div>

            <div class="col">
              <label for="exampleFormControlTextarea1"> Current City</label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                placeholder="Delhi"
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                defaultValue={user.currentCity}
                {...register("currentCity")}
                disabled={check}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1"> Open to relocate</label>

              {/* /check */}
              <select
                class="form-control"
                {...register("relocation")}
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                disabled={check}
              >
                <option value={user.relocation === false ? false : true}>
                  {user.relocation === true ? "No" : "Yes"}
                </option>
                <option value={user.relocation === true ? true : false}>
                  {user.relocation === true ? "Yes" : "No"}
                </option>
              </select>
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">
                Type of Job you want{" "}
              </label>
              <select
                class="form-control"
                {...register("typeOfJob")}
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                disabled={check}
              >
                <option
                  value={user.typeOfJob == "Fulltime" ? "Fulltime" : "Parttime"}
                >
                  {" "}
                  {user.typeOfJob == "Fulltime" ? "Fulltime" : "Parttime"}{" "}
                </option>
                <option value={user.jobOfType == "C2C" ? "C2C" : "C2H"}>
                  {user.typeOfJob == "C2C" ? "C2C" : "C2H"}
                </option>
                <option value={user.jobOfType == "C2H" ? "C2H" : "C2C"}>
                  {user.typeOfJob == "C2H" ? "C2H" : "C2C"}
                </option>
              </select>
            </div>
          </div>

          {/* /check */}

          <div class="row mt-3">
            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">
                Do you need visa Sponsorship ?
              </label>

              <select
                class="form-control"
                {...register("needVisaEmployer")}
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                disabled={check}
              >
                <option value={user.needVisaEmployer === false ? false : true}>
                  {user.needVisaEmployer === false ? "No" : "Yes"}
                </option>
                <option value={user.needVisaEmployer === true ? true : false}>
                  {user.needVisaEmployer === true ? "Yes" : "No"}
                </option>
              </select>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">
                Expected Rate for C2C/C2H
              </label>
              <input
                type="number"
                class="form-control"
                id="inputCity"
                placeholder="usd"
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                defaultValue={user.expectedRateC2CorC2H}
                {...register("expectedRateC2CorC2H")}
                disabled={check}
              />
            </div>
          </div>

          <div class="from-row mt-1">
            <label for="exampleFormControlTextarea1">LinkedIn url</label>
            <input
              type="url"
              className="form-control"
              id="inputPhone"
              placeholder="http://"
              style={{ color: check === true ? "#7B7D7D" : "black" }}
              defaultValue={user.linkedInUrl}
              {...register("linkedInUrl")}
              disabled={check}
            />
          </div>

          <div class="btn-group mt-4" role="group" aria-label="Basic example">
            {check ? (
              <button
                type="submit"
                className="btn btn-primary active"
                disabled={check}

                // aria-disabled="true"
              >
                Save
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary active"
                // aria-disabled="true"
                disabled={check}
              >
                Save
              </button>
            )}

            {check ? (
              <button
                type="button"
                className="btn btn-dark active"
                onClick={(e) => setCheck(false)}
              >
                Edit
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-dark disabled"
                aria-disabled="true"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
