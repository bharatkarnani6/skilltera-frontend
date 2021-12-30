import react, { useState, useEffect } from 'react'
import Navbar from '../../Component/Navbar/navbar'
import axios from 'axios';
import './admin.css'
import { useForm } from "react-hook-form";
import ApiConstants from "../../Services/apiconstants";
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import { FcAbout } from "react-icons/fc";
export default function Admin() {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [isEmailVerified, setisEmailVerified] = useState(false);
    let history = useHistory();


    const onSubmit = (data) => {
        console.log(data);
        axios.post(ApiConstants.ADMIN_LOGIN, {
            email: data.email,
            password: data.password
        }).then((response) => {
            console.log(response.data);
            localStorage.setItem("ADMIN", JSON.stringify(response.data))
            localStorage.setItem("login", true)
            window.location.pathname = "/adminDashboard";
        }).catch(error => {
            //localStorage.setItem("candidateLogin", false)
            Swal.fire({
                title: error.response.data.error,
                icon: 'info',
                width: 400,
                height: 100,
            })

        })
    };

    function showHint() {

        alert("1. At least 8 characters \n 2. At least one special char \n 3. At least one number \n 4. At least one upper and one lower case char. \n ")
    }

    return (
        <>
            <Navbar />
            <div className="main-box">

                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Email"
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
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}