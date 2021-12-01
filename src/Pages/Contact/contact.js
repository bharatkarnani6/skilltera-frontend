import React from 'react'
import './contact.css'
import Navbar from '../../Component/Navbar/navbar'
import ContactBanner from '../../Assets/contact.jpg'
import { useForm } from "react-hook-form";

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
                <button type="submit" class="btn btn-primary">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Contact
