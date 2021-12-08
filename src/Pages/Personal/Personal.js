import React from 'react'
import './Personal.css'

const Personal = () => {
    return (
        <>
      
      <form className="personalForm">


      
  <div className="form-row">
    <div className="form-group col-md-4">
      <label >Phone Number</label>
      <input type="tel" className="form-control" id="inputEmail4" placeholder="+911"/>
    </div>
    <div class="form-group col-md-4">
      <label >Country</label>
      <input type="text" class="form-control" id="inputState" placeholder="India"/>
    </div>
    <div class="form-group col-md-4">
      <label >City</label>
      <input type="text" class="form-control" id="inputCity" placeholder="Delhi"/>
    </div>

  </div>



  <div className="form-group">
    <label for="inputUrl">LinkedIn Url</label>
    <input type="url" className="form-control" id="inputPhone" placeholder="http://"/>
  </div>
  
  <div className="form-row">
    
    <div class="form-group col-md-2 ">
    <label for="exampleFormControlSelect1">Relocate</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Yes</option>
      <option>No</option>
    </select>
  </div>

  <div class="form-group col-md-3 ">
    <label for="exampleFormControlSelect1">Job Type</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Full Time</option>
      <option>Part Time</option>
    </select>
  </div>
  <div class="form-group col-md-7 ">
    <label for="exampleFormControlSelect1">When can you join(Week)</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
    </select>
  </div>


  </div>
  
  
  <div className="form-row">
  <div class="form-group col-md-5 ">
    <label for="exampleFormControlSelect1">Do you need Visa Sponseredship</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Yes</option>
      <option>No</option>
    </select>
  </div>

  <div class="form-group col-md-4">
      <label >Expected salery</label>
      <input type="number" class="form-control" id="inputCity" placeholder="usd"/>
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
