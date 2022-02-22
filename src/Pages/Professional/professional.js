import React from "react";
import react, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ApiConstants from "../../Services/apiconstants";
import Swal from "sweetalert2";
import "./professional.css";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

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

  useEffect(() => {
    if (
      user.experience === undefined &&
      user.currentCompany === undefined &&
      user.interestedRole === undefined &&
      user.knownTechnologies === undefined &&
      user.experienceDescription === undefined &&
      user.previousEmployers === undefined &&
      user.interestedRole === undefined
    ) {
      setCheck(false);
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    trackPromise(
      axios
        .patch(
          ApiConstants.PROFILE,
          {
            experience: data.experience,
            currentCompany: data.currentCompany,
            interestedRole: data.interestedRole,
            knownTechnologies: data.knownTechnologies,
            experienceDescription: data.experienceDescription,
            previousEmployers: data.previousEmployers,
            interestedRole: data.interestedRole,
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
          console.log(response.data);

          setTimeout(function () {
            window.location.pathname = "/dashboard";
          }, 2000);
        })
        .catch((error) => {
          let timerInterval;
          Swal.fire({
            title: "Loading...",
            timer: 2500,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              timerInterval = setInterval(() => {
                Swal.getTimerLeft();
              }, 500);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((error) => {
            Swal.fire({
              title: "Backend not connected",
              icon: "error",
              width: 400,
              height: 100,
            });
          });
        })
    );
  };

  // .............tooltips.........
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div class="border border-dark rounded professional">
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

        <legend>Professional Info</legend>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="row">
            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">
                {" "}
                Overall experience(Years)
              </label>

              <input
                type="number"
                className="form-control"
                placeholder=""
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                defaultValue={user.experience}
                {...register("experience")}
                ref={inputRef}
                disabled={check}
              />
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">Current Role</label>
              <input
                type="text"
                class="form-control"
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                placeholder=""
                defaultValue={user.interestedRole}
                {...register("interestedRole")}
                disabled={check}
              />
            </div>
          </div>

          <div class="row mt-1">
            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">
                Current Company / Client
              </label>
              <input
                type="text"
                class="form-control"
                placeholder=""
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                defaultValue={user.currentCompany}
                {...register("currentCompany")}
                disabled={check}
              />
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">
                {" "}
                Enter Type of Role you are looking for
              </label>
              <select
                class="form-control"
                {...register("interestedRole")}
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                disabled={check}
              >
                <option value=""> </option>
                <option value="Data Engineer"> Data Engineer</option>
                <option value="Full Stack Engineer">
                  Full Stack Engineer{" "}
                </option>
                <option value="Cloud Engineer">Cloud Engineer</option>
              </select>
            </div>
          </div>

          <div class="row ">
            <div class="col-md-6 col-sm-6 ">
              <label for="exampleFormControlSelect1">
                Technologies / Tools you are good at(comma seperated)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                defaultValue={user.knownTechnologies}
                {...register("knownTechnologies")}
                disabled={check}
              />
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">
                Enter Companies / Client you have worked for{" "}
              </label>
              <input
                type="text"
                class="form-control mb-2"
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                defaultValue={user.previousEmployers}
                {...register("previousEmployers")}
                disabled={check}
              />
            </div>
          </div>

          <div class="form-row ">
            <label for="exampleFormControlTextarea1">
              Brief Description of experience / type of work done (in 300 words)
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              style={{ color: check === true ? "#7B7D7D" : "black" }}
              defaultValue={user.experienceDescription}
              {...register("experienceDescription")}
              disabled={check}
            />
          </div>

          <div class="btn-group mt-3" role="group" aria-label="Basic example">
            {check ? (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={check}
              >
                Save
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
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
