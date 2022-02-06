import React from "react";
import "./contact.css";
import Navbar from "../../Component/Navbar/navbar";
import ContactBanner from "../../Assets/contact.jpg";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import ApiConstants from "../../Services/apiconstants";
import axios from "axios";
import Swal from "sweetalert2";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

const Contact = () => {
  const { promiseInProgress } = usePromiseTracker();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    trackPromise(
      axios
        .post(ApiConstants.CONTACT_MAIL, {
          name: data.name,
          email: data.email,
          message: data.message,
        })
        .then((response) => {
          console.log(response.data);

          let timerInterval;
          Swal.fire({
            html: "<h1>Please Wait....</h1>",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              timerInterval = setInterval(() => {
                Swal.getTimerLeft();
              }, 1);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            Swal.fire({
              title: "Email sent",
              allowOutsideClick: true,
              allowEscapeKey: true,
              allowEnterKey: true,
              icon: "success",
              confirmButtonText: "Ok",
            });
          });
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.error,
            icon: "error",
            width: 400,
            height: 100,
          });
        })
    );
  };

  // ............clearInputFiled after filldata.....

  const formRef = useRef();

  const handleClick = () => {
    formRef.current.reset();
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />

      <div className="row">
        <div className="col-12 col-md-6">
          <div className="contact-banner">
            <img src={ContactBanner} className="img-fluid" />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="contact-form">
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
            <form
              class="row g-3"
              onSubmit={handleSubmit(onSubmit)}
              ref={formRef}
            >
              <div class="col-md-6">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputPassword4"
                  {...register("name", { required: true })}
                />
                <p style={{ color: "red" }}>
                  {errors.name?.type === "required" && "Name is required"}
                </p>
              </div>
              <div class="col-md-6">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail4"
                  {...register("email", { required: true })}
                />
                <p style={{ color: "red" }}>
                  {errors.email?.type === "required" && "Email is required"}
                </p>
              </div>
              <div class="col-12">
                <label for="floatingTextarea2">Message</label>
                <textarea
                  class="form-control"
                  placeholder="Leave a Message here"
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                  {...register("message", { required: true })}
                ></textarea>
                <p style={{ color: "red" }}>
                  {errors.message?.type === "required" && "Message is required"}
                </p>
              </div>
              <div class="d-grid gap-2 col-6 mx-auto">
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={handleClick}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
