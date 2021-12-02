import react from 'react';
import './companyLogin.css'
import Navbar from '../../Component/Navbar/navbar';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import ApiConstants from '../../Services/apiconstants'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function CompanyLogin() {
    const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid }, } = useForm({
        mode: "onChange"
    });
    const onSubmit = async (data, e) => {
        await axios.post(ApiConstants.COMPANY_LOGIN, {
            compantName: data.company_name,
            email: data.email,
            message: data.message
        }).then((response) => {
            console.log(response.data);
        }).catch(error => {
            Swal.fire({
                title: 'Backend Not Connected',
                icon: 'error',
                width: 400,
                height: 100,
            })
        })
        e.target.reset();
    }
    return (
        <>
            <Navbar />
            <div className="heading">
                <h1 className='d-flex justify-content-center'>Company Login</h1>
            </div>
            <div className="company-login">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-3">
                        <label className="form-label">User Email</label>
                        <input type="email" className="form-control" placeholder="name@example.com" {...register('email', { required: true })} />
                        <p style={{ 'color': 'red' }}>{errors.email?.type === 'required' && "Email is required"}</p>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Company Name</label>
                        <input type="text" class="form-control" id="inputPassword4" {...register('company_name', { required: true })} />
                        <p style={{ 'color': 'red' }}>{errors.company_name?.type === 'required' && "Company Name is required"}</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Password" {...register('password', { required: true })} />
                        <p style={{ 'color': 'red' }}>{errors.password?.type === 'required' && "Password is required"}</p>
                    </div>

                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" disabled={!isDirty || !isValid} class="btn btn-primary">Login</button>
                    </div>
                </form>
                <p style={{ fontSize: '14px' }} className="pt-3 text-center">If you are new user to this portal and don't have email id and password, Feel free to <Link to='contact' style={{ color: 'blue' }}> Contact Us</Link></p>
            </div>
        </>
    );
}