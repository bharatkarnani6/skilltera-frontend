import React, { useEffect, useState } from "react";
import axios from 'axios'
import ApiConstants from "../../Services/apiconstants";
import Swal from "sweetalert2"

import "./card.css";

import {
  BsCurrencyDollar, BsQuestionLg, BsCheckLg,
  BsXCircle,
  BsFillPersonCheckFill
} from "react-icons/bs";
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




const Card = (props) => {

  const [clickDisable, setclickDisable] = useState(false);

  const company_loggedin_user_data = JSON.parse(sessionStorage.getItem("company_loggedin_user_data")) || ""

  const token = company_loggedin_user_data.token
  const userId = company_loggedin_user_data.company._id

  const [uniquekeyforAccoridian, setUniquekeyforAccoridian] = useState('');
  const [uniqueidforAccoridian, setUniqueidforAccoridian] = useState('');


  useEffect(() => {
    setUniqueidforAccoridian('collapse' + props.uniquekey)
    setUniquekeyforAccoridian('#collapse' + props.uniquekey);
  }, [])

  const shortlistedCandidate = (data) => {
    axios.post(ApiConstants.SHORTLISTED_CANDIDATE, {
      _id: data
    }, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        token: token,
        _id: userId,
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Methods": "GET, POST, PATCH",
      },
    }).then((res) => {

      setclickDisable(true)
      console.log("res : ", res)

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Shortlisted successfully'
      })

    }).catch((error) => {

      console.log(error)

    })
  };





  const rejectedCandidate = (data) => {


    axios.post(ApiConstants.REJECTED_CANDIDATE, {
      _id: data
    }, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        token: token,
        _id: userId,
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Methods": "GET, POST, PATCH",
      },
    }).then((res) => {
      setclickDisable(true)
      console.log("res : ", res)

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'Add to Rejectlist'
      })

    }).catch((error) => {

      console.log(error)

    })

  };

  const futureCandidate = (data) => {

    axios.post(ApiConstants.FUTURE_CANDIDATE, {
      _id: data
    }, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        token: token,
        _id: userId,
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Methods": "GET, POST, PATCH",
      },
    }).then((res) => {
      setclickDisable(true)
      console.log("res : ", res)
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Added to FutureList'
      })
    }).catch((error) => {
      console.log(error)
    })
  };

  const interviewingCandidate = (data) => {
    axios.post(ApiConstants.INTERVIEWING_CANDIDATE, {
      _id: data
    }, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        token: token,
        _id: userId,
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Methods": "GET, POST, PATCH",
      },
    }).then((res) => {

      console.log("res : ", res)
      setclickDisable(true)
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Added To Interviewinglist'
      })

    }).catch((error) => {

      console.log(error)

    })
  };




  return (
    <>
      <div class="container-fluid d-flex flex-column-reverse " id="accordionExample">
        <div class="card  mt-3 mb-0 rounded-4 myCard">
          <div class="card-body">
            <div class=" d-flex justify-content-end">
              <div
                class="btn-group btn-group-sm"
                role="group"
                aria-label="Basic outlined example"
              >
             {!props.shortlistedTabs &&  <button
                  type="button"
                  class={clickDisable===false  ?"btn btn-primary":"btn btn-secondary"}
                  title="Shortlist"
                  onClick={(e) => shortlistedCandidate(props.userData._id)}
                    disabled = {clickDisable   }
                     aria-pressed={clickDisable }
                >
                  <BsCheckLg />
                </button>

             }
               {!props.rejectedTabs && < button
                  type="button"
                  class={clickDisable===false ?"btn btn-primary":"btn btn-secondary"}
                  title="Reject"
                  onClick={(e) => rejectedCandidate(props.userData._id)}
                    disabled = {clickDisable }
                     aria-pressed={clickDisable }
                >
                  <BsXCircle />
                </button>
               }
              {!props.interviewTabs &&  <button
                  type="button"
                  class={clickDisable===false  ?"btn btn-primary":"btn btn-secondary"}
                  title="Interview"
                  onClick={(e) => interviewingCandidate(props.userData._id)}
                     disabled = {clickDisable }
                     aria-pressed={clickDisable }
                >
                  <BsFillPersonCheckFill />
                </button>
               }

              {!props.futureTabs &&  <button
                  type="button"
                  class= {clickDisable===false ?"btn btn-primary":"btn btn-secondary"}
                  title="Future View"
                  onClick={(e) => futureCandidate(props.userData._id)}
                  disabled = {clickDisable  }
                   aria-pressed={clickDisable }
                  
                >
                  <BsQuestionLg />
                </button>
             }
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
            id={uniqueidforAccoridian}
            class="accordion-collapse collapse"
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
            data-bs-target={uniquekeyforAccoridian}
            aria-expanded='true'
          >
            Show Details
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
