import React from "react";
import react, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ApiConstants from "../../Services/apiconstants";
import Swal from "sweetalert2";
import "./professional.css";
import { FcInfo } from "react-icons/fc";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
//import { convertFromHTML } from "draft-convert";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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

  //const user = candidateData.candidate;

  const [userData, setUserData] = useState({});

  const getData = async () => {
    await axios
      .get(ApiConstants.CANDIDATE_DATA_BY_ID + `${userId}`)
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
    experience: userData.experience,
    currentCompany: userData.currentCompany,
    currentRole: userData.currentRole,
    interestedRole: userData.interestedRole,
    knownTechnologies: userData.knownTechnologies,
    experienceDescription: userData.experienceDescription,
    previousEmployers: userData.previousEmployers,
  });

  const emptyData = {
    experience: userData.experience || {},
    currentCompany: userData.currentCompany || {},
    currentRole: userData.currentRole || {},
    interestedRole: userData.interestedRole || {},
    knownTechnologies: userData.knownTechnologies || {},
    experienceDescription: userData.experienceDescription || {},
    previousEmployers: userData.previousEmployers || {},
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
    if (k == 7) {
      setCheck(true);
    }
  };

  useEffect(() => {
    if (liked) {
      checkEmpty();
    }
  }, [liked]);

  //............... text reach editor .................

  const getHtml = (editorState) =>
    draftToHtml(convertToRaw(editorState.getCurrentContent("<h1>hello</h1>")));

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  // .............................
  const onSubmit = () => {
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
            experienceDescription: getHtml(editorState),
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
          window.location.reload(false);
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

  //.....................

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

              <div class="input-group ">
                <input
                  type="tel"
                  className="form-control"
                  style={{ color: check === true ? "black" : "#7B7D7D" }}
                  disabled={!check}
                  defaultValue={userData.experience}
                  // {...register("experience")}
                  name="experience"
                  onChange={onChange}
                />
              </div>
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">Current Role</label>

              <div class="input-group ">
                <input
                  type="text"
                  class="form-control"
                  style={{ color: check === true ? "black" : "#7B7D7D" }}
                  disabled={!check}
                  placeholder=""
                  defaultValue={userData.currentRole}
                  // {...register("currentRole")}
                  name="currentRole"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">
                Current Company / Client
              </label>
              <div class="input-group ">
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  style={{ color: check === true ? "black" : "#7B7D7D" }}
                  disabled={!check}
                  defaultValue={userData.currentCompany}
                  // {...register("currentCompany")}
                  name="currentCompany"
                  onChange={onChange}
                />
              </div>
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="exampleFormControlSelect1">
                {" "}
                Enter Type of Role you are looking for
              </label>
              <div class="input-group ">
                <select
                  class="form-control"
                  // {...register("interestedRole")}
                  style={{ color: check === true ? "black" : "#7B7D7D" }}
                  disabled={!check}
                  name="interestedRole"
                  onChange={onChange}
                >
                  <option hidden> {userData.interestedRole} </option>
                  <option value="Data Engineer"> Data Engineer</option>
                  <option value="Full Stack Engineer">
                    Full Stack Engineer{" "}
                  </option>
                  <option value="Cloud Engineer">Cloud Engineer</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row mt-4 ">
            <div class="col-md-6 col-sm-6 ">
              <label for="exampleFormControlSelect1">
                Technologies / Tools you are good at(comma seperated)
              </label>
              <div class="input-group ">
                <input
                  type="text"
                  className="form-control"
                  style={{ color: check === true ? "black" : "#7B7D7D" }}
                  disabled={!check}
                  defaultValue={userData.knownTechnologies}
                  //{...register("knownTechnologies")}

                  onChange={onChange}
                  name="knownTechnologies"
                />
                <div class="input-group-append ml-1">
                  <div class="dropdown">
                    <div class="dropbtn">
                      <FcInfo />
                    </div>
                    <div class="dropdown-content">
                      <span>
                        Example: Hadoop ecosystem tools like MapReduce, HDFS,
                        Pig, Hive, Kafka, Yarn, Sqoop, Storm, Spark, Oozie, and
                        Zookeeper. Cassandra, Snowflake, mongo DB, AWS
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-sm-6 mt-4">
              <label for="exampleFormControlSelect1">
                Enter Companies / Client you have worked for{" "}
              </label>
              <div class="input-group ">
                <input
                  type="text"
                  class="form-control mb-2"
                  style={{ color: check === true ? "black" : "#7B7D7D" }}
                  disabled={!check}
                  defaultValue={userData.previousEmployers}
                  // {...register("previousEmployers")}
                  name="previousEmployers"
                  onChange={onChange}
                />
                <div class="input-group-append ml-1">
                  <div class="dropdown">
                    <div class="dropbtn">
                      <FcInfo />
                    </div>
                    <div class="dropdown-content">
                      <span>Example: Apple, Amazon, Bloomberg, UHG</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-row mt-3 ">
            <label for="exampleFormControlTextarea1">
              Brief Description of experience / type of work done (in 300 words)
            </label>
            <div class="input-group ">
              <div className="col-12">
                <Editor
                  editorState={editorState}
                  wrapperClassName="rich-editor demo-wrapper"
                  onEditorStateChange={onEditorStateChange}
                  editorClassName="editorClassName"
                  placeholder={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: userData.experienceDescription,
                      }}
                    />
                  }
                />
              </div>

              <div class="input-group-append ml-1">
                <div class="dropdown">
                  <div class="dropbtn">
                    <FcInfo />
                  </div>
                  <div class="dropdown-content">
                    <span>
                      Example: A Python Developer, charged with intellectual
                      curiosity and positive attitude; interested in applying
                      newly acquired Data Science skills and solving challenging
                      problems. I am looking for an exciting place to work where
                      I can apply my skills to make a positive impact.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-center">
            <div
              class="btn-group mt-3 ml-3 w-50"
              role="group"
              aria-label="Basic example"
            >
              {check === true || count === 7 ? (
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
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
