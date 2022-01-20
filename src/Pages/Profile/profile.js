import React from 'react'
import react, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import ApiConstants from "../../Services/apiconstants";
import Swal from 'sweetalert2'
import './profile.css'




const Profile = () => {


  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const [check, setCheck] = useState(true)    

  const candidateData = JSON.parse( localStorage.getItem('candidate_data'))

  const token = candidateData.token

  const userId = candidateData.candidate._id;
  
  const user = candidateData.candidate

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
          expectedRateC2CorC2H:data.expectedRateC2CorC2H,


          experience:data.experience,
          currentCompany:data.currentCompany,
          interestedRole:data.interestedRole,
          knownTechnologies:data.knownTechnologies,
          experienceDescription:data.experienceDescription

         
        },{
          
          "Accept": "application/json",
          "Content-type": "application/json",
         'token': token,
         '_id': userId,
          'Access-Control-Allow-Origin': true,
          "Access-Control-Allow-Methods": "GET, POST, PATCH"
 

        }).then((response) => {
            console.log(response.data);
            Swal.fire({
                title: 'profile is done',
                text: 'Please verify your email address',
                icon: 'info',
                width: 400,
                height: 100,
            })

            setTimeout(function(){ 

              window.location.pathname = "/dashboard";
  
             }, 2000);
  


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
<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
      <form>
      <h3>Personal Info</h3>
                        <div class="row">
                                <div class="col-md-6 col-sm-6">
                                    <label for="exampleFormControlTextarea1">Phone Number</label>
                                    <input type="tel" class="form-control "
                                        {...register("phone")}
                                    />
                                </div>
                                <div class="col-md-6 col-sm-6">
                                        <label for="exampleFormControlSelect1">When can you join(week)</label>
                                        <select class="form-control" {...register("timeToJoin")} >
                                            <option value="1" >1 </option>
                                            <option value="2">2 </option>
                                            <option value="1" >3 </option>
                                            <option value="2">4 </option>
                                        </select>
                              </div>

                        </div>

                                <div class="form-row">
                                    <div class="col">
                                        <label for="exampleFormControlTextarea1">Country</label>
                                        <input type="text" class="form-control"
                                            {...register("country")}
                                        />
                                    </div>

                                    <div class="col">
                                        <label for="exampleFormControlTextarea1"> Current City</label>
                                        <input type="text" class="form-control"
                                            {...register("currentCity")}
                                        />
                                    </div>
                               </div>

                                <div class="row">
                                    <div class="col-md-6 col-sm-6">
                                        <label for="exampleFormControlSelect1"> Open to relocate</label>
                                        <select class="form-control"  {...register("relocation")}  >
                                            <option value={false} >No</option>
                                            <option value={true} >Yes</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <label for="exampleFormControlSelect1">Type of Job you want </label>
                      
                                     <select class="form-control"   {...register("typeOfJob")} >
                                            <option value="Fulltime" >Fulltime</option>
                                            <option value="C2C">C2C</option>
                                            <option value="C2H" >C2h</option>
                              
                                        </select>


                                    </div>
                                </div>

                            
      
                                <div class="row mt-3">
                                    <div class="col-md-6 col-sm-6">
                                        <label for="exampleFormControlSelect1">Do you need visa Sponsorship ?</label>
                                        <select class="form-control" {...register("needVisaSponsorship")} >
                                            <option value={false} >No</option>
                                            <option value={true}>Yes</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <label for="exampleFormControlSelect1">Expected Rate for C2C/C2H</label>
                                        <input type="text" class="form-control"
                                            {...register("expectedRateC2CorC2H")}
                                        />
                                    </div>
                                </div>

                                <div class="from-row mt-1">
                                    <label for="exampleFormControlTextarea1">LinkedIn url</label>
                                    <input type="url" class="form-control "
                                        {...register("linkedInUrl")}
                                    />
                                </div>

                                {/* <div class="modal-footer" >
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Update</button>
                                </div> */}


<div class="btn-group mt-4" role="group" aria-label="Basic example">
  
  {check ?<button type="submit" className="btn btn-primary disabled"  aria-disabled="true" >Save</button> :<button type="submit" className="btn btn-primary active" aria-disabled="true">Save</button> }
  
  {check ?<button type="button" className="btn btn-secondary active" onClick={(e) =>setCheck(false) } >Edit</button> : <button type="button" className="btn btn-secondary disabled" aria-disabled="true" >Edit</button>}
  
  </div>      
                            </form>

             </div>
          </div>
       </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
    
      <form> 

      <h3>Professional Info</h3>
      <div class="form-row">                                        
             <div class="col">
                 <label for="exampleFormControlSelect1"> Total Overall Experience</label>
                  <input type="number" class="form-control"
                   {...register("experience")}
                          />
             </div>                  
            <div class="col">
                     <label for="exampleFormControlSelect1">Current Role</label>
                     <input type="text" class="form-control"
                     {...register("interestedRole")}
              />
            </div>
         </div>    
         
           <div class="row mt-1">  

                                <div class="col-md-6 col-sm-6">
                                    <label for="exampleFormControlSelect1">Current Company/Client</label>
                                    <input type="text" class="form-control"
                                        {...register("currentCompany")}
                                    />
                                </div>
                                {/* iska field add kro  */}
                                <div class="col-md-6 col-sm-6">
                                    <label for="exampleFormControlSelect1"> Enter Type of Role you are looking</label>
                                    <input type="text" class="form-control"
                                        {...register("currentCompany")}
                                    />
                                </div>
                              </div>

                          <div class="row mt-3">
                                <div class="col-md-6 col-sm-6 mt-4">
                                    <label for="exampleFormControlSelect1">Technologies /Tools you are good</label>
                                    <input type="text" class="form-control mb-2"
                                        {...register("knownTechnologies")}
                                    />
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <label for="exampleFormControlSelect1">Enter Companies/Client you have worked for </label>
                                    <input type="text" class="form-control mb-2"
                                        {...register("knownTechnologies")}
                                    />
                                </div>

                                </div>
                            
                                <div class="form-row ">
                                    <label for="exampleFormControlTextarea1">Brief Description about your skill</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                        {...register("experienceDescription")}
                                    />
                                </div>


                                <div class="btn-group mt-3" role="group" aria-label="Basic example">
  
  {check ?<button type="submit" className="btn btn-primary disabled"  aria-disabled="true" >Save</button> :<button type="submit" className="btn btn-primary active" aria-disabled="true">Save</button> }
  
  {check ?<button type="button" className="btn btn-secondary active" onClick={(e) =>setCheck(false) } >Edit</button> : <button type="button" className="btn btn-secondary disabled" aria-disabled="true" >Edit</button>}
  
  </div>


{/* 
                                <div class="modal-footer" >
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Update</button>
                                </div> */}
                            </form>


      </div>
    </div>
  </div>
</div>
      </>
    )

}

export default Profile
