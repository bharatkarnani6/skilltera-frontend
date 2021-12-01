import react, { useState } from "react";
import './login.css'
import Signup from "../Signup/signup";
import { useForm } from "react-hook-form";
import Navbar from "../../Component/Navbar/navbar";
import ForgetPassword from "../Forget Password/forgetpassword";
import axios from 'axios';
import ApiConstants from "../../Services/apiconstants";
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [isEmailVerified, setisEmailVerified] = useState(false);
    let history = useHistory();
    const onSubmit = (data) => {
        console.log(data);
        axios.post(ApiConstants.LOGIN, {
            email: data.email,
            password: data.password
        }).then((response) => {
            console.log(response.data);
            localStorage.setItem('login', true);
            window.location.pathname = "/dashboard";
            // history.push('/dashboard')
            setisEmailVerified(response.data.candidate.isVerified);
        }).catch(error => {
            Swal.fire({
                title: error.response.data.error,
                icon: 'info',
                width: 400,
                height: 100,
            })
            //console.log(error.response.data.error)
        })
    };
    return (
        <>
            <Navbar />
            <div className="main-box">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder="name@example.com" {...register('email', { required: true })} />
                        <p style={{ 'color': 'red' }}>{errors.email?.type === 'required' && "Email is required"}</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Password" {...register('password', { required: true })} />
                        <p style={{ 'color': 'red' }}>{errors.password?.type === 'required' && "Password is required"}</p>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                        <div className="col-6">
                            <div className="d-grid col-12 mx-auto">
                                <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Register</button>
                            </div>
                        </div>
                    </div>
                </form>
                <p className="pt-3" type="button" data-bs-toggle="modal" data-bs-target="#exampleModalForgetPassword">Forget Password</p>

            </div>
            <Signup />
            <ForgetPassword />
        </>
    );
}