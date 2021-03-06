import react, { useEffect, useRef, useState } from "react";
import "./companyLogin.css";
import Navbar from "../../Component/Navbar/navbar";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ApiConstants from "../../Services/apiconstants";
import axios from "axios";
import Swal from "sweetalert2";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import ReCAPTCHA from "react-google-recaptcha";

export default function CompanyLogin() {
  const { promiseInProgress } = usePromiseTracker();
  const [values, setValues] = useState({
    companyList: {},
  });

  const [isSubmitting, setIsSubmitting] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors,  isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });

  const companyUserList = () => {
    axios
      .get(ApiConstants.COMPANY_DATA)
      .then((response) => {
        setValues({
          ...values, companyList:
            response.data.company.filter((v, i, a) => a.findIndex(t => ['companyName'].every(k => t[k] === v[k])) === i)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    companyUserList();

  }, [])

  const onSubmit = (data) => {
    console.log(data);
    trackPromise(
      axios
        .post(ApiConstants.COMPANY_LOGIN, {
          companyName: data.company_name,
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          //console.log("loginStatus :  " ,response)
          sessionStorage.setItem(
            "company_loggedin_user_data",
            JSON.stringify(response.data)
          );
          sessionStorage.setItem("login", true);
          sessionStorage.setItem("companyDashboard", true);
          window.location.pathname = "/companyDashboard";
        })
        .catch((error) => {
          console.log(error);
          if (error.message === "Request failed with status code 400") {
            Swal.fire({
              title: error.response.data.error,
              icon: "info",
              width: 400,
              height: 100,
            });
          } else if (error.message === "Network Error") {
            Swal.fire({
              title: "Backend not connected",
              icon: "info",
              width: 400,
              height: 100,
            });
          }
        })
    );
  };


  const reCaptchaSubmit = (value) => {
    setIsSubmitting(false);
    // console.log(value);
  };

  //e.target.reset();

  // ............clearInputFiled after filldata.....

  const formRef = useRef();

  const handleClick = () => {
    formRef.current.reset();
  };

  //console.log(values.companyList);

  return (
    <div>
      <Navbar />

      <div className="container-fluid company-login border">
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
        <h2 className="d-flex justify-content-center">Company Sign-in</h2>

        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <div className="mr-2 ml-2">
            <label className="form-label">User Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              {...register("email", { required: true })}
            />
            <p style={{ color: "red" }}>
              {errors.email?.type === "required" && "Email is required"}
            </p>
          </div>
          <div className="mb-1 mr-2 ml-2">
            <label className="form-label">Company Name</label>
            <input
              className="form-control"
              list="datalistOptions"

              placeholder="Type to search..."
              {...register("company_name", { required: true })}

            />
            <datalist id="datalistOptions" style={{ 'width': '300%' }}>
              {Object.keys(values.companyList).map((d, i) => {
                return <option key={i} value={values.companyList[d].companyName} />;
                console.log(values.companyList[d].companyName);
              })}
            </datalist>
            <p style={{ color: "red" }}>
              {errors.company_name?.type === "required" &&
                "Company Name is required"}
            </p>
          </div>
          <div className="mb-1 mr-2 ml-2">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <p style={{ color: "red" }}>
              {errors.password?.type === "required" && "Password is required"}
            </p>
          </div>

          <div className="mt-2 mb-1 d-flex justify-content-center">
              <ReCAPTCHA
                sitekey="6Lc1UbwfAAAAAFN7tTEMmUWZEQJ0Sxbr0HQ1SGiM"
                onChange={reCaptchaSubmit}
              />
            </div>

          <div className="row mr-2 ml-2">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Sign-in
            </button>
          </div>
        </form>
        <p style={{ fontSize: "14px" }} className="pt-1 text-center">
          If you are new user to this portal and don't have email id and
          password, Feel free to{" "}
          <Link to="contact" style={{ color: "blue" }}>
            {" "}
            Contact Us
          </Link>
        </p>
      </div>
    </div>
  );
}
