import React from 'react'
import react, { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import ApiConstants from "../../Services/apiconstants";
import Swal from 'sweetalert2'
import './professional.css'

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




  // .............tooltips.........
  const inputRef = useRef()

  useEffect(() => {

    inputRef.current.focus();
    
      
  }, []);

    return (
      <>

    <div class="main-box card w-75 "> 

      <div class="card-body">

        <legend  >Professional Info</legend>

      <form onSubmit={handleSubmit(onSubmit)}> 
      <div class="row">                                        
             <div class="col-md-6 col-sm-6">
                 <label for="exampleFormControlSelect1"> Total Overall Experience</label>

                 <input type="number" className="form-control"  placeholder="1"
                   style={{color:check === true?"#7B7D7D":"black" }}
                   defaultValue= {user.experience}
                   {...register("experience")}
                   ref={inputRef}
                />

             </div>                  
            <div class="col-md-6 col-sm-6">
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

                          <div class="row ">
                                <div class="col-md-6 col-sm-6 ">
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
      </>
    )
  }

export default Profile
