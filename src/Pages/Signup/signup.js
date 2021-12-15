import react, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import ApiConstants from "../../Services/apiconstants";
import Swal from 'sweetalert2'
import { FcAbout } from "react-icons/fc";


export default function Signup(props) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(true);
    const [isEmailVerified, setisEmailVerified] = useState(false);


    const onSubmit = (data) => {
        console.log(data);
        axios.post(ApiConstants.SIGNUP,{
                fullname: data.fullname,
                email: data.email,
                password: data.password
            })
            .then((response) => {
                console.log(response.data);
                Swal.fire({
                    title: 'Email Verification',
                    text: 'Please verify your email address',
                    icon: 'info',
                    width: 400,
                    height: 100,
                })


            }).catch(error => {
                Swal.fire({
                    title: error.response.data.error,
                    icon: 'info',
                    width: 400,
                    height: 100,
                })
            });
    };

    const reCaptchaSubmit = (value) => {
        setIsSubmitting(false);
        // console.log(value);
    }


    //rak

    function showHint() {

        alert("1. At least 8 characters \n 2. At least one special char \n 3. At least one number \n 4. At least one upper and one lower case char. \n ")
    }

    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create an Account</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">

                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input type="text"
                                        className="form-control"
                                        id="formGroupExampleInput"
                                        placeholder="fullname"
                                        {...register('fullname', { required: true, minLength: 3 })}

                                    />
                                    {errors.fullname && <p style={{ 'color': 'red' }}>Enter valide name min length 3</p>}
                                    {/* <p style={{ 'color': 'red' }}>{errors.fullname?.type === 'required' && "Full Name is required"}</p> */}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="email"
                                        {...register("email", { required: true, pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: <p>invalid email</p> } })}
                                    />

                                    {errors.email && <p style={{ 'color': 'red' }}>Enter the valid email</p>}
                                    {/* <p style={{ 'color': 'red' }}>{errors.email?.type === 'required' && "Email is required"}</p> */}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputPassword"
                                        placeholder="password"
                                        {...register("password", { required: true, pattern: { value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/ } })}
                                    />
                                    {errors.password && <p style={{ 'color': 'red' }}>Enter the strong password   <button onClick={showHint} className="showHint" > <FcAbout /></button>  </p>}


                                    {/* <p style={{ 'color': 'red' }}>{errors.password?.type === 'required' && "Password is required"}</p> */}
                                </div>
                                <div className="mb-3 d-flex justify-content-center">
                                    <ReCAPTCHA
                                        sitekey="6LeV1SgdAAAAACOIFJkXmryFhyxHnK9jH4oYGkVN"
                                        onChange={reCaptchaSubmit}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
