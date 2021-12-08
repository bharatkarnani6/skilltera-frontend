import React from 'react'
import './Personal.css'
import react, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import ApiConstants from "../../Services/apiconstants";
import Swal from 'sweetalert2'

const Personal = () => {
const { register, handleSubmit, formState: { errors }, setValue } = useForm();

const onSubmit = (data) => {
  console.log(data);
  axios
      .put(ApiConstants.PROFILE, {
        phone:data.phone,
        country:data.country,
        currentCity:data.currentCity,
        linkedInUrl:data.linkedInUrl,
        relocation:data.relocation,
        typeOfJob:data.jobOfType,
        timeToJoin:data.timeToJoin,
        needVisaEmployers:data.needVisaEmployers,
        salery:data.salery
      })
      .then((response) => {
          console.log(response.data);
          Swal.fire({
              title: 'Personal profile is done',
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


  return (
        <>
      
      <form className="personalForm" onSubmit ={handleSubmit(onSubmit)}>

       <div className="form-row">
    <div className="form-group col-md-4">
      <label >Phone Number</label>
      <input type="tel" className="form-control" id="inputEmail4" placeholder="+911"
{...register("phone")}
      />
    </div>
    <div class="form-group col-md-4">
      <label >Country</label>
      <input type="text" class="form-control" id="inputState" placeholder="India"

{...register("country")}
      />
    </div>
    <div class="form-group col-md-4">
      <label >City</label>
      <input type="text" class="form-control" id="inputCity" placeholder="Delhi"

{...register("currentCity")}
      />
    </div>

  </div>

  <div className="form-group">
    <label for="inputUrl">LinkedIn Url</label>
    <input type="url" className="form-control" id="inputPhone" placeholder="http://"
    {...register("linkedInUrl")}
  
    />
  </div>
  
  <div className="form-row">
    
    <div class="form-group col-md-2 ">
    <label for="exampleFormControlSelect1">Relocate</label>
    <select class="form-control"  {...register("relocation")}>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  </div>

  <div class="form-group col-md-3 ">
    <label for="exampleFormControlSelect1">Job Type</label>
    <select class="form-control"{...register("jobOfType")} >
      <option value="Fulltime">Full Time</option>
      <option value="Parttime">Part Time</option>
    </select>
  </div>
  <div class="form-group col-md-7 ">
    <label for="exampleFormControlSelect1">When can you join(Week)</label>
    <select class="form-control" {...register("timeToJoin")} >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3"> 3</option>
      <option value="4">4</option>
    </select>
  </div>
  </div>
  

  
  <div className="form-row">
  <div class="form-group col-md-5 ">
    <label for="exampleFormControlSelect1">Do you need Visa Sponseredship</label>
    <select class="form-control" {...register("needVisaEmployer")}>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  </div>

  <div class="form-group col-md-4">
      <label >Expected salery</label>
      <input type="number" class="form-control" id="inputCity" placeholder="usd"
     {...register("salery")}

      />
    </div>

  </div>


  <div class="btn-group" role="group" aria-label="Basic example">
  
  <button type="submit" className="btn btn-primary">Save</button> 
  
    <button type="button" class="btn btn-secondary">Edit</button>
  </div>

   </form>
  
        </>
    )
}

export default Personal
