import react, { useState } from 'react';
import './forgetpassword.css';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import axios from 'axios';
import ApiConstants from '../../Services/apiconstants';

export default function ForgetPassword() {
    // const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    // const { registerOtp, handleSubmitOtp, formState: { errors: errorsOtp } } = useForm();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onBlur",
    });

    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm({
        mode: "onBlur",
    });


    const [email, setemail] = useState('');
    const [getOtp, setgetOtp] = useState(false);
    const [newPasswordInput, setnewPasswordInput] = useState(false);
    const [otpButtonDisabled, setotpButtonDisabled] = useState(true);

    const onSubmitEmail = (data) => {
        setemail(data.email)
        axios.post(ApiConstants.FORGET_PASSWORD, {
            email: data.email,
        }).then(response => {
            setgetOtp(true);
            console.log(response);
        }).catch(error => {
            Swal.fire({
                title: error.response.data.message,
                icon: 'info',
                width: 400,
                height: 100,
            })
        })
        setotpButtonDisabled(false)
    };

    const onSubmitOtp = (data) => {
        if (data.newpassword === data.cnfnewpassword) {
            axios.post(ApiConstants.RESET_PASSWORD, {
                otpCode: data.otp,
                password: data.newpassword
            }
            ).then(response => {
                console.log(response);
            }).catch(error => {
                Swal.fire({
                    title: error.response.data.error,
                    icon: 'info',
                    width: 400,
                    height: 100,
                })
            })
        } else {
            Swal.fire({
                title: 'Password is not matching',
                icon: 'info',
                width: 400,
                height: 100,
            })
        }
    };
    return (
        <div>
            <div className="modal fade" id="exampleModalForgetPassword" tabIndex="-1" aria-labelledby="exampleModalLabelForgetPassword" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Forget Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {!getOtp && <form key={1} onSubmit={handleSubmit(onSubmitEmail)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input type="email"
                                        disabled={getOtp}
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="name@example.com"
                                        {...register("email", { required: true, pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: <p>invalid email</p> } })} />

                                    {errors.email && <p style={{ 'color': 'red' }}>Enter the valid email</p>}

                                    {/* <p style={{ 'color': 'red' }}>{errors.email?.type === 'required' && "Email is required"}</p> */}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Get Otp</button>
                            </div>
                        </form>}
                        {getOtp && <form key={2} onSubmit={handleSubmit2(onSubmitOtp)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="text" disabled className="form-control" placeholder={email} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">OTP</label>
                                    <input type="text" disabled={otpButtonDisabled} className="form-control" id="exampleFormControlInput1" placeholder="" {...register2('otp', { required: true })} />
                                    <p style={{ 'color': 'red' }}>{errors2.otp?.type === 'required' && "otp is required"}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <input type="password" className="form-control" id="inputPassword" placeholder="New Password" {...register2('newpassword', { required: true })} />
                                    <p style={{ 'color': 'red' }}>{errors2.newpassword?.type === 'required' && "New Password is required"}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirm New Password</label>
                                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" {...register2('cnfnewpassword', { required: true })} />
                                    <p style={{ 'color': 'red' }}>{errors2.cnfnewpassword?.type === 'required' && "Confirm New Password is required"}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Change Password</button>
                                </div>
                            </div>
                        </form>}
                    </div>
                </div>
            </div>
        </div>
    );
}