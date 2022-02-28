import React from "react";
import react, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ApiConstants from "../../Services/apiconstants";
import Swal from "sweetalert2";
import "./professional.css";
import { FcInfo } from "react-icons/fc";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

const Profile = () => {
  const { promiseInProgress } = usePromiseTracker();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [check, setCheck] = useState(false);

  const candidateData = JSON.parse(sessionStorage.getItem("candidate_data"));

  const token = candidateData.token;

  const userId = candidateData.candidate._id;

  //const user = candidateData.candidate;

  const [userData, setUserData] = useState({});

  const getData = async () => {
    await axios
      .get(ApiConstants.CANDIDATE_DATA_BY_ID + `${userId}`)
      .then((response) => {
        setUserData(response.data.candidate);
      })
      .catch((error) => {
        console.log("Data can not fetched");
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const [user, setUser] = useState({
    phone: userData.phone,
    country: userData.country,
    currentCity: userData.currentCity,
    linkedInUrl: userData.linkedInUrl,
    relocation: userData.relocation,
    typeOfJob: userData.typeOfJob,
    timeToJoin: userData.timeToJoin,
    needVisaSponsorship: userData.needVisaSponsorship,
    expectedRateC2CorC2H: userData.expectedRateC2CorC2H,
  });

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const newValues = {
      ...user,
      [name]: value,
    };
    setUser(newValues);
  };

  useEffect(() => {
    if (
      userData.experience === undefined &&
      userData.currentCompany === undefined &&
      userData.interestedRole === undefined &&
      userData.knownTechnologies === undefined &&
      userData.experienceDescription === undefined &&
      userData.previousEmployers === undefined &&
      userData.currentRole === undefined
    ) {
      setCheck(true);
    }
  }, []);

  const onSubmit = () => {
    setCheck(true);
    trackPromise(
      axios
        .patch(
          ApiConstants.PROFILE,
          {
            experience: user.experience,
            currentCompany: user.currentCompany,
            currentRole: user.currentRole,
            interestedRole: user.interestedRole,
            knownTechnologies: user.knownTechnologies,
            experienceDescription: user.experienceDescription,
            previousEmployers: user.previousEmployers,
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
            title: "Professional Profile Updated",
            icon: "success",
            width: 400,
            height: 100,
          });
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
                type="tel"
                className="form-control"
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                defaultValue={userData.experience}
                // {...register("experience")}
                name="experience"
                onChange={onChange}
                disabled={check}
                title="tooltip"
              />
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">Current Role</label>
              <input
                type="text"
                class="form-control"
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                placeholder=""
                defaultValue={userData.currentRole}
                // {...register("currentRole")}
                name="currentRole"
                onChange={onChange}
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
                defaultValue={userData.currentCompany}
                // {...register("currentCompany")}
                name="currentCompany"
                onChange={onChange}
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
                // {...register("interestedRole")}
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                disabled={check}
                name="interestedRole"
                onChange={onChange}
              >
                <option> {userData.interestedRole} </option>
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
                style={{ color: check === true ? "#7B7D7D" : "black" }}
                defaultValue={userData.knownTechnologies}
                //{...register("knownTechnologies")}
                disabled={check}
                onChange={onChange}
                name="knownTechnologies"
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
                defaultValue={userData.previousEmployers}
                // {...register("previousEmployers")}
                disabled={check}
                name="previousEmployers"
                onChange={onChange}
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
              defaultValue={userData.experienceDescription}
              // {...register("experienceDescription")}
              name="experienceDescription"
              onChange={onChange}
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
