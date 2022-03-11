import react, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ApiConstants from "../../../../Services/apiconstants";
// import '../Update Candidate Admin/updateCandidateAdmin.css'

export default function UpdateCandidateAdmin(props) {
  const [adminId, setAdminId] = useState("");
  const [token, setToken] = useState("");
  const [candiData, setCandiData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const candidateData = () => {
    axios
      .post(ApiConstants.CANDIDATE_DATA_BY_ID, { id: props.candidateId })
      .then((response) => {
        // console.log(response);
        // setCandidateDataById(response.data.candidate)

        setCandiData(response.data.candidate);

        // setValue("fullname", response.data.candidate.fullname);
        // setValue("country", response.data.candidate.country);
        // setValue("currentCity", response.data.candidate.currentCity);
        // setValue("currentCompany", response.data.candidate.currentCompany);
        // setValue("currentRole", response.data.candidate.currentRole);
        // setValue("email", response.data.candidate.email);
        // setValue(
        //   "expectedRateC2CorC2H",
        //   response.data.candidate.expectedRateC2CorC2H
        // );
        // setValue("experience", response.data.candidate.experience);
        // setValue(
        //   "experienceDescription",
        //   response.data.candidate.experienceDescription
        // );
        // setValue("interestedRole", response.data.candidate.interestedRole);
        // setValue(
        //   "knownTechnologies",
        //   response.data.candidate.knownTechnologies
        // );
        // setValue("linkedInUrl", response.data.candidate.linkedInUrl);
        // setValue(
        //   "needVisaSponsorship",
        //   response.data.candidate.needVisaSponsorship
        // );
        // setValue("phone", response.data.candidate.phone);
        // setValue("relocation", response.data.candidate.relocation);
        // setValue("timeToJoin", response.data.candidate.timeToJoin);
        // setValue("typeOfJob", response.data.candidate.typeOfJob);
        //rak
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    candidateData();
    setAdminId(JSON.parse(sessionStorage.getItem("ADMIN")).admin._id);
    setToken(JSON.parse(sessionStorage.getItem("ADMIN")).token);
  }, [props.candidateId]);

  //.......................... edit...........................................................................

  const [user, setUser] = useState({
    fullname: candiData.fullname,
    country: candiData.country,
    currentCity: candiData.currentCuser,
    currentCompany: candiData.currentCompany,
    currentRole: candiData.currentRole,
    email: candiData.email,
    expectedRateC2CorC2H: candiData.expectedRateC2CorC2H,
    experience: candiData.experience,
    experienceDescription: candiData.experienceDescription,
    interestedRole: candiData.interestedRole,
    knownTechnologies: candiData.knownTechnologies,
    linkedInUrl: candiData.linkedInUrl,
    needVisaSponsorship: candiData.needVisaSponsorship,
    phone: candiData.phone,
    relocation: candiData.relocation,
    timeToJoin: candiData.timeToJoin,
    typeOfJob: candiData.typeOfJob,
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

  //..........................................................................................................
  const onSubmit = () => {
    axios
      .patch(
        ApiConstants.ADMIN_CANDIDATE_UPDATE,
        {
          id: props.candidateId,
          fullname: user.fullname,
          country: user.country,
          currentCity: user.currentCity,
          currentCompany: user.currentCompany,
          currentRole: user.currentRole,
          email: user.email,
          expectedRateC2CorC2H: user.expectedRateC2CorC2H,
          experience: user.experience,
          experienceDescription: user.experienceDescription,
          interestedRole: user.interestedRole,
          knownTechnologies: user.knownTechnologies,
          linkedInUrl: user.linkedInUrl,
          needVisaSponsorship: user.needVisaSponsorship,
          phone: user.phone,
          relocation: user.relocation,
          timeToJoin: user.timeToJoin,
          typeOfJob: user.typeOfJob,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            _id: adminId,
            token: token,
            "Access-Control-Allow-Origin": true,
            "Access-Control-Allow-Methods": "GET, POST, PATCH",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setSuccessMsg(response.data.message);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorMessage(err.response.data.error);
      });
  };

  const handleError = () => {
    setErrorMessage("");
    setSuccessMsg("");
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
          style={{ backgroundColor: "white" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Candidate
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                  <label for="exampleFormControlTextarea1">Full Name</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    // {...register("fullname")}
                    defaultValue={candiData.fullname}
                    onChange={onChange}
                    name="fullname"
                    onClick={handleError}
                  />
                </div>

                <div className="form-row">
                  <label for="exampleFormControlTextarea1">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control mb-2"
                    // {...register("phone")}
                    defaultValue={candiData.phone}
                    onChange={onChange}
                    name="phone"
                    onClick={handleError}
                  />
                </div>
                <div className="form-row">
                  <label for="exampleFormControlTextarea1">Email</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    // {...register("email")}
                    defaultValue={candiData.email}
                    onChange={onChange}
                    name="email"
                    onClick={handleError}
                  />
                </div>
                <div className="form-row">
                  <label for="exampleFormControlTextarea1">LinkedIn url</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    // {...register("linkedInUrl")}
                    defaultValue={candiData.linkedInUrl}
                    onChange={onChange}
                    name="linkedInUrl"
                    onClick={handleError}
                  />
                </div>

                <div className="form-row">
                  <div className="col">
                    <label for="exampleFormControlTextarea1">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={candiData.country}
                      //   {...register("country")}
                      onChange={onChange}
                      name="country"
                      onClick={handleError}
                    />
                  </div>
                  <div className="col">
                    <label for="exampleFormControlTextarea1">
                      Current City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={candiData.currentCity}
                      //   {...register("currentCity")}
                      onChange={onChange}
                      name="currentCity"
                      onClick={handleError}
                    />
                  </div>
                </div>

                <div className="form-row mt-2">
                  <div className="col">
                    <label for="exampleFormControlSelect1">Relocate</label>
                    <select
                      className="form-control"
                      defaultValue={candiData.relocation}
                      //   {...register("relocation")}
                      onChange={onChange}
                      name="relocation"
                      onClick={handleError}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                  <div className="col">
                    <label for="exampleFormControlSelect1">Job Type</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={candiData.typeOfJob}
                      //   {...register("typeOfJob")}
                      name="typeofJob"
                      onChange={onChange}
                      onClick={handleError}
                    />
                  </div>
                </div>

                <div className="form-row mt-4">
                  <div className="col">
                    <label for="exampleFormControlSelect1">
                      When can you join(Week)
                    </label>
                    <select
                      className="form-control"
                      //   {...register("timeToJoin")}
                      name="timeToJoin"
                      onChange={onChange}
                      onClick={handleError}
                    >
                      <option hidden> {candiData.timeToJoin} </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="1">3</option>
                      <option value="2">4</option>
                    </select>
                  </div>
                  <div className="col">
                    <label for="exampleFormControlSelect1">
                      {" "}
                      Total Overall Experience
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      //   {...register("experience")}
                      onChange={onChange}
                      name="experience"
                      defaultValue={candiData.experience}
                      onClick={handleError}
                    />
                  </div>
                </div>

                <div className="form-row mt-2">
                  <div className="col">
                    <label for="exampleFormControlSelect1">visa status</label>
                    <select
                      className="form-control"
                      //   {...register("needVisaSponsorship")}
                      name="needVisaSponsorship"
                      onChange={onChange}
                      onClick={handleError}
                    >
                      <option hidden> {candiData.needVisaSponsorship} </option>
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                  <div className="col">
                    <label for="exampleFormControlSelect1">
                      Expected salery
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      //   {...register("expectedRateC2CorC2H")}
                      defaultValue={candiData.expectedRateC2CorC2H}
                      name="expectedRateC2CorC2H"
                      onChange={onChange}
                      onClick={handleError}
                    />
                  </div>
                </div>

                <div className="form-row mt-2">
                  <label for="exampleFormControlSelect1">Current Company</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    // {...register("currentCompany")}
                    defaultValue={candiData.currentCompany}
                    onChange={onChange}
                    name="currentCompany"
                    onClick={handleError}
                  />
                </div>

                <div className="form-row mt-2">
                  <label for="exampleFormControlSelect1">Current Role</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    // {...register("interestedRole")}
                    defaultValue={candiData.interestedRole}
                    name="interestedRole"
                    onChange={onChange}
                    onClick={handleError}
                  />
                </div>

                <div className="form-row mt-2">
                  <label for="exampleFormControlSelect1">
                    Technologies /Tools you are good
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    // {...register("knownTechnologies")}
                    defaultValue={candiData.knownTechnologies}
                    name="knownTechnologies"
                    onChange={onChange}
                    onClick={handleError}
                  />
                </div>

                <div className="form-row mt-2">
                  <label for="exampleFormControlTextarea1">
                    Brief Description about your skill
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    // {...register("experienceDescription")}
                    name="experienceDescription"
                    onChange={onChange}
                    defaultValue={candiData.experienceDescription}
                    onClick={handleError}
                  />
                  <p style={{ color: "red" }}>{errorMessage}</p>
                  <p style={{ color: "green" }}>{successMsg}</p>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
