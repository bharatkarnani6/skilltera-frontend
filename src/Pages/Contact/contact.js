import React from 'react'
import './contact.css'
import Navbar from '../../Component/Navbar/navbar'
import ContactBanner from '../../Assets/contact.jpg'
import { useForm } from "react-hook-form";
import ApiConstants from '../../Services/apiconstants';
import axios from 'axios';
import Swal from 'sweetalert2'

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid } } = useForm({
    mode: "onChange"
  });
  const onSubmit = async (data, e) => {
    await axios.post(ApiConstants.CONTACT_MAIL, {
      name: data.name,
      email: data.email,
      message: data.message
    }).then((response) => {
      console.log(response.data);
      Swal.fire({
        title: response.data.message,
        text: 'We will contact you soon',
        icon: 'success',
        width: 400,
        height: 100,
      })
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
    <div style={{ overflowX: 'hidden' }}>
      <Navbar />
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="contact-banner">
            <img src={ContactBanner} className="img-fluid" />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="contact-form">
            <form class="row g-3" onSubmit={handleSubmit(onSubmit)}>
              <div class="col-md-6">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" id="inputPassword4" {...register('name', { required: true })} />
                <p style={{ 'color': 'red' }}>{errors.name?.type === 'required' && "Name is required"}</p>
              </div>
              <div class="col-md-6">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail4" {...register('email', { required: true })} />
                <p style={{ 'color': 'red' }}>{errors.email?.type === 'required' && "Email is required"}</p>
              </div>
              <div class="col-12">
                <label for="floatingTextarea2">Message</label>
                <textarea class="form-control" placeholder="Leave a Message here" id="floatingTextarea2" style={{ height: '100px' }} {...register('message', { required: true })}></textarea>
                <p style={{ 'color': 'red' }}>{errors.message?.type === 'required' && "Message is required"}</p>
              </div>
              <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" disabled={!isDirty || !isValid} class="btn btn-primary">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Contact
