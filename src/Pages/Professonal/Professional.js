import React from 'react'
import './Professional.css'
import react, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import ApiConstants from "../../Services/apiconstants";
import Swal from 'sweetalert2'



const Professional = () => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
        .put(ApiConstants.PROFILE, {
        
          experience:data.experience,
          currentCompany:data.currentCompany,
          interestedRole:data.interestedRole,
          knownTechnologies:data.knownTechnologies,
          briefDescription:data.briefDescription

         
        })
        .then((response) => {
            console.log(response.data);
            Swal.fire({
                title: 'Professional profile is done',
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

  <form className="professionalForm" onSubmit={handleSubmit(onSubmit)}>
       <div className="form-row">
  <div className="form-group col-md-4">
    <label >Overall Experience</label>
    <input type="number" className="form-control"  placeholder="1"
      {...register("experience")}
    />
  </div>
  <div class="form-group col-md-4">
    <label >Current Company</label>
    <input type="text" class="form-control"  placeholder="Google"
      {...register("currentCompany")}
    />
  </div>
  <div class="form-group col-md-4">
    <label >Current Role</label>
    <input type="text" class="form-control"  placeholder="Developer"
{...register("interestedRole")}
    />
  </div>
</div>

<div className="form-group">
  <label for="inputUrl">Technologies /Tools you are good </label>
  <input type="text" className="form-control"  placeholder="c++,mern"
{...register("knownTechnologies")}

  />
</div>


  
<div class="form-group">
    <label for="exampleFormControlTextarea1">Brief Description about your skill</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
     {...register("breifDescription")}

    />
  </div>



<div class="btn-group" role="group" aria-label="Basic example">
  
<button type="submit" className="btn btn-primary">Save</button> 

  <button type="button" class="btn btn-secondary">Edit</button>
</div>
</form>
   
          
        </>
    )
}

export default Professional
