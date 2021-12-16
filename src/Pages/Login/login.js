import react, { useState, useEffect } from "react";
import './login.css'
import Signup from "../Signup/signup";
import { useForm } from "react-hook-form";
import Navbar from "../../Component/Navbar/navbar";
import ForgetPassword from "../Forget Password/forgetpassword";
import axios from 'axios';
import ApiConstants from "../../Services/apiconstants";
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import { FcAbout } from "react-icons/fc";

const Login = () => {
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

            localStorage.setItem("candidate_data",JSON.stringify(response.data))
        
            
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
    
        })
    };

//rak --> for login validation message 




    function showHint() {

        alert("1. At least 8 characters \n 2. At least one special char \n 3. At least one number \n 4. At least one upper and one lower case char. \n ")
    }



    return (
        <div>
            <Navbar />
            <div className="main-box">

                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="text"
                            className="form-control"

                            placeholder="email"
                            {...register("email", { required: true, pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: <p>invalid email</p> } })}

                        />
                        {errors.email && <p style={{ 'color': 'red' }}>Enter the valid email </p>}

                        {/* <p style={{ 'color': 'red' }}>{errors.email?.type === 'required' && "Email is required"} </p> */}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password"
                            className="form-control"

                            placeholder="Password"
                            {...register("password", { required: true, pattern: { value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/ } })}

                        />
                        {errors.password && <p style={{ 'color': 'red' }}>Enter the strong password   <button onClick={showHint} className="showHint" > <FcAbout /></button>  </p>}

                        {/* <p style={{ 'color': 'red' }}>  {errors.password?.type === 'required' && "Password is required" }  </p> */}
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                        <div className="col-6">
                            <div className="d-grid col-12 mx-auto">
                                <button className="btn btn-success" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal">Register</button>
                            </div>
                        </div>
                    </div>
                </form>
                <p className="pt-3" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModalForgetPassword">Forget Password</p>

            </div>
            <Signup />
            <ForgetPassword />
        </div>
    );
}



export default Login