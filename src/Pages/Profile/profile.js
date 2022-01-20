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
          experienceDescription:data.experienceDescription,
          previousEmployers:data.previousEmployers,
          interestedRole:data.interestedRole

         
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
      <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Personal Info</h3>
                        <div class="row">
                                <div class="col-md-6 col-sm-6">
                                    <label for="exampleFormControlTextarea1">Phone Number</label>
                                    <input type="number" className="form-control"  
                                       style={{color:check=== true?"#7B7D7D":"black" }}
                                       defaultValue= {user.phone}
                                       {...register("phone")}
                                   />
                                </div>
                                <div class="col-md-6 col-sm-6">
                                        <label for="exampleFormControlSelect1">When can you join(week)</label>
                                        <select class="form-control" {...register("timeToJoin")} style={{color:check=== true?"#7B7D7D":"black" }}  >
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
                                        <input type="text" class="form-control" id="inputState" placeholder="India"
                                          style={{color:check=== true?"#7B7D7D":"black" }}
                                          defaultValue= {user.country}
                                          {...register("country")}
                                        />
                                    </div>

                                    <div class="col">
                                        <label for="exampleFormControlTextarea1"> Current City</label>
                                        <input type="text" class="form-control" id="inputCity" placeholder="Delhi"
                                           style={{color:check=== true?"#7B7D7D":"black" }}
                                           defaultValue= {user.currentCity}
                                          {...register("currentCity")}
                                          />

                                    </div>
                               </div>

                                <div class="row">
                                    <div class="col-md-6 col-sm-6">
                                        <label for="exampleFormControlSelect1"> Open to relocate</label>
                                     <select class="form-control"  {...register("relocation") } style={{color:check=== true?"#7B7D7D":"black" }} >
                                   <option value={user.relocation === false?false:true} >{user.relocation === true?"No":"Yes"}</option>
                                   <option value={user.relocation === true?true:false}>{user.relocation === true?"Yes":"No"}</option>
                                    </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <label for="exampleFormControlSelect1">Type of Job you want </label>
                                        <select class="form-control" {...register("jobOfType") } style={{color:check=== true?"#7B7D7D":"black" }} >
                                        <option value={user.jobOfType =="Fulltime" ?"Fulltime":"Parttime"}> {user.jobOfType =="Fulltime" ?"Fulltime":"Parttime"} </option>
                                        <option value={user.jobOfType =="C2C" ?"C2C":"C2H"}>{user.jobOfType =="C2C" ?"C2C":"C2H"}</option>
                                        <option value={user.jobOfType =="C2H" ?"C2H":"C2C"}>{user.jobOfType =="C2H" ?"C2H":"C2C"}</option>
                                        </select>
                                    </div>
                                </div>

                            
      
                                <div class="row mt-3">
                                    <div class="col-md-6 col-sm-6">
                                        <label for="exampleFormControlSelect1">Do you need visa Sponsorship ?</label>
                                        <select class="form-control" {...register("needVisaEmployer")}  style={{color:check=== true?"#7B7D7D":"black" }}>
                                      <option value={user.needVisaEmployer === false?false:true} >{user.needVisaEmployer === false?"No":"Yes"}</option>
                                     <option value={user.needVisaEmployer === true?true:false}>{user.needVisaEmployer === true?"Yes":"No"}</option>
                                  </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <label for="exampleFormControlSelect1">Expected Rate for C2C/C2H</label>
                                        <input type="number" class="form-control" id="inputCity" placeholder="usd"
                                         style={{color:check=== true?"#7B7D7D":"black" }}
                                         defaultValue ={user.expectedRateC2CorC2H}
                                           {...register("expectedRateC2CorC2H")}

                                           />
                                    </div>
                                </div>

                                <div class="from-row mt-1">
                                    <label for="exampleFormControlTextarea1">LinkedIn url</label>
                                    <input type="url" className="form-control" id="inputPhone" placeholder="http://"
                                     style={{color:check=== true?"#7B7D7D":"black" }}
                                     defaultValue= {user.linkedInUrl}
                                      {...register("linkedInUrl")}
                                     />

                                </div>

                            


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
                 <input type="number" className="form-control"  placeholder="1"
                   style={{color:check=== true?"#7B7D7D":"black" }}
                   defaultValue= {user.experience}
                    {...register("experience")}
                />
             </div>                  
            <div class="col">
                     <label for="exampleFormControlSelect1">Current Role</label>
                     <input type="text" class="form-control"  
                          style={{color:check=== true?"#7B7D7D":"black" }}
                          placeholder="Developer"
                          defaultValue = {user.interestedRole}
                      {...register("interestedRole")}
                   />
            </div>
         </div>    
         
           <div class="row mt-1">  

                                <div class="col-md-6 col-sm-6">
                                    <label for="exampleFormControlSelect1">Current Company/Client</label>
                                    <input type="text" class="form-control"  placeholder="Google"
                                        style={{color:check=== true?"#7B7D7D":"black" }}
                                         defaultValue = {user.currentCompany}
                                  {...register("currentCompany")}
                                    />
                                </div>
                            
                                <div class="col-md-6 col-sm-6">
                                    <label for="exampleFormControlSelect1"> Enter Type of Role you are looking</label>
                                    <select class="form-control" {...register("interestedRole")}  style={{color:check=== true?"#7B7D7D":"black" }}>
                                      <option value="Data Engineer" > Data Engineer</option>
                                     <option value="Full Stack Engineer">Full Stack Engineer </option>
                                     <option value="Cloud Engineer">Cloud Engineer</option>
                                  </select>
                                </div>
                              </div>

                          <div class="row mt-3">
                                <div class="col-md-6 col-sm-6 mt-4">
                                    <label for="exampleFormControlSelect1">Technologies /Tools you are good</label>
                                    <input type="text" className="form-control"  placeholder="c++,mern"
                                      style={{color:check=== true?"#7B7D7D":"black" }}
                                       defaultValue = {user.knownTechnologies}
                                      {...register("knownTechnologies")}
                                     />
                                </div>
                          
                                <div class="col-md-6 col-sm-6">
                                    <label for="exampleFormControlSelect1">Enter Companies/Client you have worked for </label>
                                    <input type="text" class="form-control mb-2"
                                     style={{color:check=== true?"#7B7D7D":"black" }}
                                     defaultValue = {user.previousEmployers}
                                        {...register("previousEmployers")}
                                    />
                                </div>

                                </div>
                            
                                <div class="form-row ">
                                    <label for="exampleFormControlTextarea1">Brief Description about your skill</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
                                       style={{color:check=== true?"#7B7D7D":"black" }}
                                       defaultValue = {user.experienceDescription}
                                      {...register("experienceDescription")}
                                      />
                                </div>

                                <div class="btn-group mt-3" role="group" aria-label="Basic example">
  
  {check ?<button type="submit" className="btn btn-primary disabled"  aria-disabled="true" >Save</button> :<button type="submit" className="btn btn-primary active" aria-disabled="true">Save</button> }
  
  {check ?<button type="button" className="btn btn-secondary active" onClick={(e) =>setCheck(false) } >Edit</button> : <button type="button" className="btn btn-secondary disabled" aria-disabled="true" >Edit</button>}
  
  </div>
                          
                            </form>


      </div>
    </div>
  </div>
</div>
      </>
    )

}

export default Profile
