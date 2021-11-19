import react, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import ApiConstants from "../../Services/apiconstants";
import Swal from 'sweetalert2'


export default function Signup(props) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(true);
    const [isEmailVerified, setisEmailVerified] = useState(false);


    const onSubmit = (data, e) => {
        console.log(data);
        axios
            .post(ApiConstants.SIGNUP, {
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

    return (
        <>
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
                                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="John Parker" {...register('fullname', { required: true })} />
                                    <p style={{ 'color': 'red' }}>{errors.fullname?.type === 'required' && "Full Name is required"}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" {...register('email', { required: true })} />
                                    <p style={{ 'color': 'red' }}>{errors.email?.type === 'required' && "Email is required"}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" {...register('password', { required: true })} />
                                    <p style={{ 'color': 'red' }}>{errors.password?.type === 'required' && "Password is required"}</p>
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
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
