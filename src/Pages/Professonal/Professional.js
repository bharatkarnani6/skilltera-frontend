import React from 'react'
import './Professional.css'

const Professional = () => {
    return (
        <>
         <form className="professionalForm">

      
<div className="form-row">
  <div className="form-group col-md-4">
    <label >Overall Experience</label>
    <input type="tel" className="form-control" id="inputEmail4" placeholder="1"/>
  </div>
  <div class="form-group col-md-4">
    <label >Current Company</label>
    <input type="text" class="form-control"  placeholder="Google"/>
  </div>
  <div class="form-group col-md-4">
    <label >Current Role</label>
    <input type="text" class="form-control"  placeholder="Developer"/>
  </div>

</div>



<div className="form-group">
  <label for="inputUrl">Technologies /Tools you are good </label>
  <input type="text" className="form-control"  placeholder="c++,mern"/>
</div>


  
<div class="form-group">
    <label for="exampleFormControlTextarea1">Brief Description about your skill</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
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
