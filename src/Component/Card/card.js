import React from "react";
import "./card.css";

import { BsCurrencyDollar, BsQuestionLg } from "react-icons/bs";
import {
  FcCalendar,
  FcBusinessman,
  FcRating,
  FcBriefcase,
  FcAdvance,
  FcApprove,
  FcCheckmark,
  FcCancel,
} from "react-icons/fc";

const selectedCandidate = (data) => {
  console.log("selectedData : ", data);
};
const rejectedCandidate = (id) => {
  console.log("RejectedDate : ", id);
};

const futureCandidate = (data) => {
  console.log("futureData", data);
};

const card = (props) => {
  return (
    <>
      <div class="container-fluid  " id="accordionExample">
        <div class="card  mt-3 mb-0 rounded-4 myCard">
          <div class="card-body">
            <div class=" d-flex justify-content-end">
              <div
                class="btn-group btn-group-sm"
                role="group"
                aria-label="Basic outlined example"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary "
                  title="Shortlist"
                  onClick={(e) => selectedCandidate(props.userData)}
                >
                  <FcCheckmark />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  title="Reject"
                  onClick={(e) => rejectedCandidate(props.userData._id)}
                >
                  <FcCancel />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  title="Interview"
                  onClick={(e) => futureCandidate(props.userData)}
                >
                  <FcBusinessman />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  title="Future View"
                  onClick={(e) => futureCandidate(props.userData)}
                >
                  <BsQuestionLg />
                </button>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-md-3 col-sm-3">
                <h6 class="card-subtitle m-1">
                  <span class="badge badge-primary mr-3">Interested Role</span>
                  {props.interestedRole}
                </h6>
              </div>

              <div class="col-md-6 col-sm-6 mt-2 mb-2">
                <h6 class="card-subtitle ">
                  <span class="badge badge-primary mr-3">
                    Companies /Client Worked with
                  </span>
                  {props.previousEmployers}
                </h6>
              </div>
              <div class="col-md-2 col-sm-2">
                <h6 class="card-subtitle m-1">
                  <span class="badge badge-primary mr-3"> Job Type</span>
                  {props.typeOfJob}
                </h6>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-3 col-sm-3 ">
                <h6 class="card-subtitle m-1">
                  <span class="badge badge-primary mr-3 ">
                    Current Client/Company{" "}
                  </span>
                  {props.currentCompany}
                </h6>
              </div>
              <div class="col-md-2 col-sm-2 mt-1 mb-1">
                <p>
                  {/* <FcBusinessman size={25} /> */}
                  <span class="badge badge-primary mr-3">Experience</span>
                  {props.experience}
                </p>
              </div>
              <div class="col-md-3 col-sm-3">
                <p>
                  {/* <FcCalendar size={25} /> */}
                  <span class="badge badge-primary mr-3">
                    {" "}
                    Available in Weeks
                  </span>
                  {props.timeToJoin}
                </p>
              </div>

              <div class="col-md-4 col-sm-4">
                <p class="m-1">
                  <span class="badge badge-primary mr-3 ">
                    Expected Rate(for C2C/C2H )
                  </span>
                  <BsCurrencyDollar size={20} color="orange" />
                  {props.expectedRateC2CorC2H}
                </p>
              </div>
            </div>

            <div class="row mt-2">
              <p class="">
                {/* <FcRating size={25} /> */}
                <span class="badge badge-primary mr-3">Key Skill Areas</span>
                {props.knownTechnologies}
              </p>
            </div>
          </div>
          <div
            id="collapseOne"
            class="accordion-collapse collapse "
            aria-labelledby="heading"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <p>
                <FcAdvance size={25} />
                <u>
                  {" "}
                  <b>
                    <span class="badge badge-primary">
                      Brief about experience/ skills / key aspects of projects{" "}
                    </span>
                  </b>
                </u>
                <p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.experienceDescription,
                    }}
                  />
                </p>
              </p>
            </div>
          </div>
          <button
            class="accordion-button mb-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Show Details
          </button>
        </div>
      </div>
    </>
  );
};

export default card;
