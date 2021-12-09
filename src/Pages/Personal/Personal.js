import React from 'react'
import './Personal.css'
import react, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import ApiConstants from "../../Services/apiconstants";
import Swal from 'sweetalert2'
import { authHeader } from '../../Common/authHeader';

const Personal = () => {

const { register, handleSubmit, formState: { errors }, setValue } = useForm();
const [check, setCheck] = useState(false)    

const [user,setUser] = useState([])


const candidateData = JSON.parse( localStorage.getItem('candidate_data'))

const token = candidateData.token
console.log("token",token)

const userId = candidateData.candidate._id;



// useEffect((e) => {
//   axios
//       .get(ApiConstants.CANDIDATE + userId,
//     )
//       .then((response) => {
//         setUser(response.data.candidate);
//         setCheck(true)
//           console.log(response.data.candidate);
//       })
//       .catch((err) => console.log(err));
// },[]);


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
        expectedRateC2CorC2H:data.expectedRateC2CorC2H
      },{
  headers:token

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
      <input type="tel" className="form-control"  
      
      defaultValue= {user.phone}
      {...register("phone")}
      
      />
    </div>
    <div class="form-group col-md-4">
      <label >Country</label>
      <input type="text" class="form-control" id="inputState" placeholder="India"

  defaultValue= {user.country}
      {...register("country")}
      />
    </div>
    <div class="form-group col-md-4">
      <label >City</label>
      <input type="text" class="form-control" id="inputCity" placeholder="Delhi"
      
defaultValue= {user.currentCity}

{...register("currentCity")}
      />
    </div>

  </div>

  <div className="form-group">
    <label for="inputUrl">LinkedIn Url</label>
    <input type="url" className="form-control" id="inputPhone" placeholder="http://"
    
defaultValue= {user.linkedInUrl}
    {...register("linkedInUrl")}
  
    />
  </div>
  
  <div className="form-row">
    
    <div class="form-group col-md-2 ">
    <label for="exampleFormControlSelect1">Relocate</label>
    <select class="form-control"  {...register("relocation")}>
      <option value={user.relocation === "No"?"No":"Yes"} >{user.relocation === "No"?"No":"Yes"}</option>
      <option value={user.relocation === "Yes"?"Yes":"No"}>{user.relocation === "Yes"?"Yes":"No"}</option>
    </select>
  </div>

  <div class="form-group col-md-3 ">
    <label for="exampleFormControlSelect1">Job Type</label>
    <select class="form-control"{...register("jobOfType")} >
      <option value={user.jobOfType =="Fulltime" ?"Fulltime":"Parttime"}> {user.jobOfType =="Fulltime" ?"Fulltime":"Parttime"} </option>
      <option value={user.jobOfType =="Parttime" ?"Parttime":"Fulltime"}>{user.jobOfType =="Parttime" ?"Parttime":"Fulltime"}</option>
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
    <option value={user.needVisaEmployer === "No"?"No":"Yes"} >{user.needVisaEmployer === "No"?"No":"Yes"}</option>
      <option value={user.needVisaEmployer === "Yes"?"Yes":"No"}>{user.needVisaEmployer === "Yes"?"Yes":"No"}</option>
    </select>
  </div>

  <div class="form-group col-md-4">
      <label >Expected salery</label>
      <input type="number" class="form-control" id="inputCity" placeholder="usd"
      
    defaultValue ={user.expectedRateC2CorC2H}
defaultValue= {user.expectedRateC2CorC2H}
     {...register("expectedRateC2CorC2H")}

      />
    </div>

  </div>


  <div class="btn-group" role="group" aria-label="Basic example">
  
 { check ? <button type="submit" className="btn btn-primary disabled"  aria-disabled="true" >Save</button> :<button type="submit" className="btn btn-primary active" aria-disabled="true">Save</button> }

 {check ?<button type="button" class="btn btn-secondary active" onClick={(e) =>setCheck(false) } >Edit</button> : <button type="button" class="btn btn-secondary disabled" aria-disabled="true" >Edit</button>}
  
  </div>
   </form>
  
        </>
    )
}

export default Personal
