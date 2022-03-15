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
  const [count, setCount] = useState(0);

  const [liked, setLiked] = useState(false);

  const candidateData = JSON.parse(sessionStorage.getItem("candidate_data"));
  const token = candidateData.token;
  const userId = candidateData.candidate._id;

  // const user = candidateData.candidate;

  const [userData, setUserData] = useState({});

  const getData = async () => {
    await axios
      .get(ApiConstants.CANDIDATE_DATA_BY_ID + `/${userId}`)
      .then((response) => {
        setUserData(response.data.candidate);
        setLiked(true);
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

  const emptyData = {
    phone: userData.phone || {},
    country: userData.country || {},
    currentCity: userData.currentCity || {},
    linkedInUrl: userData.linkedInUrl || {},
    relocation: userData.relocation || {},
    typeOfJob: userData.typeOfJob || {},
    timeToJoin: userData.timeToJoin || {},
    needVisaSponsorship: userData.needVisaSponsorship || {},
    expectedRateC2CorC2H: userData.expectedRateC2CorC2H || {},
  };

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const newValues = {
      ...user,
      [name]: value,
    };
    setUser(newValues);
  };

  const checkEmpty = () => {
    var k = 0;
    for (var i in emptyData) {
      if (Object.keys(emptyData[i]).length === 0) {
        k++;
      }
    }

    setCount(k);
    if (k == 9) {
      setCheck(true);
    }
  };

  useEffect(() => {
    if (liked) {
      checkEmpty();
    }
  }, [liked]);

  const onSubmit = () => {
    trackPromise(
      axios
        .patch(
          ApiConstants.PROFILE,
          {
            phone: user.phone,
            country: user.country,
            currentCity: user.currentCity,
            linkedInUrl: user.linkedInUrl,
            relocation: user.relocation,
            typeOfJob: user.typeOfJob,
            timeToJoin: user.timeToJoin,
            needVisaSponsorship: user.needVisaSponsorship,
            expectedRateC2CorC2H: user.expectedRateC2CorC2H,
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
                type="tel"
                className="form-control"
                style={{ color: check === true ? "black" : "#7B7D7D" }}
                defaultValue={userData.phone}
                name="phone"
                // {...register("phone")}
                onChange={onChange}
                disabled={!check}
              />
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">
                When can you join(weeks)
              </label>
              <select
                class="form-control"
                // {...register("timeToJoin")}
                name="timeToJoin"
                style={{ color: check === true ? "black" : "#7B7D7D" }}
                onChange={onChange}
                disabled={!check}
              >
                <option hidden> {userData.timeToJoin} </option>
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
                style={{ color: check === true ? "black" : "#7B7D7D" }}
                defaultValue={userData.country}
                // {...register("country")}
                name="country"
                disabled={!check}
                onChange={onChange}
              />
            </div>

            <div class="col">
              <label for="exampleFormControlTextarea1"> Current City</label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                style={{ color: check === true ? "black" : "#7B7D7D" }}
                defaultValue={userData.currentCity}
                // {...register("currentCity")}
                name="currentCity"
                onChange={onChange}
                disabled={!check}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1"> Open to relocate</label>
              <select
                class="form-control"
                // {...register("relocation")}
                onChange={onChange}
                style={{ color: check === true ? "black" : "#7B7D7D" }}
                disabled={!check}
                name="relocation"
              >
                <option hidden> {userData.relocation} </option>
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
                // {...register("typeOfJob")}
                name="typeOfJob"
                onChange={onChange}
                style={{ color: check === true ? "black" : "#7B7D7D" }}
                disabled={!check}
              >
                <option hidden> {userData.typeOfJob} </option>
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
                Do you need Visa Sponsorship?
              </label>

              <select
                class="form-control"
                // {...register("needVisaSponsorship")}
                onChange={onChange}
                style={{ color: check === true ? "black" : "#7B7D7D" }}
                disabled={!check}
                name="needVisaSponsorship"
              >
                <option hidden> {userData.needVisaSponsorship} </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">
                Expected Rate for C2C/C2H(USD)
              </label>
              <input
                type="tel"
                class="form-control"
                id="inputCity"
                placeholder=""
                style={{ color: check === true ? "black" : "#7B7D7D" }}
                defaultValue={userData.expectedRateC2CorC2H}
                // {...register("expectedRateC2CorC2H")}
                name="expectedRateC2CorC2H"
                onChange={onChange}
                disabled={!check}
              />
            </div>
          </div>

          <div class="from-row mt-1">
            <label for="exampleFormControlTextarea1">
              Your LinkedIn profile link
            </label>
            <input
              type="url"
              className="form-control"
              id="inputPhone"
              placeholder=""
              style={{ color: check === true ? "black" : "#7B7D7D" }}
              defaultValue={userData.linkedInUrl}
              // {...register("linkedInUrl")}
              name="linkedInUrl"
              onChange={onChange}
              disabled={!check}
            />
          </div>

          <div class="d-flex justify-content-center">
            <div
              class="btn-group mt-3 w-50 "
              role="group"
              aria-label="Basic example"
            >
              {check === true || count === 9 ? (
                <button
                  type="submit"
                  class="btn btn-primary "
                  onClick={(e) => {
                    setCheck(false);
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-dark"
                  onClick={(e) => {
                    setCheck(true);
                    e.preventDefault();
                  }}
                >
                  Edit
                </button>
              )}

              {/* {check ? (
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
            )} */}

              {/* {check ? (
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
            )}  */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
