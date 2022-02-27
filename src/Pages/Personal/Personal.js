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

  const [check, setCheck] = useState(false);

  const candidateData = JSON.parse(localStorage.getItem("candidate_data"));
  const token = candidateData.token;
  const userId = candidateData.candidate._id;

  // const user = candidateData.candidate;

  const [user, setUser] = useState([]);

  const getData = async () => {
    await axios
      .get(ApiConstants.CANDIDATE_DATA_BY_ID + `${userId}`)
      .then((response) => {
        setUser(response.data.candidate);
      })
      .catch((error) => {
        console.log("Data can not fetched");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (
      user.phone === undefined &&
      user.country === undefined &&
      user.currentCity === undefined &&
      user.relocation === undefined &&
      user.typeOfJob === undefined &&
      user.timeToJoin === undefined &&
      user.needVisaSponsorship === undefined &&
      user.expectedRateC2CorC2H === undefined &&
      user.linkedInUrl === undefined
    ) {
      setCheck(true);
    }
  }, []);

  const onSubmit = (data) => {
    trackPromise(
      axios
        .patch(
          ApiConstants.PROFILE,
          {
            phone: data.phone,
            country: data.country,
            currentCity: data.currentCity,
            linkedInUrl: data.linkedInUrl,
            relocation: data.relocation,
            typeOfJob: data.typeOfJob,
            timeToJoin: data.timeToJoin,
            needVisaSponsorship: data.needVisaSponsorship,
            expectedRateC2CorC2H: data.expectedRateC2CorC2H,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              token: token,
              _id: userId,
              "Access-Control-Allow-Origin": true,
              "Access-Control-Allow-Methods": "GET, POST, PATCH",
            },
          }
        )
        .then((response) => {
          console.log("response : ", response);
          Swal.fire({
            title: "Personal Profile Updated",
            icon: "success",
            width: 400,
            height: 100,
          });
          // window.location.pathname = "/dashboard";
        })
        .catch((error) => {
          Swal.fire({
            title: "backend not working",
            icon: "error",
            width: 400,
            height: 100,
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
                <option> {user.timeToJoin} </option>
                <option value={1}>1 </option>
                <option value={2}>2 </option>
                <option value={3}>3 </option>
                <option value={4}>4 </option>
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
                placeholder=""
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
                placeholder=""
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
              <select
                class="form-control"
                {...register("relocation")}
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                disabled={check}
              >
                <option> {user.relocation} </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
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
                <option> {user.typeOfJob} </option>
                <option value="Fulltime"> Fulltime</option>
                <option value="C2C"> C2C </option>
                <option value="C2H"> C2H </option>
                <option value="Parttime"> Parttime </option>
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
                {...register("needVisaSponsorship")}
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                disabled={check}
              >
                <option> {user.needVisaSponsorship} </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
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
                placeholder=""
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
              placeholder=""
              style={{ color: check === true ? "#7B7D7D" : "black" }}
              defaultValue={user.linkedInUrl}
              {...register("linkedInUrl")}
              disabled={check}
            />
          </div>
          <div
            class="btn-group mt-3 ml-3 w-50"
            role="group"
            aria-label="Basic example"
          >
            {check ? (
              <button type="submit" className="btn btn-light" disabled={check}>
                Save
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary "
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
